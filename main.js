/* VALAR — main.js · Scripts compartilhados */

// ── Analytics (Plausible) — helper guardado + fila de eventos ──────────────
// Instrumentação NUNCA lança e NUNCA bloqueia o fluxo. Se o Plausible não
// carregou (localhost, bloqueador, offline), vira no-op silencioso.
// Regra LGPD: nenhum evento carrega PII (sem CNPJ, nome ou e-mail).
(function () {
  // Stub de fila: permite chamar plausible() antes do script.js carregar. Quando
  // o script.js real carrega, ele substitui window.plausible e drena a fila (.q).
  window.plausible = window.plausible || function () {
    (window.plausible.q = window.plausible.q || []).push(arguments);
  };
  // Helper único do site. `props` é opcional (objeto simples, sem PII).
  window.vTrack = function (evento, props) {
    try {
      if (typeof window.plausible === 'function') {
        window.plausible(evento, props ? { props: props } : undefined);
      }
    } catch (_) { /* telemetria nunca quebra o fluxo */ }
  };
}());

// ── Funil (topo): clique em CTA que leva ao Diagnóstico (qualquer página) ──
(function () {
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (/(?:diagnostico|snapshot)\.html/.test(href) || href === '#snap-form') {
      window.vTrack('CTA: Diagnóstico', { origem: location.pathname });
    }
  }, true);
}());

// Fade-in de seções com choreography progressiva
(function () {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('section').forEach(function (s) {
      s.classList.add('is-visible');
    });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('section').forEach(function (s) {
    if (s.id !== 'hero') {
      observer.observe(s);
    } else {
      s.classList.add('is-visible');
    }
  });
}());

// Nav: estado scrolled (gravidade aumenta após sair do hero)
(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  var ticking = false;
  function update() {
    if (window.scrollY > 32) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  update();
}());

// Menu mobile hambúrguer (com ESC, scroll-lock e backdrop)
(function () {
  var btn = document.querySelector('.nav__hamburger');
  var menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  // Criar backdrop dinamicamente
  var backdrop = document.createElement('div');
  backdrop.className = 'nav__backdrop';
  backdrop.setAttribute('aria-hidden', 'true');
  document.querySelector('.nav').appendChild(backdrop);

  function openMenu() {
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Fechar menu de navegação');
    menu.hidden = false;
    menu.classList.add('is-open');
    backdrop.classList.add('is-active');
    document.body.classList.add('nav-open');
  }

  function closeMenu() {
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Abrir menu de navegação');
    menu.hidden = true;
    menu.classList.remove('is-open');
    backdrop.classList.remove('is-active');
    document.body.classList.remove('nav-open');
  }

  btn.addEventListener('click', function () {
    if (btn.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Fechar ao clicar em link interno
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  // Fechar ao clicar no backdrop
  backdrop.addEventListener('click', function () {
    closeMenu();
  });

  // Fechar com tecla ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      btn.focus();
    }
  });
}());
