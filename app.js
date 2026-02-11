document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
            menu.classList.toggle('open');
        });
    }

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            if (menu) {
                menu.classList.add('hidden'); // Close mobile menu on click
                menu.classList.remove('open');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Dark Mode Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');
    
    function toggleTheme() {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }

    // Initialize Theme
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    // Event Listeners
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    if (mobileThemeToggleBtn) {
        mobileThemeToggleBtn.addEventListener('click', toggleTheme);
    }

    // --- Form Handling (Index Page) ---
    const contactForm = document.getElementById('contact-form');
    const contactSuccessMessage = document.getElementById('contact-success-message');
    const contactFormContainer = document.getElementById('contact-form-container');

    if (contactForm && contactSuccessMessage && contactFormContainer) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Simple Rate Limiting (1 submission per 60 seconds)
            const lastSubmission = localStorage.getItem('last_submission_time');
            const now = Date.now();
            if (lastSubmission && (now - lastSubmission < 60000)) {
                const remaining = Math.ceil((60000 - (now - lastSubmission)) / 1000);
                alert(`Please wait ${remaining} seconds before sending another message.`);
                return;
            }

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;

            btn.disabled = true;
            btn.innerText = 'Sending...';

            const formData = new FormData(contactForm);
            
            // Controller for timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

            try {
                // Replace with your actual Formspree endpoint (e.g., https://formspree.io/f/your_id)
                // You can get this by registering at formspree.io
                const response = await fetch('https://formspree.io/f/xreaeyza', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    },
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (response.ok) {
                    localStorage.setItem('last_submission_time', Date.now());
                    contactFormContainer.classList.add('hidden'); // Hide the form container
                    contactSuccessMessage.classList.remove('hidden'); // Show the success message
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        alert(data.errors.map(error => error.message).join(", "));
                    } else {
                        alert("Oops! There was a problem submitting your form");
                    }
                }
            } catch (error) {
                if (error.name === 'AbortError') {
                    alert("The request timed out. Please check your internet connection or try again.");
                } else {
                    alert("Oops! There was a problem submitting your form");
                }
            } finally {
                btn.disabled = false;
                btn.innerText = originalText;
            }
        });
    }

    // --- View All Subjects Toggle ---
    const viewSubjectsBtn = document.getElementById('view-all-subjects-btn');
    const extraSubjects = document.querySelectorAll('.extra-subjects');
    const subjectsBtnText = document.getElementById('subjects-btn-text');
    const subjectsBtnIcon = document.getElementById('subjects-btn-icon');

    if (viewSubjectsBtn) {
        viewSubjectsBtn.addEventListener('click', () => {
            const isHidden = extraSubjects[0].classList.contains('hidden');
            
            extraSubjects.forEach(el => {
                el.classList.toggle('hidden');
            });

            if (isHidden) {
                subjectsBtnText.innerText = 'Show less';
                subjectsBtnIcon.classList.replace('fa-arrow-right', 'fa-arrow-up');
            } else {
                subjectsBtnText.innerText = 'View all subjects';
                subjectsBtnIcon.classList.replace('fa-arrow-up', 'fa-arrow-right');
            }
        });
    }

    // --- View All Courses Toggle ---
    const viewCoursesBtn = document.getElementById('view-all-courses-btn');
    const extraCourses = document.querySelectorAll('.extra-course');

    if (viewCoursesBtn) {
        viewCoursesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const isHidden = extraCourses[0].classList.contains('hidden');
            
            extraCourses.forEach(el => {
                el.classList.toggle('hidden');
            });

            if (isHidden) {
                viewCoursesBtn.innerText = 'Show Less Courses';
            } else {
                viewCoursesBtn.innerText = 'View All Courses';
            }
        });
    }

    // --- Search Functionality ---
    const heroSearchInput = document.querySelector('.hero-search-input');
    const heroSearchBtn = document.querySelector('.hero-search-btn');
    const navSearchInput = document.getElementById('nav-search-input');
    const navSearchBtn = document.getElementById('nav-search-btn');

    function performSearch(inputElement) {
        const query = inputElement.value.toLowerCase().trim();
        if (!query) return;

        // Keywords and their target section IDs
        const searchMap = {
            'math': '#courses',
            'science': '#courses',
            'physic': '#courses',
            'chem': '#courses',
            'subject': '#subjects',
            'service': '#services',
            'video': '#videos',
            'tutor': '#services',
            'book': 'booking.html',
            'gce': '#courses',
            'grade': '#courses',
            'contact': '#contact',
            'about': 'about.html',
            'privacy': 'privacy.html',
            'terms': 'terms.html'
        };

        let found = false;
        const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');

        for (const key in searchMap) {
            if (query.includes(key)) {
                const target = searchMap[key];
                
                if (target.endsWith('.html')) {
                    window.location.href = target;
                } else {
                    if (isHomePage) {
                        const el = document.querySelector(target);
                        if (el) {
                            el.scrollIntoView({ behavior: 'smooth' });
                            inputElement.value = ""; 
                        }
                    } else {
                        // Redirect to home page with the hash
                        window.location.href = 'index.html' + target;
                    }
                }
                found = true;
                break;
            }
        }

        if (!found) {
            // Fallback for home page: search headings
            if (isHomePage) {
                const headings = document.querySelectorAll('h1, h2, h3, h4');
                for (const h of headings) {
                    if (h.innerText.toLowerCase().includes(query)) {
                        h.scrollIntoView({ behavior: 'smooth' });
                        found = true;
                        break;
                    }
                }
            }
        }

        if (!found) {
            if (!isHomePage) {
                // If on other page and no direct match, try home page search
                window.location.href = 'index.html?search=' + encodeURIComponent(query);
            } else {
                alert("No specific results found for '" + query + "'. Try searching for 'Math', 'Science', 'Courses', or 'Videos'.");
            }
        }
    }

    // Hero Search (Home Page only)
    if (heroSearchBtn && heroSearchInput) {
        heroSearchBtn.addEventListener('click', () => performSearch(heroSearchInput));
        heroSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch(heroSearchInput);
        });
    }

    // Navbar Search (All Pages)
    if (navSearchBtn && navSearchInput) {
        navSearchBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navSearchInput.classList.contains('active')) {
                if (navSearchInput.value.trim() !== "") {
                    performSearch(navSearchInput);
                } else {
                    navSearchInput.classList.remove('active');
                }
            } else {
                navSearchInput.classList.add('active');
                navSearchInput.focus();
            }
        });

        navSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch(navSearchInput);
        });

        // Close search when clicking elsewhere
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-search-container')) {
                navSearchInput.classList.remove('active');
            }
        });
    }

    // Handle incoming search query from other pages
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery && navSearchInput) {
        navSearchInput.value = searchQuery;
        performSearch(navSearchInput);
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-md');
                navbar.classList.remove('py-4'); 
            } else {
                navbar.classList.remove('shadow-md');
                navbar.classList.add('py-4'); 
            }
        });
    }
});