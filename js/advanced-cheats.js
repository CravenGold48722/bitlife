/**
 * BitLife Advanced Cheat Extensions
 * NPC Modification & Additional Features
 */

class BitLifeAdvancedCheats {
    constructor() {
        this.npcData = {};
        this.eventHooks = {};
        this.init();
    }

    init() {
        this.setupNPCHooks();
        this.setupGameHooks();
        console.log('%c[BitLife Advanced] Extended cheats loaded', 'color: #00ffff; font-weight: bold;');
    }

    setupNPCHooks() {
        // Monitor NPC interactions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('npc-card') || e.target.closest('.npc-card')) {
                const npcElement = e.target.closest('.npc-card');
                if (npcElement) {
                    this.onNPCInteraction(npcElement);
                }
            }
        }, true);
    }

    setupGameHooks() {
        // Hook into game update cycles
        const originalSetTimeout = window.setTimeout;
        window.setTimeout = function(...args) {
            if (args[1] && args[1] < 100) {
                // Intercept rapid updates
                return originalSetTimeout.apply(window, args);
            }
            return originalSetTimeout.apply(window, args);
        };
    }

    onNPCInteraction(npcElement) {
        console.log('[BitLife Advanced] NPC interaction detected', npcElement);
        
        // Add modify button to NPC interactions
        if (!npcElement.querySelector('.modify-npc-btn')) {
            const modBtn = document.createElement('button');
            modBtn.className = 'modify-npc-btn cheats-btn';
            modBtn.textContent = '⚡ Modify Stats';
            modBtn.style.marginTop = '10px';
            modBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showNPCModifier(npcElement);
            });
            npcElement.appendChild(modBtn);
        }
    }

    showNPCModifier(npcElement) {
        const npcName = npcElement.querySelector('.npc-name')?.textContent || 'NPC';
        
        const modal = document.createElement('div');
        modal.className = 'npc-modifier-modal';
        modal.innerHTML = `
            <div class="npc-modifier-content">
                <h2>Modify ${npcName}</h2>
                <div class="npc-stat-slider">
                    <label>Happiness:</label>
                    <input type="range" min="0" max="100" value="50" class="npc-happiness">
                    <span>50</span>
                </div>
                <div class="npc-stat-slider">
                    <label>Attractiveness:</label>
                    <input type="range" min="0" max="100" value="50" class="npc-attractiveness">
                    <span>50</span>
                </div>
                <div class="npc-stat-slider">
                    <label>Intelligence:</label>
                    <input type="range" min="0" max="100" value="50" class="npc-intelligence">
                    <span>50</span>
                </div>
                <button class="cheats-btn" onclick="this.parentElement.parentElement.remove()">Close</button>
            </div>
        `;
        modal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(26, 26, 46, 0.95);
            border: 2px solid #00ffff;
            border-radius: 12px;
            padding: 25px;
            z-index: 10001;
            box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
            max-width: 400px;
            color: #fff;
            font-family: Arial, sans-serif;
        `;

        document.body.appendChild(modal);

        // Setup slider listeners
        const happinessSlider = modal.querySelector('.npc-happiness');
        const attractivenessSlider = modal.querySelector('.npc-attractiveness');
        const intelligenceSlider = modal.querySelector('.npc-intelligence');

        [happinessSlider, attractivenessSlider, intelligenceSlider].forEach(slider => {
            slider.addEventListener('input', (e) => {
                e.target.parentElement.querySelector('span').textContent = e.target.value;
            });
        });
    }

    // Instant skill upgrade
    upgradeSkill(skillName, level = 100) {
        try {
            if (window.unityInstance && window.unityInstance.SendMessage) {
                window.unityInstance.SendMessage('GameManager', 'SetSkill', `${skillName}|${level}`);
            }
        } catch (e) {
            console.warn('[BitLife Advanced] Skill upgrade failed', e);
        }
    }

    // Age manipulation
    setAge(age) {
        try {
            if (window.unityInstance && window.unityInstance.SendMessage) {
                window.unityInstance.SendMessage('GameManager', 'SetAge', age);
            }
            localStorage.setItem('bitlife_player_age', age);
        } catch (e) {
            console.warn('[BitLife Advanced] Age setting failed', e);
        }
    }

    // Instant marriage
    instantMarriage(npcName) {
        try {
            if (window.unityInstance && window.unityInstance.SendMessage) {
                window.unityInstance.SendMessage('GameManager', 'Marry', npcName);
            }
            localStorage.setItem('bitlife_married', JSON.stringify({ spouse: npcName, date: Date.now() }));
        } catch (e) {
            console.warn('[BitLife Advanced] Marriage failed', e);
        }
    }

    // Crime manipulation
    setWantedLevel(level) {
        try {
            if (window.unityInstance && window.unityInstance.SendMessage) {
                window.unityInstance.SendMessage('GameManager', 'SetWantedLevel', level);
            }
        } catch (e) {
            console.warn('[BitLife Advanced] Wanted level setting failed', e);
        }
    }

    // Health manipulation
    setCauseOfDeath(cause) {
        console.warn('[BitLife Advanced] This feature is not recommended and may break saves');
    }
}

// Auto-initialize advanced cheats
if (window.bitlifeCheats) {
    window.bitlifeAdvancedCheats = new BitLifeAdvancedCheats();
    console.log('%c[BitLife Advanced] Advanced features available via window.bitlifeAdvancedCheats', 'color: #00ffff;');
}
