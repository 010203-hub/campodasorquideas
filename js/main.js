/*
  CAMPO DAS ORQUÍDEAS - JavaScript Principal
  Funcionalidades: Menu mobile, Countdown, Scroll suave, Animações, Redirecionamento
*/

// ==================== CONFIGURAÇÕES ====================
const REDIRECT_URL = "https://pay.campodasorquideas.shop/5pjw3RmJWlvg2lQ";
const COUNTDOWN_TARGET = new Date("2026-02-28T23:59:59").getTime();

// ==================== INICIALIZAÇÃO ====================
document.addEventListener("DOMContentLoaded", function () {
  initLucideIcons();
  initMenu();
  initScroll();
  initCountdown();
  initScrollAnimations();
  initSmoothScroll();
  initRemainingSlots();
});

// ==================== LUCIDE ICONS ====================
function initLucideIcons() {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

// ==================== REDIRECIONAMENTO ====================
function redirectToPayment() {
  window.open(REDIRECT_URL, "_blank");
}

// ==================== MENU MOBILE ====================
function initMenu() {
  var menuToggle = document.getElementById("menu-toggle");
  var mobileMenu = document.getElementById("mobile-menu");
  var iconOpen = document.getElementById("menu-icon-open");
  var iconClose = document.getElementById("menu-icon-close");
  var isOpen = false;

  if (!menuToggle || !mobileMenu) return;

  menuToggle.addEventListener("click", function () {
    isOpen = !isOpen;
    if (isOpen) {
      mobileMenu.classList.remove("hidden");
      iconOpen.classList.add("hidden");
      iconClose.classList.remove("hidden");
    } else {
      mobileMenu.classList.add("hidden");
      iconOpen.classList.remove("hidden");
      iconClose.classList.add("hidden");
    }
  });

  // Fechar menu ao clicar em um link
  var menuLinks = mobileMenu.querySelectorAll(".mobile-menu-link");
  menuLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      isOpen = false;
      mobileMenu.classList.add("hidden");
      iconOpen.classList.remove("hidden");
      iconClose.classList.add("hidden");
    });
  });

  // Fechar menu ao clicar fora
  document.addEventListener("click", function (e) {
    if (isOpen && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      isOpen = false;
      mobileMenu.classList.add("hidden");
      iconOpen.classList.remove("hidden");
      iconClose.classList.add("hidden");
    }
  });
}

// ==================== SCROLL HEADER ====================
function initScroll() {
  var header = document.getElementById("header");
  var topbar = document.getElementById("topbar");

  if (!header || !topbar) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
      topbar.classList.add("hidden-bar");
    } else {
      header.classList.remove("scrolled");
      topbar.classList.remove("hidden-bar");
    }
  });
}

// ==================== COUNTDOWN TIMER ====================
function initCountdown() {
  var daysEl = document.getElementById("days");
  var hoursEl = document.getElementById("hours");
  var minutesEl = document.getElementById("minutes");
  var secondsEl = document.getElementById("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function updateCountdown() {
    var now = new Date().getTime();
    var distance = COUNTDOWN_TARGET - now;

    if (distance > 0) {
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.textContent = String(days).padStart(2, "0");
      hoursEl.textContent = String(hours).padStart(2, "0");
      minutesEl.textContent = String(minutes).padStart(2, "0");
      secondsEl.textContent = String(seconds).padStart(2, "0");
    } else {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
  var elements = document.querySelectorAll(".animate-on-scroll");

  if (!elements.length) return;

  // Verificar se IntersectionObserver é suportado
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "-50px 0px",
      }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: mostrar tudo se IntersectionObserver não for suportado
    elements.forEach(function (el) {
      el.classList.add("visible");
    });
  }
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
  var links = document.querySelectorAll('a[href^="#"]');

  links.forEach(function (link) {
    link.addEventListener("click", function (e) {
      var targetId = this.getAttribute("href");
      if (targetId === "#") return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = document.getElementById("header").offsetHeight + 20;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// ==================== REMAINING SLOTS (URGÊNCIA) ====================
function initRemainingSlots() {
  var slotsEl = document.getElementById("remaining-slots");
  if (!slotsEl) return;

  var currentSlots = 347;

  setInterval(function () {
    var decrease = Math.floor(Math.random() * 2);
    currentSlots = Math.max(currentSlots - decrease, 100);
    slotsEl.textContent = currentSlots;
  }, 30000);
}
