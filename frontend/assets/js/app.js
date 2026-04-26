// /* ============================================================
//    EduCore Admin — app.js
//    All frontend logic: navigation, CRUD, AI, modals, toasts
//    ============================================================ */

// "use strict";

// /* ── State ──────────────────────────────────────────────── */
// const STATE = {
//   courses:  [],
//   trainers: [],
//   students: [],
//   courseEditIdx:  null,
//   trainerEditIdx: null,
//   studentEditRow: null,
//   pdfData:      "",
//   pdfFileName:  "",
//   stuPage:      1,
//   stuPerPage:   10,
// };

// /* ── Seed Data ──────────────────────────────────────────── */
// const SEED_COURSES = [
//   { name:"Web Development",  category:"Programming", duration:"3 Months", price:"120", desc:"Learn full-stack development with real-world projects using HTML, CSS, JavaScript and Node.js.", skills:"HTML, CSS, JavaScript, Node.js, React", req:"Beginner friendly", pdf:"", pdfName:"" },
//   { name:"UI/UX Design",     category:"Design",      duration:"2 Months", price:"90",  desc:"Master modern UI/UX design tools and principles through hands-on Figma projects.", skills:"Figma, Prototyping, UX Research, Wireframing", req:"No prior experience", pdf:"", pdfName:"" },
//   { name:"Data Science",     category:"Analytics",   duration:"4 Months", price:"150", desc:"Explore data analysis, machine learning fundamentals and visualization with Python.", skills:"Python, Pandas, NumPy, Matplotlib, Scikit-learn", req:"Basic math knowledge", pdf:"", pdfName:"" },
//   { name:"Mobile App Dev",   category:"Mobile",      duration:"3 Months", price:"130", desc:"Build cross-platform mobile applications using React Native from scratch.", skills:"React Native, JavaScript, Expo, REST APIs", req:"Basic JavaScript", pdf:"", pdfName:"" },
// ];

// const SEED_TRAINERS = [
//   { name:"John Smith",  expertise:"Web Development", email:"john@mail.com",  experience:"5 Years", bio:"Full-stack developer with expertise in React and Node.js, having delivered 20+ enterprise projects.", img:"https://imgcdn.stablediffusionweb.com/2026/4/23/9deb5cff-5f01-4980-b39a-dbc8c987bb8d.webp" },
//   { name:"Sara Ahmed",  expertise:"UI/UX Design",    email:"sara@mail.com",  experience:"3 Years", bio:"Passionate UX designer creating intuitive digital experiences for global brands using Figma and design systems.", img:"https://imgcdn.stablediffusionweb.com/2026/4/24/3a04175f-c8cf-4233-b1de-a4ef3d400c3b.webp" },
//   { name:"Emma Watson", expertise:"UI/UX Design",    email:"emma@mail.com",  experience:"3 Years", bio:"Creative designer blending user research with stunning visuals to craft memorable product experiences.", img:"https://imgcdn.stablediffusionweb.com/2024/12/3/80f18dc7-e45d-43fa-81b2-3048e4672cea.jpg" },
//   { name:"Ali Khan",    expertise:"Web Development", email:"ali@mail.com",   experience:"5 Years", bio:"Expert backend developer specializing in scalable APIs, cloud infrastructure and modern JavaScript frameworks.", img:"https://imgcdn.stablediffusionweb.com/2026/4/22/6df4ca79-3417-4ae3-87cb-0419a2bee89b.webp" },
//   { name:"David Lee",   expertise:"Data Science",    email:"david@mail.com", experience:"4 Years", bio:"Data scientist with deep expertise in machine learning, Python, and turning raw data into business insights.", img:"https://imgcdn.stablediffusionweb.com/2026/4/19/7fe86777-e438-4146-9f86-6d411dec69bd.webp" },
// ];

// const SEED_STUDENTS = [
//   [1,"Rahim Uddin","rahim@gmail.com","Web Development","John Smith","Active"],
//   [2,"Karim Ahmed","karim@gmail.com","UI/UX Design","Sara Ahmed","Active"],
//   [3,"Nusrat Jahan","nusrat@gmail.com","Data Science","David Lee","Completed"],
//   [4,"Ayesha Khan","ayesha@gmail.com","Mobile App Dev","Emma Watson","Active"],
//   [5,"Tanvir Hossain","tanvir@gmail.com","Web Development","John Smith","Pending"],
//   [6,"Sadia Islam","sadia@gmail.com","UI/UX Design","Sara Ahmed","Active"],
//   [7,"Farhan Alam","farhan@gmail.com","Data Science","David Lee","Dropped"],
//   [8,"Mitu Begum","mitu@gmail.com","Mobile App Dev","Emma Watson","Active"],
//   [9,"Rashed Kabir","rashed@gmail.com","Web Development","Ali Khan","Completed"],
//   [10,"Sharmin Akter","sharmin@gmail.com","Data Science","David Lee","Active"],
//   [11,"Imran Hossain","imran@gmail.com","UI/UX Design","Emma Watson","Active"],
//   [12,"Nasrin Sultana","nasrin@gmail.com","Web Development","John Smith","Active"],
//   [13,"Zahid Hassan","zahid@gmail.com","Mobile App Dev","Ali Khan","Pending"],
//   [14,"Fatema Khatun","fatema@gmail.com","Data Science","David Lee","Active"],
//   [15,"Asif Rahman","asif@gmail.com","Web Development","John Smith","Completed"],
//   [16,"Poly Akter","poly@gmail.com","UI/UX Design","Sara Ahmed","Active"],
//   [17,"Milon Sarkar","milon@gmail.com","Mobile App Dev","Emma Watson","Active"],
// ];

// const COURSE_IMGS = [
//   "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
//   "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
//   "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&q=80",
//   "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
// ];

// const AVATAR_COLORS = ["#16a34a","#6366f1","#f59e0b","#ef4444","#0891b2","#7c3aed","#db2777"];
// const STATUS_TAGS = { Active:"tag-green", Completed:"tag-blue", Pending:"tag-amber", Dropped:"tag-red" };

// /* ═══════════════════════════════════════════════════════════
//    INIT
// ═══════════════════════════════════════════════════════════ */
// document.addEventListener("DOMContentLoaded", () => {
//   STATE.courses  = SEED_COURSES.map(c => ({...c}));
//   STATE.trainers = SEED_TRAINERS.map(t => ({...t}));
//   STATE.students = SEED_STUDENTS.map(s => [...s]);

//   renderCourses();
//   renderTrainers();
//   renderStudents();
//   updateDashboard();
//   updateBadges();
// });

// /* ═══════════════════════════════════════════════════════════
//    NAVIGATION
// ═══════════════════════════════════════════════════════════ */
// function navigate(page) {
//   document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
//   document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
//   document.getElementById("page-" + page).classList.add("active");
//   document.querySelector(`.nav-link[data-page="${page}"]`)?.classList.add("active");
//   window.scrollTo(0, 0);
// }

// /* ═══════════════════════════════════════════════════════════
//    BADGES & DASHBOARD
// ═══════════════════════════════════════════════════════════ */
// function updateBadges() {
//   document.getElementById("badge-courses").textContent  = STATE.courses.length;
//   document.getElementById("badge-trainers").textContent = STATE.trainers.length;
//   document.getElementById("badge-students").textContent = STATE.students.length;
// }

// function updateDashboard() {
//   document.getElementById("dash-courses").textContent  = STATE.courses.length;
//   document.getElementById("dash-trainers").textContent = STATE.trainers.length;
//   document.getElementById("dash-students").textContent = STATE.students.length;

//   const list = document.getElementById("dash-course-list");
//   if (!STATE.courses.length) { list.innerHTML = '<p class="empty-small">No courses yet</p>'; return; }
//   list.innerHTML = STATE.courses.slice(0, 5).map(c => `
//     <div class="dash-course-item">
//       <div>
//         <div class="dci-name">${c.name}</div>
//         <div class="dci-cat">${c.category} · ${c.duration}</div>
//       </div>
//       <div class="dci-price">$${c.price}</div>
//     </div>`).join("");
// }

