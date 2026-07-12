# Personal Portfolio Website - Subash B
# Live Deployment -> [Click Here](https://portfolio-omega-tan-34duvynqe6.vercel.app)

A premium, production-quality, and interactive Personal Portfolio web application built using semantic HTML5, modern CSS3, and Vanilla JavaScript. This website showcases academic milestones, technical skills, certificates, and projects with a responsive design. Developed as a task for **Level 1** of the **Oasis Infobyte Web Development Internship**.

---

##  Features

- **Dark/Light Theme Switching**: Features a glassmorphic design that defaults to the user's system preferences, allows manual toggling, and persists the theme preference in `localStorage`.
- **Dynamic Typewriter Effect**: Real-time typing, pausing, and deleting animation showcasing key roles: *B.Tech IT Student*, *Full Stack Developer*, *Cybersecurity Enthusiast*, and *Vibe coder*.
- **Interactive Technical Skill Progress**: Skills section displaying key competencies (Development & Languages, AI & Prompt Engineering, and Tools & Systems) with animated skill bars that fill up only when scrolled into view using the browser's native `IntersectionObserver`.
- **Journey Timeline & Certifications**:
  - Educational background detailing B.Tech in IT with CGPA (8.96/10).
  - Internship experience in Full Stack Development.
  - Credentials-linked certification cards for Cisco Networking Academy (HTML/CSS/JS Essentials, Network Defense, Endpoint Security, Security and Connectivity Support, Introduction to Modern AI) and NPTEL (Python, Soft Skills).
- **Projects Showcase Grid**: Modern grid displaying built applications (Real-Time User Management System, Interactive Landing Pages, Expense Tracker, Portfolio Website, and Resume Shortlister) with custom visual indicators and links.
- **Simulated Interactive Contact Form**: Fully validated form featuring a responsive button transition, loading/sending spinner, and dynamic success alert with automatic fade-out.
- **Responsive Layout**: Designed with custom CSS variables, CSS Flexbox, and CSS Grid, ensuring compatibility across all screen sizes (mobile, tablet, desktop).
- **Navigation Controls**:
  - Sticky header navigation with auto-highlighting of active links on scroll.
  - Collapsible mobile navigation menu (hamburger menu).
  - Floating smooth-scroll back-to-top button.

---

##  Technologies Used

- **HTML5**: Semantic markup (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`) and ARIA labels.
- **CSS3**: Custom property variables (light/dark mode colors), Flexbox, CSS Grid, custom keyframe transitions, backdrop-filter blur (glassmorphism), and media queries.
- **Vanilla JavaScript**: DOM manipulation, typewriter animation loops, theme switching & storage logic, `IntersectionObserver` triggers (for scroll-reveal animations and skill bars), and form validation/submission simulation.
- **Font Awesome**: Used for scalable vector iconography throughout the sections.
- **Google Fonts**: Inter & Outfit font families.

---

## 📂 Folder Structure

```text
webDev-L1-PersonalPortfolio/
├── assets/
│   ├── avatar.png       # Profile picture used in the Hero section
│   └── resume.pdf       # Downloadable resume document
├── index.html           # Main semantic structure and layout of the portfolio
├── styles.css           # Styling, themes, animations, variables, and media queries
├── script.js            # Typewriter, theme toggling, scroll animation observers, and form handlers
└── README.md            # Project documentation (this file)
```

---

##  Getting Started

No compilation, bundler, or web server setup is required to run the portfolio:

### Option 1: Open Locally
1. Download or clone this repository.
2. Navigate to the `Personal Portfolio` directory.
3. Double-click `index.html` to open it directly in your web browser of choice.

### Option 2: Run a Local HTTP Server
For the best experience with full asset loading, run a local development server using Python or Node.js:
- **Using Python**:
  ```bash
  python -m http.server 8000
  ```
  Open your browser and visit `http://localhost:8000/`.

- **Using Live Server (VS Code Extension)**:
  Right-click `index.html` and choose **"Open with Live Server"**.

---

##  License

This project is open-source and available under the [MIT License](LICENSE).

---

##  Author

**Subash B**
- **GitHub**: [@ArcSubash](https://github.com/ArcSubash)
- **LinkedIn**: [Subash B](https://www.linkedin.com/in/subash11rc/)
- **Email**: subash11rc@gmail.com
