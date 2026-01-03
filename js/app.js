// Helper para obtener elementos por ID
function el(id) { return document.getElementById(id); }

// Parsea configuración inline (JSON en #site-config)
function parseInlineConfig() {
  try {
    const node = document.getElementById('site-config');
    if (!node) return null;
    return JSON.parse(node.textContent);
  } catch (e) {
    console.warn('No se encontró configuración inline o está mal formada', e);
    return null;
  }
}

// Configura WhatsApp y contacto
function setupWhatsApp() {
  const cfg = parseInlineConfig() || {};
  const rawNumber = (cfg.whatsapp?.number) || (cfg.contact?.phone) || '';
  const digits = (rawNumber || '').toString().replace(/\D+/g, '');
  const message = encodeURIComponent(cfg.whatsapp?.message || 'Hola, quisiera información sobre microblading');
  const waHref = digits ? `https://wa.me/${digits}?text=${message}` : '#';

  [el('whatsapp-fab'), el('contact-whatsapp'), el('hero-cta'), el('cta-link')].forEach(elm => {
    if (!elm) return;
    elm.setAttribute('href', waHref);
    elm.setAttribute('target', '_blank');
    elm.setAttribute('rel', 'noopener');
  });

  // Contact info
  if (cfg.contact) {
    if (el('contact-email')) el('contact-email').textContent = cfg.contact.email || '';
    if (el('contact-phone')) el('contact-phone').textContent = cfg.contact.phone || '';
    if (el('contact-ig') && cfg.contact.instagram) {
      el('contact-ig').textContent = cfg.contact.instagram;
      el('contact-ig').href = `https://instagram.com/${cfg.contact.instagram.replace(/^@/, '')}`;
    }
  }

  // Form demo
  const form = el('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      alert('Gracias, su mensaje ha sido enviado (demo).');
      e.target.reset();
    });
  }
}

// Inicializa Swiper
function initSwiper() {
  new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 },
    },
  });
}

// Ejecutar todo al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  initSwiper();
  setupWhatsApp();
  // Mobile menu toggle
  const btn = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('icon-menu');
  if (btn && menu && icon) {
    btn.addEventListener('click', () => {
      const isHidden = menu.classList.toggle('hidden');
      // Update aria-expanded
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', (!expanded).toString());
      // Swap icon (hamburger / X)
      if (isHidden) {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
      } else {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
      }
    });
  }
});