// /* ═══════════════════════════════════════════════════════════
//    TOAST
// ═══════════════════════════════════════════════════════════ */
// function toast(msg, type = "success") {
//   const icon = type === "success" ? "bi-check-circle-fill" : type === "error" ? "bi-x-circle-fill" : "bi-exclamation-triangle-fill";
//   const el = document.createElement("div");
//   el.className = `toast ${type}`;
//   el.innerHTML = `<i class="bi ${icon}"></i><span>${msg}</span>`;
//   document.getElementById("toastWrap").appendChild(el);
//   setTimeout(() => { el.style.animation = "slideOut 0.3s ease forwards"; setTimeout(() => el.remove(), 300); }, 3000);
// }

// /* ═══════════════════════════════════════════════════════════
//    COURSES
// ═══════════════════════════════════════════════════════════ */
// function renderCourses(list = STATE.courses) {
//   const grid  = document.getElementById("coursesGrid");
//   const empty = document.getElementById("coursesEmpty");
//   document.getElementById("courses-sub").textContent = `${STATE.courses.length} courses in catalog`;

//   if (!list.length) { grid.innerHTML = ""; empty.style.display = "flex"; return; }
//   empty.style.display = "none";

//   grid.innerHTML = list.map((c, i) => {
//     const realIdx = STATE.courses.indexOf(c);
//     const img = COURSE_IMGS[i % COURSE_IMGS.length];
//     const pdf = c.pdf
//       ? `<a href="${c.pdf}" download="${c.pdfName}" class="pdf-link"><i class="bi bi-file-earmark-pdf-fill"></i>${c.pdfName}</a>`
//       : `<span style="font-size:12px;color:var(--muted)">No PDF</span>`;
//     return `
//     <div class="course-card" style="animation-delay:${i*0.05}s">
//       <img src="${img}" class="course-img" alt="${c.name}" loading="lazy"/>
//       <div class="course-body">
//         <div class="course-top">
//           <div class="course-title">${c.name}</div>
//           <div class="course-price">$${c.price}</div>
//         </div>
//         <div class="course-desc">${c.desc}</div>
//         <div class="course-meta">
//           <span class="tag tag-green">${c.category}</span>
//           <span class="tag tag-slate"><i class="bi bi-clock"></i> ${c.duration}</span>
//         </div>
//         <div class="course-footer">
//           <button class="icon-btn toggle" onclick="toggleCourseDetails(${realIdx}, this)" title="Details"><i class="bi bi-info-circle"></i> Details</button>
//           <div style="display:flex;gap:4px">
//             <button class="icon-btn edit" onclick="openCourseModal(${realIdx})" title="Edit"><i class="bi bi-pencil-square"></i></button>
//             <button class="icon-btn del"  onclick="deleteCourse(${realIdx})" title="Delete"><i class="bi bi-trash"></i></button>
//           </div>
//         </div>
//         <div id="cd-${realIdx}" class="course-details">
//           <div><strong>Skills:</strong> ${c.skills}</div>
//           <div><strong>Requirements:</strong> ${c.req}</div>
//           <div style="margin-top:8px">${pdf}</div>
//         </div>
//       </div>
//     </div>`;
//   }).join("");
// }

// function toggleCourseDetails(idx, btn) {
//   const el = document.getElementById("cd-" + idx);
//   const open = el.style.display === "block";
//   el.style.display = open ? "none" : "block";
//   btn.innerHTML = open ? '<i class="bi bi-info-circle"></i> Details' : '<i class="bi bi-chevron-up"></i> Hide';
// }

// function filterCourses() {
//   const q = document.getElementById("courseSearch").value.toLowerCase().trim();
//   renderCourses(q ? STATE.courses.filter(c => (c.name + c.category + c.desc).toLowerCase().includes(q)) : STATE.courses);
// }

// /* Course Modal */
// function openCourseModal(idx = null) {
//   STATE.courseEditIdx = idx;
//   STATE.pdfData = ""; STATE.pdfFileName = "";
//   const isEdit = idx !== null;
//   document.getElementById("courseMTitle").textContent = isEdit ? "Edit Course" : "Add Course";

//   if (isEdit) {
//     const c = STATE.courses[idx];
//     setVal({ "c-name": c.name, "c-cat": c.category, "c-dur": c.duration, "c-price": c.price, "c-desc": c.desc, "c-skills": c.skills, "c-req": c.req });
//     const prev = document.getElementById("c-pdf-prev");
//     if (c.pdfName) { prev.innerHTML = `<i class="bi bi-file-earmark-pdf-fill" style="color:#dc2626"></i> ${c.pdfName} <small>(upload new to replace)</small>`; prev.style.display = "block"; }
//     else { prev.style.display = "none"; }
//   } else {
//     clearVals(["c-name","c-cat","c-dur","c-price","c-desc","c-skills","c-req","c-pdf"]);
//     document.getElementById("c-pdf-prev").style.display = "none";
//   }
//   document.getElementById("c-ai-st").innerHTML = "";
//   openOverlay("courseOverlay");
// }

// function closeCourseModal() { closeOverlay("courseOverlay"); }

// function handlePDF(e) {
//   const file = e.target.files[0];
//   if (!file) return;
//   if (file.type !== "application/pdf") { toast("Please upload a valid PDF.", "error"); e.target.value = ""; return; }
//   STATE.pdfFileName = file.name;
//   const reader = new FileReader();
//   reader.onload = () => {
//     STATE.pdfData = reader.result;
//     const prev = document.getElementById("c-pdf-prev");
//     prev.innerHTML = `<i class="bi bi-file-earmark-pdf-fill" style="color:#dc2626"></i> <strong>${STATE.pdfFileName}</strong>`;
//     prev.style.display = "block";
//   };
//   reader.readAsDataURL(file);
// }

// function saveCourse() {
//   const name = getVal("c-name").trim();
//   if (!name) { toast("Course name is required.", "error"); return; }
//   const course = {
//     name,
//     category: getVal("c-cat"),
//     duration: getVal("c-dur"),
//     price:    getVal("c-price"),
//     desc:     getVal("c-desc"),
//     skills:   getVal("c-skills"),
//     req:      getVal("c-req"),
//     pdf:      STATE.pdfData || (STATE.courseEditIdx !== null ? STATE.courses[STATE.courseEditIdx].pdf : ""),
//     pdfName:  STATE.pdfData ? STATE.pdfFileName : (STATE.courseEditIdx !== null ? STATE.courses[STATE.courseEditIdx].pdfName : ""),
//   };

//   if (STATE.courseEditIdx !== null) {
//     STATE.courses[STATE.courseEditIdx] = course;
//     toast("Course updated successfully.");
//   } else {
//     STATE.courses.push(course);
//     toast("Course added successfully.");
//   }

//   renderCourses(); updateDashboard(); updateBadges();
//   closeCourseModal();
// }

// function deleteCourse(idx) {
//   if (!confirm(`Delete "${STATE.courses[idx].name}"?`)) return;
//   STATE.courses.splice(idx, 1);
//   renderCourses(); updateDashboard(); updateBadges();
//   toast("Course deleted.", "warning");
// }

// async function generateCourseAI() {
//   const name     = getVal("c-name").trim();
//   const category = getVal("c-cat").trim();
//   const st       = document.getElementById("c-ai-st");
//   st.innerHTML   = '<span class="spinner"></span> AI generating…';

//   try {
//     const res = await callAI(`Generate content for an online course:
// Course Name: ${name || "General Course"}
// Category: ${category || "Education"}

// Return ONLY valid JSON (no markdown) with these exact keys:
// {"description":"2-sentence course description under 180 chars","skills":"5-6 comma-separated skills","requirements":"1-sentence prerequisite"}`);

//     const parsed = JSON.parse(res.replace(/```json|```/g, "").trim());
//     setVal({ "c-desc": parsed.description || "", "c-skills": parsed.skills || "", "c-req": parsed.requirements || "" });
//     st.innerHTML = '<i class="bi bi-check-circle-fill" style="color:var(--green)"></i> Content generated!';
//   } catch {
//     setVal({ "c-desc":"This course provides practical skills with hands-on projects and industry-standard tools.", "c-skills":"Problem Solving, Critical Thinking, Industry Tools", "c-req":"Basic computer literacy required." });
//     st.innerHTML = '<i class="bi bi-check-circle-fill" style="color:var(--green)"></i> Content ready!';
//   }
//   setTimeout(() => { st.innerHTML = ""; }, 3500);
// }

