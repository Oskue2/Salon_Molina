/* =========================================================
   DATOS DEL NEGOCIO — edita aquí y se actualiza toda la web
   ========================================================= */
const CONFIG = {
  // Número de WhatsApp con indicativo de país, solo dígitos (ej: 573001234567)
  whatsapp: '573219499311',
  whatsappVisible: '+57 300 000 0000',

  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',
  tiktok: 'https://www.tiktok.com/',

  direccion: 'Dirección del salón, Ciudad, Colombia',
  horario: 'Lunes a sábado · 8:00 a.m. – 7:00 p.m.',

  // Texto que se buscará en Google Maps (puede ser la dirección exacta)
  mapa: 'Molina Salón de Belleza',
};

/* ===== Enlaces de WhatsApp ===== */
const waLink = (msg) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg || 'Hola, quiero más información')}`;

document.querySelectorAll('.js-whatsapp').forEach((el) => {
  el.href = waLink(el.dataset.msg);
  el.target = '_blank';
  el.rel = 'noopener';
});

/* ===== Redes sociales e información de contacto ===== */
document.getElementById('linkInstagram').href = CONFIG.instagram;
document.getElementById('linkFacebook').href = CONFIG.facebook;
document.getElementById('linkTiktok').href = CONFIG.tiktok;

document.getElementById('infoAddress').textContent = CONFIG.direccion;
document.getElementById('infoHours').textContent = CONFIG.horario;
document.getElementById('infoPhone').textContent = CONFIG.whatsappVisible;
document.getElementById('mapFrame').src =
  `https://www.google.com/maps?q=${encodeURIComponent(CONFIG.mapa)}&output=embed`;

document.getElementById('year').textContent = new Date().getFullYear();

/* ===== Menú móvil ===== */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});

navMenu.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  })
);

/* ===== Navbar con sombra al hacer scroll ===== */
const navbar = document.getElementById('navbar');
const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ===== Enlace activo según la sección visible ===== */
const navLinks = [...navMenu.querySelectorAll('a')];
const sections = navLinks
  .map((a) => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) =>
        a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`)
      );
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
sections.forEach((s) => sectionObserver.observe(s));

/* ===== Animación de aparición ===== */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ===== Visor de imágenes de la galería ===== */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

const closeLightbox = () => {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
};

document.querySelectorAll('.gallery-item').forEach((item) =>
  item.addEventListener('click', () => {
    lightboxImg.src = item.dataset.full;
    lightboxImg.alt = item.querySelector('img').alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  })
);

lightbox.addEventListener('click', (e) => {
  if (e.target !== lightboxImg) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

/* ===== Modo claro / oscuro ===== */
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

const updateToggleLabel = () => {
  const dark = root.getAttribute('data-theme') === 'dark';
  themeToggle.setAttribute('aria-label', dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
};

themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) {}
  updateToggleLabel();
});
updateToggleLabel();
