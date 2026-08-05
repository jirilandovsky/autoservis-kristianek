// Mobile nav toggle
const burger = document.getElementById('burger');
const navList = document.getElementById('navList');
if (burger && navList) {
  burger.addEventListener('click', () => {
    navList.classList.toggle('open');
  });
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navList.classList.remove('open'));
  });
}

// Before / after compare sliders
document.querySelectorAll('[data-compare]').forEach(frame => {
  const after = frame.querySelector('.layer-after');
  const handle = frame.querySelector('.compare-handle');
  const range = frame.querySelector('.compare-range');

  const setPos = (value) => {
    const v = Math.min(100, Math.max(0, value));
    after.style.clipPath = `inset(0 0 0 ${v}%)`;
    handle.style.left = v + '%';
  };

  if (range) {
    setPos(range.value);
    range.addEventListener('input', () => setPos(range.value));
  }

  // Also allow dragging directly on the frame for a nicer feel
  let dragging = false;
  const posFromEvent = (e) => {
    const rect = frame.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    return pct;
  };
  frame.addEventListener('pointerdown', (e) => {
    dragging = true;
    const pct = posFromEvent(e);
    setPos(pct);
    if (range) range.value = pct;
  });
  window.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const pct = posFromEvent(e);
    setPos(pct);
    if (range) range.value = pct;
  });
  window.addEventListener('pointerup', () => dragging = false);
});

// Scroll reveal animation
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Fake booking form
const bookingForm = document.getElementById('bookingForm');
const formNote = document.getElementById('formNote');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = bookingForm.name.value.trim() || 'kamaráde';
    const car = bookingForm.car.value;
    formNote.textContent = `Díky, ${name}! Kristiánek si "${car}" zapsal do sešitu a už brousí klíč. 🔧🎉`;
    bookingForm.reset();
  });
}