// /* ═══════════════════════════════════════════════════════════
//    TRAINERS
// ═══════════════════════════════════════════════════════════ */
// function renderTrainers(list = STATE.trainers) {
//   const grid  = document.getElementById("trainersGrid");
//   const empty = document.getElementById("trainersEmpty");
//   document.getElementById("trainers-sub").textContent = `${STATE.trainers.length} instructors on team`;

//   if (!list.length) { grid.innerHTML = ""; empty.style.display = "flex"; return; }
//   empty.style.display = "none";

//   grid.innerHTML = list.map((t, i) => {
//     const realIdx = STATE.trainers.indexOf(t);
//     const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=dcfce7&color=16a34a&size=200`;
//     return `
//     <div class="trainer-card" style="animation-delay:${i*0.06}s">
//       <div class="trainer-img-wrap">
//         <img src="${t.img || fallback}" class="trainer-img" alt="${t.name}" loading="lazy" onerror="this.src='${fallback}'"/>
//         <div class="trainer-overlay"></div>
//       </div>
//       <div class="trainer-body">
//         <div class="trainer-name">${t.name}</div>
//         <div class="trainer-expertise">${t.expertise}</div>
//         <div class="trainer-meta">
//           <div class="trainer-meta-row"><i class="bi bi-envelope"></i>${t.email}</div>
//           <div class="trainer-meta-row"><i class="bi bi-briefcase"></i>${t.experience} Experience</div>
//         </div>
//         <div class="trainer-footer">
//           <div style="display:flex;gap:6px;align-items:center">
//             <span class="tag tag-green">${t.expertise.split(" ")[0]}</span>
//             ${t.bio ? `<button class="icon-btn toggle" onclick="toggleBio(${realIdx},this)" title="Bio"><i class="bi bi-person-lines-fill"></i></button>` : ""}
//           </div>
//           <div style="display:flex;gap:4px">
//             <button class="icon-btn edit" onclick="openTrainerModal(${realIdx})" title="Edit"><i class="bi bi-pencil-square"></i></button>
//             <button class="icon-btn del"  onclick="deleteTrainer(${realIdx})" title="Delete"><i class="bi bi-trash"></i></button>
//           </div>
//         </div>
//         ${t.bio ? `<div class="trainer-bio" id="tb-${realIdx}">${t.bio}</div>` : ""}
//       </div>
//     </div>`;
//   }).join("");
// }

// function toggleBio(idx, btn) {
//   const el = document.getElementById("tb-" + idx);
//   if (!el) return;
//   const open = el.style.display === "block";
//   el.style.display = open ? "none" : "block";
//   btn.title = open ? "Bio" : "Hide Bio";
// }

// function filterTrainers() {
//   const q = document.getElementById("trainerSearch").value.toLowerCase().trim();
//   renderTrainers(q ? STATE.trainers.filter(t => (t.name + t.expertise + t.bio).toLowerCase().includes(q)) : STATE.trainers);
// }

// function openTrainerModal(idx = null) {
//   STATE.trainerEditIdx = idx;
//   const isEdit = idx !== null;
//   document.getElementById("trainerMTitle").textContent = isEdit ? "Edit Trainer" : "Add Trainer";

//   if (isEdit) {
//     const t = STATE.trainers[idx];
//     setVal({ "t-name": t.name, "t-exp": t.expertise, "t-email": t.email, "t-experience": t.experience, "t-bio": t.bio || "", "t-img": t.img || "" });
//     previewTImg();
//   } else {
//     clearVals(["t-name","t-exp","t-email","t-experience","t-bio","t-img"]);
//     document.getElementById("t-img-prev").style.display = "none";
//   }
//   document.getElementById("t-ai-st").innerHTML = "";
//   openOverlay("trainerOverlay");
// }

// function closeTrainerModal() { closeOverlay("trainerOverlay"); }

// function previewTImg() {
//   const url  = getVal("t-img").trim();
//   const prev = document.getElementById("t-img-prev");
//   if (url) { prev.src = url; prev.style.display = "block"; }
//   else { prev.style.display = "none"; }
// }

// function saveTrainer() {
//   const name = getVal("t-name").trim();
//   if (!name) { toast("Trainer name is required.", "error"); return; }
//   const trainer = { name, expertise: getVal("t-exp"), email: getVal("t-email"), experience: getVal("t-experience"), bio: getVal("t-bio"), img: getVal("t-img") };
//   if (STATE.trainerEditIdx !== null) { STATE.trainers[STATE.trainerEditIdx] = trainer; toast("Trainer updated."); }
//   else { STATE.trainers.push(trainer); toast("Trainer added."); }
//   renderTrainers(); updateBadges();
//   closeTrainerModal();
// }

// function deleteTrainer(idx) {
//   if (!confirm(`Delete trainer "${STATE.trainers[idx].name}"?`)) return;
//   STATE.trainers.splice(idx, 1);
//   renderTrainers(); updateBadges();
//   toast("Trainer deleted.", "warning");
// }

// async function generateTrainerBio() {
//   const name = getVal("t-name").trim();
//   const exp  = getVal("t-exp").trim();
//   const yrs  = getVal("t-experience").trim();
//   const st   = document.getElementById("t-ai-st");
//   st.innerHTML = '<span class="spinner"></span> Writing bio…';

//   try {
//     const text = await callAI(`Write a 2-sentence professional bio for an online course instructor:
// Name: ${name || "Trainer"}
// Expertise: ${exp || "Technology"}
// Experience: ${yrs || "Several years"}
// Return ONLY the bio text, no quotes, no preamble.`);
//     document.getElementById("t-bio").value = text.trim();
//     st.innerHTML = '<i class="bi bi-check-circle-fill" style="color:var(--green)"></i> Bio generated!';
//   } catch {
//     document.getElementById("t-bio").value = `${name || "This trainer"} brings extensive experience in ${exp || "their field"} with a passion for mentoring and practical, project-based teaching.`;
//     st.innerHTML = '<i class="bi bi-check-circle-fill" style="color:var(--green)"></i> Bio ready!';
//   }
//   setTimeout(() => { st.innerHTML = ""; }, 3500);
// }

// /* ═══════════════════════════════════════════════════════════
//    STUDENTS
// ═══════════════════════════════════════════════════════════ */
// function renderStudents() {
//   const q = document.getElementById("studentSearch").value.toLowerCase().trim();
//   const filtered = q ? STATE.students.filter(s => s.slice(1).join(" ").toLowerCase().includes(q)) : STATE.students;

//   // Mini stats
//   document.getElementById("st-total").textContent     = STATE.students.length;
//   document.getElementById("st-active").textContent    = STATE.students.filter(s => s[5] === "Active").length;
//   document.getElementById("st-completed").textContent = STATE.students.filter(s => s[5] === "Completed").length;
//   document.getElementById("st-dropped").textContent   = STATE.students.filter(s => s[5] === "Dropped").length;
//   document.getElementById("students-sub").textContent = `${STATE.students.length} enrolled students`;

//   // Pagination
//   const total   = filtered.length;
//   const pages   = Math.ceil(total / STATE.stuPerPage);
//   if (STATE.stuPage > pages) STATE.stuPage = 1;
//   const start   = (STATE.stuPage - 1) * STATE.stuPerPage;
//   const slice   = filtered.slice(start, start + STATE.stuPerPage);

//   document.getElementById("stu-page-info").textContent = `Showing ${start + 1}–${Math.min(start + STATE.stuPerPage, total)} of ${total} entries`;

//   const tbody = document.getElementById("studentsBody");
//   tbody.innerHTML = slice.map(s => {
//     const initials = s[1].split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
//     const color    = AVATAR_COLORS[s[0] % AVATAR_COLORS.length];
//     const tagClass = STATUS_TAGS[s[5]] || "tag-slate";
//     return `
//     <tr>
//       <td style="font-family:var(--mono);font-size:12px;color:var(--muted)">${String(s[0]).padStart(2,"0")}</td>
//       <td><div class="student-cell"><div class="stu-avatar" style="background:${color}">${initials}</div><span class="stu-name">${s[1]}</span></div></td>
//       <td style="color:var(--muted)">${s[2]}</td>
//       <td>${s[3]}</td>
//       <td style="color:var(--muted)">${s[4]}</td>
//       <td><span class="tag ${tagClass}">${s[5]}</span></td>
//       <td>
//         <button class="icon-btn edit" onclick="openStudentModal('${s[0]}')" title="Edit"><i class="bi bi-pencil-square"></i></button>
//         <button class="icon-btn ai"   onclick="quickStudentAI('${s[1]}','${s[3]}','${s[5]}')" title="AI Tip"><i class="bi bi-stars"></i></button>
//         <button class="icon-btn del"  onclick="deleteStudentById(${s[0]})" title="Delete"><i class="bi bi-trash"></i></button>
//       </td>
//     </tr>`;
//   }).join("");

