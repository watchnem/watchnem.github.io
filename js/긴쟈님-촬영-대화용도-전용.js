(() => {
  const menu = document.querySelector('.ginja-cosplay-menu');
  if (!menu) return;

  const buttons = [...menu.querySelectorAll('button[data-work]')];
  const sections = [...document.querySelectorAll('[data-work-section]')];

  function selectWork(workId) {
    buttons.forEach((button) => {
      const selected = button.dataset.work === workId;
      button.setAttribute('aria-pressed', String(selected));
    });
    sections.forEach((section) => {
      section.hidden = section.dataset.workSection !== workId;
    });
    const selectedSection = document.getElementById(workId);
    if (selectedSection) selectedSection.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  function setImageShape(image) {
    if (!image.naturalWidth || !image.naturalHeight) return;
    const wrapper = image.closest('.ginja-cosplay-card-image');
    if (!wrapper) return;
    const ratio = image.naturalWidth / image.naturalHeight;
    const shape = ratio < 0.88 ? 'is-portrait' : ratio < 1.18 ? 'is-square' : 'is-wide';
    wrapper.classList.remove('is-portrait', 'is-square', 'is-wide');
    wrapper.classList.add(shape);
  }

  document.querySelectorAll('.ginja-cosplay-card-image img').forEach((image) => {
    if (image.complete) setImageShape(image);
    image.addEventListener('load', () => setImageShape(image), { once: true });
  });

  buttons.forEach((button) => button.addEventListener('click', () => selectWork(button.dataset.work)));
})();
