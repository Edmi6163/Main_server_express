function toggleLightMode() {
    // Remove dark mode class from body
    document.body.classList.remove('dark-mode');
    // Update local storage or any other state management
    localStorage.setItem('theme', 'light');
}

function toggleDarkMode() {
    // Add dark mode class to body
    document.body.classList.add('dark-mode');
    // Update local storage or any other state management
    localStorage.setItem('theme', 'dark');
}

// Function to check initial theme from local storage or any other source
function init_chat() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        toggleDarkMode();
    } else {
        toggleLightMode(); // Default to light mode
    }
}