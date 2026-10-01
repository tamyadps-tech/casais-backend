(() => {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const views = ['landing', 'orientacao', 'quiz', 'result'];

  let state = {
    nome: '',
    index: 0,
    answers: {}
  };

  function showView(name) {
    views.forEach((v) => { $(`#view-${v}`).hidden = v !== name; });
    window.scrollTo(0, 0);
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ---------- landing ----------
  $('#btn-start').addEventListener('click', () => {
    const nome = $('#nome-input').value.trim();
    const errEl = $('#landing-error');
    if (!nome) {
      errEl.textContent = 'Type your name up there to get started.';
      errEl.hidden = false;
      return;
    }
    errEl.hidden = true;
    state.nome = nome;
    state.index = 0;
    state.answers = {};
    showView('orientacao');
  });

  // ---------- orientation ----------
  $('#btn-orientacao-continuar').addEventListener('click', () => {
    showView('quiz');
    renderQuestion();
  });

  // ---------- quiz ----------
  function renderQuestion() {
    const q = QUESTIONS[state.index];
    const total = QUESTIONS.length;
    $('#progress-fill').style.width = `${Math.round((state.index / total) * 100)}%`;
    $('#quiz-counter').textContent = `${state.index + 1} / ${total}`;
    $('#question-text').textContent = q.texto;
    $('#btn-back').style.visibility = state.index === 0 ? 'hidden' : 'visible';

    const area = $('#answer-area');
    area.innerHTML = '';
    $('#btn-next').hidden = true;

    const existing = state.answers[q.id];

    if (q.tipo === 'multipla_escolha') {
      const wrap = document.createElement('div');
      wrap.className = 'options-list';
      q.opcoes.forEach((opcao) => {
        const btn = document.createElement('button');
        const isSkip = opcao.texto === NAO_SEI_TEXTO;
        btn.className = 'option-btn' + (isSkip ? ' option-btn-skip' : '') + (existing === opcao.texto ? ' selected' : '');
        btn.textContent = opcao.texto;
        btn.addEventListener('click', () => answerAndAdvance(q.id, opcao.texto));
        wrap.appendChild(btn);
      });
      area.appendChild(wrap);
    } else if (q.tipo === 'selecao_multipla') {
      const maxSel = q.max_selecoes || 3;
      const selected = Array.isArray(existing) ? [...existing] : [];

      const hint = document.createElement('p');
      hint.className = 'muted small select-hint';
      const updateHint = () => { hint.textContent = `${selected.length}/${maxSel} selected`; };
      updateHint();
      area.appendChild(hint);

      const nextBtn = $('#btn-next');
      nextBtn.hidden = false;
      const updateNextState = () => { nextBtn.disabled = selected.length === 0; };

      const wrap = document.createElement('div');
      wrap.className = 'options-list';
      q.opcoes.forEach((opcao) => {
        const btn = document.createElement('button');
        const isSkip = opcao.texto === NAO_SEI_TEXTO;
        btn.className = 'option-btn' + (isSkip ? ' option-btn-skip' : '') + (selected.includes(opcao.texto) ? ' selected' : '');
        btn.textContent = opcao.texto;
        btn.addEventListener('click', () => {
          const idx = selected.indexOf(opcao.texto);
          if (idx >= 0) {
            selected.splice(idx, 1);
          } else {
            if (selected.length >= maxSel) return;
            selected.push(opcao.texto);
          }
          btn.classList.toggle('selected');
          updateHint();
          updateNextState();
        });
        wrap.appendChild(btn);
      });
      area.appendChild(wrap);
      updateNextState();

      nextBtn.onclick = () => {
        if (!selected.length) return;
        answerAndAdvance(q.id, [...selected]);
      };
    } else if (q.tipo === 'escala') {
      const wrap = document.createElement('div');
      wrap.className = 'scale-wrap';

      const labels = document.createElement('div');
      labels.className = 'scale-labels';
      labels.innerHTML = `<span>1 · ${escapeHtml(q.escala.min_label)}</span><span>5 · ${escapeHtml(q.escala.max_label)}</span>`;
      wrap.appendChild(labels);

      const buttons = document.createElement('div');
      buttons.className = 'scale-buttons';
      for (let v = 1; v <= 5; v += 1) {
        const btn = document.createElement('button');
        btn.className = 'scale-btn' + (Number(existing) === v ? ' selected' : '');
        btn.textContent = String(v);
        btn.addEventListener('click', () => answerAndAdvance(q.id, v));
        buttons.appendChild(btn);
      }
      wrap.appendChild(buttons);
      area.appendChild(wrap);

      const skipBtn = document.createElement('button');
      skipBtn.className = 'btn-link skip-question' + (existing === NAO_SEI_TEXTO ? ' selected' : '');
      skipBtn.textContent = NAO_SEI_TEXTO;
      skipBtn.addEventListener('click', () => answerAndAdvance(q.id, NAO_SEI_TEXTO));
      area.appendChild(skipBtn);
    }
  }

  function answerAndAdvance(questionId, value) {
    state.answers[questionId] = value;
    if (state.index >= QUESTIONS.length - 1) {
      finishQuiz();
      return;
    }
    state.index += 1;
    renderQuestion();
  }

  $('#btn-back').addEventListener('click', () => {
    if (state.index === 0) return;
    state.index -= 1;
    renderQuestion();
  });

  // ---------- scoring (same logic as the PT version) ----------
  const questionsById = new Map(QUESTIONS.map((q) => [q.id, q]));

  function escalaContribution(question, valor) {
    const centered = valor - 3;
    return question.inverso ? -centered : centered;
  }

  function tally(categoria) {
    const counts = {};
    Object.entries(state.answers).forEach(([questionId, resposta]) => {
      const question = questionsById.get(questionId);
      if (!question || question.categoria !== categoria) return;

      if (question.tipo === 'multipla_escolha' || question.tipo === 'selecao_multipla') {
        const selecionadas = Array.isArray(resposta) ? resposta : [resposta];
        selecionadas.forEach((valorTexto) => {
          const opcao = question.opcoes.find((o) => o.texto === valorTexto);
          const tag = opcao && opcao.tag;
          if (tag && tag !== 'neutro') counts[tag] = (counts[tag] || 0) + 1;
        });
      } else if (question.tipo === 'escala') {
        const valor = Number(resposta);
        if (!Number.isNaN(valor)) {
          const dim = question.dimensao;
          counts[dim] = (counts[dim] || 0) + escalaContribution(question, valor) * 1.5;
        }
      }
    });
    return counts;
  }

  function topTag(counts) {
    const entries = Object.entries(counts).filter(([, v]) => v > 0);
    if (!entries.length) return null;
    entries.sort((a, b) => b[1] - a[1]);
    return entries[0][0];
  }

  // Dominant trait's "volume": how much it stood out alone vs. shared
  // space with the other tags in the same category.
  function volumeLevel(counts, top) {
    if (!top) return 'sutil';
    const positivos = Object.values(counts).filter((v) => v > 0);
    const total = positivos.reduce((a, b) => a + b, 0);
    if (!total) return 'sutil';
    const proporcao = (counts[top] || 0) / total;
    if (proporcao >= 0.55) return 'alto';
    if (proporcao >= 0.35) return 'moderado';
    return 'sutil';
  }

  // Overall emotional "volume": average reactivity on the scale
  // questions (distance from the scale's center, 1 to 5), regardless of dimension.
  function reatividadeEmocional() {
    const escalas = QUESTIONS.filter((q) => q.tipo === 'escala');
    let soma = 0;
    let n = 0;
    escalas.forEach((q) => {
      const resposta = state.answers[q.id];
      if (resposta === undefined || resposta === NAO_SEI_TEXTO) return;
      const valor = Number(resposta);
      if (Number.isNaN(valor)) return;
      soma += Math.abs(valor - 3);
      n += 1;
    });
    if (!n) return null;
    const media = soma / n;
    if (media >= 1.3) return 'alto';
    if (media >= 0.7) return 'medio';
    return 'baixo';
  }

  function estiloVidaTags() {
    const tags = [];
    QUESTIONS.filter((q) => q.categoria === 'estilo_vida').forEach((q) => {
      const resposta = state.answers[q.id];
      if (resposta === undefined) return;
      const selecionadas = Array.isArray(resposta) ? resposta : [resposta];
      selecionadas.forEach((valorTexto) => {
        const opcao = q.opcoes.find((o) => o.texto === valorTexto);
        if (opcao && opcao.tag && opcao.tag !== 'neutro') tags.push(opcao.tag);
      });
    });
    return tags;
  }

  // ---------- result assembly ----------
  function finishQuiz() {
    const temperamentoCounts = tally('temperamento');
    const temperamento = topTag(temperamentoCounts) || 'sanguineo';
    const apego = topTag(tally('apego')) || 'seguro';
    const ferida = topTag(tally('feridas_infancia'));
    const intimidade = topTag(tally('intimidade'));
    const reatividade = topTag(tally('reatividade'));
    const individuo = topTag(tally('individuo'));
    const tagsEstiloVida = estiloVidaTags();
    const volumeTemperamento = volumeLevel(temperamentoCounts, temperamento);
    const volumeEmocional = reatividadeEmocional();

    $('#result-title').textContent = `About ${state.nome} in relationships`;

    const partes = [];
    partes.push(`${state.nome}, first of all: this isn't a clinical diagnosis, and it's not a label to carry around. It's a mirror — built from how you yourself described the way you react, love, and protect yourself, grounded in real research on personality, attachment, and the neuroscience of emotion (the names and studies are cited throughout, in case you want to look deeper on your own). The point isn't to tell you who you are — it's to help you recognize a pattern you may already sense, but have never seen written down clearly.`);
    partes.push(TEMPERAMENTO_BLOCKS[temperamento]);
    if (TEMPERAMENTO_VOLUME_BLOCKS[volumeTemperamento]) partes.push(TEMPERAMENTO_VOLUME_BLOCKS[volumeTemperamento]);
    partes.push(APEGO_BLOCKS[apego]);
    if (ferida && FERIDA_BLOCKS[ferida]) partes.push(FERIDA_BLOCKS[ferida]);
    partes.push(DAR_RECEBER_BLOCKS[apego]);
    if (volumeEmocional && VOLUME_EMOCIONAL_BLOCKS[volumeEmocional]) partes.push(VOLUME_EMOCIONAL_BLOCKS[volumeEmocional]);
    if (individuo && INDIVIDUO_BLOCKS[individuo]) partes.push(INDIVIDUO_BLOCKS[individuo]);
    if (intimidade && INTIMIDADE_BLOCKS[intimidade]) partes.push(INTIMIDADE_BLOCKS[intimidade]);
    if (reatividade && REATIVIDADE_BLOCKS[reatividade]) partes.push(REATIVIDADE_BLOCKS[reatividade]);
    partes.push(CLOSING);

    $('#result-text').innerHTML = partes.map((p) => `<p>${escapeHtml(p).replace(/\n\n/g, '</p><p>')}</p>`).join('');

    renderParceiroIdeal(tagsEstiloVida);
    showView('result');
  }

  function renderParceiroIdeal(tags) {
    const wrap = $('#parceiro-ideal');
    if (!tags.length) {
      wrap.hidden = true;
      return;
    }
    wrap.hidden = false;
    const lista = $('#parceiro-ideal-lista');
    lista.innerHTML = '';
    tags.forEach((tag) => {
      const frase = TAG_TO_PARCEIRO_IDEAL[tag];
      if (!frase) return;
      const li = document.createElement('li');
      li.textContent = frase.charAt(0).toUpperCase() + frase.slice(1);
      lista.appendChild(li);
    });
  }

  $('#btn-restart').addEventListener('click', () => {
    state = { nome: '', index: 0, answers: {} };
    $('#nome-input').value = '';
    showView('landing');
  });

  showView('landing');
})();
