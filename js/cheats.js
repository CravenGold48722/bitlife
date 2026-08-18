/**
 * BitLife Cheat Menu - God Mode Features
 * Modify attributes, instant graduation, instant job selection
 */

class BitLifeCheats {
    constructor() {
        this.enabled = true;
        this.showPanel = false;
        this.unityInstance = null;
        this.cheatsData = {
            health: 100,
            intelligence: 100,
            looks: 100,
            happiness: 100,
            money: 1000000,
            fame: 100,
            job: '',
            college_degree: '',
        };
        this.jobs = [
            'CEO', 'Doctor', 'Lawyer', 'Teacher', 'Engineer', 'Artist',
            'Musician', 'Actor', 'Athlete', 'Politician', 'Scientist',
            'Pilot', 'Chef', 'Nurse', 'Developer', 'Designer', 'None'
        ];
        this.degrees = [
            'Computer Science', 'Business', 'Medicine', 'Law', 'Engineering',
            'Psychology', 'Biology', 'Chemistry', 'Physics', 'Mathematics',
            'History', 'English', 'Art', 'Music', 'Economics'
        ];
        this.init();
    }

    init() {
        this.createCheatsPanel();
        this.setupHotkeys();
        this.setupUnityHooks();
        this.loadAdvancedCheats();
        console.log('%c[BitLife Cheats] Initialized! Press Ctrl+Shift+C to toggle panel', 'color: #00ff00; font-weight: bold; font-size: 14px;');
    }

    loadAdvancedCheats() {
        // Dynamically load advanced cheats
        const script = document.createElement('script');
        script.src = 'js/advanced-cheats.js';
        script.onload = () => {
            console.log('%c[BitLife] Advanced features loaded', 'color: #00ffff;');
        };
        script.onerror = () => {
            console.warn('[BitLife] Advanced features not available');
        };
        document.head.appendChild(script);
    }

    createCheatsPanel() {
        // Remove old panel if exists
        const oldPanel = document.getElementById('bitlife-cheats-panel');
        if (oldPanel) oldPanel.remove();

        const panel = document.createElement('div');
        panel.id = 'bitlife-cheats-panel';
        panel.innerHTML = `
            <div class="cheats-header">
                <span class="cheats-title">🎮 BitLife God Mode</span>
                <button id="cheats-close-btn" class="cheats-close">×</button>
            </div>
            <div class="cheats-content">
                <div class="cheats-section">
                    <h3>📊 Character Attributes</h3>
                    <div class="cheats-slider">
                        <label>Health:</label>
                        <input type="range" id="health-slider" min="0" max="100" value="100">
                        <span id="health-value">100</span>
                    </div>
                    <div class="cheats-slider">
                        <label>Intelligence:</label>
                        <input type="range" id="intelligence-slider" min="0" max="100" value="100">
                        <span id="intelligence-value">100</span>
                    </div>
                    <div class="cheats-slider">
                        <label>Looks:</label>
                        <input type="range" id="looks-slider" min="0" max="100" value="100">
                        <span id="looks-value">100</span>
                    </div>
                    <div class="cheats-slider">
                        <label>Happiness:</label>
                        <input type="range" id="happiness-slider" min="0" max="100" value="100">
                        <span id="happiness-value">100</span>
                    </div>
                    <div class="cheats-slider">
                        <label>Money:</label>
                        <input type="number" id="money-input" value="1000000" min="0">
                        <button id="set-money-btn" class="cheats-btn">Set</button>
                    </div>
                    <div class="cheats-slider">
                        <label>Fame:</label>
                        <input type="range" id="fame-slider" min="0" max="100" value="100">
                        <span id="fame-value">100</span>
                    </div>
                </div>

                <div class="cheats-section">
                    <h3>🎓 Education & Career</h3>
                    <div class="cheats-control">
                        <label for="college-degree-select">College Degree:</label>
                        <select id="college-degree-select">
                            <option value="">None</option>
                            ${this.degrees.map(d => `<option value="${d}">${d}</option>`).join('')}
                        </select>
                        <button id="set-degree-btn" class="cheats-btn">Instant Graduate</button>
                    </div>
                    <div class="cheats-control">
                        <label for="job-select">Get Job:</label>
                        <select id="job-select">
                            <option value="">None</option>
                            ${this.jobs.map(j => `<option value="${j}">${j}</option>`).join('')}
                        </select>
                        <button id="set-job-btn" class="cheats-btn">Instant Hire</button>
                    </div>
                </div>

                <div class="cheats-section">
                    <h3>⚡ Actions</h3>
                    <button id="apply-all-cheats" class="cheats-btn cheats-btn-large">Apply All Changes</button>
                    <button id="reset-attributes" class="cheats-btn cheats-btn-large cheats-btn-danger">Reset to Default</button>
                </div>

                <div class="cheats-footer">
                    <small>Tip: Changes are applied to your character. Ctrl+Shift+C to toggle this panel.</small>
                </div>
            </div>
        `;

        document.body.appendChild(panel);
        this.attachPanelListeners();
        this.updatePanelVisibility();
    }

