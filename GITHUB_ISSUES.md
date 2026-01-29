# Pre-Built GitHub Issues

Copy and paste these issues into your GitHub repository.

---

## 📋 Issue 1: Add Screenshots to README

**Title:** Add project screenshots for dashboard sections

**Labels:** `good first issue`, `help wanted`, `documentation`

**Description:**
```
## 📸 Task
Add screenshots to the README to showcase the dashboard.

## 🎯 What's Needed
- Dashboard in light mode (desktop)
- Dashboard in dark mode (desktop)  
- Mobile view
- Individual module screenshots (optional)

## 📁 Where to Add
1. Save screenshots to `assets/screenshots/`
2. Update `README.md` with correct image paths

## 💡 Tips
- Use browser dev tools for consistent sizing
- Desktop: 1920x1080
- Mobile: 375x667

This is a great first contribution! 🎉
```

---

## 📋 Issue 2: Improve Dark Mode Contrast

**Title:** Improve dark mode contrast for better readability

**Labels:** `good first issue`, `help wanted`, `enhancement`

**Description:**
```
## 🌙 Problem
Some text elements in dark mode have low contrast, making them hard to read.

## 🎯 Areas to Fix
- Note preview text (too dim)
- Task meta information (dates, priority labels)
- Sidebar subtitle text

## 📁 Files to Edit
- `css/themes.css` - Look for `[data-theme="dark"]`
- Focus on `--text-tertiary` and `--text-secondary` variables

## ✅ Success Criteria
- Text contrast ratio of at least 4.5:1
- Easy to read on dark backgrounds

## 🔗 Resources
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
```

---

## 📋 Issue 3: Add Keyboard Support for Focus Timer

**Title:** Add keyboard controls to focus timer

**Labels:** `good first issue`, `help wanted`, `enhancement`

**Description:**
```
## ⌨️ Feature Request
Add keyboard shortcuts to control the focus timer.

## 🎯 Suggested Shortcuts
| Key | Action |
|-----|--------|
| Space | Start/Pause timer |
| R | Reset timer |
| Escape | Close alert modal |

## 📁 Files to Edit
- `js/timer.js` - Add keyboard event listeners

## 💡 Implementation Hints
1. Add `keydown` event listener to document
2. Check if timer module is in view
3. Call existing `start()`, `pause()`, `reset()` functions

## ✅ Success Criteria
- [ ] Space toggles start/pause
- [ ] R key resets timer
- [ ] Esc closes completion alert
```

---

## 📋 Issue 4: Improve Mobile Layout for Notes Module

**Title:** Fix responsive layout for notes module on mobile

**Labels:** `good first issue`, `help wanted`, `responsive`

**Description:**
```
## 📱 Problem
On small screens (< 480px), the notes grid can have layout issues.

## 🎯 What Needs Fixing
- Note cards may overflow
- Search input too wide
- Add note button alignment

## 📁 Files to Edit
- `css/main.css` - Look for `@media (max-width: 480px)`
- Check `.notes-grid` and `.note-card` styles

## 💡 Tips
- Use browser dev tools to test mobile sizes
- Test on 375px width (iPhone SE)
- Check landscape orientation too

## ✅ Success Criteria
- [ ] Notes display properly on 375px width
- [ ] No horizontal scrolling
- [ ] All buttons accessible
```

---

## 📋 Issue 5: Add Empty State Illustration for Notes

**Title:** Add visual empty state for notes module

**Labels:** `good first issue`, `help wanted`, `enhancement`

**Description:**
```
## 🎨 Enhancement
The notes empty state could be more visually engaging.

## 🎯 Current State
Just shows "No notes yet" text.

## ✨ Desired State
- Nice SVG illustration/icon
- Friendly message like "Capture your thoughts!"
- Clear call-to-action

## 📁 Files to Edit
- `index.html` - Update `#notesEmpty` element
- `css/main.css` - Style `.empty-state` if needed

## 💡 Reference
Check how the tasks empty state is done for consistency.

## ✅ Success Criteria
- [ ] Visually appealing empty state
- [ ] Matches overall design aesthetic
- [ ] Has clear CTA button
```

---

## 🏷️ Required Labels

Make sure these labels exist in your repository:

| Label | Color | Description |
|-------|-------|-------------|
| `good first issue` | `#7057ff` | Good for newcomers |
| `help wanted` | `#008672` | Extra attention needed |
| `documentation` | `#0075ca` | Improvements to docs |
| `enhancement` | `#a2eeef` | New feature or request |
| `bug` | `#d73a4a` | Something isn't working |
| `responsive` | `#fbca04` | Mobile/responsive issues |

---

## 📝 How to Create Issues

1. Go to your repository on GitHub
2. Click **Issues** → **New Issue**
3. Copy the title and description from above
4. Add the appropriate labels
5. Click **Submit new issue**

That's it! Your project is now ready for contributors! 🎉
