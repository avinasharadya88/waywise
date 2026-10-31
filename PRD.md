# Product Requirements Document (PRD)

## Product Name

**waywise** (formerly Personal Trip Planner)

---

## 1. Problem Statement

Planning a trip involves juggling multiple variables simultaneously—including budgets, travel times, personal preferences, and activity scheduling—to create an itinerary that actually works in practice. Travelers often get overwhelmed by disconnected recommendation lists, unrealistic travel times, and unexpected expenses, leading to poorly structured trips or planning fatigue.

---

## 2. Product Vision & Objective

**waywise** is an interactive, lightweight trip-planning tool that generates a realistic, coherent day-wise itinerary, estimates trip expenses, and dynamically recalculates the plan whenever user constraints change.

### Prototype Timeline

Designed for rapid implementation as a fully functional working prototype within **60 minutes**.

---

## 3. Core Principles & Constraints

1. **Coherence over Quantity**: Prioritize a realistic, coherent itinerary with feasible sequencing rather than an exhaustive dump of recommendations.
2. **Deterministic & Transparent Costing**: Estimate expenses strictly using supplied activity prices and explicit, clearly stated cost assumptions (e.g., standard daily estimates for meals and local transit).
3. **Reactive Constraint Handling**: Any change to inputs (budget, dates, destination, preferences) or activity replacements must instantly re-evaluate the itinerary and budget metrics.
4. **Clean & Simple UI**: Keep user interaction straightforward, focusing directly on the core planning workflow.

---

## 4. MVP Scope & Feature Specifications

### 4.1 Feature 1: User Inputs & Trip Constraints

The system must capture all necessary constraints from the user before generating an itinerary.

* **Destination**: Selection of target destination (matching available catalog data).
* **Trip Dates**: Start date and end date (determining the total number of trip days).
* **Budget**: Total target budget in monetary units (e.g., USD / INR).
* **Interests**: Multi-select tags defining traveler interests (e.g., *Culture & History*, *Food & Dining*, *Adventure & Outdoors*, *Relaxation & Leisure*).
* **Travel Preferences**: Pacing/travel style preference (e.g., *Relaxed* [1–2 activities/day] vs. *Standard / Active* [2–3 activities/day]).

**Acceptance Criteria:**

* The user cannot submit without selecting destination, dates (valid date range), budget (> 0), and at least one interest.
* The system computes `totalDays = (endDate - startDate) + 1`.
* `startDate` and `endDate` should be in `YYYY-MM-DD` format.
* `budget` should be a positive number.
* `Interests` should be a list of strings.
* `Travel Preferences` should be one of the following: *Relaxed*, *Standard*, *Active*.

---

### 4.2 Feature 2: Day-Wise Itinerary Generation

The system generates a structured, day-by-day plan covering each day of the trip.

* **Time Slots per Day**:
  * **Morning**: Cultural visits, walking tours, or outdoor sights.
  * **Afternoon**: Museums, central experiences, culinary tours, or shopping.
  * **Evening**: Scenic viewpoints, dinner experiences, or relaxed leisure.
* **Coherence Rules**:
  * Activities are assigned based on matching destination and selected interests.
  * Activities must not be duplicated within the same trip unless intentionally selected as recurring.
  * Number of daily activities aligns with the user's travel preference (Relaxed vs. Standard).

**Acceptance Criteria:**

* Output clearly displays Day 1 through Day $N$.
* Each day displays assigned activities segmented into logical time slots.
* Each activity item includes title, time slot, duration, category, and cost.
* Currency selection shall be provisioned.

---

### 4.3 Feature 3: Expense Estimation

The system must provide transparent, real-time cost estimations based on supplied data and explicit assumptions.

* **Itemized Costs**:
  * **Activity Fees**: Exact prices associated with each planned activity in the catalog.
  * **Daily Allowances (Stated Assumptions)**: Standardized per-day assumptions for baseline meals and local transport (e.g., \$40/day for food and \$15/day for local transit per person, clearly surfaced to the user).
