/* VALAR OPS · Carro Oficina: interações da landing.
   Sem dependências. Dados fictícios em dados-demo.js (window.VALAR_DEMO).
   Nenhuma chamada de rede: a página é estática e demonstrativa. */
(function () {
  'use strict';

  var doc = document;
  doc.documentElement.classList.remove('sem-js');

  var D = window.VALAR_DEMO;
  var consultaMovimento = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  // ?movimento=reduzido força o modo sem animação (verificação da página)
  var forcarReduzido = /[?&]movimento=reduzido/.test(window.location.search);
  if (forcarReduzido) doc.documentElement.classList.add('movimento-reduzido');
  function reduzido() { return forcarReduzido || !!consultaMovimento.matches; }
  function $(s, c) { return (c || doc).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); }
  function brl(v) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
  function semMoeda(v) { return v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function decimal(v, casas) { return v.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas }); }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function reiniciarClasse(el, classe) { if (!el) return; el.classList.remove(classe); void el.offsetWidth; el.classList.add(classe); }
  function trocarConteudo(el, preencher) {
    if (!el) return;
    if (reduzido()) { preencher(); return; }
    el.classList.add('troca');
    window.setTimeout(function () { preencher(); el.classList.remove('troca'); }, 170);
  }

  /* Ponto de integração de métricas: dispara um evento no documento.
     Não coleta dado pessoal e não envia nada. Ver GUIA_PUBLICACAO.md. */
  function registrar(nome, extra) {
    var props = {};
    Object.keys(extra || {}).forEach(function (k) { props[k] = String(extra[k]); });
    try { doc.dispatchEvent(new CustomEvent('valar:evento', { detail: Object.assign({ evento: nome }, props) })); } catch (e) { /* navegador antigo */ }
    // Reaproveita o rastreamento do site institucional quando ele estiver carregado (respeita o consentimento de lá)
    var rastreio = (window.VALAR_TRACKING && window.VALAR_TRACKING.trackEvent) || window.vTrack;
    if (typeof rastreio === 'function') { try { rastreio(nome, Object.assign({ origem: 'valarops-carro-oficina' }, props)); } catch (e) { /* sem efeito na página */ } }
  }
  doc.addEventListener('click', function (ev) {
    var alvo = ev.target.closest ? ev.target.closest('[data-evento]') : null;
    if (alvo) registrar(alvo.getAttribute('data-evento'));
  });

  var ICONES = {
    ok: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    falta: '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 5v3.2l2 1.3" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
    trava: '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3.5" y="7" width="9" height="6.5" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M5.5 7V5.2a2.5 2.5 0 015 0V7" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>',
    wa: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2.2a5.8 5.8 0 00-5 8.8L2.3 13.7l2.8-.7A5.8 5.8 0 108 2.2z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>',
    portal: '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="2.5" y="3" width="11" height="10" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M2.5 6h11M5.5 9.5l1.6 1.5 3.4-3.5" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    doc: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 1.8h5.2L12.5 5v9.2H4z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M9 1.8V5.2h3.4M6 8.2h4.4M6 10.8h4.4" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>',
    coleta: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v7.5m0 0L5 6.6m3 2.9l3-2.9M3 11.5v2h10v-2" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    medicao: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 13.5h11M4.5 11V7.5M8 11V4.5M11.5 11V8.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
  };
  var COR_ICONE = { ok: 'var(--ok)', falta: 'var(--cobre-claro)', trava: 'var(--erro)', wa: 'var(--wa-verde)', portal: 'var(--marfim)', doc: 'var(--cobre-claro)', coleta: 'var(--tx2)', medicao: 'var(--cobre-claro)' };
  function icone(nome) { return '<span style="color:' + (COR_ICONE[nome] || 'currentColor') + ';display:inline-flex">' + (ICONES[nome] || '') + '</span>'; }
  function trilhoHTML(estado) { var h = ''; for (var i = 0; i < 6; i++) h += '<i class="' + (estado[i] || '') + '"></i>'; return h; }
  function prazoClasse(p) { return 'prazo' + (p && p.tipo ? ' prazo--' + p.tipo : ''); }

  /* ------------------------------------------------------------------
     Diálogos acessíveis (detalhe da OS e ampliação de documentos)
     ------------------------------------------------------------------ */
  var dialogoAberto = null;
  function focaveis(raiz) {
    return $$('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])', raiz).filter(function (el) { return el.offsetParent !== null || el === doc.activeElement; });
  }
  function teclasDialogo(e) {
    if (!dialogoAberto) return;
    if (e.key === 'Escape') { e.preventDefault(); fecharDialogo(); return; }
    if (e.key !== 'Tab') return;
    var f = focaveis(dialogoAberto.painel);
    if (!f.length) return;
    var primeiro = f[0], ultimo = f[f.length - 1];
    if (e.shiftKey && doc.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && doc.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
  }
  function abrirDialogo(raiz, origem, reserva) {
    if (dialogoAberto) fecharDialogo(true);
    var painel = $('[role="dialog"]', raiz);
    dialogoAberto = { raiz: raiz, painel: painel, origem: origem || doc.activeElement, reserva: reserva };
    raiz.classList.add('aberta');
    raiz.removeAttribute('aria-hidden');
    doc.body.style.overflow = 'hidden';
    window.requestAnimationFrame(function () { raiz.classList.add('visivel'); var b = $('[data-fechar].folha__fechar, .folha__fechar', raiz); if (b) b.focus(); });
    doc.addEventListener('keydown', teclasDialogo);
  }
  function fecharDialogo(semFoco) {
    if (!dialogoAberto) return;
    var d = dialogoAberto;
    dialogoAberto = null;
    d.raiz.classList.remove('visivel');
    doc.removeEventListener('keydown', teclasDialogo);
    doc.body.style.overflow = '';
    window.setTimeout(function () { d.raiz.classList.remove('aberta'); d.raiz.setAttribute('aria-hidden', 'true'); }, reduzido() ? 0 : 280);
    if (semFoco) return;
    if (d.origem && doc.contains(d.origem)) d.origem.focus();
    else if (d.reserva) { var r = d.reserva(); if (r) r.focus(); }
  }
  $$('.folha').forEach(function (f) {
    $$('[data-fechar]', f).forEach(function (b) { b.addEventListener('click', function () { fecharDialogo(); }); });
  });

  /* ------------------------------------------------------------------
     Topo: progresso da leitura e seção ativa
     ------------------------------------------------------------------ */
  function iniciarTopo() {
    var barra = $('.topo__progresso span');
    var pendente = false;
    function atualizar() {
      var total = doc.documentElement.scrollHeight - window.innerHeight;
      var p = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      if (barra) barra.style.setProperty('--progresso', p.toFixed(4));
      pendente = false;
    }
    window.addEventListener('scroll', function () { if (!pendente) { pendente = true; window.requestAnimationFrame(atualizar); } }, { passive: true });
    atualizar();
    if (!('IntersectionObserver' in window)) return;
    var links = $$('.topo__nav a');
    var porId = {};
    links.forEach(function (a) { porId[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.removeAttribute('aria-current'); });
        if (porId[e.target.id]) porId[e.target.id].setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(porId).forEach(function (id) { var s = doc.getElementById(id); if (s) io.observe(s); });
  }

  /* ------------------------------------------------------------------
     Revelação na rolagem (uma vez)
     ------------------------------------------------------------------ */
  function iniciarRevela() {
    var els = $$('.revela');
    if (reduzido() || !('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('visto'); }); return; }
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visto'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ------------------------------------------------------------------
     Hero: a mesa de OS em movimento (toca uma vez, pausa, repete)
     ------------------------------------------------------------------ */
  function iniciarMesa() {
    var mesa = $('[data-mesa]');
    if (!mesa || !D) return;
    var lista = $('.mesa__lista', mesa);
    var feed = $('.feed__lista', mesa);
    var botaoTocar = $('[data-mesa-tocar]', mesa);
    var botaoRepetir = $('[data-mesa-repetir]', mesa);
    var estadoTexto = $('[data-mesa-estado]', mesa);
    var resumo = { abertas: $('[data-resumo="abertas"]', mesa), atencao: $('[data-resumo="atencao"]', mesa), portal: $('[data-resumo="portal"]', mesa) };
    var seq = D.hero.sequencia;
    var passo = 0, tocando = false, timer = null, emVista = true, abaVisivel = true;

    function linhaDe(id) { return $('.os-linha[data-os="' + id + '"]', lista); }
    function feedItem(f, novo) {
      return '<li' + (novo ? ' class="novo"' : '') + '><time>' + f.h + '</time><span><span class="os">OS ' + f.os + '</span> · ' + esc(f.texto) + '</span></li>';
    }
    function atualizarResumo(r, animar) {
      if (!r) return;
      Object.keys(resumo).forEach(function (k) {
        var el = resumo[k];
        if (!el || r[k] == null) return;
        var antes = parseInt(el.getAttribute('data-valor') || el.textContent, 10);
        el.setAttribute('data-valor', r[k]);
        el.textContent = r[k];
        var dif = r[k] - antes, cel = el.parentNode;
        if (animar && dif) {
          el.insertAdjacentHTML('beforeend', '<span class="delta">' + (dif > 0 ? '+' : '\u2212') + Math.abs(dif) + '</span>');
          cel.classList.add('mudou');
          window.setTimeout(function () { cel.classList.remove('mudou'); var d = $('.delta', el); if (d) d.parentNode.removeChild(d); }, 2400);
        }
      });
    }
    function desenharInicial() {
      lista.innerHTML = D.hero.linhas.map(function (l) {
        var os = D.osPorId[l.os];
        return '<li class="os-linha" data-os="' + os.id + '">' +
          '<span class="os-linha__id">OS ' + os.id + '</span>' +
          '<span class="' + prazoClasse(l.prazo) + '" data-campo="prazo">' + esc(l.prazo.texto) + '</span>' +
          '<span class="os-linha__ag">' + esc(os.ag) + ' · ' + os.uf + ' · ' + esc(os.esp) + '</span>' +
          '<span class="os-linha__evento" data-campo="evento">' + icone(l.icone) + '<span class="txt">' + esc(l.evento) + '</span></span>' +
          '<span class="trilho" aria-hidden="true" data-campo="trilho">' + trilhoHTML(l.trilho) + '</span>' +
          '</li>';
      }).join('');
      feed.innerHTML = D.hero.feedInicial.map(function (f) { return feedItem(f); }).join('');
      atualizarResumo(D.hero.resumoInicial);
    }
    function aplicar(p, animar) {
      var linha = linhaDe(p.os);
      if (linha) {
        var ev = $('[data-campo="evento"]', linha);
        var txt = $('.txt', ev);
        var aplicarTexto = function () { ev.innerHTML = icone(p.icone) + '<span class="txt">' + esc(p.linha) + '</span>'; };
        if (animar && txt) { txt.classList.add('troca'); window.setTimeout(aplicarTexto, 180); } else aplicarTexto();
        if (p.trilho) $('[data-campo="trilho"]', linha).innerHTML = trilhoHTML(p.trilho);
        if (p.prazo) { var pr = $('[data-campo="prazo"]', linha); pr.className = prazoClasse(p.prazo); pr.textContent = p.prazo.texto; }
        $$('.os-linha', lista).forEach(function (l) { l.classList.remove('is-foco'); });
        if (animar) { linha.classList.add('is-foco'); reiniciarClasse(linha, 'is-viva'); }
      }
      feed.insertAdjacentHTML('afterbegin', feedItem(p, animar));
      while (feed.children.length > 4) feed.removeChild(feed.lastElementChild);
      atualizarResumo(p.resumo, animar);
    }
    var modoPasso = reduzido();
    function marcarBotao() {
      mesa.classList.toggle('tocando', tocando);
      botaoTocar.setAttribute('aria-pressed', tocando ? 'true' : 'false');
      botaoTocar.setAttribute('aria-label', modoPasso ? 'Mostrar o próximo evento' : (tocando ? 'Pausar a demonstração' : 'Continuar a demonstração'));
      $('.rot', botaoTocar).textContent = modoPasso ? 'Próximo' : (tocando ? 'Pausar' : 'Tocar');
      $('.i-pausa', botaoTocar).style.display = tocando ? '' : 'none';
      $('.i-tocar', botaoTocar).style.display = tocando ? 'none' : '';
      botaoTocar.hidden = passo >= seq.length;
      botaoRepetir.hidden = passo < seq.length;
      if (estadoTexto) estadoTexto.textContent = passo >= seq.length ? 'Sequência concluída' : (modoPasso ? 'Avance evento a evento' : (tocando ? 'Eventos da demonstração' : 'Pausado'));
    }
    function agendar() {
      window.clearTimeout(timer);
      if (!tocando || !emVista || !abaVisivel) return;
      timer = window.setTimeout(function () {
        if (passo < seq.length) { aplicar(seq[passo], true); passo++; }
        if (passo >= seq.length) { tocando = false; marcarBotao(); return; }
        agendar();
      }, passo === 0 ? 1600 : 2600);
    }
    function tocar() { if (passo >= seq.length) return; tocando = true; marcarBotao(); agendar(); }
    function pausar() { tocando = false; window.clearTimeout(timer); marcarBotao(); }
    function repetir() { window.clearTimeout(timer); passo = 0; desenharInicial(); tocar(); registrar('hero_repetir'); }

    desenharInicial();
    botaoTocar.addEventListener('click', function () {
      if (modoPasso) { if (passo < seq.length) { aplicar(seq[passo], false); passo++; } marcarBotao(); return; }
      if (tocando) pausar(); else tocar();
    });
    botaoRepetir.addEventListener('click', function () {
      if (modoPasso) { passo = 0; desenharInicial(); marcarBotao(); return; }
      repetir();
    });
    if (modoPasso) { marcarBotao(); return; }
    doc.addEventListener('visibilitychange', function () { abaVisivel = !doc.hidden; if (abaVisivel) agendar(); else window.clearTimeout(timer); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { emVista = e[0].isIntersecting; if (emVista) agendar(); else window.clearTimeout(timer); }, { threshold: 0.25 }).observe(mesa);
    }
    tocar();
  }

  /* ------------------------------------------------------------------
     Ciclo do contrato: hexágono navegável
     ------------------------------------------------------------------ */
  function iniciarCiclo() {
    var sec = $('[data-ciclo]');
    if (!sec || !D) return;
    var hexa = $('.hexa', sec);
    var nos = $$('.hexa__no', sec);
    var chips = $$('.etapas-trilho button', sec);
    var eixos = $$('.hexa__eixo', sec);
    var nucleo = $('.hexa__nucleo', sec);
    var nomeCentro = $('[data-ciclo-centro]', sec);
    var corpo = $('.etapa__corpo', sec);
    var atual = -1;

    function selo(tipo) {
      var t = { auto: 'Automático', assistido: 'Assistido', humano: 'Equipe' }[tipo];
      return '<span class="selo selo--' + tipo + '">' + t + '</span>';
    }
    function preencher(i) {
      var e = D.ciclo[i];
      corpo.innerHTML =
        '<div class="etapa__topo"><span class="rotulo">Etapa ' + (i + 1) + ' de 6 · ' + esc(e.curto) + '</span>' + selo(e.selo) + '</div>' +
        '<h3 class="etapa__titulo">' + esc(e.titulo) + '</h3>' +
        '<p class="etapa__resumo">' + esc(e.resumo) + '</p>' +
        '<dl class="etapa__grade">' +
          '<div><dt>Entra</dt><dd>' + esc(e.entra) + '</dd></div>' +
          '<div><dt class="cobre">O VALAR OPS faz</dt><dd>' + esc(e.faz) + '</dd></div>' +
          '<div><dt>A equipe decide</dt><dd>' + esc(e.equipe) + '</dd></div>' +
          '<div><dt>Avança quando</dt><dd>' + esc(e.avanca) + '</dd></div>' +
        '</dl>' +
        '<div class="etapa__pe"><a class="link-seta" href="' + e.link.href + '" data-evento="ciclo_ir_' + (i + 1) + '">' + esc(e.link.texto) + ' <span aria-hidden="true">→</span></a></div>';
    }
    function selecionar(i, animar) {
      if (i === atual) return;
      atual = i;
      nos.forEach(function (n, k) { n.setAttribute('aria-pressed', k === i ? 'true' : 'false'); });
      chips.forEach(function (c, k) { c.setAttribute('aria-pressed', k === i ? 'true' : 'false'); });
      eixos.forEach(function (x, k) { x.classList.toggle('ativo', k === i); });
      if (nomeCentro) nomeCentro.textContent = D.ciclo[i].curto;
      if (animar) {
        reiniciarClasse(nucleo, 'pulsa');
        trocarConteudo(corpo, function () { preencher(i); });
        var chip = chips[i], trilho = chip && chip.parentNode;
        if (trilho && trilho.scrollWidth > trilho.clientWidth) trilho.scrollTo({ left: chip.offsetLeft - 16, behavior: reduzido() ? 'auto' : 'smooth' });
      } else preencher(i);
    }
    nos.forEach(function (n, k) { n.addEventListener('click', function () { selecionar(k, true); registrar('ciclo_etapa', { etapa: k + 1 }); }); });
    chips.forEach(function (c, k) { c.addEventListener('click', function () { selecionar(k, true); registrar('ciclo_etapa', { etapa: k + 1 }); }); });
    selecionar(0, false);
    if ('IntersectionObserver' in window && !reduzido()) {
      var io = new IntersectionObserver(function (e) { if (e[0].isIntersecting) { hexa.classList.add('em-vista'); io.disconnect(); } }, { threshold: 0.5 });
      io.observe(hexa);
    }
  }

  /* ------------------------------------------------------------------
     Cenas da RAT: avançar, voltar, reiniciar, caminho de correção
     ------------------------------------------------------------------ */
  function iniciarCenas() {
    var sec = $('[data-cenas]');
    if (!sec || !D) return;
    var cenas = $$('.palco__cena', sec);
    var trilho = $$('.cenas__trilho button', sec);
    var corpo = $('.cena-legenda__corpo', sec);
    var bVoltar = $('[data-cena="voltar"]', sec);
    var bAvancar = $('[data-cena="avancar"]', sec);
    var bReiniciar = $('[data-cena="reiniciar"]', sec);
    var contador = $('.controles .contador', sec);
    var bCorrecao = $('[data-correcao]', sec);
    var palco = $('.palco', sec);
    var atual = 0, correcao = false, timers = [];

    function limparTimers() { timers.forEach(window.clearTimeout); timers = []; }
    function selos(lista) { return lista.map(function (s) { return '<span class="selo selo--' + s[0] + '">' + esc(s[1]) + '</span>'; }).join(''); }
    function legenda(i) {
      var L = D.rat.cenas[i];
      var t = correcao && L.correcao ? L.correcao : L;
      corpo.innerHTML =
        '<p class="rotulo">Cena ' + (i + 1) + ' de ' + cenas.length + '</p>' +
        '<div class="cena-legenda__quem">' + selos(t.selos) + '</div>' +
        '<h3 class="cena-legenda__titulo">' + esc(t.titulo) + '</h3>' +
        '<p class="cena-legenda__texto">' + esc(t.texto) + '</p>' +
        (t.destaque ? '<p class="cena-legenda__destaque">' + esc(t.destaque) + '</p>' : '');
    }
    function conferir(cena) {
      var variante = $(correcao ? '.variante-correcao' : '.variante-ok', cena);
      $$('.variante-ok, .variante-correcao', cena).forEach(function (v) { v.hidden = v !== variante; });
      var checks = $$('.ui-check', variante);
      var resultados = $$('[data-resultado]', variante);
      checks.forEach(function (c) { c.classList.remove('ok', 'falha'); });
      resultados.forEach(function (r) { r.hidden = true; });
      var passoMs = reduzido() ? 0 : 320;
      checks.forEach(function (c, k) {
        timers.push(window.setTimeout(function () { c.classList.add(c.getAttribute('data-falha') === 'sim' ? 'falha' : 'ok'); }, passoMs * (k + 1)));
      });
      resultados.forEach(function (r, k) {
        timers.push(window.setTimeout(function () { r.hidden = false; }, passoMs * (checks.length + 1) + k * (reduzido() ? 0 : 700)));
      });
    }
    var comecou = false;
    function ir(i, origem) {
      if (i < 0 || i >= cenas.length) return;
      comecou = true;
      limparTimers();
      var anterior = atual;
      atual = i;
      cenas.forEach(function (c, k) {
        c.classList.remove('saindo-esq');
        if (k === i) { c.classList.remove('ativa'); void c.offsetWidth; c.classList.add('ativa'); c.removeAttribute('aria-hidden'); c.inert = false; }
        else {
          if (k === anterior && i > anterior) c.classList.add('saindo-esq');
          c.classList.remove('ativa'); c.setAttribute('aria-hidden', 'true'); c.inert = true;
        }
      });
      trilho.forEach(function (b, k) {
        b.classList.toggle('feita', k < i);
        if (k === i) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
      });
      bVoltar.disabled = i === 0;
      bAvancar.disabled = i === cenas.length - 1;
      if (contador) contador.textContent = (i + 1) + ' / ' + cenas.length;
      if (bCorrecao) bCorrecao.hidden = !cenas[i].hasAttribute('data-conferencia');
      trocarConteudo(corpo, function () { legenda(i); });
      if (cenas[i].hasAttribute('data-conferencia')) conferir(cenas[i]);
      if (origem) registrar('rat_cena', { cena: i + 1, origem: origem });
    }
    bVoltar.addEventListener('click', function () { ir(atual - 1, 'voltar'); });
    bAvancar.addEventListener('click', function () { ir(atual + 1, 'avancar'); });
    bReiniciar.addEventListener('click', function () { correcao = false; if (bCorrecao) bCorrecao.setAttribute('aria-pressed', 'false'); ir(0, 'reiniciar'); });
    trilho.forEach(function (b, k) { b.addEventListener('click', function () { ir(k, 'trilho'); }); });
    if (bCorrecao) bCorrecao.addEventListener('click', function () {
      correcao = !correcao;
      bCorrecao.setAttribute('aria-pressed', correcao ? 'true' : 'false');
      ir(4, 'correcao');
    });
    palco.setAttribute('tabindex', '0');
    palco.addEventListener('keydown', function (e) {
      if (e.target !== palco) return;
      if (e.key === 'ArrowRight') { ir(atual + 1, 'teclado'); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { ir(atual - 1, 'teclado'); e.preventDefault(); }
    });
    var x0 = null, y0 = null;
    palco.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    palco.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) ir(atual + (dx < 0 ? 1 : -1), 'deslize');
      x0 = y0 = null;
    }, { passive: true });

    // estado inicial sem animação; a primeira cena anima quando o palco entra na tela
    legenda(0);
    cenas.forEach(function (c, k) { if (k) { c.classList.remove('ativa'); c.setAttribute('aria-hidden', 'true'); c.inert = true; } });
    bVoltar.disabled = true;
    if (bCorrecao) bCorrecao.hidden = true;
    if ('IntersectionObserver' in window && !reduzido()) {
      cenas[0].classList.remove('ativa');
      var io = new IntersectionObserver(function (e) { if (e[0].isIntersecting) { io.disconnect(); if (!comecou) ir(0); } }, { threshold: 0.3 });
      io.observe(palco);
    }
  }

  /* ------------------------------------------------------------------
     Documentos: uma medida, três saídas (com quantidades derivadas)
     ------------------------------------------------------------------ */
  function iniciarDocumentos() {
    var sec = $('[data-docs]');
    if (!sec || !D) return;
    var O = D.orcamento;
    var faixa = $('input[type="range"]', sec);
    var valor = $('[data-medida-valor]', sec);
    var menos = $('[data-medida="menos"]', sec);
    var mais = $('[data-medida="mais"]', sec);
    var listaItens = $('.itens__lista', sec);
    var total = $('[data-total]', sec);
    var abas = $$('.saidas__abas [role="tab"]', sec);
    var paineis = $$('.saidas__painel [role="tabpanel"]', sec);
    var medida = O.medidaInicial;

    function arred(v, casas) { var f = Math.pow(10, casas); return Math.max(1 / f, Math.round(v * f) / f); }
    function calcular(m) {
      var q = {};
      var itens = O.itens.map(function (it) {
        var base = it.origem === 'medida' ? m : q[it.origem];
        var qtd = arred(base * it.fator, it.casas);
        q[it.id] = qtd;
        return { id: it.id, cod: it.cod, nome: it.nome, un: it.un, regra: it.regra, qtd: qtd, casas: it.casas, preco: it.preco, total: Math.round(qtd * it.preco * 100) / 100 };
      });
      var soma = itens.reduce(function (s, it) { return s + it.total; }, 0) + O.fixos.valor;
      return { itens: itens, total: Math.round(soma * 100) / 100 };
    }
    function desenharItens(r) {
      listaItens.innerHTML = r.itens.map(function (it) {
        return '<li class="item"><span class="item__nome"><span class="mono cobre">' + it.cod + '</span> ' + esc(it.nome) + '</span>' +
          '<span class="item__qtd" data-q="' + it.id + '">' + decimal(it.qtd, it.casas) + ' ' + it.un + '</span>' +
          '<span class="item__regra">' + esc(it.regra) + '</span>' +
          '<span class="item__valor" data-v="' + it.id + '">' + brl(it.total) + '</span></li>';
      }).join('') +
      '<li class="item item--fixo"><span class="item__nome">' + esc(O.fixos.nome) + '</span><span class="item__qtd">fixos</span><span class="item__regra">' + esc(O.fixos.regra) + '</span><span class="item__valor">' + brl(O.fixos.valor) + '</span></li>';
    }
    function brilhar(el) { if (el && !reduzido()) reiniciarClasse(el, 'brilha'); }
    function atualizar(m, origem) {
      medida = Math.min(O.max, Math.max(O.min, Math.round(m * 2) / 2));
      faixa.value = medida;
      faixa.style.setProperty('--pct', ((medida - O.min) / (O.max - O.min) * 100).toFixed(2) + '%');
      faixa.setAttribute('aria-valuetext', decimal(medida, 2) + ' metros quadrados');
      valor.textContent = decimal(medida, 2);
      var r = calcular(medida);
      r.itens.forEach(function (it) {
        var q = $('[data-q="' + it.id + '"]', listaItens), v = $('[data-v="' + it.id + '"]', listaItens);
        if (q) { q.textContent = decimal(it.qtd, it.casas) + ' ' + it.un; if (origem) brilhar(q); }
        if (v) v.textContent = brl(it.total);
        $$('[data-doc-q="' + it.id + '"]', sec).forEach(function (el) { el.textContent = decimal(it.qtd, it.casas); if (origem) brilhar(el); });
        $$('[data-doc-v="' + it.id + '"]', sec).forEach(function (el) { el.textContent = semMoeda(it.total); if (origem) brilhar(el); });
        $$('[data-doc-u="' + it.id + '"]', sec).forEach(function (el) { el.textContent = semMoeda(it.preco); });
      });
      total.textContent = brl(r.total);
      if (origem) brilhar(total);
      $$('[data-doc-total]', sec).forEach(function (el) { el.textContent = semMoeda(r.total); if (origem) brilhar(el); });
      $$('[data-doc-medida]', sec).forEach(function (el) { el.textContent = decimal(medida, 2); if (origem) brilhar(el); });
      $$('[data-doc-comprimento]', sec).forEach(function (el) { el.textContent = decimal(medida / O.largura, 2); });
      if (origem) registrar('docs_medida', { origem: origem });
    }
    desenharItens(calcular(medida));
    faixa.min = O.min; faixa.max = O.max; faixa.step = O.passo;
    faixa.addEventListener('input', function () { atualizar(parseFloat(faixa.value), 'faixa'); });
    menos.addEventListener('click', function () { atualizar(medida - 1, 'menos'); });
    mais.addEventListener('click', function () { atualizar(medida + 1, 'mais'); });
    atualizar(medida);

    function abrirAba(i, foco) {
      abas.forEach(function (a, k) {
        var sel = k === i;
        a.setAttribute('aria-selected', sel ? 'true' : 'false');
        a.tabIndex = sel ? 0 : -1;
        paineis[k].hidden = !sel;
      });
      if (foco) abas[i].focus();
    }
    abas.forEach(function (a, k) {
      a.addEventListener('click', function () { abrirAba(k); registrar('docs_aba', { aba: a.getAttribute('data-aba') }); });
      a.addEventListener('keydown', function (e) {
        var n = abas.length, alvo = null;
        if (e.key === 'ArrowRight') alvo = (k + 1) % n;
        if (e.key === 'ArrowLeft') alvo = (k - 1 + n) % n;
        if (e.key === 'Home') alvo = 0;
        if (e.key === 'End') alvo = n - 1;
        if (alvo !== null) { e.preventDefault(); abrirAba(alvo, true); }
      });
    });
    abrirAba(0);
  }

  /* ------------------------------------------------------------------
     Ampliar documentos (RAT, foto, planilha, relatório): toque para ler
     ------------------------------------------------------------------ */
  function iniciarAmpliar() {
    var raiz = $('#folha-ampliar');
    if (!raiz) return;
    var palcoAmp = $('.ampliar__palco', raiz);
    var titulo = $('#ampliar-titulo', raiz);
    doc.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('[data-ampliar-alvo]') : null;
      if (!b) return;
      var alvo = doc.getElementById(b.getAttribute('data-ampliar-alvo'));
      if (!alvo) return;
      var copia = alvo.cloneNode(true);
      copia.removeAttribute('id');
      copia.classList.remove('passo');
      copia.style.cssText = '';
      $$('[id]', copia).forEach(function (n) { n.removeAttribute('id'); });
      $$('.assinatura-traco', copia).forEach(function (p) { p.style.strokeDashoffset = '0'; p.style.animation = 'none'; });
      $$('.carimbo', copia).forEach(function (c) { c.style.opacity = '1'; c.style.animation = 'none'; });
      palcoAmp.innerHTML = '';
      palcoAmp.appendChild(copia);
      titulo.textContent = b.getAttribute('data-ampliar-titulo') || 'Documento ampliado';
      abrirDialogo(raiz, b);
      registrar('ampliar', { alvo: b.getAttribute('data-ampliar-alvo') });
    });
  }

  /* ------------------------------------------------------------------
     Mesa explorável (medição e pagamento) + folha de detalhe
     ------------------------------------------------------------------ */
  function iniciarExplorar() {
    var sec = $('[data-explorar]');
    if (!sec || !D) return;
    var filtros = $$('.filtros button', sec);
    var lista = $('.explorar__lista', sec);
    var estado = $('[data-explorar-estado]', sec);
    var bMais = $('[data-explorar-mais]', sec);
    var folha = $('#folha-os');
    var corpo = $('.folha__corpo', folha);
    var titulo = $('#folha-titulo', folha);
    var subtitulo = $('#folha-sub', folha);
    var filtroAtual = 'atencao';
    var expandido = false;
    var LIMITE = 3;
    var original = JSON.stringify(D.os);
    var largo = window.matchMedia ? window.matchMedia('(min-width: 900px)') : { matches: false };

    function osDoFiltro(f) { return D.os.filter(function (o) { return f === 'todas' || o.filtros.indexOf(f) !== -1; }); }
    function contar() { filtros.forEach(function (b) { $('.n', b).textContent = osDoFiltro(b.getAttribute('data-filtro')).length; }); }
    function textoAcao(p) { return p.acao || (p.link && p.link.texto) || 'Ver detalhe'; }
    function cartao(o) {
      return '<li><button type="button" class="cartao-os entra-lista" data-abrir="' + o.id + '" aria-haspopup="dialog">' +
        '<span class="cartao-os__id">OS ' + o.id + '</span>' +
        '<span class="' + prazoClasse(o.prazo) + '">' + esc(o.prazo.texto) + '</span>' +
        '<span class="cartao-os__ag">' + esc(o.ag) + ' · ' + o.uf + ' · ' + esc(o.esp) + '</span>' +
        '<span class="cartao-os__pend"><span class="rotulo">' + esc(o.pendencia.rotulo) + '</span>' + esc(o.pendencia.titulo) + '</span>' +
        '<span class="trilho" aria-hidden="true">' + trilhoHTML(o.trilho) + '</span>' +
        '<span class="cartao-os__acao"><span>' + esc(textoAcao(o.pendencia)) + ' →</span><span>' + esc(o.valor) + '</span></span>' +
        '</button></li>';
    }
    function desenhar() {
      var itens = osDoFiltro(filtroAtual);
      var limite = expandido || largo.matches ? itens.length : LIMITE;
      lista.innerHTML = itens.length ? itens.slice(0, limite).map(cartao).join('') : '<li class="explorar__vazio">Nenhuma OS nesta condição no exemplo.</li>';
      var resto = itens.length - Math.min(itens.length, limite);
      bMais.hidden = resto <= 0;
      if (resto > 0) bMais.textContent = 'Ver mais ' + resto + ' OS';
      var rotulo = $('.filtros button[data-filtro="' + filtroAtual + '"] .t', sec).textContent;
      estado.textContent = itens.length + ' OS · ' + rotulo;
      contar();
    }
    filtros.forEach(function (b) {
      b.addEventListener('click', function () {
        filtroAtual = b.getAttribute('data-filtro');
        expandido = false;
        filtros.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        desenhar();
        registrar('explorar_filtro', { filtro: filtroAtual });
      });
    });
    bMais.addEventListener('click', function () { expandido = true; desenhar(); var c = $$('.cartao-os', lista)[LIMITE]; if (c) c.focus(); });
    lista.addEventListener('click', function (e) {
      var b = e.target.closest('[data-abrir]');
      if (b) abrir(b.getAttribute('data-abrir'), b);
    });
    if (largo.addEventListener) largo.addEventListener('change', function () { expandido = false; desenhar(); });

    function detalhe(o) {
      var nomes = ['Execução', 'Documentação', 'Medição', 'Pagamento'];
      var rot = { ok: 'Feito', vez: 'Agora', trava: 'Travado', pendente: 'A seguir' };
      var perc = o.percurso.map(function (p, k) { return '<li class="' + p + '"><b>' + rot[p] + '</b>' + nomes[k] + '</li>'; }).join('');
      var docs = o.docs.map(function (d) { return '<li class="' + d.estado + '">' + ICONES[d.estado === 'ok' ? 'ok' : (d.estado === 'trava' ? 'trava' : 'falta')] + '<span>' + esc(d.nome) + '</span><small>' + esc(d.info) + '</small></li>'; }).join('');
      var evs = o.eventos.map(function (ev) { return '<li><time>' + esc(ev.h) + '</time><span>' + esc(ev.t) + '</span></li>'; }).join('');
      var p = o.pendencia;
      var acao;
      if (o.resolvido) acao = '<p class="resolvido">' + esc(p.resolvidoTexto) + '</p><button type="button" class="botao botao--fantasma" data-restaurar="' + o.id + '">Restaurar o exemplo</button>';
      else if (p.link) acao = '<a class="botao botao--linha" href="' + p.link.href + '" data-ir="' + p.link.href + '">' + esc(p.link.texto) + ' <span aria-hidden="true">→</span></a>';
      else if (p.acao) acao = '<button type="button" class="botao ' + (p.tipo === 'trava' ? 'botao--linha' : 'botao--cobre') + '" data-resolver="' + o.id + '">' + esc(p.acao) + '</button>';
      else acao = '';
      var pend = '<div class="pendencia ' + esc(p.tipo) + '"><span class="rotulo">' + esc(p.rotulo) + '</span><b>' + esc(p.titulo) + '</b><p>' + esc(p.texto) + '</p>' + acao +
        (p.nota ? '<p class="ui__nota" style="margin-top:10px">' + esc(p.nota) + '</p>' : '') + '</div>';
      return '<div class="ficha-resumo"><span><b>Chamado</b>' + (o.chamado ? esc(o.chamado) : 'sem chamado (OS direta)') + '</span><span><b>Valor da OS · RATs</b>' + esc(o.valor) + '</span></div>' +
        '<div><span class="rotulo">Percurso da OS</span><ol class="percurso">' + perc + '</ol></div>' +
        pend +
        '<div><span class="rotulo">Documentos e conformidade</span><ul class="docs-os">' + docs + '</ul></div>' +
        (evs ? '<div><span class="rotulo">Eventos desta OS</span><ol class="eventos-os">' + evs + '</ol></div>' : '') +
        '<p class="selo-demo" style="justify-self:start">Demonstração com dados fictícios</p>';
    }
    function preencherFolha(o) {
      titulo.textContent = 'OS ' + o.id;
      subtitulo.textContent = o.ag + ' · ' + o.uf + ' · ' + o.esp + ' · ' + o.servico;
      corpo.innerHTML = detalhe(o);
      corpo.scrollTop = 0;
    }
    function abrir(id, origem) {
      var o = D.osPorId[id];
      if (!o) return;
      preencherFolha(o);
      abrirDialogo(folha, origem, function () { return $('[data-abrir="' + id + '"]', lista) || $('.filtros button[aria-pressed="true"]', sec); });
      registrar('explorar_abrir_os', { os: id });
    }
    function aplicarResolucao(o) {
      var r = o.pendencia.resolucao;
      o.resolvido = true;
      ['prazo', 'trilho', 'percurso', 'filtros', 'docs', 'etapaNome'].forEach(function (k) { if (r[k]) o[k] = r[k]; });
      o.eventos = [{ h: r.hora, t: r.evento }].concat(o.eventos);
    }
    corpo.addEventListener('click', function (e) {
      var r = e.target.closest('[data-resolver]');
      var s = e.target.closest('[data-restaurar]');
      var ir = e.target.closest('[data-ir]');
      if (r) {
        var o = D.osPorId[r.getAttribute('data-resolver')];
        aplicarResolucao(o);
        preencherFolha(o);
        desenhar();
        var b = $('[data-restaurar]', corpo); if (b) b.focus();
        registrar('explorar_resolver', { os: o.id });
      } else if (s) {
        var id = s.getAttribute('data-restaurar');
        var base = JSON.parse(original).filter(function (x) { return x.id === id; })[0];
        var alvo = D.osPorId[id];
        Object.keys(base).forEach(function (k) { alvo[k] = base[k]; });
        delete alvo.resolvido;
        preencherFolha(alvo);
        desenhar();
        var b2 = $('[data-resolver]', corpo); if (b2) b2.focus();
      } else if (ir) {
        fecharDialogo(true);
      }
    });
    desenhar();
  }

  /* ------------------------------------------------------------------
     Saldo do ciclo: o chamado parado e a simulação da OS irmã
     ------------------------------------------------------------------ */
  function iniciarSaldo() {
    var bloco = $('[data-saldo]'), parado = $('#saldo');
    if (!bloco || !parado) return;
    var botao = $('[data-simular]', parado), irma = $('[data-irma]', parado), texto = $('[data-parado-texto]', parado);
    var base = { s: 126418.90, t: 7364.20, p: 48730.10, qs: 31, qt: 2, qp: 9 };
    var simulado = { s: 132007.80, t: 3177.90, p: 47327.50, qs: 33, qt: 1, qp: 8 };
    var atual = base;
    function pintar(e) {
      $('[data-saldo-valor="s"]', bloco).textContent = semMoeda(e.s);
      $('[data-saldo-valor="s2"]', bloco).textContent = semMoeda(e.s);
      $('[data-saldo-valor="t"]', bloco).textContent = semMoeda(e.t);
      $('[data-saldo-valor="p"]', bloco).textContent = semMoeda(e.p);
      $('[data-saldo-qtd="s"]', bloco).textContent = e.qs;
      $('[data-saldo-qtd="t"]', bloco).textContent = e.qt;
      $('[data-saldo-qtd="p"]', bloco).textContent = e.qp;
      var tot = e.s + e.t + e.p;
      $('[data-barra="s"]', bloco).style.width = (e.s / tot * 100).toFixed(2) + '%';
      $('[data-barra="t"]', bloco).style.width = (e.t / tot * 100).toFixed(2) + '%';
    }
    function animar(de, para) {
      if (reduzido()) { pintar(para); return; }
      var t0 = null;
      function quadro(t) {
        if (t0 === null) t0 = t;
        var k = Math.min(1, (t - t0) / 280), m = { qs: para.qs, qt: para.qt, qp: para.qp };
        ['s', 't', 'p'].forEach(function (c) { m[c] = Math.round((de[c] + (para[c] - de[c]) * k) * 100) / 100; });
        pintar(k < 1 ? m : para);
        if (k < 1) window.requestAnimationFrame(quadro);
      }
      window.requestAnimationFrame(quadro);
    }
    pintar(base);
    botao.addEventListener('click', function () {
      var simular = atual === base, de = atual;
      atual = simular ? simulado : base;
      animar(de, atual);
      botao.setAttribute('aria-pressed', simular ? 'true' : 'false');
      botao.textContent = simular ? 'Restaurar o exemplo' : 'Simular a conformidade da OS irmã';
      irma.textContent = simular ? 'Conformada (exemplo)' : 'Sem conformidade';
      irma.className = 'estado ' + (simular ? 'estado--ok' : 'estado--falta');
      texto.textContent = simular
        ? 'Chamado completo: as duas OS entram no saldo do ciclo, previstas para pagamento (exemplo).'
        : 'Enquanto a OS 260251377 não tiver conformidade, os R$ 4.186,30 da OS 260251309 ficam fora do saldo do ciclo.';
      registrar('saldo_simular', { estado: simular ? 'simulado' : 'base' });
    });
  }

  /* ------------------------------------------------------------------
     Gerente × dono
     ------------------------------------------------------------------ */
  function iniciarGanho() {
    var sec = $('[data-ganho]');
    if (!sec || !D) return;
    var abas = $$('.segmento [role="tab"]', sec);
    var caixa = $('.ganhos', sec);
    function preencher(chave) {
      caixa.innerHTML = D.ganhos[chave].map(function (g) {
        return '<article class="ganho"><h3>' + esc(g.titulo) + '</h3><p>' + esc(g.texto) + '</p><a href="' + g.href + '">Visto em: ' + esc(g.onde) + ' ↑</a></article>';
      }).join('');
      caixa.setAttribute('aria-labelledby', 'aba-' + chave);
    }
    function selecionar(k, foco) {
      abas.forEach(function (a, i) { a.setAttribute('aria-selected', i === k ? 'true' : 'false'); a.tabIndex = i === k ? 0 : -1; });
      if (foco) abas[k].focus();
      trocarConteudo(caixa, function () { preencher(abas[k].getAttribute('data-perfil')); });
    }
    abas.forEach(function (a, k) {
      a.addEventListener('click', function () { selecionar(k); registrar('ganho_perfil', { perfil: a.getAttribute('data-perfil') }); });
      a.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); selecionar(k === 0 ? 1 : 0, true); }
      });
    });
    preencher('gerente');
  }

  /* ------------------------------------------------------------------
     Indicadores: contam até o valor fixo verificado
     ------------------------------------------------------------------ */
  function iniciarContadores() {
    var els = $$('[data-alvo]');
    function final(el) { el.textContent = Number(el.getAttribute('data-alvo')).toLocaleString('pt-BR'); }
    if (reduzido() || !('IntersectionObserver' in window)) { els.forEach(final); return; }
    els.forEach(function (el) { el.textContent = '0'; });
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var el = e.target, alvo = Number(el.getAttribute('data-alvo')), t0 = null, dur = 1100;
        function quadro(t) {
          if (t0 === null) t0 = t;
          var p = Math.min(1, (t - t0) / dur), suave = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(alvo * suave).toLocaleString('pt-BR');
          if (p < 1) window.requestAnimationFrame(quadro); else final(el);
        }
        window.requestAnimationFrame(quadro);
      });
    }, { threshold: 0.6 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------
     CTA fixo no celular: aparece depois do hero, some no convite e no rodapé
     ------------------------------------------------------------------ */
  function iniciarCtaFixo() {
    var cta = $('.cta-fixo');
    if (!cta || !('IntersectionObserver' in window)) return;
    var passouHero = false, fimVisivel = false, demoNoCentro = [];
    var link = $('a', cta);
    // some enquanto uma demonstração ocupa o centro da tela, para não cobrir os controles
    var ioDemo = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        var i = demoNoCentro.indexOf(e.target);
        if (e.isIntersecting && i === -1) demoNoCentro.push(e.target);
        if (!e.isIntersecting && i !== -1) demoNoCentro.splice(i, 1);
      });
      atualizar();
    }, { rootMargin: '-30% 0px -30% 0px' });
    $$('.cenas, .docs, .explorar, .hexa').forEach(function (d) { ioDemo.observe(d); });
    function atualizar() {
      var mostrar = passouHero && !fimVisivel && demoNoCentro.length === 0;
      cta.classList.toggle('visivel', mostrar);
      cta.setAttribute('aria-hidden', mostrar ? 'false' : 'true');
      link.tabIndex = mostrar ? 0 : -1;
    }
    doc.body.classList.add('tem-cta-fixo');
    new IntersectionObserver(function (e) { passouHero = !e[0].isIntersecting && e[0].boundingClientRect.top < 0; atualizar(); }).observe($('.hero'));
    var visiveis = [];
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        var i = visiveis.indexOf(e.target);
        if (e.isIntersecting && i === -1) visiveis.push(e.target);
        if (!e.isIntersecting && i !== -1) visiveis.splice(i, 1);
      });
      fimVisivel = visiveis.length > 0; atualizar();
    });
    $$('#demonstracao, .rodape').forEach(function (f) { io.observe(f); });
    atualizar();
  }

  /* ------------------------------------------------------------------
     Cópias: a foto da RAT no grupo é a mesma RAT da cena 3, e o PDF é o Word convertido
     ------------------------------------------------------------------ */
  function variarRat(c, v) {
    if (!v) return;
    ['os', 'chamado', 'prefixo', 'dependencia', 'servico', 'mo', 'total'].forEach(function (k) {
      var el = c.querySelector('[data-rat="' + k + '"]');
      if (el && v[k]) el.textContent = v[k];
    });
    var car = c.querySelector('[data-rat="carimbo"]');
    if (car && v.carimbo) car.innerHTML = v.carimbo;
    var corpo = c.querySelector('[data-rat="itens"]');
    if (corpo && v.itens) {
      corpo.innerHTML = v.itens.map(function (i) {
        return '<tr' + (i[6] ? ' class="fixo"' : '') + '><td>' + esc(i[0]) + '</td><td>' + esc(i[1]) + '</td><td class="num">' + esc(i[2]) + '</td><td>' + esc(i[3]) + '</td><td class="num">' + esc(i[4]) + '</td><td class="num">' + esc(i[5]) + '</td></tr>';
      }).join('') + '<tr class="vazia"><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
    }
  }
  function iniciarClones() {
    $$('[data-clonar]').forEach(function (alvo) {
      var origem = doc.getElementById(alvo.getAttribute('data-clonar'));
      if (!origem) return;
      var c = origem.cloneNode(true);
      c.removeAttribute('id');
      c.removeAttribute('role');
      c.removeAttribute('aria-label');
      $$('[id]', c).forEach(function (n) { n.removeAttribute('id'); });
      c.classList.add('rat--estatica');
      var variante = alvo.getAttribute('data-variante');
      if (variante && D && D.ratVariantes) variarRat(c, D.ratVariantes[variante]);
      // a foto do grupo: mesa de obra, ruído de foto e lápis (composição do Claude Design)
      if (alvo.hasAttribute('data-foto')) alvo.insertAdjacentHTML('beforeend', '<span class="foto-rat__ruido"></span><span class="foto-rat__lapis"></span>');
      alvo.appendChild(c);
    });
    $$('[data-clonar-doc]').forEach(function (alvo) {
      var origem = doc.getElementById(alvo.getAttribute('data-clonar-doc'));
      if (!origem) return;
      var c = origem.cloneNode(true);
      c.id = alvo.getAttribute('data-id-copia') || '';
      c.classList.remove('doc--docx');
      c.classList.add('doc--pdf');
      c.setAttribute('aria-label', 'Prévia do relatório em PDF que vai ao portal');
      var faixa = $('.doc__faixa', c);
      if (faixa) faixa.innerHTML = alvo.getAttribute('data-faixa');
      alvo.appendChild(c);
    });
  }

  function iniciar() {
    if (D && D.os) { D.osPorId = {}; D.os.forEach(function (o) { D.osPorId[o.id] = o; }); }
    iniciarClones();
    iniciarTopo();
    iniciarRevela();
    iniciarMesa();
    iniciarCiclo();
    iniciarCenas();
    iniciarDocumentos();
    iniciarAmpliar();
    iniciarExplorar();
    iniciarSaldo();
    iniciarGanho();
    iniciarContadores();
    iniciarCtaFixo();
  }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
