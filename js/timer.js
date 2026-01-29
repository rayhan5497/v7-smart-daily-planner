/**
 * V7 Smart Daily Planner - Focus Timer Module
 * Pomodoro-style timer with start, pause, reset controls
 */

const TimerModule = (function () {
    // Constants
    const FOCUS_DURATION = 25 * 60; // 25 minutes in seconds
    const BREAK_DURATION = 5 * 60;  // 5 minutes in seconds
    const STORAGE_KEY = 'v7-timer-stats';
    const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * 45; // r=45 from SVG

    // State
    let timeRemaining = FOCUS_DURATION;
    let isRunning = false;
    let isBreak = false;
    let intervalId = null;
    let sessions = 0;
    let totalFocusTime = 0;

    // DOM Elements
    let elements = {};

    /**
     * Initialize the timer module
     */
    function init() {
        cacheElements();
        loadStats();
        bindEvents();
        render();
    }

    /**
     * Cache DOM elements
     */
    function cacheElements() {
        elements = {
            timerTime: document.getElementById('timerTime'),
            timerLabel: document.getElementById('timerLabel'),
            timerProgress: document.getElementById('timerProgress'),
            timerStart: document.getElementById('timerStart'),
            timerPause: document.getElementById('timerPause'),
            timerReset: document.getElementById('timerReset'),
            sessionsCount: document.getElementById('sessionsCount'),
            totalFocusTime: document.getElementById('totalFocusTime'),
            timerAlert: document.getElementById('timerAlert'),
            timerAlertTitle: document.getElementById('timerAlertTitle'),
            timerAlertMessage: document.getElementById('timerAlertMessage'),
            timerAlertDismiss: document.getElementById('timerAlertDismiss')
        };

        // Set initial stroke-dasharray
        elements.timerProgress.style.strokeDasharray = CIRCLE_CIRCUMFERENCE;
        elements.timerProgress.style.strokeDashoffset = 0;
    }

    /**
     * Bind event listeners
     */
    function bindEvents() {
        elements.timerStart.addEventListener('click', start);
        elements.timerPause.addEventListener('click', pause);
        elements.timerReset.addEventListener('click', reset);
        elements.timerAlertDismiss.addEventListener('click', dismissAlert);
    }

    /**
     * Load timer stats from localStorage
     */
    function loadStats() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const stats = JSON.parse(stored);
                sessions = stats.sessions || 0;
                totalFocusTime = stats.totalFocusTime || 0;

                // Reset stats if from a different day
                const lastDate = stats.lastDate;
                const today = new Date().toISOString().split('T')[0];
                if (lastDate !== today) {
                    sessions = 0;
                    totalFocusTime = 0;
                    saveStats();
                }
            }
        } catch (error) {
            console.error('Error loading timer stats:', error);
        }
    }

    /**
     * Save timer stats to localStorage
     */
    function saveStats() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                sessions,
                totalFocusTime,
                lastDate: new Date().toISOString().split('T')[0]
            }));
        } catch (error) {
            console.error('Error saving timer stats:', error);
        }
    }

    /**
     * Start the timer
     */
    function start() {
        if (isRunning) return;

        isRunning = true;
        updateButtonStates();

        intervalId = setInterval(() => {
            timeRemaining--;

            if (!isBreak) {
                totalFocusTime++;
                if (totalFocusTime % 60 === 0) {
                    saveStats();
                    updateStats();
                }
            }

            render();

            if (timeRemaining <= 0) {
                complete();
            }
        }, 1000);
    }

    /**
     * Pause the timer
     */
    function pause() {
        if (!isRunning) return;

        isRunning = false;
        clearInterval(intervalId);
        intervalId = null;
        updateButtonStates();
    }

    /**
     * Reset the timer
     */
    function reset() {
        pause();
        isBreak = false;
        timeRemaining = FOCUS_DURATION;
        render();
    }

    /**
     * Complete a session
     */
    function complete() {
        pause();

        if (!isBreak) {
            // Focus session completed
            sessions++;
            saveStats();
            showAlert(
                'Focus Session Complete!',
                'Great work! Take a 5-minute break.'
            );

            // Switch to break
            isBreak = true;
            timeRemaining = BREAK_DURATION;
        } else {
            // Break completed
            showAlert(
                'Break Over!',
                'Ready for another focus session?'
            );

            // Switch back to focus
            isBreak = false;
            timeRemaining = FOCUS_DURATION;
        }

        render();
    }

    /**
     * Show timer alert
     */
    function showAlert(title, message) {
        elements.timerAlertTitle.textContent = title;
        elements.timerAlertMessage.textContent = message;
        elements.timerAlert.classList.add('active');

        // Play notification sound (optional - using Web Audio API)
        playNotificationSound();
    }

    /**
     * Dismiss timer alert
     */
    function dismissAlert() {
        elements.timerAlert.classList.remove('active');
    }

    /**
     * Play a simple notification sound using Web Audio API
     */
    function playNotificationSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (error) {
            // Audio not supported, fail silently
        }
    }

    /**
     * Update button states
     */
    function updateButtonStates() {
        elements.timerStart.disabled = isRunning;
        elements.timerPause.disabled = !isRunning;
    }

    /**
     * Update stats display
     */
    function updateStats() {
        elements.sessionsCount.textContent = sessions;
        elements.totalFocusTime.textContent = formatFocusTime(totalFocusTime);
    }

    /**
     * Render timer display
     */
    function render() {
        // Update time display
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        elements.timerTime.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        // Update label
        elements.timerLabel.textContent = isBreak ? 'Break Time' : 'Focus Time';

        // Update progress circle
        const totalDuration = isBreak ? BREAK_DURATION : FOCUS_DURATION;
        const progress = timeRemaining / totalDuration;
        const offset = CIRCLE_CIRCUMFERENCE * (1 - progress);
        elements.timerProgress.style.strokeDashoffset = offset;

        // Update progress color based on mode
        elements.timerProgress.style.stroke = isBreak
            ? 'var(--color-accent)'
            : 'var(--color-primary)';

        // Update stats
        updateStats();
    }

    /**
     * Format focus time for display
     */
    function formatFocusTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);

        if (hours > 0) {
            return `${hours}h ${mins}m`;
        }
        return `${mins}m`;
    }

    // Public API
    return {
        init,
        render
    };
})();
