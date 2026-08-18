# 🎮 BitLife God Mode - Cheat System Guide

## Overview
This BitLife instance now includes a comprehensive **God Mode** cheat system that allows you to modify character attributes, instantly graduate from college, and get any job you want. All features are fully integrated and maintain game functionality.

## 🚀 Quick Start

### Activating the Cheat Panel
Press **`Ctrl + Shift + C`** to toggle the cheat panel on/off.

The panel will appear on the right side of your screen with a neon green hacker aesthetic.

## 📋 Features

### 1. 📊 Character Attributes
Modify your character's core stats:
- **Health** (0-100): Affects your character's physical condition
- **Intelligence** (0-100): Impacts career choices and income
- **Looks** (0-100): Influences relationships and modeling opportunities
- **Happiness** (0-100): Affects life quality and events
- **Fame** (0-100): Changes celebrity status and opportunities

Each attribute has a slider for precise control and shows real-time values.

### 2. 💰 Money
- Direct input field to set your character's cash balance
- Supports any amount (including millions!)
- Click "Set" button to apply changes

### 3. 🎓 Education & Career

#### Instant Graduation
1. Select a college degree from the dropdown menu:
   - Computer Science
   - Business
   - Medicine
   - Law
   - Engineering
   - Psychology
   - Biology
   - Chemistry
   - Physics
   - Mathematics
   - History
   - English
   - Art
   - Music
   - Economics

2. Click **"Instant Graduate"** button
3. Your character immediately receives the degree

#### Instant Job Hiring
1. Choose a job from the dropdown menu:
   - CEO
   - Doctor
   - Lawyer
   - Teacher
   - Engineer
   - Artist
   - Musician
   - Actor
   - Athlete
   - Politician
   - Scientist
   - Pilot
   - Chef
   - Nurse
   - Developer
   - Designer

2. Click **"Instant Hire"** button
3. You're immediately employed with full salary benefits

### 4. ⚡ Action Buttons

- **Apply All Changes**: Applies all current settings to your character
- **Reset to Default**: Returns all attributes to default values (100 health, intelligence, looks, happiness, 1M money, 100 fame)

## 🎮 How to Use

### Basic Workflow
1. Press `Ctrl + Shift + C` to open the cheat panel
2. Adjust the sliders or enter values for the attributes you want to modify
3. Click "Apply All Changes" when done
4. Changes take effect immediately in-game

### Advanced Usage

#### Console Access
You can also access the cheat system programmatically from the browser console:

```javascript
// Access the cheat system
window.BitLifeCheats

// Modify attributes directly
window.bitlifeCheats.cheatsData.health = 100;
window.bitlifeCheats.cheatsData.money = 5000000;

// Apply changes
window.bitlifeCheats.applyAllCheats();

// Instant graduation
window.bitlifeCheats.instantGraduation();

// Instant job hire
window.bitlifeCheats.instantJobHire();

// Toggle panel
window.bitlifeCheats.togglePanel();
```

#### Keyboard Shortcuts
- `Ctrl + Shift + C`: Toggle cheat panel visibility

## 💾 Data Persistence

Cheat values are stored in **localStorage** for persistence:
- `bitlife_cheats`: Main cheat data
- `bitlife_college_complete`: College graduation status
- `bitlife_current_job`: Current job information

## ⚙️ Technical Details

### File Structure
```
bitlife/
├── js/
│   ├── cheats.js        # Main cheat system
│   └── main.js          # Initialization script
├── css/
│   └── cheats.css       # Cheat panel styling
└── index.html           # Updated with cheat links
```

### Integration Points
- **Unity WebGL Communication**: Uses `UnityInstance.SendMessage()` for direct game integration
- **localStorage Fallback**: When direct integration isn't available, uses localStorage
- **Real-time UI Updates**: Panel updates reflect all changes immediately

## 🔧 Customization

### Adding New Jobs
Edit `js/cheats.js` and modify the `jobs` array:
```javascript
this.jobs = [
    'CEO', 'Doctor', 'Lawyer', // ... add more here
];
```

### Adding New Degrees
Edit `js/cheats.js` and modify the `degrees` array:
```javascript
this.degrees = [
    'Computer Science', 'Business', // ... add more here
];
```

### Changing Hotkey
Modify the hotkey listener in `js/cheats.js`:
```javascript
// Change KeyC to any key code
if (e.ctrlKey && e.shiftKey && e.code === 'KeyC') {
    // Toggle panel
}
```

## 🎨 Customizing Appearance

### Change Panel Colors
Edit `css/cheats.css` and modify color values:
```css
#bitlife-cheats-panel {
    border: 2px solid #00ff00;  /* Change border color */
}

.cheats-title {
    color: #00ff00;             /* Change title color */
}
```

### Available Color Codes
- **Green (Hacker)**: `#00ff00`
- **Blue**: `#0099ff`
- **Purple**: `#9900ff`
- **Red**: `#ff0000`

## 🐛 Troubleshooting

### Cheat Panel Not Appearing
1. Check browser console for errors: Press `F12`, go to Console tab
2. Try pressing `Ctrl + Shift + C` again
3. Refresh the page and try again

### Changes Not Applying
1. Ensure you click "Apply All Changes" button
2. Check that your browser allows localStorage
3. Try using the console commands instead

### Unity Integration Not Working
- The system will automatically fall back to localStorage storage
- Your changes will still work the next time you play

## ⚠️ Important Notes

- **Game Functionality**: All cheats are designed to maintain full game functionality
- **Save Compatibility**: Cheated characters work like normal characters
- **No Ban Risk**: This is a browser-based mod running locally - no servers are involved
- **Always Functional**: Even if one integration method fails, you have backups

## 📞 Support

For issues or feature requests:
1. Check the troubleshooting section above
2. Open browser console (`F12`) and check for error messages
3. Report issues on the GitHub repository

## 🎉 Features Summary

| Feature | Available | Hotkey |
|---------|-----------|--------|
| Attribute Editor | ✅ | - |
| Money Modifier | ✅ | - |
| Instant Graduation | ✅ | - |
| Instant Job Hiring | ✅ | - |
| Visual Panel | ✅ | Ctrl+Shift+C |
| Console Access | ✅ | - |
| LocalStorage Persistence | ✅ | - |
| NPC Modification | ✅ | - |

---

**Enjoy your enhanced BitLife experience! 🚀**

Press `Ctrl + Shift + C` to get started!
