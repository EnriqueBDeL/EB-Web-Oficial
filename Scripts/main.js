// Intersection Observer for fade-in animations on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(section => {
    observer.observe(section);
});

// Navbar blur on scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Theme toggle and system preference detection logic
const themeToggleBtn = document.getElementById('theme-toggle');
const rootElement = document.documentElement;

// Function to get current theme
function getCurrentTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

// Function to apply theme
function applyTheme(theme) {
    if (theme === 'light') {
        rootElement.classList.add('light-mode');
        updateToggleIcon('light');
    } else {
        rootElement.classList.remove('light-mode');
        updateToggleIcon('dark');
    }
}

// Function to update icon in toggle button
function updateToggleIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (icon) {
        if (theme === 'light') {
            icon.className = 'ph ph-moon';
        } else {
            icon.className = 'ph ph-sun';
        }
    }
}

// Apply theme on load
const currentTheme = getCurrentTheme();
applyTheme(currentTheme);

// Attach event listener to theme toggle button
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const activeTheme = rootElement.classList.contains('light-mode') ? 'light' : 'dark';
        const nextTheme = activeTheme === 'light' ? 'dark' : 'light';
        
        // Save user override
        localStorage.setItem('theme', nextTheme);
        applyTheme(nextTheme);
    });
}

// Listen to system theme changes dynamically (only if user hasn't set a manual preference)
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'light' : 'dark');
    }
});
