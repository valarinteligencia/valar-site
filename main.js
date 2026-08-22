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

// ── Atribuição e eventos do funil ─────────────────────────────────────────
// UTMs ficam apenas na sessão do navegador e alimentam eventos e o lead enviado.
// Não há PII nesta camada.
(function () {
  var chaves = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
  var busca = new URLSearchParams(location.search);
  var atribuicao = {};
  function guardar(chave, valor) {
    try { sessionStorage.setItem(chave, valor); } catch (_) { /* storage pode estar bloqueado */ }
  }
  function ler(chave) {
    try { return sessionStorage.getItem(chave); } catch (_) { return null; }
  }
  chaves.forEach(function (chave) {
    var valor = busca.get(chave);
    if (valor) guardar('valar_' + chave, valor.slice(0, 120));
    var salvo = ler('valar_' + chave);
    if (salvo) atribuicao[chave] = salvo;
  });

  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var evento = a.dataset.track;
    if (!evento && href.indexOf('/valarops') === 0) evento = 'Acesso: ValarOps';
    if (!evento && href.indexOf('/casos') === 0) evento = 'Acesso: Caso';
    if (!evento && href.indexOf('wa.me/') !== -1) evento = 'CTA: WhatsApp';
    if (!evento) return;
    window.vTrack(evento, Object.assign({ origem: location.pathname }, atribuicao));
  }, true);
}());

// Mensagem contextual de WhatsApp sem espalhar URLs diferentes pelas páginas.
(function () {
  var mensagens = {
    contato: 'Olá, conheci a VALAR pelo site e gostaria de conversar sobre a operação da minha empresa.',
    footer: 'Olá, conheci a VALAR pelo site e gostaria de conversar sobre minha operação.',
    valarops: 'Olá, conheci o ValarOps pelo site e gostaria de conversar sobre a operação da minha empresa.'
  };
  document.querySelectorAll('a[data-whatsapp-context]').forEach(function (a) {
    var contexto = a.getAttribute('data-whatsapp-context') || 'footer';
    var mensagem = mensagens[contexto] || mensagens.footer;
    a.href = 'https://wa.me/5551936184094?text=' + encodeURIComponent(mensagem);
  });
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
