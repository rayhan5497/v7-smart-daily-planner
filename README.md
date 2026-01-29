# V7 Smart Daily Planner Dashboard

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome">
  <img src="https://img.shields.io/badge/contributions-welcome-orange.svg" alt="Contributions Welcome">
</p>

<p align="center">
  <strong>An all-in-one productivity dashboard for planning your day.</strong>
  <br>
  Tasks • Notes • Focus Timer • Weather • Calendar
</p>

---

## 🎯 Overview

V7 Smart Daily Planner is a modern, production-ready productivity dashboard built with vanilla HTML, CSS, and JavaScript. It helps users plan their day effectively with an intuitive interface and powerful features.

**No frameworks. No dependencies. Just clean, modular code.**

---

## ✨ Features

### 📋 Today's Tasks
- Add, edit, and delete tasks
- Mark tasks as complete
- Priority levels (Low / Medium / High)
- Filter by status (All / Active / Completed / High Priority)
- Data persistence with localStorage

### 📝 Quick Notes
- Create and edit notes with title and content
- Auto-save functionality (500ms debounce)
- Search notes by keyword
- Clean card-based layout

### ⏱️ Focus Timer (Pomodoro)
- 25-minute focus sessions
- 5-minute break intervals
- Start / Pause / Reset controls
- Visual circular progress indicator
- Session completion alerts
- Daily session tracking

### 🌤️ Weather Widget
- Current temperature and conditions
- Location-based weather (with geolocation)
- Humidity and wind speed details
- Fallback mock data when API unavailable
- Beautiful weather icons

### 📅 Calendar View
- Monthly calendar layout
- Today's date highlighted
- Task count indicators per day
- Previous/Next month navigation

### 🎨 UI/UX
- Modern dashboard layout
- Dark mode & Light mode toggle
- Fully responsive (mobile/tablet/desktop)
- Smooth animations and transitions
- Professional color palette

---

## 📸 Screenshots

> Screenshots coming soon! You can help by contributing screenshots of the dashboard.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic structure |
| CSS3 | Styling with Flexbox & Grid |
| JavaScript (ES6+) | Application logic |
| localStorage | Data persistence |
| Web Audio API | Timer notifications |
| Geolocation API | Weather location |

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser!

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/v7-smart-daily-planner.git
   ```

2. **Navigate to the project folder**
   ```bash
   cd v7-smart-daily-planner
   ```

3. **Open in browser**
   - Simply open `index.html` in your browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve
     ```

4. **Start planning your day!** 🎉

### Weather API (Optional)

To enable live weather data:
1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Open `js/weather.js`
3. Replace the empty `API_KEY` value with your key:
   ```javascript
   const API_KEY = 'your-api-key-here';
   ```

---

## 📁 Project Structure

```
v7-smart-daily-planner/
├── index.html          # Main HTML file
├── css/
│   ├── main.css        # Core styles and layout
│   └── themes.css      # Light/Dark theme variables
├── js/
│   ├── app.js          # Main app controller
│   ├── tasks.js        # Tasks module
│   ├── notes.js        # Notes module
│   ├── timer.js        # Focus timer module
│   ├── weather.js      # Weather widget module
│   └── calendar.js     # Calendar module
├── assets/
│   └── icons/          # SVG icons (inline in code)
├── README.md           # This file
└── CONTRIBUTING.md     # Contribution guidelines
```

---

## 🗺️ Roadmap

### Version 1.1 (Upcoming)
- [ ] Keyboard shortcuts for timer
- [ ] Task categories/tags
- [ ] Note color labels
- [ ] Export/Import data

### Version 1.2 (Future)
- [ ] Drag and drop task reordering
- [ ] Weekly calendar view
- [ ] Recurring tasks
- [ ] Analytics dashboard (with Chart.js)

### Version 2.0 (Long-term)
- [ ] PWA support (offline mode)
- [ ] Cloud sync (optional)
- [ ] Browser notifications
- [ ] Custom themes

---

## 🤝 Contributing

We welcome contributions from everyone! Check out our [Contributing Guide](CONTRIBUTING.md) to get started.

### Good First Issues

We have several beginner-friendly issues labeled `good first issue` - perfect for first-time contributors!

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💖 Acknowledgments

- Icons: Feather Icons (inline SVGs)
- Font: Inter (Google Fonts)
- Inspiration: Modern dashboard designs

---

<p align="center">
  Made with ❤️ for productivity enthusiasts
  <br>
  <a href="https://github.com/yourusername/v7-smart-daily-planner/issues">Report Bug</a>
  •
  <a href="https://github.com/yourusername/v7-smart-daily-planner/issues">Request Feature</a>
</p>
