# Contributing to V7 Smart Daily Planner

First off, thank you for considering contributing to V7 Smart Daily Planner! 🎉

It's people like you that make this project better for everyone. We welcome contributions of all kinds - from fixing typos to adding new features.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Code Style Guidelines](#code-style-guidelines)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

---

## 📜 Code of Conduct

This project follows a simple code of conduct:

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Be patient with others

---

## 🚀 Getting Started

### 1. Fork the Repository

Click the "Fork" button in the top-right corner of the repository page.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/v7-smart-daily-planner.git
cd v7-smart-daily-planner
```

### 3. Add Upstream Remote

```bash
git remote add upstream https://github.com/ORIGINAL-OWNER/v7-smart-daily-planner.git
```

### 4. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

---

## 🤝 How to Contribute

### Good First Issues

New to the project? Look for issues labeled:
- `good first issue` - Great for first-time contributors
- `help wanted` - We need your help!
- `documentation` - Help improve our docs

### Types of Contributions

| Type | Description |
|------|-------------|
| 🐛 Bug Fixes | Fix existing issues |
| ✨ Features | Add new functionality |
| 📝 Documentation | Improve README, comments, etc. |
| 🎨 UI/UX | Enhance design and user experience |
| ♿ Accessibility | Improve accessibility |
| ⚡ Performance | Optimize code performance |

---

## 💻 Development Setup

### Prerequisites

- A modern web browser
- A code editor (VS Code recommended)
- Git installed on your machine

### Running Locally

1. Open the project folder
2. Open `index.html` in your browser
   - Or use Live Server extension in VS Code
   - Or run: `python -m http.server 8000`

### Project Structure

```
├── index.html          # Main HTML file
├── css/
│   ├── main.css        # Core styles
│   └── themes.css      # Theme variables
├── js/
│   ├── app.js          # App initialization
│   ├── tasks.js        # Tasks module
│   ├── notes.js        # Notes module
│   ├── timer.js        # Timer module
│   ├── weather.js      # Weather module
│   └── calendar.js     # Calendar module
```

---

## 📏 Code Style Guidelines

### JavaScript

- Use ES6+ features (const/let, arrow functions, template literals)
- Use meaningful variable and function names
- Add JSDoc comments for functions
- Use the Module pattern (IIFE) for encapsulation
- Prefix localStorage keys with `v7-`

```javascript
/**
 * Good example
 */
function calculateTotalTime(sessions) {
  return sessions.reduce((total, s) => total + s.duration, 0);
}

// Avoid
function calc(s) {
  return s.reduce((t, x) => t + x.d, 0);
}
```

### CSS

- Use CSS custom properties for colors and values
- Follow BEM-like naming: `.module-element`
- Use flexbox/grid for layouts
- Mobile-first responsive design

```css
/* Good example */
.task-card {
  background: var(--bg-card);
  border-radius: 12px;
}

.task-card:hover {
  transform: translateX(4px);
}
```

### HTML

- Use semantic HTML5 elements
- Include proper accessibility attributes
- Use meaningful id and class names

---

## 🔄 Submitting a Pull Request

### 1. Sync with Upstream

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

### 2. Update Your Branch

```bash
git checkout your-branch
git rebase main
```

### 3. Push Your Changes

```bash
git push origin your-branch
```

### 4. Create Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your branch
4. Fill in the PR template:
   - Describe what you changed
   - Reference any related issues
   - Include screenshots if UI changes

### PR Checklist

- [ ] Code follows style guidelines
- [ ] No console errors
- [ ] Tested on multiple browsers
- [ ] Responsive design works
- [ ] Meaningful commit messages

---

## 🐛 Reporting Bugs

### Before Submitting

1. Search existing issues to avoid duplicates
2. Try reproducing in an incognito window
3. Clear localStorage and retry

### Bug Report Template

```markdown
**Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
```

---

## 💡 Suggesting Features

We love new ideas! When suggesting features:

1. Check if it's already suggested
2. Explain the use case
3. Describe the expected behavior
4. Consider implementation complexity

---

## 🏆 Recognition

Contributors will be:
- Listed in our README
- Thanked in release notes
- Part of an awesome community!

---

## ❓ Questions?

- Open a Discussion on GitHub
- Check existing issues for answers
- Be patient - we're all volunteers!

---

**Thank you for contributing! 🙏**

Every contribution, no matter how small, makes a difference.
