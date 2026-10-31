// waywise — Core Logic & Application Controller

document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // 1. Central Application State (Grounded in PRD & Architecture Contracts)
  // =========================================================================
  const state = {
    constraints: {
      destination: "Paris",
      startDate: "2026-11-14",
      endDate: "2026-11-16",
      totalBudget: 450,       // in active currency
      currency: "USD",
      interests: ["Culture", "Food", "Adventure"],
      travelStyle: "Standard" // 'Relaxed' | 'Standard' | 'Active'
    },
    itinerary: null,
    expenseSummary: null,
    activeTab: "itinerary",   // 'itinerary' | 'places' | 'stays' | 'map'
    currentSwapTarget: null   // { dayIndex, slotName, currentActivity }
  };

  // =========================================================================
  // 2. DOM Elements
  // =========================================================================
  // Header & Controls
  const currencySelect = document.getElementById("currencySelect");
  const togglePanelBtn = document.getElementById("togglePanelBtn");
  const plannerPanel = document.getElementById("plannerPanel");
  const compactPill = document.getElementById("compactPill");
  const pillDestVal = document.getElementById("pillDestVal");
  const pillDatesVal = document.getElementById("pillDatesVal");
  const pillBudgetVal = document.getElementById("pillBudgetVal");

  // Form Inputs
  const destInput = document.getElementById("destInput");
  const startDateInput = document.getElementById("startDateInput");
  const endDateInput = document.getElementById("endDateInput");
  const budgetInput = document.getElementById("budgetInput");
  const generateTripBtn = document.getElementById("generateTripBtn");
  const interestsGroup = document.getElementById("interestsGroup");
  const styleGroup = document.getElementById("styleGroup");

  // Budget Status Ribbon
  const budgetHealthPill = document.getElementById("budgetHealthPill");
  const healthIcon = document.getElementById("healthIcon");
  const healthText = document.getElementById("healthText");
  const metricTotalCost = document.getElementById("metricTotalCost");
  const metricActivityCost = document.getElementById("metricActivityCost");
  const metricAssumptionsCost = document.getElementById("metricAssumptionsCost");
  const quickBudgetInput = document.getElementById("quickBudgetInput");
  const assumpMealsVal = document.getElementById("assumpMealsVal");
  const assumpTransitVal = document.getElementById("assumpTransitVal");

  // Views & Tabs
  const tabBtns = document.querySelectorAll(".tab-btn");
  const viewItinerary = document.getElementById("viewItinerary");
  const viewPlaces = document.getElementById("viewPlaces");
  const viewStays = document.getElementById("viewStays");
  const viewMap = document.getElementById("viewMap");
  const tabItineraryDays = document.getElementById("tabItineraryDays");
  const tabPlacesCount = document.getElementById("tabPlacesCount");
  const tabStaysCount = document.getElementById("tabStaysCount");
  const sightsCityName = document.getElementById("sightsCityName");
  const staysCityName = document.getElementById("staysCityName");
  const placesGrid = document.getElementById("placesGrid");
  const staysGrid = document.getElementById("staysGrid");
  const mapPinsLayer = document.getElementById("mapPinsLayer");

  // Modals
  const swapModalOverlay = document.getElementById("swapModalOverlay");
  const swapModalSubtitle = document.getElementById("swapModalSubtitle");
  const swapCandidatesList = document.getElementById("swapCandidatesList");
  const closeSwapModalBtn = document.getElementById("closeSwapModalBtn");
  const detailModalOverlay = document.getElementById("detailModalOverlay");
  const detailModalContainer = document.getElementById("detailModalContainer");

  // =========================================================================
  // 3. Currency & Pricing Helpers
  // =========================================================================
  function getCurrencySymbol() {
    return PLANNER_DATA.currencies[state.constraints.currency].symbol;
  }

  function getCurrencyRate() {
    return PLANNER_DATA.currencies[state.constraints.currency].rate;
  }

  // Converts a USD base amount to the active currency
  function convertUSD(usdAmount) {
    const rate = getCurrencyRate();
    return Math.round(usdAmount * rate);
  }

  function formatMoney(amountInActiveCurrency) {
    const sym = getCurrencySymbol();
    return `${sym}${Number(amountInActiveCurrency).toLocaleString()}`;
  }

  function getDailyAssumptionsInActiveCurrency() {
    const meals = convertUSD(PLANNER_DATA.assumptions.dailyMealsCostUSD);
    const transit = convertUSD(PLANNER_DATA.assumptions.dailyTransitCostUSD);
    return { meals, transit, dailyTotal: meals + transit };
  }

  // =========================================================================
  // 4. Coherent Day-Wise Itinerary Generator (PRD Feature 2 & Architecture 4.1)
  // =========================================================================
  function calculateTotalDays(startStr, endStr) {
    const start = new Date(startStr);
    const end = new Date(endStr);
    const diffTime = end - start;
    if (isNaN(diffTime) || diffTime < 0) return 1;
    return Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }

  function generateItinerary() {
    const c = state.constraints;
    const totalDays = calculateTotalDays(c.startDate, c.endDate);

    // Filter available activities by destination and interests
    let matching = PLANNER_DATA.activities.filter(act =>
      act.destination === c.destination && c.interests.includes(act.category)
    );

    // Fallback: If matching activities are sparse, include all destination activities
    if (matching.length < totalDays * 2) {
      matching = PLANNER_DATA.activities.filter(act => act.destination === c.destination);
    }

    // Sort/prioritize for Active travel style if selected
    if (c.travelStyle === "Active") {
      matching.sort((a, b) => (b.category === "Adventure" ? 1 : 0) - (a.category === "Adventure" ? 1 : 0));
    }

    const usedIds = new Set();
    const days = [];
    const baseDate = new Date(c.startDate);

    for (let dayIndex = 1; dayIndex <= totalDays; dayIndex++) {
      const curDate = new Date(baseDate);
      curDate.setDate(baseDate.getDate() + (dayIndex - 1));
      const dateString = curDate.toISOString().split("T")[0];

      const slots = {
        morning: null,
        afternoon: null,
        evening: null
      };

      // Determine active slots based on travelStyle:
      // 'Relaxed': Morning + Afternoon (Evening reserved for open leisure)
      // 'Standard' & 'Active': Morning + Afternoon + Evening
      const targetSlots = (c.travelStyle === "Relaxed")
        ? ["Morning", "Afternoon"]
        : ["Morning", "Afternoon", "Evening"];

      targetSlots.forEach(slotName => {
        // Find best candidate for this slot not yet used
        let candidate = matching.find(act => act.timeSlot === slotName && !usedIds.has(act.id));
        // Fallback: any unused activity
        if (!candidate) {
          candidate = matching.find(act => !usedIds.has(act.id));
        }
        if (candidate) {
          slots[slotName.toLowerCase()] = { ...candidate };
          usedIds.add(candidate.id);
        }
      });

      days.push({
        dayNumber: dayIndex,
        date: dateString,
        slots: slots
      });
    }

    state.itinerary = {
      destination: c.destination,
      totalDays: totalDays,
      days: days
    };

    recalculateExpenses();
    renderAllViews();
  }

  // =========================================================================
  // 5. Dynamic Expense Estimation Engine (PRD Feature 3 & Architecture 4.2)
  // =========================================================================
  function recalculateExpenses() {
    if (!state.itinerary) return;

    const totalDays = state.itinerary.totalDays;
    const { meals, transit, dailyTotal } = getDailyAssumptionsInActiveCurrency();

    // Sum activity costs across all scheduled days
    let totalActivityCost = 0;
    state.itinerary.days.forEach(day => {
      let daySum = 0;
      Object.values(day.slots).forEach(act => {
        if (act) {
          daySum += convertUSD(act.costUSD);
        }
      });
      day.dailyActivityCost = daySum;
      totalActivityCost += daySum;
    });

    const totalAssumptionsCost = dailyTotal * totalDays;
    const grandEstimatedCost = totalActivityCost + totalAssumptionsCost;
    const userBudget = Number(state.constraints.totalBudget);
    const balance = userBudget - grandEstimatedCost;
    const isOverBudget = balance < 0;
    const overageAmount = Math.max(0, -balance);

    state.expenseSummary = {
      totalActivityCost,
      totalEstimatedMeals: meals * totalDays,
      totalEstimatedTransit: transit * totalDays,
      totalAssumptionsCost,
      grandEstimatedCost,
      userBudget,
      balance,
      isOverBudget,
      overageAmount
    };

    updateBudgetRibbonUI();
  }

  function updateBudgetRibbonUI() {
    const s = state.expenseSummary;
    if (!s) return;

    // Budget Health Badge
    if (s.isOverBudget) {
      budgetHealthPill.className = "budget-health-pill over";
      healthIcon.textContent = "⚠️";
      healthText.textContent = `Over Budget by ${formatMoney(s.overageAmount)}`;
    } else {
      budgetHealthPill.className = "budget-health-pill within";
      healthIcon.textContent = "✓";
      healthText.textContent = `Within Budget (Remaining: ${formatMoney(s.balance)})`;
    }

    // Metric Values
    metricTotalCost.textContent = formatMoney(s.grandEstimatedCost);
    metricActivityCost.textContent = formatMoney(s.totalActivityCost);
    metricAssumptionsCost.textContent = formatMoney(s.totalAssumptionsCost);
    quickBudgetInput.value = s.userBudget;

    // Assumptions Note
    const { meals, transit } = getDailyAssumptionsInActiveCurrency();
    assumpMealsVal.textContent = formatMoney(meals);
    assumpTransitVal.textContent = formatMoney(transit);

    // Compact Header Pill text
    pillDestVal.textContent = state.constraints.destination;
    pillDatesVal.textContent = `${state.itinerary.totalDays} Days (${state.constraints.startDate.slice(5)} to ${state.constraints.endDate.slice(5)})`;
    pillBudgetVal.textContent = `Budget: ${formatMoney(s.userBudget)}`;

    // Update Currency Symbols in Labels
    document.querySelectorAll(".currency-symbol").forEach(el => {
      el.textContent = getCurrencySymbol();
    });
  }

  // =========================================================================
  // 6. View Rendering Controllers
  // =========================================================================
  function renderAllViews() {
    renderItineraryView();
    renderPlacesView();
    renderStaysView();
    renderMapPins();

    tabItineraryDays.textContent = `${state.itinerary.totalDays} Days`;
    sightsCityName.textContent = state.constraints.destination;
    staysCityName.textContent = state.constraints.destination;
  }

  // 6.1 Render Day-Wise Itinerary Grid
  function renderItineraryView() {
    viewItinerary.innerHTML = "";

    state.itinerary.days.forEach((day, dayIdx) => {
      const dayEl = document.createElement("div");
      dayEl.className = "day-container";

      dayEl.innerHTML = `
        <div class="day-header">
          <div class="day-title-group">
            <span class="day-badge">Day ${day.dayNumber}</span>
            <span class="day-date-str">${day.date}</span>
          </div>
          <div class="day-cost-summary">
            Day Activities: <span class="day-cost-val">${formatMoney(day.dailyActivityCost)}</span>
          </div>
        </div>

        <div class="slots-grid">
          ${renderSlotHTML(day.slots.morning, "Morning", dayIdx, "morning")}
          ${renderSlotHTML(day.slots.afternoon, "Afternoon", dayIdx, "afternoon")}
          ${renderSlotHTML(day.slots.evening, "Evening", dayIdx, "evening")}
        </div>
      `;

      viewItinerary.appendChild(dayEl);
    });

    // Attach Swap Button Event Listeners
    document.querySelectorAll(".slot-swap-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const dayIdx = parseInt(btn.dataset.dayIdx, 10);
        const slotName = btn.dataset.slotName;
        openSwapModal(dayIdx, slotName);
      });
    });

    // Attach Card Click to open Activity Details
    document.querySelectorAll(".slot-card:not(.slot-empty)").forEach(card => {
      card.addEventListener("click", () => {
        const actId = card.dataset.actId;
        const act = PLANNER_DATA.activities.find(a => a.id === actId);
        if (act) openItemDetail(act, "activity");
      });
    });
  }

  function renderSlotHTML(activity, slotTitle, dayIdx, slotKey) {
    if (!activity) {
      return `
        <div class="slot-card slot-empty">
          <div style="font-size: 24px;">☕</div>
          <div style="font-weight: 700; font-size: 14px; color: var(--text-main);">${slotTitle}: Free Time</div>
          <div style="font-size: 12px;">Unscheduled leisure, relaxation, or local cafe hopping.</div>
          <button class="slot-swap-btn" data-day-idx="${dayIdx}" data-slot-name="${slotKey}" style="margin-top: 10px;">
            <span>+ Add Activity</span>
          </button>
        </div>
      `;
    }

    const costConverted = convertUSD(activity.costUSD);
    const photo = activity.images[0];

    return `
      <div class="slot-card" data-act-id="${activity.id}">
        <div>
          <div class="slot-top-row">
            <span class="slot-time-tag">
              <span>${getSlotIcon(slotTitle)}</span>
              <span>${slotTitle}</span>
            </span>
            <span class="slot-category-chip">${activity.category}</span>
          </div>
          <img src="${photo}" class="slot-photo" alt="${activity.title}" loading="lazy">
          <div class="slot-activity-title">${activity.title}</div>
          <div class="slot-activity-desc">${activity.description}</div>
        </div>

        <div class="slot-bottom-row">
          <div class="slot-price-duration">
            <span class="slot-cost-text">${costConverted === 0 ? "Free" : formatMoney(costConverted)}</span>
            <span class="slot-duration-text">⏱️ ${activity.durationHours} hrs</span>
          </div>
          <button class="slot-swap-btn" data-day-idx="${dayIdx}" data-slot-name="${slotKey}">
            <span>🔄 Replace</span>
          </button>
        </div>
      </div>
    `;
  }

  function getSlotIcon(slotTitle) {
    if (slotTitle === "Morning") return "☀️";
    if (slotTitle === "Afternoon") return "🌤️";
    return "🌙";
  }

  // 6.2 Render Things to Visit & Sights in this locality
  function renderPlacesView() {
    const curCity = state.constraints.destination;
    const places = PLANNER_DATA.activities.filter(a => a.destination === curCity);
    tabPlacesCount.textContent = `${places.length} Sights`;
    placesGrid.innerHTML = "";

    places.forEach(place => {
      const card = document.createElement("div");
      card.className = "place-card";
      const costConverted = convertUSD(place.costUSD);

      card.innerHTML = `
        <div class="place-media-box">
          <img src="${place.images[0]}" class="place-img" alt="${place.title}" loading="lazy">
          <span class="place-time-pill">${place.timeSlot}</span>
          <span class="place-category-pill">${place.category}</span>
        </div>
        <div class="place-card-details">
          <div class="place-card-header">
            <span>${place.title}</span>
            <span>★ ${place.rating.toFixed(2)}</span>
          </div>
          <div class="place-highlight">${place.highlight}</div>
          <div style="font-size: 13px; color: var(--text-muted);">Duration: ${place.durationHours} hrs · ${place.reviewsCount} reviews</div>
          <div class="place-card-price-row">
            <strong>${costConverted === 0 ? "Free admission" : formatMoney(costConverted)}</strong>
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        openItemDetail(place, "activity");
      });

      placesGrid.appendChild(card);
    });
  }

  // 6.3 Render Stays in this locality
  function renderStaysView() {
    const curCity = state.constraints.destination;
    const stays = PLANNER_DATA.stays.filter(s => s.destination === curCity);
    tabStaysCount.textContent = `${stays.length} Stays`;
    staysGrid.innerHTML = "";

    if (stays.length === 0) {
      staysGrid.innerHTML = `<div style="grid-column: 1/-1; padding: 40px; color: var(--text-muted);">No curated stays loaded for this destination.</div>`;
      return;
    }

    stays.forEach(stay => {
      const card = document.createElement("div");
      card.className = "place-card";
      const priceConverted = convertUSD(stay.pricePerNightUSD);

      card.innerHTML = `
        <div class="place-media-box">
          <img src="${stay.images[0]}" class="place-img" alt="${stay.title}" loading="lazy">
          ${stay.isSuperhost ? `<span class="place-time-pill">Superhost</span>` : ""}
          <span class="place-category-pill">${stay.type}</span>
        </div>
        <div class="place-card-details">
          <div class="place-card-header">
            <span>${stay.title}</span>
            <span>★ ${stay.rating.toFixed(2)}</span>
          </div>
          <div class="place-highlight">${stay.location}</div>
          <div style="font-size: 13px; color: var(--text-muted);">${stay.guests} guests · ${stay.bedrooms} bed · ${stay.bathrooms} bath</div>
          <div class="place-card-price-row">
            <strong>${formatMoney(priceConverted)}</strong> <span style="color: var(--text-muted);">night</span>
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        openItemDetail(stay, "stay");
      });

      staysGrid.appendChild(card);
    });
  }

  // 6.4 Render Interactive Map Pins
  function renderMapPins() {
    mapPinsLayer.innerHTML = "";
    const curCity = state.constraints.destination;
    const activities = PLANNER_DATA.activities.filter(a => a.destination === curCity);

    activities.forEach(act => {
      const pin = document.createElement("div");
      pin.className = "map-pin";
      pin.style.left = `${act.coordinates.x}%`;
      pin.style.top = `${act.coordinates.y}%`;
      const costConverted = convertUSD(act.costUSD);
      pin.textContent = costConverted === 0 ? `Free · ${act.title.split(" ")[0]}` : `${formatMoney(costConverted)} · ${act.title.split(" ")[0]}`;

      pin.addEventListener("click", (e) => {
        e.stopPropagation();
        openItemDetail(act, "activity");
      });

      mapPinsLayer.appendChild(pin);
    });
  }

  // =========================================================================
  // 7. Interactive Activity Replacement (Swap) Modal (PRD Feature 4)
  // =========================================================================
  function openSwapModal(dayIdx, slotName) {
    const day = state.itinerary.days[dayIdx];
    const currentActivity = day.slots[slotName];

    state.currentSwapTarget = { dayIdx, slotName, currentActivity };
    swapModalSubtitle.textContent = `Day ${day.dayNumber} · ${slotName.toUpperCase()}: Currently scheduled "${currentActivity ? currentActivity.title : 'Free Time'}"`;

    // Find all activities in this city not currently active in the itinerary
    const allActiveIds = new Set();
    state.itinerary.days.forEach(d => {
      Object.values(d.slots).forEach(act => {
        if (act) allActiveIds.add(act.id);
      });
    });

    const candidates = PLANNER_DATA.activities.filter(act =>
      act.destination === state.constraints.destination &&
      (!currentActivity || act.id !== currentActivity.id) &&
      !allActiveIds.has(act.id)
    );

    swapCandidatesList.innerHTML = "";

    if (candidates.length === 0) {
      swapCandidatesList.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--text-muted);">
          No other unused activities available for ${state.constraints.destination}.
        </div>
      `;
    } else {
      candidates.forEach(cand => {
        const candCost = convertUSD(cand.costUSD);
        const curCost = currentActivity ? convertUSD(currentActivity.costUSD) : 0;
        const diff = candCost - curCost;
        let diffText = "";
        let diffClass = "";

        if (diff > 0) {
          diffText = `+${formatMoney(diff)}`;
          diffClass = "price-diff-positive";
        } else if (diff < 0) {
          diffText = `-${formatMoney(Math.abs(diff))}`;
          diffClass = "price-diff-negative";
        } else {
          diffText = "Same price";
        }

        const item = document.createElement("div");
        item.className = "swap-candidate-card";
        item.innerHTML = `
          <img src="${cand.images[0]}" class="swap-thumb" alt="${cand.title}">
          <div class="swap-info">
            <div class="swap-title">${cand.title}</div>
            <div class="swap-meta">${cand.timeSlot} Slot · ${cand.category} · ⏱️ ${cand.durationHours} hrs</div>
            <div style="font-size: 13px; color: var(--text-main); font-weight: 600; margin-top: 4px;">
              ${candCost === 0 ? "Free" : formatMoney(candCost)}
            </div>
          </div>
          <div class="swap-price-diff ${diffClass}">
            <div>${diffText}</div>
            <button class="slot-swap-btn" style="margin-top: 6px; background: var(--text-main); color: #fff; border: none;">
              Select
            </button>
          </div>
        `;

        item.addEventListener("click", () => {
          replaceScheduledActivity(dayIdx, slotName, cand);
        });

        swapCandidatesList.appendChild(item);
      });
    }

    swapModalOverlay.classList.add("open");
  }

  function replaceScheduledActivity(dayIdx, slotName, newActivity) {
    state.itinerary.days[dayIdx].slots[slotName] = { ...newActivity };
    swapModalOverlay.classList.remove("open");
    recalculateExpenses();
    renderItineraryView();
  }

  closeSwapModalBtn.addEventListener("click", () => {
    swapModalOverlay.classList.remove("open");
  });

  swapModalOverlay.addEventListener("click", (e) => {
    if (e.target === swapModalOverlay) swapModalOverlay.classList.remove("open");
  });

  // =========================================================================
  // 8. Item Detail Modal (Photos, Highlights, Full Details)
  // =========================================================================
  function openItemDetail(item, type) {
    const isActivity = (type === "activity");
    const costFormatted = isActivity
      ? (convertUSD(item.costUSD) === 0 ? "Free Admission" : formatMoney(convertUSD(item.costUSD)))
      : `${formatMoney(convertUSD(item.pricePerNightUSD))} / night`;

    detailModalContainer.innerHTML = `
      <div style="position: absolute; top: 16px; right: 16px; z-index: 10;">
        <button id="closeDetailBtn" style="width: 34px; height: 34px; border-radius: 50%; background: #F2F2F2; display: flex; align-items: center; justify-content: center; font-size: 16px;">✕</button>
      </div>

      <div style="margin-bottom: 16px;">
        <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 4px;">${item.title}</h2>
        <div style="color: var(--text-muted); font-size: 14px;">
          ★ ${item.rating.toFixed(2)} (${item.reviewsCount} reviews) · ${item.destination || item.location}
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 8px; border-radius: 12px; overflow: hidden; margin-bottom: 20px; max-height: 320px;">
        <img src="${item.images[0]}" style="width: 100%; height: 100%; object-fit: cover;">
        <img src="${item.images[1] || item.images[0]}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; border-bottom: 1px solid var(--border-light); margin-bottom: 16px;">
        <div>
          <span style="font-size: 22px; font-weight: 800; color: var(--primary-rausch);">${costFormatted}</span>
          ${isActivity ? `<span style="color: var(--text-muted); font-size: 14px;"> · Recommended Slot: ${item.timeSlot}</span>` : ""}
        </div>
        ${isActivity ? `<span style="background: #F0F2F5; padding: 4px 12px; border-radius: 16px; font-weight: 600; font-size: 13px;">${item.category}</span>` : ""}
      </div>

      <div style="margin-bottom: 20px;">
        <h4 style="font-size: 16px; font-weight: 700; margin-bottom: 6px;">Description</h4>
        <p style="color: var(--text-main); font-size: 15px; line-height: 1.6;">
          ${item.description || (item.title + " located in " + item.location)}
        </p>
      </div>

      ${isActivity ? `
        <div style="background: var(--bg-hover); padding: 14px; border-radius: 8px; font-size: 14px;">
          <strong>Highlights:</strong> ${item.highlight} · Expected duration: ${item.durationHours} hours.
        </div>
      ` : `
        <div>
          <h4 style="font-size: 16px; font-weight: 700; margin-bottom: 8px;">Amenities</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 14px;">
            ${item.amenities.map(a => `<div>✓ ${a}</div>`).join("")}
          </div>
        </div>
      `}
    `;

    detailModalOverlay.classList.add("open");
    document.getElementById("closeDetailBtn").addEventListener("click", () => {
      detailModalOverlay.classList.remove("open");
    });
  }

  detailModalOverlay.addEventListener("click", (e) => {
    if (e.target === detailModalOverlay) detailModalOverlay.classList.remove("open");
  });

  // =========================================================================
  // 9. Event Listeners & Reactive Constraints
  // =========================================================================
  // Toggle Expanded Form Panel
  togglePanelBtn.addEventListener("click", () => {
    plannerPanel.classList.toggle("open");
  });
  compactPill.addEventListener("click", () => {
    plannerPanel.classList.toggle("open");
  });

  // Destination Change
  destInput.addEventListener("change", (e) => {
    state.constraints.destination = e.target.value;
  });

  // Dates Change
  startDateInput.addEventListener("change", (e) => {
    state.constraints.startDate = e.target.value;
  });
  endDateInput.addEventListener("change", (e) => {
    state.constraints.endDate = e.target.value;
  });

  // Budget Input in Form
  budgetInput.addEventListener("input", (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val) && val > 0) {
      state.constraints.totalBudget = val;
      recalculateExpenses();
    }
  });

  // Live Quick Budget Adjuster in Status Ribbon
  quickBudgetInput.addEventListener("input", (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val) && val > 0) {
      state.constraints.totalBudget = val;
      budgetInput.value = val;
      recalculateExpenses();
    }
  });

  // Currency Selection
  currencySelect.addEventListener("change", (e) => {
    const oldCurrency = state.constraints.currency;
    const newCurrency = e.target.value;
    
    // Convert current budget value to new currency
    const oldRate = PLANNER_DATA.currencies[oldCurrency].rate;
    const newRate = PLANNER_DATA.currencies[newCurrency].rate;
    const budgetUSD = state.constraints.totalBudget / oldRate;
    const newBudget = Math.round(budgetUSD * newRate);

    state.constraints.currency = newCurrency;
    state.constraints.totalBudget = newBudget;
    budgetInput.value = newBudget;
    quickBudgetInput.value = newBudget;

    recalculateExpenses();
    renderAllViews();
  });

  // Interests Multi-Select Pills
  document.querySelectorAll(".interest-tag-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      const interest = pill.dataset.interest;
      if (state.constraints.interests.includes(interest)) {
        if (state.constraints.interests.length > 1) {
          state.constraints.interests = state.constraints.interests.filter(i => i !== interest);
          pill.classList.remove("active");
        }
      } else {
        state.constraints.interests.push(interest);
        pill.classList.add("active");
      }
    });
  });

  // Travel Style Selector (Relaxed, Standard, Active)
  document.querySelectorAll(".style-chip-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".style-chip-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.constraints.travelStyle = btn.dataset.style;
      generateItinerary();
    });
  });

  // Generate Itinerary Button
  generateTripBtn.addEventListener("click", () => {
    // Validate inputs
    if (new Date(endDateInput.value) < new Date(startDateInput.value)) {
      alert("End date must be on or after start date!");
      return;
    }
    state.constraints.destination = destInput.value;
    state.constraints.startDate = startDateInput.value;
    state.constraints.endDate = endDateInput.value;
    state.constraints.totalBudget = parseFloat(budgetInput.value) || 450;
    
    generateItinerary();
    plannerPanel.classList.remove("open");
  });

  // View Navigation Tabs (Itinerary, Sights, Stays, Map)
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const tab = btn.dataset.tab;
      state.activeTab = tab;

      viewItinerary.style.display = (tab === "itinerary") ? "flex" : "none";
      viewPlaces.style.display = (tab === "places") ? "block" : "none";
      viewStays.style.display = (tab === "stays") ? "block" : "none";
      viewMap.style.display = (tab === "map") ? "block" : "none";
    });
  });

  // =========================================================================
  // 10. Initial Boot
  // =========================================================================
  generateItinerary();
});
