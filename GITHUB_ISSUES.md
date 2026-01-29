# GitHub Issues for V7 Smart Daily Planner

Create these issues in your GitHub repository with the specified labels.

---

## Issue 1: Fix spacing in task card on mobile

**Labels:** `good first issue`, `help wanted`, `bug`

### Description
On mobile devices (screen width < 480px), the task card has inconsistent spacing between the checkbox and the task title. The gap appears too large on some devices.

### Expected Behavior
The spacing should be consistent and comfortable for touch interaction (around 0.5rem gap).

### Steps to Reproduce
1. Open the dashboard on a mobile device or use browser dev tools (375px width)
2. Add a task
3. Observe the spacing between the checkbox and title

### Files to Check
- `css/main.css` - Look for `.task-card` responsive styles

### Suggested Fix
Adjust the gap in the mobile media query for `.task-card`.

---

## Issue 2: Improve dark mode contrast

**Labels:** `good first issue`, `help wanted`, `enhancement`

### Description
Some text elements in dark mode have low contrast, making them harder to read. We should improve the contrast ratio to meet WCAG AA standards (4.5:1 for normal text).

### Areas to Improve
- Note preview text in notes module
- Task date/meta information
- Sidebar subtitle text

### Files to Check
- `css/themes.css` - Dark theme variables
- Look for `--text-tertiary` and `--text-secondary` in dark mode

### Resources
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## Issue 3: Add keyboard support to focus timer

**Labels:** `good first issue`, `help wanted`, `enhancement`

### Description
The focus timer currently only works with mouse clicks. Adding keyboard shortcuts would improve accessibility and user experience.

### Suggested Shortcuts
| Key | Action |
|-----|--------|
| Space | Start/Pause timer |
| R | Reset timer |
| Escape | Close alert modal |

### Implementation Notes
- Add event listeners for keydown events
- Only activate when timer module is visible/focused
- Consider using `tabindex` for focus management

### Files to Check
- `js/timer.js` - Add keyboard event handlers

---

## Issue 4: Improve README documentation

**Labels:** `good first issue`, `help wanted`, `documentation`

### Description
The README could be improved with:

1. **Screenshots** - Add actual screenshots of the dashboard in both light and dark mode
2. **GIF Demo** - Create a short GIF showing the main features
3. **Live Demo Link** - Deploy to GitHub Pages and add link
4. **Browser Compatibility** - Add a compatibility table

### How to Contribute
1. Take screenshots of the dashboard
2. Create a `screenshots` folder in the repository
3. Update README.md with the new images

### Bonus Points
- Create screenshots for both light and dark mode
- Show mobile responsive views
- Capture interactions (task completion, timer, etc.)

---

## Issue 5: Add empty state UI for notes

**Labels:** `good first issue`, `help wanted`, `enhancement`

### Description
When there are no notes, the empty state message is plain. We should add:

1. A nice illustration or icon
2. A more engaging message
3. A call-to-action button

### Current State
Just shows "No notes yet" with basic text.

### Expected State
- Large, friendly icon (maybe a notepad with sparkles)
- Encouraging message like "Capture your thoughts!"
- A button that says "Create Your First Note"

### Files to Check
- `index.html` - Update `#notesEmpty` element
- `css/main.css` - Style `.empty-state` class

### Design Reference
Look at how the tasks empty state is implemented for consistency.

---

## Additional Issues to Consider

### Issue 6: Add task due date reminders
**Labels:** `enhancement`, `help wanted`

Show visual indicator for tasks due today or overdue.

### Issue 7: Implement note categories
**Labels:** `enhancement`

Allow users to organize notes with color-coded categories.

### Issue 8: Add sound toggle for timer
**Labels:** `enhancement`, `help wanted`

Let users enable/disable the timer completion sound.

### Issue 9: Improve calendar accessibility
**Labels:** `accessibility`, `help wanted`

Add ARIA labels and keyboard navigation to calendar.

### Issue 10: Add data export feature
**Labels:** `feature`, `help wanted`

Export tasks and notes as JSON or CSV for backup.