//   // Pagination buttons
//   const pg = document.getElementById("stu-pagination");
//   pg.innerHTML = "";
//   const addBtn = (label, page, disabled = false, active = false) => {
//     const b = document.createElement("button");
//     b.className = "page-btn" + (active ? " active" : "");
//     b.textContent = label;
//     b.disabled = disabled;
//     b.onclick = () => { STATE.stuPage = page; renderStudents(); };
//     pg.appendChild(b);
//   };
//   addBtn("‹", STATE.stuPage - 1, STATE.stuPage === 1);
//   for (let p = 1; p <= pages; p++) addBtn(p, p, false, p === STATE.stuPage);
//   addBtn("›", STATE.stuPage + 1, STATE.stuPage === pages);

//   updateBadges();
// }

// function filterStudents() { STATE.stuPage = 1; renderStudents(); }

// function openStudentModal(id = null) {
//   const isEdit = id !== null;
//   document.getElementById("studentMTitle").textContent = isEdit ? "Edit Student" : "Add Student";

//   if (isEdit) {
//     const s = STATE.students.find(r => r[0] == id);
//     if (!s) return;
//     STATE.studentEditRow = s;
//     setVal({ "s-name": s[1], "s-email": s[2], "s-course": s[3], "s-trainer": s[4] });
//     document.getElementById("s-status").value = s[5];
//   } else {
//     STATE.studentEditRow = null;
//     clearVals(["s-name","s-email","s-course","s-trainer"]);
//     document.getElementById("s-status").value = "Active";
//   }
//   openOverlay("studentOverlay");
// }

// function closeStudentModal() { closeOverlay("studentOverlay"); }

// function saveStudent() {
//   const name = getVal("s-name").trim();
//   if (!name) { toast("Student name is required.", "error"); return; }
//   const data = [null, name, getVal("s-email"), getVal("s-course"), getVal("s-trainer"), document.getElementById("s-status").value];

//   if (STATE.studentEditRow) {
//     const idx = STATE.students.indexOf(STATE.studentEditRow);
//     data[0] = STATE.studentEditRow[0];
//     STATE.students[idx] = data;
//     toast("Student updated.");
//   } else {
//     const newId = STATE.students.length ? Math.max(...STATE.students.map(s => s[0])) + 1 : 1;
//     data[0] = newId;
//     STATE.students.push(data);
//     toast("Student added.");
//   }
//   renderStudents();
//   closeStudentModal();
// }

// function deleteStudentById(id) {
//   const s = STATE.students.find(r => r[0] === id);
//   if (!s || !confirm(`Remove student "${s[1]}"?`)) return;
//   STATE.students.splice(STATE.students.indexOf(s), 1);
//   renderStudents();
//   toast("Student removed.", "warning");
// }

// async function quickStudentAI(name, course, status) {
//   try {
//     const text = await callAI(`Give a 1-sentence encouraging, personalized learning tip for a student named ${name} enrolled in ${course} with enrollment status: ${status}. Return only the tip text, no preamble.`);
//     alert(`💡 AI Tip for ${name}:\n\n${text}`);
//   } catch {
//     alert(`💡 AI Tip for ${name}:\n\nConsistent daily practice and engaging with course projects will accelerate your progress in ${course} significantly!`);
//   }
// }

// function openStudentAI() { openOverlay("stuAiOverlay"); }
// function closeStudentAI() { closeOverlay("stuAiOverlay"); }

// async function runStudentAI() {
//   const el = document.getElementById("stuAiResult");
//   el.innerHTML = '<span class="spinner"></span> Analyzing cohort data…';
//   const active    = STATE.students.filter(s => s[5] === "Active").length;
//   const completed = STATE.students.filter(s => s[5] === "Completed").length;
//   const dropped   = STATE.students.filter(s => s[5] === "Dropped").length;
//   const pending   = STATE.students.filter(s => s[5] === "Pending").length;

//   try {
//     const text = await callAI(`Analyze this student cohort data for an online education platform and give 4 actionable recommendations:
// - Total students: ${STATE.students.length}
// - Active: ${active}, Completed: ${completed}, Dropped: ${dropped}, Pending: ${pending}
// - Dropout rate: ${Math.round(dropped / STATE.students.length * 100)}%
// - Most enrolled course: Web Development
// Be concise (3-4 sentences), data-driven, and practical.`);
//     el.textContent = text;
//   } catch {
//     el.textContent = `With ${STATE.students.length} students and a ${Math.round(dropped / STATE.students.length * 100)}% dropout rate, focused intervention on at-risk students could improve retention. Recommendation: Send weekly check-ins to the ${pending} pending students to convert them to active. Implement completion certificates to incentivize the ${active} active students to reach completion status. Consider adding advanced modules to popular courses to reduce dropout after initial content is finished.`;
//   }
// }

// /* ═══════════════════════════════════════════════════════════
//    AI ASSISTANT CHAT
// ═══════════════════════════════════════════════════════════ */
// function openAIAssistant() { openOverlay("aiOverlay"); }
// function closeAIModal()    { closeOverlay("aiOverlay"); }

// async function sendAI(preset = null) {
//   const input = document.getElementById("aiInput");
//   const msg   = preset || input.value.trim();
//   if (!msg) return;
//   input.value = "";

//   const area = document.getElementById("chatArea");

//   // Clear welcome on first message
//   const welcome = area.querySelector(".chat-welcome");
//   if (welcome) welcome.remove();

//   // User bubble
//   appendBubble(area, "user", msg);

//   // Thinking bubble
//   const thinking = appendBubble(area, "ai", '<span class="spinner"></span> Thinking…');
//   area.scrollTop = area.scrollHeight;

//   const context = `You are the AI assistant for EduCore, an online learning management platform. Current stats: ${STATE.courses.length} courses, ${STATE.trainers.length} trainers, ${STATE.students.length} students. Top course: Web Development. Be helpful, concise, and professional.`;

//   try {
//     const text = await callAI(msg, context);
//     thinking.innerHTML = text;
//   } catch {
//     thinking.innerHTML = "I couldn't connect to the AI service right now. Please check your API configuration in server.js.";
//   }
//   area.scrollTop = area.scrollHeight;
// }

// function appendBubble(area, role, html) {
//   const b = document.createElement("div");
//   b.className = `chat-bubble ${role}`;
//   b.innerHTML = html;
//   area.appendChild(b);
//   return b;
// }

// async function getDashboardBriefing() {
//   const el = document.getElementById("dashAiText");
//   el.innerHTML = '<span class="spinner"></span> Generating briefing…';

//   try {
//     const text = await callAI(`Give a 2-3 sentence daily admin briefing for EduCore platform with these stats:
// ${STATE.courses.length} courses, ${STATE.trainers.length} trainers, ${STATE.students.length} students, 12 active enrollments, top course: Web Development.
// Include one key recommendation. Be direct and professional.`);
//     el.innerHTML = text;
//   } catch {
//     el.innerHTML = `EduCore is running strong with <strong>${STATE.courses.length} courses</strong>, <strong>${STATE.trainers.length} trainers</strong>, and <strong>${STATE.students.length} enrolled students</strong>. Web Development continues to lead enrollment. <strong>Recommendation:</strong> Add an Advanced React course to capitalize on programming demand — it could attract 20+ new enrollments.`;
//   }
// }

// /* ═══════════════════════════════════════════════════════════
//    AI API HELPER
// ═══════════════════════════════════════════════════════════ */
// async function callAI(userPrompt, systemPrompt = "") {
//   // First try backend proxy (server.js)
//   try {
//     const res = await fetch("/api/ai", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ prompt: userPrompt, system: systemPrompt }),
//     });
//     if (res.ok) {
//       const data = await res.json();
//       return data.text;
//     }
//   } catch { /* fall through to direct */ }

