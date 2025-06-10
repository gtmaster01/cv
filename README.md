# Professional CV – Static Website

A minimal, bilingual (CZ / EN) résumé template that you can host for free on GitHub Pages.

## Features

* Fully static – just HTML, CSS, and vanilla JS
* Reads all personal data from easy-to-edit JSON files (`data/cv-cz.json`, `data/cv-en.json`)
* Language switcher
* "Download as PDF" button – uses `html2pdf.js` (fallback to `window.print()`)
* Luxurious, professional typography (Inter & Playfair Display via Google Fonts) and responsive layout
* Zero build-step – works out of the box on GitHub Pages

![screenshot](docs/screenshot.png)

---

## Getting Started

1. **Clone** this repository and open it locally:
   ```bash
   git clone https://github.com/your-user/your-cv.git
   cd your-cv
   ```
2. **Fill in your data** in the JSON files inside `data/`.
   * Keep the same keys in both language files so the template can switch seamlessly.
3. **Preview locally** – just open `index.html` in your browser (no server needed).
4. **Deploy** – commit & push to a GitHub repository named `<username>.github.io` or enable GitHub Pages in repository settings (branch: `main`, folder: `/`).

### JSON Schema

```jsonc
{
  "basics": {
    "name": "Jan Novák",
    "label": "Senior Software Engineer",
    "email": "jan.novak@example.com",
    "phone": "+420 777 123 456",
    "location": "Prague, CZ",
    "summary": "Short professional summary..."
  },
  "skills": [
    {
      "group": "Programming & Automation",
      "items": ["Java", "Python", "Bash scripting"]
    },
    {
      "group": "Testing & QA",
      "items": ["Selenium", "JUnit", "Xray"]
    }
  ],
  "experience": [
    {
      "company": "ACME Corp.",
      "position": "Lead Frontend Engineer",
      "startDate": "2021-05",
      "endDate": "Present",
      "summary": "Key achievements..."
    }
  ],
  "education": [
    {
      "institution": "CTU Prague",
      "studyType": "MSc. Computer Science",
      "startDate": "2014",
      "endDate": "2016"
    }
  ],
  "languages": [
    { "language": "Czech", "fluency": "Native" },
    { "language": "English", "fluency": "C1" }
  ]
}
```

> Feel free to extend the structure – the rendering logic in `main.js` is straightforward and easy to adapt.

---

## Customizing the Look

* Edit colors and fonts in `style.css`
* Change section order or add new sections in `index.html` (look for `<!-- sections -->`)

---

## Generating PDF

The "Download as PDF" button uses `html2pdf.js` to convert the current DOM into a nicely formatted PDF on the client side.

If the library fails to load, we gracefully fall back to `window.print()` so you can still export via the browser's Print → Save as PDF function.

---

## License

MIT — do whatever you want, no warranties. 