* **Summary Metrics**:
  * **Total Estimated Trip Cost** = $\sum(\text{Activity Costs}) + (\text{Daily Meal/Transit Allowance} \times \text{Total Days})$.
  * **Remaining Budget** = $\text{Total Budget} - \text{Total Estimated Trip Cost}$.
  * **Budget Health Indicator**:
    * *Within Budget* (Remaining Budget $\ge 0$)
    * *Over Budget* (Remaining Budget $< 0$), with exact overage amount displayed.

**Acceptance Criteria:**

* All cost calculations must update immediately when activities change or budget inputs are modified.
* Stated assumptions (daily baseline meal/commute allowance) must be visibly identified to the user.

---

### 4.4 Feature 4: Interactive Activity Replacement

Users must have the ability to swap out any planned activity without breaking the rest of the schedule.

* **Swap Trigger**: Each activity card in the itinerary features a "Replace" / "Swap" action.
* **Alternative Options**: Clicking "Replace" displays valid alternatives for that destination and time slot, showing their category and price difference.
* **Immediate Replacement**: Selecting an alternative replaces the item in that specific day's slot and instantly updates the total cost.

**Acceptance Criteria:**

* User can replace an activity with one click from a list of compatible alternatives.
* The replaced activity is removed from the active itinerary and the new activity is placed in the designated slot.
* Expense calculations update immediately.

---

### 4.5 Feature 5: Dynamic Constraint Adjustment & Recalculation

Users can alter their core trip parameters on the fly without having to restart from scratch.

* **Budget Adjustment**: User can adjust the budget value; the cost breakdown recalculates instantly to show updated surplus/deficit.
* **Interest / Preference Shift**: Changing interests or pacing updates available suggestions or regenerates unpinned activities while retaining user-adjusted slots.

**Acceptance Criteria:**

* Modifying the budget field immediately reflects in the budget health indicator and remaining balance.
* Modifying dates adjusts the total days and prompts recalculation for added or trimmed days.

---

## 5. Core User Workflow

```
[ Step 1: Input Setup ]
- Select Destination
- Select Dates (e.g., Day 1 to Day 3)
- Enter Total Budget
- Choose Interests & Pacing Style
          │
          ▼
[ Step 2: Generate Itinerary ]
- System filters matching activities
- System schedules slots (Morning, Afternoon, Evening)
- System aggregates costs + baseline daily allowances
          │
          ▼
[ Step 3: Interactive Itinerary & Cost Dashboard in the specific currency ]
- View Day-by-Day schedule
- Review Estimated Expenses vs. Total Budget
          │
          ├───► [ Action: Replace an Activity ] ──┐
          │     - Select alternative activity      │
          │     - Recalculates cost balance ◄─────┘
          │
          └───► [ Action: Modify Budget / Dates ] ─┐
                - Update budget value or inputs    │
                - Instant status recalculation ◄───┘
```

---

## 6. Non-Functional Requirements

1. **Implementation Speed**: Built with clean, dependency-free or minimal-dependency architecture capable of being completed within 60 minutes.
2. **Zero External Network Dependencies**: Operates with a self-contained local sample dataset (no external booking APIs or live network scrapers required).
3. **Usability**: Single-page, intuitive layout where inputs, itinerary timeline, and budget metrics are easily visible and editable.
4. **Instant Responsiveness**: All recalculations, swaps, and budget checks execute synchronously on the client side without perceptible delay.

---

## 7. Out of Scope (Deferred Post-MVP)

* Real-time flight, rail, and hotel reservation booking engines.
* Live payment gateway integrations.
* Multi-user real-time collaborative planning.
* Geolocation GPS routing and real-time turn-by-turn navigation.

---

## 8. MVP Acceptance Checklist for Engineers

* [ ] User can enter destination, start/end dates, total budget, interests, and pacing.

* [ ] Submitting the form generates a cohesive day-by-day itinerary (Morning/Afternoon/Evening).
* [ ] Itinerary totals sum individual activity costs plus explicit baseline daily allowances.
* [ ] Budget tracker displays whether the trip is within or over budget.
* [ ] User can click "Replace" on any scheduled activity to substitute it with a valid alternative.
* [ ] Modifying the total budget instantly updates the financial indicators without reloading the page.
