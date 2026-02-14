// Karabük Akıllı Ev - SEO Optimized JavaScript 2025

// ============================================
// MOBILE MENU
// ============================================
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle && navMenu) {
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileToggle.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('active');
      mobileToggle.classList.remove('active');
    }
  });
}

// ============================================
// HEADER SCROLL EFFECTS
// ============================================
const header = document.getElementById('header');
const stickyCta = document.getElementById('stickyCta');
let lastScroll = 0;

if (header) {
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (stickyCta) {
      if (currentScroll > lastScroll && currentScroll > 500) {
        stickyCta.style.transform = 'translateY(-100%)';
      } else {
        stickyCta.style.transform = 'translateY(0)';
      }
    }
    
    lastScroll = currentScroll;
  }, { passive: true });
}

// ============================================
// INTERSECTION OBSERVER - FADE IN ANIMATIONS
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const headerOffset = 140;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================
// STAGGER ANIMATIONS
// ============================================
const addStaggerDelay = (selector, delay = 100) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el, index) => {
    el.style.animationDelay = `${index * delay}ms`;
  });
};

addStaggerDelay('.service-card', 150);
addStaggerDelay('.product-card', 100);
addStaggerDelay('.testimonial-card', 150);
addStaggerDelay('.step-card', 200);
addStaggerDelay('.faq-item', 100);
addStaggerDelay('.trust-item', 150);

// ============================================
// ANALYTICS TRACKING
// ============================================
function trackCTAClick(ctaName) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'click', { 
      'event_category': 'CTA', 
      'event_label': ctaName 
    });
  }
  
  if (typeof fbq !== 'undefined') {
    fbq('track', 'Contact', { content_name: ctaName });
  }
}

document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
  link.addEventListener('click', () => trackCTAClick('WhatsApp'));
});

document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => trackCTAClick('Phone'));
});

document.querySelectorAll('a[href*="instagram.com"]').forEach(link => {
  link.addEventListener('click', () => trackCTAClick('Instagram'));
});

document.querySelectorAll('a[href*="facebook.com"]').forEach(link => {
  link.addEventListener('click', () => trackCTAClick('Facebook'));
});

// ============================================
// LAZY LOADING IMAGES
// ============================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTopButton = document.getElementById('backToTop');
if (backToTopButton) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  }, { passive: true });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============================================
// SEO: STRUCTURED DATA (FAQ)
// ============================================
function addFAQStructuredData() {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Karabük'te akıllı ev kurulumu ne kadar sürer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Çoğu akıllı ev kurulumumuzu 24 saat içinde tamamlıyoruz. Basit sistemler birkaç saatte, komple ev otomasyonu 1-2 gün sürebilir."
        }
      },
      {
        "@type": "Question",
        "name": "Akıllı ev sistemi fiyatları ne kadar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Akıllı priz 450₺'den, akıllı aydınlatma 2.500₺'den, güvenlik sistemi 3.500₺'den başlayan fiyatlarla hizmet veriyoruz. Ücretsiz keşif sonrası net fiyat teklifi sunuyoruz."
        }
      },
      {
        "@type": "Question",
        "name": "Hangi bölgelere hizmet veriyorsunuz?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Karabük merkez ve tüm ilçelerine (Safranbolu, Yenice, Eflani, Eskipazar, Ovacık) profesyonel akıllı ev kurulum hizmeti sunuyoruz."
        }
      },
      {
        "@type": "Question",
        "name": "Garanti süresi ne kadar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tüm kurulumlarımızda 2 yıl garanti veriyoruz. Kullandığımız ürünler orijinal ve garantilidir. Teknik destek hizmetimiz süreklidir."
        }
      }
    ]
  });
  document.head.appendChild(script);
}

// ============================================
// SEO: BREADCRUMB STRUCTURED DATA
// ============================================
function addBreadcrumbStructuredData() {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Ana Sayfa",
        "item": "https://karabukakiliev.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Hizmetler",
        "item": "https://karabukakiliev.com/#services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "İletişim",
        "item": "https://karabukakiliev.com/#contact"
      }
    ]
  });
  document.head.appendChild(script);
}

// ============================================
// SEO: ORGANIZATION STRUCTURED DATA
// ============================================
function addOrganizationStructuredData() {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Karabük Akıllı Ev",
    "url": "https://karabukakiliev.com",
    "logo": "https://karabukakiliev.com/logo.png",
    "image": "https://karabukakiliev.com/logo.png",
    "description": "Karabük ve çevresinde profesyonel akıllı ev sistemleri kurulumu ve otomasyon çözümleri",
    "email": "karabukakiliev@gmail.com",
    "telephone": "+905510129164",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Karabük",
      "addressRegion": "Karabük",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.2044",
      "longitude": "32.6229"
    },
    "sameAs": [
      "https://www.facebook.com/share/1DWChUPcsz/",
      "https://www.instagram.com/karabukakiliev",
      "https://x.com/karabukakiliev"
    ],
    "areaServed": {
      "@type": "City",
      "name": "Karabük"
    }
  });
  document.head.appendChild(script);
}

// ============================================
// SEO: SERVICE STRUCTURED DATA
// ============================================
function addServiceStructuredData() {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Akıllı Ev Sistemleri Kurulumu",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Karabük Akıllı Ev",
      "image": "https://karabukakiliev.com/logo.png",
      "telephone": "+905510129164",
      "email": "karabukakiliev@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Karabük",
        "addressCountry": "TR"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": "Karabük"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Akıllı Ev Hizmetleri",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Akıllı Aydınlatma Sistemleri",
            "description": "Sesli kontrol ve otomasyon ile akıllı aydınlatma kurulumu"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Akıllı Güvenlik Sistemleri",
            "description": "Kamera, alarm ve güvenlik sensörü kurulumu"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Akıllı İklim Kontrolü",
            "description": "Akıllı termostat ve iklim kontrol sistemleri"
          }
        }
      ]
    }
  });
  document.head.appendChild(script);
}

// ============================================
// PERFORMANCE: OPTIMIZE PAGE LOAD
// ============================================
function optimizePageLoad() {
  // Preconnect to external domains
  const domains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.google-analytics.com',
    'https://www.googletagmanager.com'
  ];
  
  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
window.addEventListener('DOMContentLoaded', () => {
  // Add all structured data
  addFAQStructuredData();
  addBreadcrumbStructuredData();
  addOrganizationStructuredData();
  addServiceStructuredData();
  
  // Optimize page load
  optimizePageLoad();
});

// ============================================
// PAGE VISIBILITY API (for analytics)
// ============================================
let pageVisibilityTime = Date.now();

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    const timeSpent = Math.round((Date.now() - pageVisibilityTime) / 1000);
    if (typeof gtag !== 'undefined' && timeSpent > 5) {
      gtag('event', 'timing_complete', {
        name: 'page_view',
        value: timeSpent,
        event_category: 'engagement'
      });
    }
  } else {
    pageVisibilityTime = Date.now();
  }
});
