// ============================================================
// PAGE SCROLL SNAP — ACTIVE CLASS MANAGEMENT
// ============================================================

const container = document.getElementById('scroll-container');
const pages     = document.querySelectorAll('.page');

// Mark the currently visible page as .active so CSS animations trigger
function onScroll() {
  const h = container.clientHeight;
  const scrollY = container.scrollTop;
  const activeIdx = Math.round(scrollY / h);

  pages.forEach((page, i) => {
    if (i === activeIdx) {
      page.classList.add('active');
    } else {
      page.classList.remove('active');
    }
  });
}

// Listen for scroll (with requestAnimationFrame throttle for smoothness)
let ticking = false;
container.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      onScroll();
      ticking = false;
    });
    ticking = true;
  }
});

// Mark first page as active immediately on load
onScroll();

// ============================================================
// SWIPE UP BUTTON — smooth scroll to page 2
// ============================================================
const swipeBtn = document.getElementById('swipe-btn');
if (swipeBtn) {
  swipeBtn.addEventListener('click', () => {
    const page2 = document.getElementById('page-2');
    if (page2) page2.scrollIntoView({ behavior: 'smooth' });
  });
}

// ============================================================
// KEYBOARD NAVIGATION (up / down arrow keys)
// ============================================================
document.addEventListener('keydown', (e) => {
  const h = container.clientHeight;
  const currentIdx = Math.round(container.scrollTop / h);

  if (e.key === 'ArrowDown' || e.key === 'PageDown') {
    const next = pages[currentIdx + 1];
    if (next) next.scrollIntoView({ behavior: 'smooth' });
  }
  if (e.key === 'ArrowUp' || e.key === 'PageUp') {
    const prev = pages[currentIdx - 1];
    if (prev) prev.scrollIntoView({ behavior: 'smooth' });
  }
});

// ============================================================
// TOUCH / SWIPE GESTURE (mobile swipe up / swipe down)
// ============================================================
let touchStartY = 0;

container.addEventListener('touchstart', (e) => {
  touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

container.addEventListener('touchend', (e) => {
  const touchEndY  = e.changedTouches[0].screenY;
  const diff       = touchStartY - touchEndY; // positive = swipe up
  const threshold  = 50;
  const h          = container.clientHeight;
  const currentIdx = Math.round(container.scrollTop / h);

  if (diff > threshold) {
    // Swipe up — go to next page
    const next = pages[currentIdx + 1];
    if (next) next.scrollIntoView({ behavior: 'smooth' });
  } else if (diff < -threshold) {
    // Swipe down — go to previous page
    const prev = pages[currentIdx - 1];
    if (prev) prev.scrollIntoView({ behavior: 'smooth' });
  }
}, { passive: true });
