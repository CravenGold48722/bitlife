/**
 * BitLife Cheat Configuration
 * Easy customization without editing main files
 */

const BITLIFE_CHEAT_CONFIG = {
    // Panel Configuration
    panel: {
        enabled: true,
        position: 'right',           // 'left' or 'right'
        width: '380px',
        hotkey: 'KeyC',              // With Ctrl+Shift
        theme: 'dark',               // 'dark' or 'light'
        autoHide: false,
        startHidden: true
    },

    // Default Values
    defaults: {
        health: 100,
        intelligence: 100,
        looks: 100,
        happiness: 100,
        money: 1000000,
        fame: 100
    },

    // Money Configuration
    money: {
        min: 0,
        max: 999999999,
        step: 1000,
        quickAmounts: [100000, 500000, 1000000, 5000000, 10000000]
    },

    // Available Jobs (16 options)
    jobs: [
        'CEO',
        'Doctor',
        'Lawyer',
        'Teacher',
        'Engineer',
        'Artist',
        'Musician',
        'Actor',
        'Athlete',
        'Politician',
        'Scientist',
        'Pilot',
        'Chef',
        'Nurse',
        'Developer',
        'Designer'
    ],

    // Available Degrees (15 options)
    degrees: [
        'Computer Science',
        'Business',
        'Medicine',
        'Law',
        'Engineering',
        'Psychology',
        'Biology',
        'Chemistry',
        'Physics',
        'Mathematics',
        'History',
        'English',
        'Art',
        'Music',
        'Economics'
    ],

    // Available Skills (for advanced cheats)
    skills: [
        'Cooking',
        'Athletics',
        'Intelligence',
        'Looks',
        'Singing',
        'Dancing',
        'Comedy',
        'Driving',
        'Shooting',
        'Martial Arts'
    ],

    // UI Configuration
    ui: {
        colorScheme: {
            primary: '#00ff00',      // Neon green
            secondary: '#00ffff',    // Cyan
            danger: '#ff0000',       // Red
            warning: '#ffff00',      // Yellow
            success: '#00ff00'       // Green
        },
        fontFamily: 'Arial, sans-serif',
        fontSize: '13px',
        animations: true,
        notifications: true
    },

    // Integration Configuration
    integration: {
        unityEnabled: true,
        localStorageEnabled: true,
        fallbackMode: true,         // Use localStorage if Unity fails
        persistData: true
    },

    // Advanced Features
    advanced: {
        npcModification: true,
        ageManipulation: true,
        skillUpgrades: true,
        crimeControl: true,
        marriageAcceleration: true
    },

    // Storage Configuration
    storage: {
        prefix: 'bitlife_',
        keys: {
            main: 'bitlife_cheats',
            college: 'bitlife_college_complete',
            job: 'bitlife_current_job',
            age: 'bitlife_player_age',
            married: 'bitlife_married'
        }
    },

    // Logging Configuration
    logging: {
        enabled: true,
        level: 'info',              // 'error', 'warn', 'info', 'debug'
        style: 'color: #00ff00; font-weight: bold;'
    },

    // Validation Configuration
    validation: {
        minAge: 0,
        maxAge: 120,
        minMoney: 0,
        maxMoney: 999999999,
        minStat: 0,
        maxStat: 100
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BITLIFE_CHEAT_CONFIG;
}

// Make globally available
window.BITLIFE_CHEAT_CONFIG = BITLIFE_CHEAT_CONFIG;

// Helper function to get config value
function getCheatConfig(path, defaultValue = null) {
    const keys = path.split('.');
    let value = BITLIFE_CHEAT_CONFIG;
    
    for (let key of keys) {
        if (value && typeof value === 'object' && key in value) {
            value = value[key];
        } else {
            return defaultValue;
        }
    }
    
    return value;
}

// Helper function to set config value
function setCheatConfig(path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    let obj = BITLIFE_CHEAT_CONFIG;
    
    for (let key of keys) {
        if (!(key in obj)) {
            obj[key] = {};
        }
        obj = obj[key];
    }
    
    obj[lastKey] = value;
}

// Log configuration load
if (BITLIFE_CHEAT_CONFIG.logging.enabled) {
    console.log(
        `%c[BitLife Config] Loaded with ${Object.keys(BITLIFE_CHEAT_CONFIG).length} settings`,
        BITLIFE_CHEAT_CONFIG.logging.style
    );
}
