/**
 * V7 Smart Daily Planner - Calendar Module
 * Monthly calendar with task count integration
 */

const CalendarModule = (function () {
    // State
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // DOM Elements
    let elements = {};

    // Month names
    const MONTHS = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    /**
     * Initialize the calendar module
     */
    function init() {
        cacheElements();
        bindEvents();
        render();
    }

    /**
     * Cache DOM elements
     */
    function cacheElements() {
        elements = {
            calendarTitle: document.getElementById('calendarTitle'),
            calendarDays: document.getElementById('calendarDays'),
            calendarPrev: document.getElementById('calendarPrev'),
            calendarNext: document.getElementById('calendarNext')
        };
    }

    /**
     * Bind event listeners
     */
    function bindEvents() {
        elements.calendarPrev.addEventListener('click', () => navigateMonth(-1));
        elements.calendarNext.addEventListener('click', () => navigateMonth(1));
    }

    /**
     * Navigate to previous/next month
     */
    function navigateMonth(direction) {
        currentMonth += direction;

        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        } else if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }

        render();
    }

    /**
     * Get days in month
     */
    function getDaysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    /**
     * Get first day of month (0 = Sunday, 6 = Saturday)
     */
    function getFirstDayOfMonth(month, year) {
        return new Date(year, month, 1).getDay();
    }

    /**
     * Format date to YYYY-MM-DD
     */
    function formatDateString(year, month, day) {
        const m = String(month + 1).padStart(2, '0');
        const d = String(day).padStart(2, '0');
        return `${year}-${m}-${d}`;
    }

    /**
     * Get task count for a specific date
     */
    function getTaskCountForDate(dateString) {
        if (typeof TasksModule !== 'undefined' && TasksModule.getTasksForDate) {
            return TasksModule.getTasksForDate(dateString).length;
        }
        return 0;
    }

    /**
     * Check if date is today
     */
    function isToday(year, month, day) {
        const today = new Date();
        return (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        );
    }

    /**
     * Render the calendar
     */
    function render() {
        // Update title
        elements.calendarTitle.textContent = `${MONTHS[currentMonth]} ${currentYear}`;

        // Get calendar data
        const daysInMonth = getDaysInMonth(currentMonth, currentYear);
        const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

        // Get previous month days
        const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        const daysInPrevMonth = getDaysInMonth(prevMonth, prevYear);

        let html = '';

        // Previous month days
        for (let i = firstDay - 1; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            const dateString = formatDateString(prevYear, prevMonth, day);
            const taskCount = getTaskCountForDate(dateString);

            html += `
        <div class="calendar-day other-month ${taskCount > 0 ? 'has-tasks' : ''}" data-date="${dateString}">
          ${day}
        </div>
      `;
        }

        // Current month days
        for (let day = 1; day <= daysInMonth; day++) {
            const dateString = formatDateString(currentYear, currentMonth, day);
            const taskCount = getTaskCountForDate(dateString);
            const todayClass = isToday(currentYear, currentMonth, day) ? 'today' : '';
            const hasTasksClass = taskCount > 0 ? 'has-tasks' : '';

            html += `
        <div class="calendar-day ${todayClass} ${hasTasksClass}" data-date="${dateString}">
          ${day}
        </div>
      `;
        }

        // Next month days to fill the grid
        const totalCells = firstDay + daysInMonth;
        const remainingCells = totalCells > 35 ? 42 - totalCells : 35 - totalCells;
        const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
        const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

        for (let day = 1; day <= remainingCells; day++) {
            const dateString = formatDateString(nextYear, nextMonth, day);
            const taskCount = getTaskCountForDate(dateString);

            html += `
        <div class="calendar-day other-month ${taskCount > 0 ? 'has-tasks' : ''}" data-date="${dateString}">
          ${day}
        </div>
      `;
        }

        elements.calendarDays.innerHTML = html;
    }

    // Public API
    return {
        init,
        render
    };
})();
