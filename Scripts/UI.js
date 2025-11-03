function LoadNavBar() {
  const Navbar = document.createElement("nav");
  Navbar.className = "topnav";
  Navbar.innerHTML = `<ul class="nav-list"><li class="nav-item"><a href="index.html" class="nav-link">Home</a></li><li class="nav-item"><a href="Articles.html" class="nav-link">Articles</a></li></ul>`;
  document.body.prepend(Navbar);
}

LoadNavBar();

// Dropdown / collapsible behavior (delegated)
function closeOtherDropdowns(openDropdown) {
  const open = document.querySelectorAll(".dropdown.open");
  open.forEach((d) => {
    if (d !== openDropdown) {
      toggleDropdown(d, false);
    }
  });
}

function toggleDropdown(container, wantOpen) {
  const btn = container.querySelector(".dropdown-toggle");
  const region = container.querySelector(".dropdown-content");
  const isOpen = container.classList.contains("open");
  const open = typeof wantOpen === "boolean" ? wantOpen : !isOpen;

  if (open) {
    // set max-height to scrollHeight to animate open
    const height = region.scrollHeight;
    region.style.maxHeight = height + "px";
    container.classList.add("open");
    if (btn) btn.setAttribute("aria-expanded", "true");
    if (region) region.setAttribute("aria-hidden", "false");
  } else {
    // collapse
    region.style.maxHeight = region.scrollHeight + "px";
    // force reflow to ensure transition
    // eslint-disable-next-line no-unused-expressions
    region.offsetHeight;
    region.style.maxHeight = "0px";
    container.classList.remove("open");
    if (btn) btn.setAttribute("aria-expanded", "false");
    if (region) region.setAttribute("aria-hidden", "true");
  }
}

// Delegate clicks to document for .dropdown-toggle
document.addEventListener("click", (e) => {
  const btn = e.target.closest && e.target.closest(".dropdown-toggle");
  if (!btn) return;
  const container = btn.closest(".dropdown");
  if (!container) return;
  const willOpen = !container.classList.contains("open");
  toggleDropdown(container, willOpen);
  if (willOpen) closeOtherDropdowns(container);
});

// Keyboard support for toggles (Space/Enter)
document.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const btn = e.target.closest && e.target.closest(".dropdown-toggle");
  if (!btn) return;
  e.preventDefault();
  btn.click();
});

// Initialize: set inline max-height 0 for all regions and ensure aria attributes
const regions = document.querySelectorAll(".dropdown-content");
regions.forEach((r) => {
  r.style.maxHeight = "0px";
  r.setAttribute("aria-hidden", "true");
});
