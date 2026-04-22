require('dotenv').config();
const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3000;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure Multer
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Helper: sleep for ms milliseconds
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper: extract JSON array from a string robustly
function extractJSON(text) {
    // Remove markdown code fences if present
    let cleaned = text.replace(/```json[\s\S]*?```/gi, match =>
        match.replace(/```json/i, '').replace(/```/, '')
    );
    cleaned = cleaned.replace(/```[\s\S]*?```/g, match =>
        match.replace(/```/g, '')
    );
    cleaned = cleaned.trim();

    // Try direct parse first
    try {
        return JSON.parse(cleaned);
    } catch (_) {}

    // Find the first '[' and last ']' and try to parse between them
    const start = cleaned.indexOf('[');
    const end = cleaned.lastIndexOf(']');
    if (start !== -1 && end !== -1 && end > start) {
        try {
            return JSON.parse(cleaned.slice(start, end + 1));
        } catch (_) {}
    }

    throw new Error('Could not extract valid JSON from AI response.');
}

// Helper: call Gemini with retry + exponential backoff
async function generateWithRetry(model, prompt, maxRetries = 3) {
    let lastError;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (err) {
            lastError = err;
            const isRetryable =
                err.message?.includes('503') ||
                err.message?.includes('500') ||
                err.message?.includes('overloaded') ||
                err.message?.includes('rate') ||
                err.message?.includes('timeout') ||
                err.message?.includes('UNAVAILABLE');

            if (isRetryable && attempt < maxRetries) {
                const waitMs = 1000 * Math.pow(2, attempt); // 2s, 4s, 8s
                console.warn(`Gemini attempt ${attempt} failed (${err.message}). Retrying in ${waitMs / 1000}s...`);
                await sleep(waitMs);
            } else {
                break;
            }
        }
    }
    throw lastError;
}

// Routes
app.get('/', (req, res) => {
    res.send('PDF Question AI API is running');
});

app.post('/upload', upload.single('pdfFile'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded.' });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ success: false, message: 'GEMINI_API_KEY is not set in .env file.' });
        }

        const questionType = req.body.questionType;
        const questionCount = parseInt(req.body.questionCount, 10) || 5;

        // Parse PDF
        const dataBuffer = req.file.buffer;
        const data = await pdf(dataBuffer);
        const extractedText = data.text;

        if (!extractedText || extractedText.trim().length < 50) {
            return res.status(400).json({ success: false, message: 'Could not extract readable text from the PDF. Make sure the PDF is not scanned/image-only.' });
        }

        // Limit text to avoid exceeding token limits
        const textForPrompt = extractedText.substring(0, 30000);

        // Generate Questions with Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `You are a teacher. Create ${questionCount} ${questionType === 'MCQ' ? 'Multiple Choice Questions (MCQ)' : 'Creative Questions (CQ)'} based on the following text.

The output must be a valid JSON array of objects and nothing else — no explanation, no markdown, no code fences.

${questionType === 'MCQ' ? `Format:
[
    {
        "question": "Question text",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "answer": "Correct Option"
    }
]` : `Format:
[
    {
        "question": "Question text",
        "answer": "Model answer or key points"
    }
]`}

Text:
${textForPrompt}`;

        let rawText;
        try {
            // Updated to 5 retries
            rawText = await generateWithRetry(model, prompt, 5);
        } catch (err) {
            console.error('Gemini API failed after retries:', err.message);
            return res.status(503).json({
                success: false,
                message: `The AI service is temporarily unavailable. Please try again in a few seconds. (${err.message})`
            });
        }

        let questions;
        try {
            questions = extractJSON(rawText);
        } catch (e) {
            console.error('Failed to parse JSON from Gemini response:', rawText);
            return res.status(500).json({
                success: false,
                message: 'The AI returned an unexpected format. Please try again.',
                raw: rawText
            });
        }

        if (!Array.isArray(questions) || questions.length === 0) {
            return res.status(500).json({ success: false, message: 'No questions were generated. Please try again.' });
        }

        res.json({
            success: true,
            questionType,
            questionCount: questions.length,
            questions,
            pageCount: data.numpages
        });

    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ success: false, message: 'Error processing PDF: ' + error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});