//   // Fallback: direct Anthropic API (browser)
//   const messages = [{ role: "user", content: userPrompt }];
//   const body = { model: "claude-sonnet-4-20250514", max_tokens: 1000, messages };
//   if (systemPrompt) body.system = systemPrompt;

//   const res = await fetch("https://api.anthropic.com/v1/messages", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   });
//   const data = await res.json();
//   return data.content.map(b => b.text || "").join("");
// }

// /* ═══════════════════════════════════════════════════════════
//    OVERLAY HELPERS
// ═══════════════════════════════════════════════════════════ */
// function openOverlay(id) {
//   const el = document.getElementById(id);
//   el.classList.add("open");
//   document.body.style.overflow = "hidden";
// }

// function closeOverlay(id) {
//   const el = document.getElementById(id);
//   el.classList.remove("open");
//   document.body.style.overflow = "";
// }

// // Close overlay on backdrop click
// document.querySelectorAll(".overlay").forEach(overlay => {
//   overlay.addEventListener("click", e => {
//     if (e.target === overlay) overlay.classList.remove("open");
//     document.body.style.overflow = "";
//   });
// });

// // Close on Escape
// document.addEventListener("keydown", e => {
//   if (e.key === "Escape") {
//     document.querySelectorAll(".overlay.open").forEach(o => {
//       o.classList.remove("open");
//       document.body.style.overflow = "";
//     });
//   }
// });

// /* ═══════════════════════════════════════════════════════════
//    DOM UTILS
// ═══════════════════════════════════════════════════════════ */
// function getVal(id) { return document.getElementById(id)?.value || ""; }
// function setVal(map) { Object.entries(map).forEach(([id, val]) => { const el = document.getElementById(id); if (el) el.value = val; }); }
// function clearVals(ids) { ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = ""; }); }

//================================================================
/* ============================================================
   EduCore Admin — app.js
   All frontend logic: navigation, CRUD, AI, modals, toasts
   ============================================================ */

"use strict";

/* ── State ──────────────────────────────────────────────── */
const STATE = {
  courses:  [],
  trainers: [],
  students: [],
  courseEditIdx:  null,
  trainerEditIdx: null,
  studentEditRow: null,
  pdfData:      "",
  pdfFileName:  "",
  stuPage:      1,
  stuPerPage:   10,
};

/* ── Seed Data ──────────────────────────────────────────── */
const SEED_COURSES = [
  { name:"Web Development",  category:"Programming", duration:"3 Months", price:"120", desc:"Learn full-stack development with real-world projects using HTML, CSS, JavaScript and Node.js.", skills:"HTML, CSS, JavaScript, Node.js, React", req:"Beginner friendly", pdf:"", pdfName:"" },
  { name:"UI/UX Design",     category:"Design",      duration:"2 Months", price:"90",  desc:"Master modern UI/UX design tools and principles through hands-on Figma projects.", skills:"Figma, Prototyping, UX Research, Wireframing", req:"No prior experience", pdf:"", pdfName:"" },
  { name:"Data Science",     category:"Analytics",   duration:"4 Months", price:"150", desc:"Explore data analysis, machine learning fundamentals and visualization with Python.", skills:"Python, Pandas, NumPy, Matplotlib, Scikit-learn", req:"Basic math knowledge", pdf:"", pdfName:"" },
  { name:"Mobile App Dev",   category:"Mobile",      duration:"3 Months", price:"130", desc:"Build cross-platform mobile applications using React Native from scratch.", skills:"React Native, JavaScript, Expo, REST APIs", req:"Basic JavaScript", pdf:"", pdfName:"" },
];

const SEED_TRAINERS = [
  { name:"John Smith",  expertise:"Web Development", email:"john@mail.com",  experience:"5 Years", bio:"Full-stack developer with expertise in React and Node.js, having delivered 20+ enterprise projects.", img:"https://imgcdn.stablediffusionweb.com/2026/4/23/9deb5cff-5f01-4980-b39a-dbc8c987bb8d.webp" },
  { name:"Sara Ahmed",  expertise:"UI/UX Design",    email:"sara@mail.com",  experience:"3 Years", bio:"Passionate UX designer creating intuitive digital experiences for global brands using Figma and design systems.", img:"https://imgcdn.stablediffusionweb.com/2026/4/24/3a04175f-c8cf-4233-b1de-a4ef3d400c3b.webp" },
  { name:"Emma Watson", expertise:"UI/UX Design",    email:"emma@mail.com",  experience:"3 Years", bio:"Creative designer blending user research with stunning visuals to craft memorable product experiences.", img:"https://imgcdn.stablediffusionweb.com/2024/12/3/80f18dc7-e45d-43fa-81b2-3048e4672cea.jpg" },
  { name:"Ali Khan",    expertise:"Web Development", email:"ali@mail.com",   experience:"5 Years", bio:"Expert backend developer specializing in scalable APIs, cloud infrastructure and modern JavaScript frameworks.", img:"https://imgcdn.stablediffusionweb.com/2026/4/22/6df4ca79-3417-4ae3-87cb-0419a2bee89b.webp" },
  { name:"David Lee",   expertise:"Data Science",    email:"david@mail.com", experience:"4 Years", bio:"Data scientist with deep expertise in machine learning, Python, and turning raw data into business insights.", img:"https://imgcdn.stablediffusionweb.com/2026/4/19/7fe86777-e438-4146-9f86-6d411dec69bd.webp" },
];

const SEED_STUDENTS = [
  [1,"Rahim Uddin","rahim@gmail.com","Web Development","John Smith","Active"],
  [2,"Karim Ahmed","karim@gmail.com","UI/UX Design","Sara Ahmed","Active"],
  [3,"Nusrat Jahan","nusrat@gmail.com","Data Science","David Lee","Completed"],
  [4,"Ayesha Khan","ayesha@gmail.com","Mobile App Dev","Emma Watson","Active"],
  [5,"Tanvir Hossain","tanvir@gmail.com","Web Development","John Smith","Pending"],
  [6,"Sadia Islam","sadia@gmail.com","UI/UX Design","Sara Ahmed","Active"],
  [7,"Farhan Alam","farhan@gmail.com","Data Science","David Lee","Dropped"],
  [8,"Mitu Begum","mitu@gmail.com","Mobile App Dev","Emma Watson","Active"],
  [9,"Rashed Kabir","rashed@gmail.com","Web Development","Ali Khan","Completed"],
  [10,"Sharmin Akter","sharmin@gmail.com","Data Science","David Lee","Active"],
  [11,"Imran Hossain","imran@gmail.com","UI/UX Design","Emma Watson","Active"],
  [12,"Nasrin Sultana","nasrin@gmail.com","Web Development","John Smith","Active"],
  [13,"Zahid Hassan","zahid@gmail.com","Mobile App Dev","Ali Khan","Pending"],
  [14,"Fatema Khatun","fatema@gmail.com","Data Science","David Lee","Active"],
  [15,"Asif Rahman","asif@gmail.com","Web Development","John Smith","Completed"],
  [16,"Poly Akter","poly@gmail.com","UI/UX Design","Sara Ahmed","Active"],
  [17,"Milon Sarkar","milon@gmail.com","Mobile App Dev","Emma Watson","Active"],
];

const COURSE_IMGS = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
];

const AVATAR_COLORS = ["#16a34a","#6366f1","#f59e0b","#ef4444","#0891b2","#7c3aed","#db2777"];
const STATUS_TAGS = { Active:"tag-green", Completed:"tag-blue", Pending:"tag-amber", Dropped:"tag-red" };

/* ═══════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  STATE.courses  = SEED_COURSES.map(c => ({...c}));
  STATE.trainers = SEED_TRAINERS.map(t => ({...t}));
  STATE.students = SEED_STUDENTS.map(s => [...s]);

  renderCourses();
  renderTrainers();
  renderStudents();
  updateDashboard();
  updateBadges();
});

/* ═══════════════════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════════════════ */
function navigate(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
  document.getElementById("page-" + page).classList.add("active");
  document.querySelector(`.nav-link[data-page="${page}"]`)?.classList.add("active");
  window.scrollTo(0, 0);
}

/* ═══════════════════════════════════════════════════════════
   BADGES & DASHBOARD
═══════════════════════════════════════════════════════════ */
function updateBadges() {
  document.getElementById("badge-courses").textContent  = STATE.courses.length;
  document.getElementById("badge-trainers").textContent = STATE.trainers.length;
  document.getElementById("badge-students").textContent = STATE.students.length;
}

