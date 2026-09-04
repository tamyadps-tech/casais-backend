(() => {
  'use strict';

  const COUPLE = {
    tamyris: { id: 'tamyris', name: 'Tamyris' },
    saulo: { id: 'saulo', name: 'Saulo' }
  };

  const TIP_TIPO_LABEL = {
    gesto_de_amor: 'Gesto de amor',
    reforco: 'Reforço',
    dinamica_apego: 'Conexão',
    cuidado_ferida: 'Cuidado',
    papo_valores: 'Papo de valores'
  };

  const CATEGORY_META = {
    personalidade: { label: 'Seu jeito de ser' },
    temperamento: { label: 'Seu temperamento' },
    apego: { label: 'Conexão emocional' },
    feridas_infancia: { label: 'Autoconhecimento' },
    linguagem_amor: { label: 'Linguagem do amor' },
    valores_vida: { label: 'Valores & vida a dois' },
    conhecer_melhor: { label: 'Conhecer melhor' }
  };

  const $ = (sel) => document.querySelector(sel);
  const views = ['login', 'intro', 'quiz', 'loading', 'result', 'dashboard'];

  let state = {
    person: null, // { id, name }
    questions: [],
    index: 0,
    answers: {}
  };

  function showView(name) {
    views.forEach((v) => {
      $(`#view-${v}`).hidden = v !== name;
    });
    window.scrollTo(0, 0);
  }

  function setLoading(text) {
    $('#loading-text').textContent = text || 'Só um instante...';
    showView('loading');
  }

  // ---------- persistência local ----------
  function loadPerson() {
    try {
      const raw = localStorage.getItem('casais_person');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }
  function savePerson(person) {
    localStorage.setItem('casais_person', JSON.stringify(person));
  }
  function clearPerson() {
    localStorage.removeItem('casais_person');
  }
  function answersKey(personId) { return `casais_answers_${personId}`; }
  function loadAnswers(personId) {
    try {
      const raw = localStorage.getItem(answersKey(personId));
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }
  function saveAnswers(personId, answers) {
    localStorage.setItem(answersKey(personId), JSON.stringify(answers));
  }

  function partnerOf(person) {
    return person.id === COUPLE.tamyris.id ? COUPLE.saulo : COUPLE.tamyris;
  }

  // ---------- API ----------
  async function api(path, opts) {
    const res = await fetch(path, opts);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || `Erro na requisição (${res.status})`);
    }
    return res.json();
  }

  // ---------- fluxo principal ----------
  async function init() {
    const person = loadPerson();
    if (!person) {
      showView('login');
      return;
    }
    state.person = person;
    await routeForPerson();
  }

  async function routeForPerson() {
    try {
      const status = await api(`/api/test/status/${state.person.id}`);
      if (status.status === 'submitted') {
        await loadDashboard();
      } else {
        $('#intro-name').textContent = state.person.name;
        showView('intro');
      }
    } catch (e) {
      console.error(e);
      $('#intro-name').textContent = state.person.name;
      showView('intro');
    }
  }

  // ---------- QUIZ ----------
  async function startQuiz() {
    setLoading('Preparando suas perguntas...');
    if (!state.questions.length) {
      const data = await api('/api/questions');
      state.questions = data.perguntas;
    }
    state.answers = loadAnswers(state.person.id);
    state.index = state.questions.findIndex((q) => state.answers[q.id] === undefined);
    if (state.index === -1) state.index = state.questions.length; // tudo respondido, finaliza
    if (state.index >= state.questions.length) {
      await finishQuiz();
      return;
    }
    showView('quiz');
    renderQuestion();
  }

  function renderQuestion() {
    const q = state.questions[state.index];
    const total = state.questions.length;
    $('#progress-fill').style.width = `${Math.round((state.index / total) * 100)}%`;
    $('#quiz-counter').textContent = `${state.index + 1} / ${total}`;
    const meta = CATEGORY_META[q.categoria] || { label: q.categoria };
    $('#quiz-category-badge').textContent = meta.label;
    $('#question-text').textContent = q.texto;
    $('#btn-back').style.visibility = state.index === 0 ? 'hidden' : 'visible';

    const area = $('#answer-area');
    area.innerHTML = '';
    $('#btn-next').hidden = true;

    const existing = state.answers[q.id];

    if (q.tipo === 'multipla_escolha') {
      const wrap = document.createElement('div');
      wrap.className = 'options-list';
      q.opcoes.forEach((texto) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn' + (existing === texto ? ' selected' : '');
        btn.textContent = texto;
        btn.addEventListener('click', () => {
          answerAndAdvance(q.id, texto);
        });
        wrap.appendChild(btn);
      });
      area.appendChild(wrap);
    } else if (q.tipo === 'selecao_multipla') {
      const maxSel = q.max_selecoes || 5;
      const selected = Array.isArray(existing) ? [...existing] : [];

      const hint = document.createElement('p');
      hint.className = 'muted small select-hint';
      const updateHint = () => { hint.textContent = `${selected.length}/${maxSel} selecionadas`; };
      updateHint();
      area.appendChild(hint);

      const nextBtn = $('#btn-next');
      nextBtn.hidden = false;
      const updateNextState = () => { nextBtn.disabled = selected.length === 0; };

      const wrap = document.createElement('div');
      wrap.className = 'options-list';
      q.opcoes.forEach((texto) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn' + (selected.includes(texto) ? ' selected' : '');
        btn.textContent = texto;
        btn.addEventListener('click', () => {
          const idx = selected.indexOf(texto);
          if (idx >= 0) {
            selected.splice(idx, 1);
          } else {
            if (selected.length >= maxSel) return;
            selected.push(texto);
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
      labels.innerHTML = `<span>1 · ${q.escala.min_label}</span><span>5 · ${q.escala.max_label}</span>`;
      wrap.appendChild(labels);

      const buttons = document.createElement('div');
      buttons.className = 'scale-buttons';
      for (let v = 1; v <= 5; v += 1) {
        const btn = document.createElement('button');
        btn.className = 'scale-btn' + (Number(existing) === v ? ' selected' : '');
        btn.textContent = String(v);
        btn.addEventListener('click', () => {
          answerAndAdvance(q.id, v);
        });
        buttons.appendChild(btn);
      }
      wrap.appendChild(buttons);
      area.appendChild(wrap);
    } else {
      const textarea = document.createElement('textarea');
      textarea.className = 'open-answer';
      textarea.placeholder = 'Escreva à vontade...';
      textarea.value = existing || '';
      area.appendChild(textarea);

      const nextBtn = $('#btn-next');
      nextBtn.hidden = false;
      nextBtn.disabled = !textarea.value.trim();
      textarea.addEventListener('input', () => {
        nextBtn.disabled = !textarea.value.trim();
      });
      nextBtn.onclick = () => {
        if (!textarea.value.trim()) return;
        answerAndAdvance(q.id, textarea.value.trim());
      };
    }
  }

  function answerAndAdvance(questionId, value) {
    state.answers[questionId] = value;
    saveAnswers(state.person.id, state.answers);
    if (state.index >= state.questions.length - 1) {
      finishQuiz();
      return;
    }
    state.index += 1;
    renderQuestion();
  }

  function goBack() {
    if (state.index === 0) return;
    state.index -= 1;
    renderQuestion();
  }

  async function finishQuiz() {
    setLoading('Calculando seu resultado — isso pode levar alguns segundos.');
    try {
      await api('/api/test/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          respondent_id: state.person.id,
          name: state.person.name,
          responses: state.answers
        })
      });
      const resultData = await api(`/api/test/result/${state.person.id}`);
      $('#result-text').textContent = resultData.result.texto;
      showView('result');
    } catch (e) {
      console.error(e);
      setLoading('Deu um probleminha pra gerar seu resultado. Tenta recarregar a página em instantes.');
    }
  }

  // ---------- DASHBOARD ----------
  async function loadDashboard() {
    setLoading('Carregando seu painel...');
    const me = state.person;
    const partner = partnerOf(me);
    $('#dash-name').textContent = me.name;

    try {
      const resultData = await api(`/api/test/result/${me.id}`);
      $('#dash-result-text').textContent = resultData.result.texto;
    } catch (e) {
      $('#dash-result-text').textContent = 'Ainda não deu pra gerar — tenta atualizar a página.';
    }

    try {
      const partnerStatus = await api(`/api/test/status/${partner.id}`);
      if (partnerStatus.status !== 'submitted') {
        $('#partner-status-text').textContent =
          `${partner.name} ainda não respondeu o dele(a). Assim que responder, as dicas cruzadas de vocês dois começam a chegar.`;
      } else {
        $('#partner-status-text').textContent =
          `Vocês dois já responderam. As dicas quinzenais chegam toda segunda e quinta até janeiro de 2027.`;
        // garante que a análise cruzada exista (endpoint é cacheado, seguro chamar sempre)
        await api('/api/test/process', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ respondent_id_1: me.id, respondent_id_2: partner.id })
        }).catch(() => {});
      }
    } catch (e) {
      $('#partner-status-text').textContent = 'Não consegui checar o status do seu par agora.';
    }

    $('#ics-url').value = `${window.location.origin}/api/calendar/${me.id}/${partner.id}/${encodeURIComponent(me.name)}.ics`;

    await refreshTips();
    showView('dashboard');
  }

  async function refreshTips() {
    const me = state.person;
    const partner = partnerOf(me);
    const list = $('#tips-list');
    list.innerHTML = '<p class="tip-empty">Carregando...</p>';
    try {
      const data = await api(`/api/tips/${me.id}/${partner.id}/mine/${encodeURIComponent(me.name)}`);
      if (!data.tips.length) {
        list.innerHTML = '<p class="tip-empty">Ainda não chegou nenhuma dica — a primeira aparece na próxima segunda ou quinta.</p>';
        return;
      }
      list.innerHTML = '';
      [...data.tips].reverse().forEach((tip) => {
        const card = document.createElement('div');
        card.className = 'tip-card';
        const date = new Date(`${tip.date}T00:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });
        const tipoLabel = TIP_TIPO_LABEL[tip.tipo] || '';
        card.innerHTML = `<span class="tip-date"><span>${date}</span>${tipoLabel ? `<span class="tip-tipo">${tipoLabel}</span>` : ''}</span>${escapeHtml(tip.texto)}`;
        list.appendChild(card);
      });
    } catch (e) {
      list.innerHTML = '<p class="tip-empty">Não consegui carregar as dicas agora.</p>';
    }
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ---------- eventos ----------
  document.querySelectorAll('.person-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const person = { id: btn.dataset.id, name: btn.dataset.name };
      savePerson(person);
      state.person = person;
      await routeForPerson();
    });
  });

  $('#btn-switch-person-intro').addEventListener('click', () => {
    clearPerson();
    showView('login');
  });
  $('#btn-switch-person-dash').addEventListener('click', () => {
    clearPerson();
    showView('login');
  });

  $('#btn-start-quiz').addEventListener('click', () => {
    startQuiz().catch((e) => {
      console.error(e);
      setLoading('Não consegui carregar as perguntas. Recarregue a página.');
    });
  });

  $('#btn-back').addEventListener('click', goBack);
  $('#btn-goto-dashboard').addEventListener('click', () => {
    loadDashboard().catch(console.error);
  });
  $('#btn-refresh-tips').addEventListener('click', () => {
    refreshTips().catch(console.error);
  });

  $('#btn-copy-ics').addEventListener('click', async () => {
    const input = $('#ics-url');
    input.select();
    try {
      await navigator.clipboard.writeText(input.value);
    } catch (e) {
      document.execCommand('copy');
    }
    const btn = $('#btn-copy-ics');
    const original = btn.textContent;
    btn.textContent = 'Copiado';
    setTimeout(() => { btn.textContent = original; }, 1500);
  });

  init().catch((e) => {
    console.error(e);
    showView('login');
  });
})();
