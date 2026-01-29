# Contributing to V7 Smart Daily Planner

Thank you for your interest in contributing! ❤️

We welcome contributions of all kinds - from fixing typos to adding new features. This guide will help you get started.

---

## 🚀 Getting Started

### 1. Fork the Repository
Click the **Fork** button in the top-right corner of the repository page.

### 2. Clone Your Fork
```bash
git clone https://github.com/YOUR-USERNAME/v7-smart-daily-planner.git
cd v7-smart-daily-planner
```

### 3. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 4. Make Your Changes
Open `index.html` in your browser to see your changes live.

### 5. Commit Your Changes
```bash
git add .
git commit -m "feat: add awesome feature"
```

**Commit Message Format:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - CSS/formatting changes
- `refactor:` - Code refactoring

### 6. Push and Create PR
```bash
git push origin feature/your-feature-name
```
Then open a Pull Request on GitHub!

---

## 📌 Good First Issues

Look for issues labeled:

| Label | Description |
|-------|-------------|
| `good first issue` | Beginner-friendly tasks |
| `help wanted` | We need your help! |
| `documentation` | Improve docs |
| `enhancement` | New features |

---

## 🧹 Code Style Guidelines

### JavaScript
```javascript
// ✅ Good - Use meaningful names and ES6+
function calculateTotalTime(sessions) {
  return sessions.reduce((total, s) => total + s.duration, 0);
}

// ❌ Bad - Unclear naming
function calc(s) {
  return s.reduce((t, x) => t + x.d, 0);
}
```

### CSS
```css
/* ✅ Good - Use CSS variables and clear naming */
.task-card {
  background: var(--bg-card);
  border-radius: 12px;
}

/* ❌ Bad - Magic numbers and unclear names */
.tc {
  background: #fff;
  border-radius: 12px;
}
```

### HTML
```html
<!-- ✅ Good - Semantic and accessible -->
<button class="btn btn-primary" aria-label="Add task">
  Add Task
</button>

<!-- ❌ Bad - Non-semantic -->
<div class="btn" onclick="add()">Add Task</div>
```

---

## 📸 Adding Screenshots

This is a **great first contribution**!

1. Open the dashboard in your browser
2. Take screenshots of different views
3. Save to `assets/screenshots/` folder
4. Update `README.md` with new image paths

**Recommended screenshots:**
- Dashboard desktop (light mode)
- Dashboard desktop (dark mode)
- Mobile view
- Individual modules

---

## ✅ PR Checklist

Before submitting your PR, ensure:

- [ ] Code follows style guidelines
- [ ] No console errors
- [ ] Tested in Chrome & Firefox
- [ ] Tested on mobile (use dev tools)
- [ ] README updated (if needed)
- [ ] Meaningful commit messages

---

## 🔄 Syncing Your Fork

Keep your fork up to date:

```bash
git remote add upstream https://github.com/TheVaibhaw/v7-smart-daily-planner.git
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

---

## 💬 Need Help?

- Open a [Discussion](https://github.com/TheVaibhaw/v7-smart-daily-planner/discussions)
- Check existing [Issues](https://github.com/TheVaibhaw/v7-smart-daily-planner/issues)
- Read the code comments

---

## 🏆 Contributors

All contributors will be:
- Listed in our README
- Thanked in release notes
- Part of an awesome community!

---

**Happy coding! 🚀**

Every contribution, no matter how small, makes a difference.