    attachPanelListeners() {
        // Sliders
        ['health', 'intelligence', 'looks', 'happiness', 'fame'].forEach(attr => {
            const slider = document.getElementById(`${attr}-slider`);
            const valueSpan = document.getElementById(`${attr}-value`);
            if (slider && valueSpan) {
                slider.addEventListener('input', (e) => {
                    this.cheatsData[attr] = parseInt(e.target.value);
                    valueSpan.textContent = e.target.value;
                });
            }
        });

        // Money input
        const moneyInput = document.getElementById('money-input');
        if (moneyInput) {
            moneyInput.addEventListener('change', (e) => {
                this.cheatsData.money = parseInt(e.target.value) || 0;
            });
        }

        // College degree
        const degreeSelect = document.getElementById('college-degree-select');
        if (degreeSelect) {
            degreeSelect.addEventListener('change', (e) => {
                this.cheatsData.college_degree = e.target.value;
            });
        }

        // Job selection
        const jobSelect = document.getElementById('job-select');
        if (jobSelect) {
            jobSelect.addEventListener('change', (e) => {
                this.cheatsData.job = e.target.value;
            });
        }

        // Buttons
        const closeBtn = document.getElementById('cheats-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.togglePanel());
        }

        const applyBtn = document.getElementById('apply-all-cheats');
        if (applyBtn) {
            applyBtn.addEventListener('click', () => this.applyAllCheats());
        }

        const resetBtn = document.getElementById('reset-attributes');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetToDefault());
        }

        const setDegreeBtn = document.getElementById('set-degree-btn');
        if (setDegreeBtn) {
            setDegreeBtn.addEventListener('click', () => this.instantGraduation());
        }

        const setJobBtn = document.getElementById('set-job-btn');
        if (setJobBtn) {
            setJobBtn.addEventListener('click', () => this.instantJobHire());
        }

        const setMoneyBtn = document.getElementById('set-money-btn');
        if (setMoneyBtn) {
            setMoneyBtn.addEventListener('click', () => this.applyAllCheats());
        }
    }

    setupHotkeys() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+Shift+C to toggle panel
            if (e.ctrlKey && e.shiftKey && e.code === 'KeyC') {
                e.preventDefault();
                this.togglePanel();
            }
        });
    }

    togglePanel() {
        this.showPanel = !this.showPanel;
        this.updatePanelVisibility();
    }

    updatePanelVisibility() {
        const panel = document.getElementById('bitlife-cheats-panel');
        if (panel) {
            panel.style.display = this.showPanel ? 'block' : 'none';
        }
    }

    setupUnityHooks() {
        // Wait for Unity instance to be ready
        window.addEventListener('load', () => {
            if (window.unityInstance) {
                this.unityInstance = window.unityInstance;
            }
        });

        // Alternative: Check periodically
        setInterval(() => {
            if (!this.unityInstance && window.unityInstance) {
                this.unityInstance = window.unityInstance;
            }
        }, 1000);
    }

    applyAllCheats() {
        console.log('[BitLife Cheats] Applying cheats:', this.cheatsData);
        this.applyAttributeChanges();
        this.applyMoneyChange();
        this.showNotification('All cheats applied! 🎮');
    }

    applyAttributeChanges() {
        // Send message to Unity WebGL
        try {
            if (this.unityInstance && this.unityInstance.SendMessage) {
                // Send individual attribute changes
                this.unityInstance.SendMessage('GameManager', 'SetHealth', this.cheatsData.health);
                this.unityInstance.SendMessage('GameManager', 'SetIntelligence', this.cheatsData.intelligence);
                this.unityInstance.SendMessage('GameManager', 'SetLooks', this.cheatsData.looks);
                this.unityInstance.SendMessage('GameManager', 'SetHappiness', this.cheatsData.happiness);
                this.unityInstance.SendMessage('GameManager', 'SetFame', this.cheatsData.fame);
            }
        } catch (e) {
            console.warn('[BitLife Cheats] Unity integration limited - using fallback storage', e);
            // Store in localStorage for game to read
            localStorage.setItem('bitlife_cheats', JSON.stringify(this.cheatsData));
        }
    }

    applyMoneyChange() {
        try {
            if (this.unityInstance && this.unityInstance.SendMessage) {
                this.unityInstance.SendMessage('GameManager', 'SetMoney', this.cheatsData.money);
            }
        } catch (e) {
            console.warn('[BitLife Cheats] Money update failed', e);
        }
    }

    instantGraduation() {
        const degree = this.cheatsData.college_degree;
        if (!degree) {
            this.showNotification('⚠️ Please select a degree first!');
            return;
        }

        console.log(`[BitLife Cheats] Instant graduation with ${degree} degree`);
        try {
            if (this.unityInstance && this.unityInstance.SendMessage) {
                this.unityInstance.SendMessage('GameManager', 'GraduateCollege', degree);
            }
        } catch (e) {
            console.warn('[BitLife Cheats] Graduation failed', e);
        }

        // Store completion in localStorage
        const collegeData = {
            graduated: true,
            degree: degree,
            timestamp: Date.now()
        };
        localStorage.setItem('bitlife_college_complete', JSON.stringify(collegeData));
        this.showNotification(`🎓 Instant graduation with ${degree} degree! Congratulations!`);
    }

    instantJobHire() {
        const job = this.cheatsData.job;
        if (!job || job === 'None') {
            this.showNotification('⚠️ Please select a job first!');
            return;
        }

        console.log(`[BitLife Cheats] Instant job hire: ${job}`);
        try {
            if (this.unityInstance && this.unityInstance.SendMessage) {
                this.unityInstance.SendMessage('GameManager', 'HireForJob', job);
            }
        } catch (e) {
            console.warn('[BitLife Cheats] Job hire failed', e);
        }

        // Store job in localStorage
        const jobData = {
            currentJob: job,
            hireDate: Date.now(),
            employed: true
        };
        localStorage.setItem('bitlife_current_job', JSON.stringify(jobData));
        this.showNotification(`💼 You've been hired as a ${job}! Welcome aboard!`);
    }

    resetToDefault() {
        if (confirm('Are you sure you want to reset all attributes to defaults?')) {
            this.cheatsData = {
                health: 100,
                intelligence: 100,
                looks: 100,
                happiness: 100,
                money: 1000000,
                fame: 100,
                job: '',
                college_degree: '',
            };

            // Update UI
            document.getElementById('health-slider').value = 100;
            document.getElementById('intelligence-slider').value = 100;
            document.getElementById('looks-slider').value = 100;
            document.getElementById('happiness-slider').value = 100;
            document.getElementById('fame-slider').value = 100;
            document.getElementById('money-input').value = 1000000;
            document.getElementById('college-degree-select').value = '';
            document.getElementById('job-select').value = '';

            ['health', 'intelligence', 'looks', 'happiness', 'fame'].forEach(attr => {
                document.getElementById(`${attr}-value`).textContent = '100';
            });

            this.applyAllCheats();
            this.showNotification('✨ Reset to defaults!');
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cheats-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Support for modifying NPC attributes
    modifyNPCAttribute(npcId, attribute, value) {
        try {
            if (this.unityInstance && this.unityInstance.SendMessage) {
                this.unityInstance.SendMessage('GameManager', 'SetNPCAttribute', `${npcId}|${attribute}|${value}`);
            }
        } catch (e) {
            console.warn('[BitLife Cheats] NPC modification failed', e);
        }
    }
}

// Initialize cheats when document is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.bitlifeCheats = new BitLifeCheats();
    });
} else {
    window.bitlifeCheats = new BitLifeCheats();
}
