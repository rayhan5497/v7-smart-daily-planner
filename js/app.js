/**
 * V7 Smart Daily Planner - Main App Controller
 * Initializes all modules and handles global functionality
 */

const App = (function () {
    // DOM Elements
    let elements = {};

    /**
     * Initialize the application
     */
    function init() {
        cacheElements();
        initTheme();
        initGreeting();
        initDate();
        initNavigation();
        initMobileMenu();
        initModules();
    }

    /**
     * Cache global DOM elements
     */
    function cacheElements() {
        elements = {
            themeToggle: document.getElementById('themeToggle'),
            themeLabel: document.getElementById('themeLabel'),
            greeting: document.getElementById('greeting'),
            greetingSub: document.getElementById('greetingSub'),
            currentDate: document.getElementById('currentDate'),
            navLinks: document.querySelectorAll('.nav-link'),
            mobileMenuToggle: document.getElementById('mobileMenuToggle'),
            sidebar: document.getElementById('sidebar'),
            sidebarOverlay: document.getElementById('sidebarOverlay')
        };
    }

    /**
     * Initialize theme from localStorage
     */
    function initTheme() {
        const savedTheme = localStorage.getItem('v7-theme') || 'light';
        setTheme(savedTheme);

        elements.themeToggle.addEventListener('click', toggleTheme);
    }

    /**
     * Toggle between light and dark themes
     */
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('v7-theme', newTheme);
    }

    /**
     * Set the theme
     */
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        elements.themeLabel.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
    }

    /**
     * Initialize greeting based on time of day
     */
    function initGreeting() {
        const hour = new Date().getHours();
        let greeting = 'Good Morning!';
        let sub = "Let's make today productive";

        if (hour >= 12 && hour < 17) {
            greeting = 'Good Afternoon!';
            sub = 'Keep up the momentum';
        } else if (hour >= 17 && hour < 21) {
            greeting = 'Good Evening!';
            sub = 'Wind down with your tasks';
        } else if (hour >= 21 || hour < 5) {
            greeting = 'Good Night!';
            sub = 'Review your day and rest well';
        }

        elements.greeting.textContent = greeting;
        elements.greetingSub.textContent = sub;
    }

    /**
     * Initialize current date display
     */
    function initDate() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        elements.currentDate.textContent = now.toLocaleDateString('en-US', options);
    }

    /**
     * Initialize sidebar navigation
     */
    function initNavigation() {
        elements.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Remove active class from all links
                elements.navLinks.forEach(l => l.classList.remove('active'));

                // Add active class to clicked link
                link.classList.add('active');

                // Close mobile menu
                closeMobileMenu();

                // Scroll to section
                const section = link.dataset.section;
                scrollToSection(section);
            });
        });
    }

    /**
     * Scroll to a section
     */
    function scrollToSection(section) {
        const sectionMap = {
            'dashboard': 'tasksModule',
            'tasks': 'tasksModule',
            'notes': 'notesModule',
            'timer': 'timerModule',
            'calendar': 'calendarModule'
        };

        const elementId = sectionMap[section];
        if (elementId) {
            const element = document.getElementById(elementId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    /**
     * Initialize mobile menu functionality
     */
    function initMobileMenu() {
        elements.mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        elements.sidebarOverlay.addEventListener('click', closeMobileMenu);

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
    }

    /**
     * Toggle mobile menu
     */
    function toggleMobileMenu() {
        elements.sidebar.classList.toggle('active');
        elements.sidebarOverlay.classList.toggle('active');
        document.body.style.overflow = elements.sidebar.classList.contains('active') ? 'hidden' : '';
    }

    /**
     * Close mobile menu
     */
    function closeMobileMenu() {
        elements.sidebar.classList.remove('active');
        elements.sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    /**
     * Initialize all modules
     */
    function initModules() {
        // Initialize modules sequentially for proper dependencies
        TasksModule.init();
        NotesModule.init();
        TimerModule.init();
        WeatherModule.init();
        CalendarModule.init();
    }

    // Initialize app when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Public API
    return {
        init,
        toggleTheme
    };
})();
