/**
 * BitLife Main Script
 * Loads and initializes the cheat system
 */

console.log('%c[BitLife] Initializing main script...', 'color: #00ff00; font-weight: bold;');

// Load cheats CSS
function loadCheatStyles() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/cheats.css';
    document.head.appendChild(link);
    console.log('[BitLife] Cheat styles loaded');
}

// Load cheats JavaScript
function loadCheatScript() {
    const script = document.createElement('script');
    script.src = 'js/cheats.js';
    script.onload = () => {
        console.log('%c[BitLife] Cheat system loaded successfully!', 'color: #00ff00; font-weight: bold;');
    };
    script.onerror = () => {
        console.warn('%c[BitLife] Failed to load cheat system', 'color: #ff0000; font-weight: bold;');
    };
    document.head.appendChild(script);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        loadCheatStyles();
        loadCheatScript();
    });
} else {
    loadCheatStyles();
    loadCheatScript();
}

// Expose cheat system globally for console access
window.BitLifeCheats = window.bitlifeCheats;

console.log('%c[BitLife] Use Ctrl+Shift+C to toggle the cheat panel, or access via window.BitLifeCheats', 'color: #00ff00; font-style: italic;');