function updateDashboard() {
  document.getElementById("dash-courses").textContent  = STATE.courses.length;
  document.getElementById("dash-trainers").textContent = STATE.trainers.length;
  document.getElementById("dash-students").textContent = STATE.students.length;

  const list = document.getElementById("dash-course-list");
  if (!STATE.courses.length) { list.innerHTML = '<p class="empty-small">No courses yet</p>'; return; }
  list.innerHTML = STATE.courses.slice(0, 5).map(c => `
    <div class="dash-course-item">
      <div>
        <div class="dci-name">${c.name}</div>
        <div class="dci-cat">${c.category} · ${c.duration}</div>
      </div>
      <div class="dci-price">$${c.price}</div>
    </div>`).join("");
}

/* ═══════════════════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════════════════ */
function toast(msg, type = "success") {
  const icon = type === "success" ? "bi-check-circle-fill" : type === "error" ? "bi-x-circle-fill" : "bi-exclamation-triangle-fill";
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.innerHTML = `<i class="bi ${icon}"></i><span>${msg}</span>`;
  document.getElementById("toastWrap").appendChild(el);
  setTimeout(() => { el.style.animation = "slideOut 0.3s ease forwards"; setTimeout(() => el.remove(), 300); }, 3000);
}

// Simple helper functions for DOM elements (assumed to exist in your UI setup)
function getVal(id) { return document.getElementById(id).value; }
function setVal(obj) { for (const [k, v] of Object.entries(obj)) document.getElementById(k).value = v; }
function clearVals(arr) { arr.forEach(id => document.getElementById(id).value = ""); }

/* ═══════════════════════════════════════════════════════════
   COURSES
═══════════════════════════════════════════════════════════ */
function renderCourses(list = STATE.courses) {
  const grid  = document.getElementById("coursesGrid");
  const empty = document.getElementById("coursesEmpty");
  document.getElementById("courses-sub").textContent = `${STATE.courses.length} courses in catalog`;

  if (!list.length) { grid.innerHTML = ""; empty.style.display = "flex"; return; }
  empty.style.display = "none";

  grid.innerHTML = list.map((c, i) => {
    const realIdx = STATE.courses.indexOf(c);
    const img = COURSE_IMGS[i % COURSE_IMGS.length];
    const pdf = c.pdf
      ? `<a href="${c.pdf}" download="${c.pdfName}" class="pdf-link"><i class="bi bi-file-earmark-pdf-fill"></i>${c.pdfName}</a>`
      : `<span style="font-size:12px;color:var(--muted)">No PDF</span>`;
    return `
    <div class="course-card" style="animation-delay:${i*0.05}s">
      <img src="${img}" class="course-img" alt="${c.name}" loading="lazy"/>
      <div class="course-body">
        <div class="course-top">
          <div class="course-title">${c.name}</div>
          <div class="course-price">$${c.price}</div>
        </div>
        <div class="course-desc">${c.desc}</div>
        <div class="course-meta">
          <span class="tag tag-green">${c.category}</span>
          <span class="tag tag-slate"><i class="bi bi-clock"></i> ${c.duration}</span>
        </div>
        <div class="course-footer">
          <button class="icon-btn toggle" onclick="toggleCourseDetails(${realIdx}, this)" title="Details"><i class="bi bi-info-circle"></i> Details</button>
          <div style="display:flex;gap:4px">
            <button class="icon-btn edit" onclick="openCourseModal(${realIdx})" title="Edit"><i class="bi bi-pencil-square"></i></button>
            <button class="icon-btn del"  onclick="deleteCourse(${realIdx})" title="Delete"><i class="bi bi-trash"></i></button>
          </div>
        </div>
        <div id="cd-${realIdx}" class="course-details">
          <div><strong>Skills:</strong> ${c.skills}</div>
          <div><strong>Requirements:</strong> ${c.req}</div>
          <div style="margin-top:8px">${pdf}</div>
        </div>
      </div>
    </div>`;
  }).join("");
}

function toggleCourseDetails(idx, btn) {
  const el = document.getElementById("cd-" + idx);
  const open = el.style.display === "block";
  el.style.display = open ? "none" : "block";
  btn.innerHTML = open ? '<i class="bi bi-info-circle"></i> Details' : '<i class="bi bi-chevron-up"></i> Hide';
}

function filterCourses() {
  const q = document.getElementById("courseSearch").value.toLowerCase().trim();
  renderCourses(q ? STATE.courses.filter(c => (c.name + c.category + c.desc).toLowerCase().includes(q)) : STATE.courses);
}

/* Course Modal */
function openCourseModal(idx = null) {
  STATE.courseEditIdx = idx;
  STATE.pdfData = ""; STATE.pdfFileName = "";
  const isEdit = idx !== null;
  document.getElementById("courseMTitle").textContent = isEdit ? "Edit Course" : "Add Course";

  if (isEdit) {
    const c = STATE.courses[idx];
    setVal({ "c-name": c.name, "c-cat": c.category, "c-dur": c.duration, "c-price": c.price, "c-desc": c.desc, "c-skills": c.skills, "c-req": c.req });
    const prev = document.getElementById("c-pdf-prev");
    if (c.pdfName) { prev.innerHTML = `<i class="bi bi-file-earmark-pdf-fill" style="color:#dc2626"></i> ${c.pdfName} <small>(upload new to replace)</small>`; prev.style.display = "block"; }
    else { prev.style.display = "none"; }
  } else {
    clearVals(["c-name","c-cat","c-dur","c-price","c-desc","c-skills","c-req","c-pdf"]);
    document.getElementById("c-pdf-prev").style.display = "none";
  }
  document.getElementById("c-ai-st").innerHTML = "";
  openOverlay("courseOverlay");
}

function closeCourseModal() { closeOverlay("courseOverlay"); }

function handlePDF(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.type !== "application/pdf") { toast("Please upload a valid PDF.", "error"); e.target.value = ""; return; }
  STATE.pdfFileName = file.name;
  const reader = new FileReader();
  reader.onload = () => {
    STATE.pdfData = reader.result;
    const prev = document.getElementById("c-pdf-prev");
    prev.innerHTML = `<i class="bi bi-file-earmark-pdf-fill" style="color:#dc2626"></i> <strong>${STATE.pdfFileName}</strong>`;
    prev.style.display = "block";
  };
  reader.readAsDataURL(file);
}

function saveCourse() {
  const name = getVal("c-name").trim();
  if (!name) { toast("Course name is required.", "error"); return; }
  const course = {
    name,
    category: getVal("c-cat"),
    duration: getVal("c-dur"),
    price:    getVal("c-price"),
    desc:     getVal("c-desc"),
    skills:   getVal("c-skills"),
    req:      getVal("c-req"),
    pdf:      STATE.pdfData || (STATE.courseEditIdx !== null ? STATE.courses[STATE.courseEditIdx].pdf : ""),
    pdfName:  STATE.pdfData ? STATE.pdfFileName : (STATE.courseEditIdx !== null ? STATE.courses[STATE.courseEditIdx].pdfName : ""),
  };

  if (STATE.courseEditIdx !== null) {
    STATE.courses[STATE.courseEditIdx] = course;
    toast("Course updated successfully.");
  } else {
    STATE.courses.push(course);
    toast("Course added successfully.");
  }

  renderCourses(); updateDashboard(); updateBadges();
  closeCourseModal();
}

function deleteCourse(idx) {
  if (!confirm(`Delete "${STATE.courses[idx].name}"?`)) return;
  STATE.courses.splice(idx, 1);
  renderCourses(); updateDashboard(); updateBadges();
  toast("Course deleted.", "warning");
}

async function generateCourseAI() {
  const name     = getVal("c-name").trim();
  const category = getVal("c-cat").trim();
  const st       = document.getElementById("c-ai-st");
  st.innerHTML   = '<span class="spinner"></span> AI generating…';

  try {
    const res = await callAI(`Generate content for an online course...`);
    const parsed = JSON.parse(res.replace(/```json|```/g, "").trim());
    setVal({ "c-desc": parsed.description || "", "c-skills": parsed.skills || "", "c-req": parsed.requirements || "" });
    st.innerHTML = '<i class="bi bi-check-circle-fill" style="color:var(--green)"></i> Content generated!';
  } catch {
    // Fallback UI automatically triggers thanks to our mocked callAI
    setVal({ "c-desc":"This course provides practical skills with hands-on projects and industry-standard tools.", "c-skills":"Problem Solving, Critical Thinking, Industry Tools", "c-req":"Basic computer literacy required." });
    st.innerHTML = '<i class="bi bi-check-circle-fill" style="color:var(--green)"></i> Content ready!';
  }
  setTimeout(() => { st.innerHTML = ""; }, 3500);
}

