# Mobile Smart Teachers - Website Project

**Date:** February 8, 2026
**Project:** Mobile Smart Teachers Website

---

## 1. Project Overview
This is the official website for **Mobile Smart Teachers**, a premier tuition centre offering home and online tuition services. The website is designed as a modern, responsive single-page application using HTML5, Tailwind CSS, and vanilla JavaScript.

### Key Features
- **Responsive Design:** Works seamlessly on mobile, tablet, and desktop.
- **Service Showcase:** Details on Home Tuition, Online Classes, and Exam Prep.
- **Contact Form:** Integrated form for parents/students to book tutors.
- **Smooth Navigation:** Easy access to all sections.

---

## 2. File Structure

```text
/ (Root Directory)
├── index.html           # Main website structure
├── style.css            # Custom styles and animations
├── app.js               # Interactive logic (mobile menu, form handling)
├── README.md            # This documentation
└── ... (legacy files from previous project)
```

---

## 3. How to Deploy to GitHub Pages

GitHub Pages is a free service to host static websites directly from your GitHub repository.

### Steps:
1.  **Push Code to GitHub:**
    - Initialize a git repository if you haven't already:
      ```bash
      git init
      git add .
      git commit -m "Initial commit for Mobile Smart Teachers website"
      ```
    - Create a new repository on GitHub.
    - Link your local repository to the remote one:
      ```bash
      git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
      git push -u origin main
      ```

2.  **Enable GitHub Pages:**
    - Go to your repository **Settings** on GitHub.
    - Click on **Pages** in the left sidebar.
    - Under **Source**, select `Deploy from a branch`.
    - Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
    - Click **Save**.

3.  **Visit Your Site:**
    - After a few minutes, your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`.

---

## 4. Customization Guide

### Updating Content
- **Text & Images:** Edit `index.html`. Look for the relevant section IDs (e.g., `#home`, `#services`).
- **Styles:** Modify `style.css` for custom colors or animations. Tailwind utility classes are used directly in `index.html`.
- **Logic:** Update `app.js` to change form behavior or adding new interactive features.

### Form Handling
- currently, the form in `index.html` simulates a submission. To make it functional, you can use a service like [Formspree](https://formspree.io/).
- **To use Formspree:**
  1. Register at Formspree.io and create a new form.
  2. Copy the endpoint URL (e.g., `https://formspree.io/f/your_id`).
  3. In `index.html`, find the `<form id="contact-form">` tag.
  4. Change it to: `<form action="YOUR_FORMSPREE_URL" method="POST">`.
  5. Remove the simulated submission code in `app.js` if desired.

---
**End of Documentation**
