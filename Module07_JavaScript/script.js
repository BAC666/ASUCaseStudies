// Module 7 — Pacific Trails progressive enhancements (events + DOM)
document.addEventListener("DOMContentLoaded", () => {
  highlightActiveNav();
  initPricePreview();     // reservations.html
  initAmenityToggles();   // yurts.html
  initActivityFilter();   // activities.html
});

function highlightActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar a, nav a").forEach(a => {
    const href = a.getAttribute("href");
    if (!href) return;
    const same = href === path || (path === "index.html" && href.endsWith("index.html"));
    a.classList.toggle("active", same);
    if (same) a.setAttribute("aria-current", "page");
  });
}

function initPricePreview() {
  const typeEl = document.getElementById("yurtType");
  const nightsEl = document.getElementById("nights");
  const outEl = document.getElementById("pricePreview");
  if (!typeEl || !nightsEl || !outEl) return;

  const rates = { standard: 80, deluxe: 120, luxury: 200 };
  function update() {
    const t = (typeEl.value || "standard").toLowerCase();
    const n = Math.max(1, parseInt(nightsEl.value || "1", 10));
    const nightly = rates[t] ?? rates.standard;
    const total = nightly * n;
    outEl.textContent = `$${total.toFixed(2)} (${n} night${n>1?"s":""} @ $${nightly}/night)`;
  }
  typeEl.addEventListener("change", update);
  nightsEl.addEventListener("input", update);
  update();
}

function initAmenityToggles() {
  const toggles = document.querySelectorAll(".amenity-toggle[data-target]");
  toggles.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetSel = btn.getAttribute("data-target");
      const panel = document.querySelector(targetSel);
      if (!panel) return;
      const isHidden = panel.hasAttribute("hidden");
      if (isHidden) {
        panel.removeAttribute("hidden");
        btn.textContent = "Hide amenities";
      } else {
        panel.setAttribute("hidden", "");
        btn.textContent = "Show amenities";
      }
    });
  });
}

function initActivityFilter() {
  const filter = document.getElementById("activityFilter");
  const items = document.querySelectorAll(".activity-item[data-category]");
  if (!filter || items.length === 0) return;
  function apply() {
    const val = filter.value || "all";
    items.forEach(li => {
      const match = val === "all" || li.dataset.category === val;
      li.style.display = match ? "" : "none";
    });
  }
  filter.addEventListener("change", apply);
  apply();
}
