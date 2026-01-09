/**
 * APP.JS - SEO Optimized Frontend
 */

console.log('🚀 app.js cargado');

// PASO 1: Setup mobile menu INMEDIATAMENTE
setupMobileMenu();

// PASO 2: Cargar config y actualizar WhatsApp
fetch('config.json')
  .then(r => r.json())
  .then(config => {
    console.log('✅ config.json cargado');
    updateWhatsAppLinks(config);
    updateFooter(config);
    initSwiper();
  })
  .catch(err => console.error('❌ Error:', err));

/**
 * Actualiza los links de WhatsApp
 */
function updateWhatsAppLinks(config) {
  const whatsapp = config.whatsapp;
  if (!whatsapp || !whatsapp.number) {
    console.error('❌ No hay whatsapp.number');
    return;
  }

  const digits = whatsapp.number.replace(/\D+/g, '');
  const message = encodeURIComponent(whatsapp.message || 'Hola');
  const waUrl = `https://wa.me/${digits}?text=${message}`;
  
  console.log('📞 WhatsApp URL:', waUrl);

  ['cta-hero', 'cta-header', 'whatsapp-fab'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.href = waUrl;
      btn.target = '_blank';
      btn.rel = 'noopener';
      console.log(`✅ ${id} actualizado`);
    }
  });
}

/**
 * Actualiza el footer
 */
function updateFooter(config) {
  const { contact, footer } = config;

  if (contact?.phone) {
    const el = document.getElementById('footer-phone');
    if (el) el.textContent = contact.phone;
  }

  if (contact?.instagram) {
    const el = document.getElementById('footer-instagram');
    if (el) {
      el.href = contact.instagram;
      el.target = '_blank';
      el.rel = 'noopener';
    }
  }

  if (footer) {
    const el = document.getElementById('footer-copyright');
    if (el) el.textContent = footer;
  }
}

/**
 * Inicializa Swiper
 */
function initSwiper() {
  if (typeof Swiper === 'undefined') return;
  
  new Swiper('.mySwiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 }
    }
  });
}

/**
 * Setup mobile menu
 */
function setupMobileMenu() {
  const btn = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('icon-menu');

  if (!btn || !menu || !icon) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    menu.classList.toggle('hidden');
    const isHidden = menu.classList.contains('hidden');
    btn.setAttribute('aria-expanded', !isHidden);
    icon.innerHTML = isHidden
      ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />'
      : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
      icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
    });
  });

  console.log('✅ Mobile menu listo');
}

