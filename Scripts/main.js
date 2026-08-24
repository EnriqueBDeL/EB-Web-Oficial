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

// --- Dyslexia Easter Egg ---
const easterEggTrigger = document.getElementById('easter-egg-trigger');
if (easterEggTrigger) {
    let textNodes = [];

    function getTextNodes(node) {
        if (node.nodeType === 3) {
            if (node.nodeValue.trim() !== '') {
                textNodes.push({
                    node: node,
                    originalText: node.nodeValue
                });
            }
        } else {
            for (let i = 0; i < node.childNodes.length; i++) {
                getTextNodes(node.childNodes[i]);
            }
        }
    }

    easterEggTrigger.addEventListener('click', () => {
        if (window.dyslexiaInterval) {
            // Stop the effect and restore original text
            clearInterval(window.dyslexiaInterval);
            window.dyslexiaInterval = null;

            for (let i = 0; i < textNodes.length; i++) {
                textNodes[i].node.nodeValue = textNodes[i].originalText;
            }
            return;
        }

        // Initialize text nodes if not already done
        if (textNodes.length === 0) {
            getTextNodes(document.body);
        }

        window.dyslexiaInterval = setInterval(() => {
            for (let i = 0; i < textNodes.length; i++) {
                if (Math.random() < 0.1) {
                    let newWords = textNodes[i].originalText.split(' ');

                    for (let j = 0; j < newWords.length; j++) {
                        if (Math.random() < 0.2 && newWords[j].length > 3) {
                            let wordArr = newWords[j].split('');
                            let swapIdx = Math.floor(Math.random() * (wordArr.length - 3)) + 1;
                            let temp = wordArr[swapIdx];
                            wordArr[swapIdx] = wordArr[swapIdx + 1];
                            wordArr[swapIdx + 1] = temp;
                            newWords[j] = wordArr.join('');
                        }
                    }
                    textNodes[i].node.nodeValue = newWords.join(' ');
                }
            }
        }, 300);
    });
}

// --- Jorge Easter Egg ---
const jorgeEasterEggTrigger = document.getElementById('jorge-easter-egg');
const jorgeCloud = document.getElementById('jorge-cloud');
if (jorgeEasterEggTrigger && jorgeCloud) {
    jorgeEasterEggTrigger.addEventListener('click', () => {
        jorgeCloud.classList.toggle('visible');
    });
}

// --- Gonzalo Easter Egg ---
const gonzaloEasterEggTrigger = document.getElementById('gonzalo-easter-egg');
const gonzaloCloud = document.getElementById('gonzalo-cloud');
if (gonzaloEasterEggTrigger && gonzaloCloud) {
    gonzaloEasterEggTrigger.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent navigating if wrapped in a link
        gonzaloCloud.classList.toggle('visible');
    });
}