/* ═══════════════════════════════════════════════════════════
   TRAINERS
═══════════════════════════════════════════════════════════ */
function renderTrainers(list = STATE.trainers) {
  const grid  = document.getElementById("trainersGrid");
  const empty = document.getElementById("trainersEmpty");
  document.getElementById("trainers-sub").textContent = `${STATE.trainers.length} instructors on team`;

  if (!list.length) { grid.innerHTML = ""; empty.style.display = "flex"; return; }
  empty.style.display = "none";

  grid.innerHTML = list.map((t, i) => {
    const realIdx = STATE.trainers.indexOf(t);
    const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=dcfce7&color=16a34a&size=200`;
    return `
    <div class="trainer-card" style="animation-delay:${i*0.06}s">
      <div class="trainer-img-wrap">
        <img src="${t.img || fallback}" class="trainer-img" alt="${t.name}" loading="lazy" onerror="this.src='${fallback}'"/>
        <div class="trainer-overlay"></div>
      </div>
      <div class="trainer-body">
        <div class="trainer-name">${t.name}</div>
        <div class="trainer-expertise">${t.expertise}</div>
        <div class="trainer-meta">
          <div class="trainer-meta-row"><i class="bi bi-envelope"></i>${t.email}</div>
          <div class="trainer-meta-row"><i class="bi bi-briefcase"></i>${t.experience} Experience</div>
        </div>
        <div class="trainer-footer">
          <div style="display:flex;gap:6px;align-items:center">
            <span class="tag tag-green">${t.expertise.split(" ")[0]}</span>
            ${t.bio ? `<button class="icon-btn toggle" onclick="toggleBio(${realIdx},this)" title="Bio"><i class="bi bi-person-lines-fill"></i></button>` : ""}
          </div>
          <div style="display:flex;gap:4px">
            <button class="icon-btn edit" onclick="openTrainerModal(${realIdx})" title="Edit"><i class="bi bi-pencil-square"></i></button>
            <button class="icon-btn del"  onclick="deleteTrainer(${realIdx})" title="Delete"><i class="bi bi-trash"></i></button>
          </div>
        </div>
        ${t.bio ? `<div class="trainer-bio" id="tb-${realIdx}">${t.bio}</div>` : ""}
      </div>
    </div>`;
  }).join("");
}

function toggleBio(idx, btn) {
  const el = document.getElementById("tb-" + idx);
  if (!el) return;
  const open = el.style.display === "block";
  el.style.display = open ? "none" : "block";
  btn.title = open ? "Bio" : "Hide Bio";
}

function filterTrainers() {
  const q = document.getElementById("trainerSearch").value.toLowerCase().trim();
  renderTrainers(q ? STATE.trainers.filter(t => (t.name + t.expertise + t.bio).toLowerCase().includes(q)) : STATE.trainers);
}

function openTrainerModal(idx = null) {
  STATE.trainerEditIdx = idx;
  const isEdit = idx !== null;
  document.getElementById("trainerMTitle").textContent = isEdit ? "Edit Trainer" : "Add Trainer";

  if (isEdit) {
    const t = STATE.trainers[idx];
    setVal({ "t-name": t.name, "t-exp": t.expertise, "t-email": t.email, "t-experience": t.experience, "t-bio": t.bio || "", "t-img": t.img || "" });
    previewTImg();
  } else {
    clearVals(["t-name","t-exp","t-email","t-experience","t-bio","t-img"]);
    document.getElementById("t-img-prev").style.display = "none";
  }
  document.getElementById("t-ai-st").innerHTML = "";
  openOverlay("trainerOverlay");
}

function closeTrainerModal() { closeOverlay("trainerOverlay"); }

function previewTImg() {
  const url  = getVal("t-img").trim();
  const prev = document.getElementById("t-img-prev");
  if (url) { prev.src = url; prev.style.display = "block"; }
  else { prev.style.display = "none"; }
}

function saveTrainer() {
  const name = getVal("t-name").trim();
  if (!name) { toast("Trainer name is required.", "error"); return; }
  const trainer = { name, expertise: getVal("t-exp"), email: getVal("t-email"), experience: getVal("t-experience"), bio: getVal("t-bio"), img: getVal("t-img") };
  if (STATE.trainerEditIdx !== null) { STATE.trainers[STATE.trainerEditIdx] = trainer; toast("Trainer updated."); }
  else { STATE.trainers.push(trainer); toast("Trainer added."); }
  renderTrainers(); updateBadges();
  closeTrainerModal();
}

function deleteTrainer(idx) {
  if (!confirm(`Delete trainer "${STATE.trainers[idx].name}"?`)) return;
  STATE.trainers.splice(idx, 1);
  renderTrainers(); updateBadges();
  toast("Trainer deleted.", "warning");
}

async function generateTrainerBio() {
  const name = getVal("t-name").trim();
  const exp  = getVal("t-exp").trim();
  const yrs  = getVal("t-experience").trim();
  const st   = document.getElementById("t-ai-st");
  st.innerHTML = '<span class="spinner"></span> Writing bio…';

  try {
    const text = await callAI(`Write a 2-sentence professional bio...`);
    document.getElementById("t-bio").value = text.trim();
    st.innerHTML = '<i class="bi bi-check-circle-fill" style="color:var(--green)"></i> Bio generated!';
  } catch {
    document.getElementById("t-bio").value = `${name || "This trainer"} brings extensive experience in ${exp || "their field"} with a passion for mentoring and practical, project-based teaching.`;
    st.innerHTML = '<i class="bi bi-check-circle-fill" style="color:var(--green)"></i> Bio ready!';
  }
  setTimeout(() => { st.innerHTML = ""; }, 3500);
}

/* ═══════════════════════════════════════════════════════════
   STUDENTS
═══════════════════════════════════════════════════════════ */
function renderStudents() {
  const q = document.getElementById("studentSearch").value.toLowerCase().trim();
  const filtered = q ? STATE.students.filter(s => s.slice(1).join(" ").toLowerCase().includes(q)) : STATE.students;

  // Mini stats
  document.getElementById("st-total").textContent     = STATE.students.length;
  document.getElementById("st-active").textContent    = STATE.students.filter(s => s[5] === "Active").length;
  document.getElementById("st-completed").textContent = STATE.students.filter(s => s[5] === "Completed").length;
  document.getElementById("st-dropped").textContent   = STATE.students.filter(s => s[5] === "Dropped").length;
  document.getElementById("students-sub").textContent = `${STATE.students.length} enrolled students`;

  // Pagination
  const total   = filtered.length;
  const pages   = Math.ceil(total / STATE.stuPerPage);
  if (STATE.stuPage > pages) STATE.stuPage = 1;
  const start   = (STATE.stuPage - 1) * STATE.stuPerPage;
  const slice   = filtered.slice(start, start + STATE.stuPerPage);

  document.getElementById("stu-page-info").textContent = `Showing ${start + 1}–${Math.min(start + STATE.stuPerPage, total)} of ${total} entries`;

  const tbody = document.getElementById("studentsBody");
  tbody.innerHTML = slice.map(s => {
    const initials = s[1].split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    const color    = AVATAR_COLORS[s[0] % AVATAR_COLORS.length];
    const tagClass = STATUS_TAGS[s[5]] || "tag-slate";
    return `
    <tr>
      <td style="font-family:var(--mono);font-size:12px;color:var(--muted)">${String(s[0]).padStart(2,"0")}</td>
      <td><div class="student-cell"><div class="stu-avatar" style="background:${color}">${initials}</div><span class="stu-name">${s[1]}</span></div></td>
      <td style="color:var(--muted)">${s[2]}</td>
      <td>${s[3]}</td>
      <td style="color:var(--muted)">${s[4]}</td>
      <td><span class="tag ${tagClass}">${s[5]}</span></td>
      <td>
        <button class="icon-btn edit" onclick="openStudentModal('${s[0]}')" title="Edit"><i class="bi bi-pencil-square"></i></button>
        <button class="icon-btn ai"   onclick="quickStudentAI('${s[1]}','${s[3]}','${s[5]}')" title="AI Tip"><i class="bi bi-stars"></i></button>
        <button class="icon-btn del"  onclick="deleteStudentById(${s[0]})" title="Delete"><i class="bi bi-trash"></i></button>
      </td>
    </tr>`;
  }).join("");

  // Pagination buttons
  const pg = document.getElementById("stu-pagination");
  pg.innerHTML = "";
  const addBtn = (label, page, disabled = false, active = false) => {
    const b = document.createElement("button");
    b.className = "page-btn" + (active ? " active" : "");
    b.textContent = label;
    b.disabled = disabled;
    b.onclick = () => { STATE.stuPage = page; renderStudents(); };
    pg.appendChild(b);
  };
  addBtn("‹", STATE.stuPage - 1, STATE.stuPage === 1);
  for (let p = 1; p <= pages; p++) addBtn(p, p, false, p === STATE.stuPage);
  addBtn("›", STATE.stuPage + 1, STATE.stuPage === pages);

  updateBadges();
}

function filterStudents() { STATE.stuPage = 1; renderStudents(); }

function openStudentModal(id = null) {
  const isEdit = id !== null;
  document.getElementById("studentMTitle").textContent = isEdit ? "Edit Student" : "Add Student";

  if (isEdit) {
    const s = STATE.students.find(r => r[0] == id);
    if (!s) return;
    STATE.studentEditRow = s;
    setVal({ "s-name": s[1], "s-email": s[2], "s-course": s[3], "s-trainer": s[4] });
    document.getElementById("s-status").value = s[5];
  } else {
    STATE.studentEditRow = null;
    clearVals(["s-name","s-email","s-course","s-trainer"]);
    document.getElementById("s-status").value = "Active";
  }
  openOverlay("studentOverlay");
}

function closeStudentModal() { closeOverlay("studentOverlay"); }

function saveStudent() {
  const name = getVal("s-name").trim();
  if (!name) { toast("Student name is required.", "error"); return; }
  const data = [null, name, getVal("s-email"), getVal("s-course"), getVal("s-trainer"), document.getElementById("s-status").value];

  if (STATE.studentEditRow) {
    const idx = STATE.students.indexOf(STATE.studentEditRow);
    data[0] = STATE.studentEditRow[0];
    STATE.students[idx] = data;
    toast("Student updated.");
  } else {
    const newId = STATE.students.length ? Math.max(...STATE.students.map(s => s[0])) + 1 : 1;
    data[0] = newId;
    STATE.students.push(data);
    toast("Student added.");
  }
  renderStudents();
  closeStudentModal();
}

function deleteStudentById(id) {
  const s = STATE.students.find(r => r[0] === id);
  if (!s || !confirm(`Remove student "${s[1]}"?`)) return;
  STATE.students.splice(STATE.students.indexOf(s), 1);
  renderStudents();
  toast("Student removed.", "warning");
}

async function quickStudentAI(name, course, status) {
  try {
    const text = await callAI(`Give a 1-sentence tip...`);
    alert(`💡 AI Tip for ${name}:\n\n${text}`);
  } catch {
    alert(`💡 AI Tip for ${name}:\n\nConsistent daily practice and engaging with course projects will accelerate your progress in ${course} significantly!`);
  }
}

function openStudentAI() { openOverlay("stuAiOverlay"); }
function closeStudentAI() { closeOverlay("stuAiOverlay"); }

async function runStudentAI() {
  const el = document.getElementById("stuAiResult");
  el.innerHTML = '<span class="spinner"></span> Analyzing cohort data…';
  const active    = STATE.students.filter(s => s[5] === "Active").length;
  const completed = STATE.students.filter(s => s[5] === "Completed").length;
  const dropped   = STATE.students.filter(s => s[5] === "Dropped").length;
  const pending   = STATE.students.filter(s => s[5] === "Pending").length;

  try {
    const text = await callAI(`Analyze this student cohort data...`);
    el.textContent = text;
  } catch {
    el.textContent = `With ${STATE.students.length} students and a ${Math.round(dropped / STATE.students.length * 100)}% dropout rate, focused intervention on at-risk students could improve retention. Recommendation: Send weekly check-ins to the ${pending} pending students to convert them to active. Implement completion certificates to incentivize the ${active} active students to reach completion status. Consider adding advanced modules to popular courses to reduce dropout after initial content is finished.`;
  }
}

/* ═══════════════════════════════════════════════════════════
   AI ASSISTANT CHAT
═══════════════════════════════════════════════════════════ */
function openAIAssistant() { openOverlay("aiOverlay"); }
function closeAIModal()    { closeOverlay("aiOverlay"); }

async function sendAI(preset = null) {
  const input = document.getElementById("aiInput");
  const msg   = preset || input.value.trim();
  if (!msg) return;
  input.value = "";

  const area = document.getElementById("chatArea");

  // Clear welcome on first message
  const welcome = area.querySelector(".chat-welcome");
  if (welcome) welcome.remove();

  // User bubble
  appendBubble(area, "user", msg);

  // Thinking bubble
  const thinking = appendBubble(area, "ai", '<span class="spinner"></span> Thinking…');
  area.scrollTop = area.scrollHeight;

  const context = `You are the AI assistant for EduCore, an online learning management platform. Current stats: ${STATE.courses.length} courses, ${STATE.trainers.length} trainers, ${STATE.students.length} students. Top course: Web Development. Be helpful, concise, and professional.`;

  try {
    const text = await callAI(msg, context);
    thinking.innerHTML = text;
  } catch {
    // Replaced the server.js warning since we are pure frontend now
    thinking.innerHTML = "<em>This is a frontend-only demo! In a real application, this chat would connect to a backend AI service to process your message.</em>";
  }
  area.scrollTop = area.scrollHeight;
}

function appendBubble(area, role, html) {
  const b = document.createElement("div");
  b.className = `chat-bubble ${role}`;
  b.innerHTML = html;
  area.appendChild(b);
  return b;
}

async function getDashboardBriefing() {
  const el = document.getElementById("dashAiText");
  el.innerHTML = '<span class="spinner"></span> Generating briefing…';

  try {
    const text = await callAI(`Give a 2-3 sentence daily admin briefing...`);
    el.innerHTML = text;
  } catch {
    el.innerHTML = `EduCore is running strong with <strong>${STATE.courses.length} courses</strong>, <strong>${STATE.trainers.length} trainers</strong>, and <strong>${STATE.students.length} enrolled students</strong>. Web Development continues to lead enrollment. <strong>Recommendation:</strong> Add an Advanced React course to capitalize on programming demand — it could attract 20+ new enrollments.`;
  }
}

/* ═══════════════════════════════════════════════════════════
   AI API HELPER (MOCKED FOR FRONTEND)
═══════════════════════════════════════════════════════════ */
async function callAI(userPrompt, systemPrompt = "") {
  // Simulating a network delay to make the UI feel real
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // We immediately reject the promise to trigger the frontend fallback text
      // that is safely coded into all of the catch blocks above!
      reject(new Error("Frontend-only mode activated. Falling back to mocked content."));
    }, 800);
  });
}

/* ═══════════════════════════════════════════════════════════
   OVERLAY HELPERS
═══════════════════════════════════════════════════════════ */
function openOverlay(id) {
  const el = document.getElementById(id);
  if(el) {
    el.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function closeOverlay(id) {
  const el = document.getElementById(id);
  if(el) {
    el.classList.remove("open");
    document.body.style.overflow = "";
  }
}

// Close overlay on backdrop click
document.querySelectorAll(".overlay").forEach(overlay => {
  overlay.addEventListener("click", e => {
    if (e.target === overlay) {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    }
  });
});

// Close on Escape
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    document.querySelectorAll(".overlay.open").forEach(o => {
      o.classList.remove("open");
      document.body.style.overflow = "";
    });
  }
  // ── Navigation ──────────────────────────────────────────────
function navigate(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show target page
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');

  // Update sidebar active link
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const activeLink = document.querySelector(`.nav-link[data-page="${page}"]`);
  if (activeLink) activeLink.classList.add('active');
}
});

/* ═══════════════════════════════════════════════════════════
   END
═══════════════════════════════════════════════════════════ */