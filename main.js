const container = document.getElementById("cv-container");
const langSwitcher = document.getElementById("lang-switcher");
const downloadBtn = document.getElementById("downloadPdf");

async function loadCV(lang) {
  const path = `data/cv-${lang}.json`;
  const response = await fetch(path);
  if (!response.ok) {
    console.error(`Could not load ${path}`);
    return;
  }
  const data = await response.json();
  renderCV(data);
}

function renderCV(cv) {
  container.innerHTML = ""; // clear

  // Header
  const header = document.createElement("section");
  header.className = "section header";

  // Build contact links with icons
  const contactItems = [];
  contactItems.push(`<span class='contact-item'><span class='contact-icon'>📞</span><a href='tel:${cv.basics.phone.replace(/\s+/g, '')}'>${cv.basics.phone}</a></span>`);
  contactItems.push(`<span class='contact-item'><span class='contact-icon'>✉️</span><a href='mailto:${cv.basics.email}'>${cv.basics.email}</a></span>`);
  if (cv.basics.linkedin) contactItems.push(`<span class='contact-item'><span class='contact-icon'>💼</span><a href='${cv.basics.linkedin}' target='_blank'>LinkedIn</a></span>`);
  let contactLinks = contactItems.join("");

  header.innerHTML = `
    <h1><span class='icon-title'>👤</span> ${cv.basics.name}</h1>
    <p>${cv.basics.label}</p>
    <div class="details-block">
       <div class="info-row">
         ${cv.basics.dob ? `<span class="info-item"><span class='contact-icon'>🎂</span> ${cv.basics.dob}</span>` : ""}
         <span class="info-item"><span class='contact-icon'>📍</span> ${cv.basics.location}</span>
       </div>
       <div class="contact-row">${contactLinks}</div>
    </div>
    <p class="bio-text">${cv.basics.summary}</p>
  `;
  container.appendChild(header);

  // Skills
  if (cv.skills?.length) {
    const skillsSec = section("skills", `<span class='icon-section'>🛠️</span> ${lang("Skills", "Dovednosti")}`);

    const groupIcon = (g) => {
      const map = {
        // Czech
        "Programování & Automatizace": "💻",
        "Testování & QA": "🧪",
        "CI/CD & DevOps": "⚙️",
        "Nástroje & Monitoring": "🔧",
        "Soft skills": "🎯",
        "AI nástroje & agenti": "🤖",
        "AI Tools & Agents": "🤖",
        // English
        "Programming & Automation": "💻",
        "Testing & QA": "🧪",
        "CI/CD & DevOps": "⚙️",
        "Tools & Monitoring": "🔧",
        "Soft skills": "🎯"
      };
      return map[g] || "•";
    };

    cv.skills.forEach((group) => {
      if (group.group && Array.isArray(group.items)) {
        const groupWrapper = document.createElement("div");
        groupWrapper.className = "skill-group";
        groupWrapper.innerHTML = `<h3 class='skill-group-title'><span class='skill-icon'>${groupIcon(group.group)}</span> ${group.group}</h3>`;
        const list = document.createElement("div");
        list.className = "skill-list";
        group.items.forEach((s) => {
          const span = document.createElement("span");
          span.className = "skill";
          span.textContent = s;
          list.appendChild(span);
        });
        groupWrapper.appendChild(list);
        skillsSec.appendChild(groupWrapper);
      } else {
        const span = document.createElement("span");
        span.className = "skill";
        span.textContent = group.name || group;
        skillsSec.appendChild(span);
      }
    });
    container.appendChild(skillsSec);
  }

  // Experience
  if (cv.experience?.length) {
    const expSec = section("experience", `<span class='icon-section'>💼</span> ${lang("Work Experience", "Praxe")}`);
    cv.experience.forEach((exp) => {
      const item = document.createElement("div");
      item.className = "item";
      item.innerHTML = `
        <div class="item-header">
          <span class="role">${exp.position} — ${exp.company}</span>
          <span class="period">${exp.startDate} – ${exp.endDate}</span>
        </div>
        <p>${exp.summary}</p>
      `;
      expSec.appendChild(item);
    });
    container.appendChild(expSec);
  }

  // Education
  if (cv.education?.length) {
    const eduSec = section("education", `<span class='icon-section'>🎓</span> ${lang("Education", "Vzdělání")}`);
    cv.education.forEach((edu) => {
      const item = document.createElement("div");
      item.className = "item";
      item.innerHTML = `
        <div class="item-header">
          <span class="role">${edu.studyType} — <span class="institution">${edu.institution}</span></span>
          <span class="period">${edu.startDate} – ${edu.endDate}</span>
        </div>
        ${edu.specialization ? `<p class="specialization">${edu.specialization}</p>` : ""}
      `;
      eduSec.appendChild(item);
    });
    container.appendChild(eduSec);
  }

  // Languages
  if (cv.languages?.length) {
    const langSec = section("languages", `<span class='icon-section'>🌐</span> ${lang("Languages", "Jazyky")}`);
    const list = document.createElement("div");
    list.className = "language-list";
    cv.languages.forEach((l) => {
      const item = document.createElement("div");
      item.className = "language-item";
      const flag = (name) => {
        const map = {
          "Čeština": "cz",
          "Czech": "cz",
          "English": "gb",
          "Angličtina": "gb",
          "German": "de",
          "Němčina": "de"
        };
        const code = map[name];
        if (!code) return "";
        return `<img src='https://flagcdn.com/24x18/${code}.png' alt='' />`;
      };
      item.innerHTML = `
        <span class="lang-name flag-emoji">${flag(l.language)}</span><span class="lang-name-text">${l.language}</span>
        <span class="lang-fluency">${l.fluency}</span>
      `;
      list.appendChild(item);
    });
    langSec.appendChild(list);
    container.appendChild(langSec);
  }

  // Interests
  if (cv.other?.interests?.length) {
    const intSec = section("interests", `<span class='icon-section'>🎯</span> ${lang("Interests & hobbies", "Zájmy a koníčky")}`);
    const list = document.createElement("div");
    list.className = "interest-list";
    cv.other.interests.forEach((interest) => {
      const item = document.createElement("span");
      item.className = "interest-item";
      item.textContent = interest;
      list.appendChild(item);
    });
    intSec.appendChild(list);
    container.appendChild(intSec);
  }
}

// Utility to create section wrapper
function section(id, title) {
  const sec = document.createElement("section");
  sec.className = "section";
  sec.id = id;
  sec.innerHTML = `<h2 class="section-title">${title}</h2>`;
  return sec;
}

// Quick i18n label helper (switch on current lang)
function lang(en, cz) {
  return langSwitcher.value === "cz" ? cz : en;
}

// Language switching
langSwitcher.addEventListener("change", () => loadCV(langSwitcher.value));

// PDF download
async function downloadPdf() {
  document.documentElement.classList.add("pdf-export"); // Add class for print styles

  try {
    const element = container;
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `cv-${langSwitcher.value}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true,
        allowTaint: false,
        backgroundColor: '#fff'
      },
      jsPDF: { 
        unit: 'in', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    await html2pdf().set(opt).from(element).save();
  } catch (e) {
    console.warn("html2pdf failed, fallback to print", e);
    window.print();
  } finally {
    document.documentElement.classList.remove("pdf-export"); // Always remove the class
  }
}
downloadBtn.addEventListener("click", downloadPdf);

// Initial load
loadCV("en"); 