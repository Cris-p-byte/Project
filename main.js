// ============================================
// JBL HEADPHONES - COMPLETE INTERACTIVE JS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // VARIABLES
  // ============================================
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('.nav__link');
  const modalOverlay = document.getElementById('modal-overlay');
  const modals = document.querySelectorAll('.modal');
  const swiperContainer = document.querySelector('.favorite-swiper');
  
  let isMenuOpen = false;

  // ============================================
  // HEADER SCROLL EFFECTS
  // ============================================
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    
    // Header blur effect
    if (scrollTop > 100) {
      header.classList.add('blur-header');
    } else {
      header.classList.remove('blur-header');
    }
    
    // Navbar hide/show on scroll
    if (scrollTop > lastScroll && scrollTop > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    lastScroll = scrollTop;
  });

  // ============================================
  // MOBILE MENU TOGGLE
  // ============================================
  navToggle.addEventListener('click', () => {
    const navList = document.querySelector('.nav__list');
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
      navList.style.transform = 'translateX(0)';
      navToggle.innerHTML = '<i class="ri-close-line"></i>';
    } else {
      navList.style.transform = 'translateX(100%)';
      navToggle.innerHTML = '<i class="ri-menu-line"></i>';
    }
  });

  // ============================================
  // SMOOTH SCROLL & ACTIVE LINK
  // ============================================
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
      
      // Close mobile menu
      if (isMenuOpen) {
        isMenuOpen = false;
        document.querySelector('.nav__list').style.transform = 'translateX(100%)';
        navToggle.innerHTML = '<i class="ri-menu-line"></i>';
      }
      
      // Update active link
      document.querySelector('.nav__link.active-link')?.classList.remove('active-link');
      link.classList.add('active-link');
    });
  });

  // ============================================
  // MODAL SYSTEM
  // ============================================
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modalOverlay.classList.add('active');
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modal) {
    modalOverlay.classList.remove('active');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  // Open modals via data attributes
  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal');
      openModal(modalId);
    });
  });

  // Close modals - overlay click
  modalOverlay.addEventListener('click', () => {
    modals.forEach(modal => {
      if (modal.classList.contains('active')) {
        closeModal(modal);
      }
    });
  });

  // Close modals - close buttons
  document.querySelectorAll('.modal__close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      const modal = closeBtn.closest('.modal');
      closeModal(modal);
    });
  });

  // Close modals with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.classList.contains('active')) {
          closeModal(modal);
        }
      });
    }
  });

  // ============================================
  // SWIPER INITIALIZATION
  // ============================================
  if (swiperContainer) {
    const swiper = new Swiper('.favorite-swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        }
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      speed: 600,
    });
  }

  // ============================================
  // AOS INITIALIZATION
  // ============================================
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  });

  // ============================================
  // WISHLIST FUNCTIONALITY
  // ============================================
  document.querySelectorAll('.favorite__wish').forEach(heart => {
    heart.addEventListener('click', function(e) {
      e.stopPropagation();
      this.style.color = this.style.color === 'red' ? '#fff' : 'red';
      
      // Add notification
      showNotification('Added to wishlist! ❤️');
    });
  });

  // ============================================
  // CONTACT FORM
  // ============================================
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        submitBtn.textContent = 'Sent! ✅';
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          contactForm.reset();
          closeModal(document.getElementById('contact-modal'));
          showNotification('Message sent successfully!');
        }, 1500);
      }, 2000);
    });
  }

  // ============================================
  // NOTIFICATION SYSTEM
  // ============================================
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(45deg, orange, #ff8800);
      color: #000;
      padding: 15px 25px;
      border-radius: 50px;
      font-weight: 600;
      z-index: 3000;
      transform: translateX(400px);
      transition: all 0.4s ease;
      box-shadow: 0 10px 30px rgba(255, 165, 0, 0.4);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
      notification.style.transform = 'translateX(0)';
    });
    
    // Animate out
    setTimeout(() => {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 400);
    }, 3000);
  }

  // ============================================
  // PARALLAX EFFECT FOR HOME IMAGE
  // ============================================
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const homeImgFloat = document.querySelector('.home__img-float');
    if (homeImgFloat) {
      homeImgFloat.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  // ============================================
  // COUNTER ANIMATIONS (Optional enhancement)
  // ============================================
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(start) + '+';
    }, 16);
  }

  // ============================================
  // INTERSECTION OBSERVER FOR STAGGERED ANIMATIONS
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe model items
  document.querySelectorAll('.model__item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'all 0.6s ease';
    observer.observe(item);
  });

  console.log('🎧 JBL Interactive Site Loaded Successfully! 🚀');
});

// ============================================
// SMOOTH SCROLL FOR ALL LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});