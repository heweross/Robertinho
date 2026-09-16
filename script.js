const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('open', !open);
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
  }));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const modal = document.getElementById('doc-modal');
const modalImg = document.getElementById('doc-image');
const docs = { inpi: 'assets/inpi.webp', palcomp3: 'assets/palcomp3.webp' };
document.querySelectorAll('.doc-open').forEach(btn => {
  btn.addEventListener('click', () => {
    const src = docs[btn.dataset.doc];
    if (!src || !modal || !modalImg) return;
    modalImg.src = src;
    modal.showModal();
  });
});
modal?.querySelector('.modal-close')?.addEventListener('click', () => modal.close());
modal?.addEventListener('click', e => { if (e.target === modal) modal.close(); });
