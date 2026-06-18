# 🎂 Birthday Wrapped 

A web-based interactive experience inspired by **Spotify Wrapped**, built specifically to celebrate someone's life journey on their birthday. This application calculates life metrics down to the exact days and hours based on user input, dynamically assigning astrology signs, lunar shios, birthstones, generation demographics, and tailoring custom narratives according to their current role in life.

This is a **100% serverless, private-by-design, client-side application** that utilizes `localStorage` to handle user input. No data is ever sent to an external server.

---

## ✨ Features

- **Brutalist Spotify-Esque UI:** Bold typography, vibrant blocks of contrast gradients, and smooth, fluid motion design.
- **Dynamic Background Motion:** Smooth HTML5 floating geometry blobs that dynamically shift base accents depending on the active story slide.
- **Modular Component Structure:** Each story slide (`nama`, `waktu`, `pekerjaan`, `zodiak`, `shio`, `batu`, `generasi`, `summary`) is separated into individual HTML files inside a `slides/` directory for incredibly easy maintenance and visual tweaking.
- **Custom Role Narratives:** Includes 12 tailored copywritings for various professions/roles (e.g., Student, Software Engineer, Stay-at-home Mom, Freelancer, etc.).
- **Interactive Navigation:** Supports interactive tap navigation (left zone to go back, right zone to advance forward) mimicking Instagram/Spotify Stories.
- **Fully Responsive Architecture:** Mobile-first layout optimized for standard smartphone screens, seamlessly locking aspect ratio into an elegant portrait viewport when viewed on laptops/desktop monitors.

---

🛠️ Tech Stack & Dependencies
HTML5 & Semantic Components (<template>, <select>)

CSS3 Native Engine (CSS Variables, Flexbox, Keyframes, Aspect Ratio API)

Vanilla JavaScript (ES6+, Async/Await Fetch API, LocalStorage API, native Date API)

Google Fonts — Montserrat typeface integration

Font Awesome CDN — Premium vector iconography for web navigation

🚀 How to Run Locally
Because this project loads external modular components dynamically via JavaScript's native fetch() API, opening index.html directly from your file system (file:///...) will trigger a local browser CORS block.

To test and develop this project locally, you must run it inside a local server environment:

Option A: VS Code Live Server (Recommended)
Install the Live Server extension by Ritwick Dey.

Open the project folder in VS Code.

Right-click index.html and select Open with Live Server (or click Go Live at the bottom-right status bar).

Option B: Python Local Server
If you have Python installed, open your terminal/command prompt, navigate to the project directory, and execute:

Bash
python -m http.server 8000
Then open your browser and navigate to http://localhost:8000.


## 📂 Project Structure

```text
├── index.html          # Main application gateway & container framework
├── style.css           # Global core layout styles & custom animations
├── script.js          # Core computational logic & slideshow controller
└── slides/             # Isolated modular component slides
    ├── nama.html       # Intro slide
    ├── waktu.html      # Longevity metric calculation (Days & Hours)
    ├── pekerjaan.html  # Personalized role copywriting
    ├── zodiak.html     # Constellation assignment
    ├── shio.html       # Chinese lunar cycle assignment
    ├── batu.html       # Birthstone assignment
    ├── generasi.html   # Demographic generation taxonomy
    └── summary.html    # Epilogue & overview dynamic story card
