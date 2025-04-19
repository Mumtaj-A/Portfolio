document.addEventListener('DOMContentLoaded', () => {
    // Style Switcher Toggler
    const styleSwitcherToggler = document.querySelector('.style-switcher-toggler');
    const styleSwitcher = document.querySelector('.style-switcher');
    
    styleSwitcherToggler.addEventListener('click', () => {
        styleSwitcher.classList.toggle('open');
    });

    // Day/Night Mode
    const dayNight = document.querySelector('.day-night');
    dayNight.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        dayNight.querySelector('i').classList.toggle('fa-sun');
        dayNight.querySelector('i').classList.toggle('fa-moon');
        localStorage.setItem('themeMode', document.body.classList.contains('dark') ? 'dark' : 'light');
    });

    // Load saved theme mode
    if (localStorage.getItem('themeMode') === 'dark') {
        document.body.classList.add('dark');
        dayNight.querySelector('i').classList.add('fa-sun');
        dayNight.querySelector('i').classList.remove('fa-moon');
    }

    // Theme Colors
    window.setActiveStyle = function(theme) {
        document.querySelectorAll('.alternate-style').forEach(style => {
            style.disabled = style.getAttribute('title') !== theme;
        });
        localStorage.setItem('theme', theme);
    };

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setActiveStyle(savedTheme);
    }
});