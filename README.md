# waywise 🧭

> **Intelligent Day-Wise Trip Planner & Sights Explorer**

**waywise** is an interactive, lightweight trip-planning web application that generates realistic, coherent day-by-day itineraries, estimates travel expenses with stated assumptions, and dynamically recalculates the plan whenever user constraints change.

---

## ✨ Features

- **Personalized Constraint Inputs**:
  - Destination selection (Paris, Tokyo, Bali, Rome, etc.).
  - Date range pickers strictly in `YYYY-MM-DD` format.
  - Multi-currency support with dynamic conversion (`USD $`, `INR ₹`, `EUR €`, `GBP £`, `JPY ¥`).
  - Total budget input with positive validation.
  - Traveler interests (`Culture & History`, `Food & Dining`, `Adventure & Outdoors`, `Relaxation & Leisure`).
  - Travel pacing styles (`Relaxed`, `Standard`, `Active`).

- **Coherent Day-Wise Itineraries**:
  - Automatically schedules structured time slots (**Morning**, **Afternoon**, **Evening**).
  - Pacing-aware logic (e.g., `Relaxed` keeps evenings open for spontaneous leisure).
  - Avoids duplicate activities during the trip.

- **Dynamic Expense Estimation**:
  - Itemized activity costs combined with transparent, stated baseline assumptions ($40/day dining, $15/day local transit).
  - Real-time budget health indicator (**Within Budget** vs **Over Budget**).
  - Quick-budget editor with instant reactive recalculation.

- **In-Place Activity Replacement (Swap)**:
  - 1-click replacement of any scheduled activity with compatible alternatives in that locality.
  - Surfaces real-time price differences (`+$10` or `-$5`) and immediately updates budget metrics without reloading.

- **Attractions & Stays Explorer**:
  - **Things to Visit & Sights**: Curated landmarks, historical monuments, culinary tastings, and viewpoints with photos, ratings, and durations.
  - **Where to Stay**: Handpicked boutique stays, apartments, and villas.
  - **Interactive Map**: Locality map pins with clickable activity previews.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+) or Python 3

### Running the App
1. Clone the repository:
   ```bash
   git clone https://github.com/avinasharadya88/waywise.git
   cd waywise
   ```

2. Start the local server:
   ```bash
   node server.js
   ```
   *(Alternatively, run `python3 -m http.server 3333`)*

3. Open your browser:
   ```
   http://localhost:3333/
   ```

---

## 📁 Repository Structure

```
waywise/
├── PRD.md              # Product Requirements Document
├── architecture.md     # System Architecture & Technical Specifications
├── index.html          # Semantic HTML5 frontend interface
├── server.js           # Lightweight local HTTP server
├── package.json        # Project metadata
├── css/
│   └── airbnb.css      # Design tokens, typography, layout & animations
└── js/
    ├── data.js         # Curated catalog of destinations, sights & stays
    └── app.js          # Core planning engine, currency converter & event handlers
```

---

## 📜 License
MIT License
