// Karabük Akıllı Ev - Enhanced JavaScript 2025

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle && navMenu) {
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Hamburger animation
    mobileToggle.classList.toggle('active');
  });

  // Close menu when clicking on a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileToggle.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('active');
      mobileToggle.classList.remove('active');
    }
  });
}

// Header scroll effect
const header = document.getElementById('header');
const stickyCta = document.getElementById('stickyCta');

if (header) {
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for shadow
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Hide sticky CTA on scroll down, show on scroll up
    if (stickyCta) {
      if (currentScroll > lastScroll && currentScroll > 500) {
        stickyCta.style.transform = 'translateY(-100%)';
      } else {
        stickyCta.style.transform = 'translateY(0)';
      }
    }
    
    lastScroll = currentScroll;
  });
}

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const headerOffset = 140; // Header + sticky CTA height
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Add stagger delay to grid items
const addStaggerDelay = (selector, delay = 100) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el, index) => {
    el.style.animationDelay = `${index * delay}ms`;
  });
};

// Apply stagger delays to existing elements
addStaggerDelay('.service-card', 150);
addStaggerDelay('.product-card', 100);
addStaggerDelay('.testimonial-card', 150);
addStaggerDelay('.step-card', 200);
addStaggerDelay('.faq-item', 100);
addStaggerDelay('.trust-item', 150);

// Track CTA clicks for analytics (placeholder)
function trackCTAClick(ctaName) {
  console.log(`CTA clicked: ${ctaName}`);
  // Add your analytics code here (Google Analytics, Facebook Pixel, etc.)
  // Example: gtag('event', 'click', { 'event_category': 'CTA', 'event_label': ctaName });
}

// Add click tracking to main CTAs
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
  link.addEventListener('click', () => {
    trackCTAClick('WhatsApp CTA');
  });
});

document.querySelectorAll('a[href*="instagram.com"]').forEach(link => {
  link.addEventListener('click', () => {
    trackCTAClick('Instagram CTA');
  });
});

document.querySelectorAll('a[href*="facebook.com"]').forEach(link => {
  link.addEventListener('click', () => {
    trackCTAClick('Facebook CTA');
  });
});

// Phone number click tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => {
    trackCTAClick('Phone Call CTA');
  });
});

// Lazy loading for images (if you add images later)
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

// Simple form validation (if you add a contact form later)
function validateForm(formElement) {
  const inputs = formElement.querySelectorAll('input[required], textarea[required]');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }
  });

  return isValid;
}

// Add phone number formatting (Turkish format)
function formatPhoneNumber(input) {
  let value = input.value.replace(/\D/g, '');
  
  if (value.startsWith('90')) {
    value = value.substring(2);
  }
  
  if (value.startsWith('0')) {
    value = value.substring(1);
  }
  
  if (value.length > 0) {
    if (value.length <= 3) {
      value = value;
    } else if (value.length <= 6) {
      value = value.slice(0, 3) + ' ' + value.slice(3);
    } else if (value.length <= 8) {
      value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6);
    } else {
      value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 8) + ' ' + value.slice(8, 10);
    }
  }
  
  input.value = value;
}

// Countdown timer for urgency (optional - can be activated for campaigns)
function startCountdown(endDate) {
  const countdownElement = document.getElementById('countdown');
  
  if (!countdownElement) return;
  
  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = endDate - now;
    
    if (distance < 0) {
      clearInterval(timer);
      countdownElement.innerHTML = 'Kampanya Sona Erdi!';
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    countdownElement.innerHTML = `${days}g ${hours}s ${minutes}d ${seconds}sn`;
  }, 1000);
}

// Example: Start countdown for end of January campaign
// startCountdown(new Date('2025-02-01T00:00:00').getTime());

// Performance optimization: Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Performance: Throttle scroll events
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      // Scroll-based animations or effects here
      ticking = false;
    });
    ticking = true;
  }
});

// Add "Back to Top" button functionality (if you add one)
const backToTopButton = document.getElementById('backToTop');
if (backToTopButton) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Console message for developers
console.log('%c🏠 Karabük Akıllı Ev', 'font-size: 20px; font-weight: bold; color: #4A90E2;');
console.log('%cWeb siteniz profesyonel olarak optimize edilmiştir.', 'font-size: 14px; color: #6B7280;');
console.log('%cİletişim: https://wa.me/905XXXXXXXXX', 'font-size: 12px; color: #10B981;');

// SEO: Add structured data dynamically (for better indexing)
function addStructuredData() {
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
      }
    ]
  });
  document.head.appendChild(script);
}

// Run on page load
window.addEventListener('DOMContentLoaded', () => {
  addStructuredData();
  
  // Preload important resources
  const preloadLink = document.createElement('link');
  preloadLink.rel = 'preload';
  preloadLink.as = 'image';
  preloadLink.href = 'data:image/svg+xml,...'; // Add your logo or important image
  
  // Add to head if needed
  // document.head.appendChild(preloadLink);
});
