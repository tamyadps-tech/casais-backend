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

  const NAO_SEI_TEXTO = 'Não sei / não se aplica';

  const LINGUAGEM_LABEL = {
    palavras_afirmacao: 'Palavras de afirmação',
    tempo_qualidade: 'Tempo de qualidade',
    presentes: 'Presentes',
    atos_servico: 'Atos de serviço',
    toque_fisico: 'Toque físico'
  };

  const PERSONALIDADE_AXES = [
    { key: 'eixo_energia', a: 'extrovertido', b: 'introvertido', labelA: 'Extrovertido(a)', labelB: 'Introvertido(a)' },
    { key: 'eixo_decisao', a: 'racional', b: 'emocional', labelA: 'Racional', labelB: 'Emocional' },
    { key: 'eixo_foco', a: 'pratico', b: 'idealista', labelA: 'Prático(a)', labelB: 'Idealista' },
    { key: 'eixo_estilo', a: 'estruturado', b: 'espontaneo', labelA: 'Estruturado(a)', labelB: 'Espontâneo(a)' }
  ];

  const TEMPERAMENTO_INFO = {
    sanguineo: {
      nome: 'Sanguíneo',
      descricao: 'Animado(a), sociável, contagia o ambiente com energia e otimismo. Vive o momento e se conecta fácil com as pessoas.',
      pontos_fortes: [
        'Traz leveza e energia positiva pro ambiente',
        'Se adapta rápido a mudanças e imprevistos',
        'Facilidade genuína de criar conexão com as pessoas'
      ],
      como_potencializar: 'Use seu entusiasmo pra puxar os outros pra frente, mas treine terminar o que começa antes de partir pra próxima novidade — é aí que sua energia vira resultado de verdade.'
    },
    colerico: {
      nome: 'Colérico',
      descricao: 'Decidido(a), direto(a), gosta de liderar e resolver rápido. Tem clareza sobre o que quer e não tem medo de agir.',
      pontos_fortes: [
        'Toma decisão rápido, mesmo sob pressão',
        'Natural pra liderar e organizar as coisas',
        'Vai direto ao ponto, sem rodeio'
      ],
      como_potencializar: 'Sua clareza e decisão são um ativo — só cuide do tom quando estiver com pressa ou irritado(a), pra sua franqueza não soar como dureza pra quem está do seu lado.'
    },
    melancolico: {
      nome: 'Melancólico',
      descricao: 'Reflexivo(a), detalhista, sente as coisas de forma profunda. Pensa bem antes de agir e nota o que passa despercebido.',
      pontos_fortes: [
        'Atenção genuína aos detalhes que os outros não veem',
        'Profundidade emocional e empatia real',
        'Decide com cuidado, raramente no impulso'
      ],
      como_potencializar: 'Sua profundidade é um presente — pra ela não virar peso, pratique compartilhar o que sente antes de processar tudo sozinho(a), e dê um prazo pra decisão em vez de buscar a opção perfeita.'
    },
    fleumatico: {
      nome: 'Fleumático',
      descricao: 'Calmo(a), paciente, evita conflito e mantém a estabilidade. É o tipo de pessoa que traz equilíbrio pro ambiente.',
      pontos_fortes: [
        'Traz calma e estabilidade em momentos de tensão',
        'Paciência genuína com o ritmo dos outros',
        'Raramente reage no impulso'
      ],
      como_potencializar: 'Sua calma é rara e valiosa — só cuide pra não deixar de se posicionar quando algo te incomoda de verdade; evitar todo conflito tem um custo que vale a pena evitar.'
    }
  };

  const APEGO_INFO = {
    seguro: {
      nome: 'Apego seguro',
      descricao: 'Confia com naturalidade, se comunica bem e lida com distância sem pânico. Base sólida pra uma relação saudável.',
      pontos_fortes: [
        'Comunica necessidades sem drama nem silêncio',
        'Lida bem com distância e autonomia do parceiro(a)',
        'Recupera de conflitos com facilidade'
      ],
      como_potencializar: 'Use sua segurança pra acolher quem tem mais dificuldade nisso — sua consistência e paciência ajudam o outro lado a se sentir seguro também.'
    },
    ansioso: {
      nome: 'Apego ansioso',
      descricao: 'Busca proximidade e reafirmação constante, teme ser deixado(a) de lado. Ama intensamente, às vezes com medo de perder.',
      pontos_fortes: [
        'Capacidade grande de se entregar e se conectar profundamente',
        'Sensível aos sinais emocionais do parceiro(a)',
        'Valoriza muito a intimidade e a proximidade'
      ],
      como_potencializar: 'Sua intensidade é bonita quando não vem do medo — antes de pedir uma confirmação, tente notar se é a ansiedade falando ou a realidade. Comunicar isso ao parceiro(a) ajuda mais que testar o quanto ele(a) se importa.'
    },
    evitativo: {
      nome: 'Apego evitativo',
      descricao: 'Valoriza muito a independência e tem dificuldade de se abrir por completo. Precisa de espaço pra se sentir seguro(a).',
      pontos_fortes: [
        'Autonomia genuína, não depende do outro pra se sentir bem',
        'Mantém a calma em momentos de intensidade emocional',
        'Respeita o espaço do parceiro(a) com naturalidade'
      ],
      como_potencializar: 'Sua independência é saudável até o ponto em que vira distância — pratique compartilhar o que sente antes de recuar, mesmo que pareça mais fácil resolver tudo sozinho(a).'
    },
    desorganizado: {
      nome: 'Apego desorganizado',
      descricao: 'Oscila entre buscar e afastar, misturando desejo de intimidade com medo dela. Padrão mais complexo, mas totalmente trabalhável.',
      pontos_fortes: [
        'Autoconsciência sobre o próprio padrão, quando nomeado',
        'Capacidade de amar intensamente quando se sente seguro(a)',
        'Abertura pra crescer quando o padrão é reconhecido'
      ],
      como_potencializar: 'Notar o padrão de se aproximar e se afastar sem julgamento já é metade do caminho. Nomear isso em voz alta pro parceiro(a) ("é esse padrão de novo") tira poder da reação automática.'
    }
  };

  const MOOD_OPTIONS = [
    { key: 'dificil', label: 'Difícil', valor: 1 },
    { key: 'cansado', label: 'Cansado(a)', valor: 2 },
    { key: 'neutro', label: 'Neutro', valor: 3 },
    { key: 'bem', label: 'Bem', valor: 4 },
    { key: 'radiante', label: 'Radiante', valor: 5 }
  ];
  const MOOD_BY_KEY = Object.fromEntries(MOOD_OPTIONS.map((m) => [m.key, m]));

  const CATEGORY_META = {
    personalidade: { label: 'Seu jeito de ser' },
    temperamento: { label: 'Seu temperamento' },
    apego: { label: 'Conexão emocional' },
    feridas_infancia: { label: 'Autoconhecimento' },
    linguagem_amor: { label: 'Linguagem do amor' },
    valores_vida: { label: 'Valores & vida a dois' },
    conhecer_melhor: { label: 'Conhecer melhor' },
    intimidade: { label: 'Intimidade & conexão física' }
  };

  const $ = (sel) => document.querySelector(sel);
  const views = ['login', 'convite-join', 'convite-invalido', 'como-baixar', 'intro', 'quiz', 'loading', 'result', 'dashboard'];

  let state = {
    person: null, // { id, name }
    questions: [],
    allQuestions: null,
    completing: false,
    index: 0,
    answers: {},
    notesFilter: 'mim'
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

  function loadCouple() {
    try {
      const raw = localStorage.getItem('casais_couple');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }
  function saveCouple(couple) {
    localStorage.setItem('casais_couple', JSON.stringify(couple));
  }

  function partnerOf(person) {
    const couple = loadCouple();
    if (couple) {
      return couple.pessoa1.id === person.id ? couple.pessoa2 : couple.pessoa1;
    }
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
    const conviteCode = new URLSearchParams(window.location.search).get('convite');
    if (conviteCode) {
      await handleConvite(conviteCode);
      return;
    }

    const couple = loadCouple();
    renderLoginButtons(couple ? couple.pessoa1 : COUPLE.tamyris, couple ? couple.pessoa2 : COUPLE.saulo);

    const person = loadPerson();
    if (!person) {
      showView('login');
      return;
    }
    state.person = person;
    await routeForPerson();
  }

  // ---------- convite (casal novo entrando no app) ----------
  function renderLoginButtons(pessoa1, pessoa2) {
    const grid = $('#person-grid');
    grid.innerHTML = '';
    [pessoa1, pessoa2].forEach((pessoa) => {
      const btn = document.createElement('button');
      btn.className = 'person-btn';
      btn.dataset.id = pessoa.id;
      btn.dataset.name = pessoa.name;
      const inicial = (pessoa.name || '?').trim().charAt(0).toUpperCase();
      btn.innerHTML = `<span class="person-avatar">${escapeHtml(inicial)}</span> ${escapeHtml(pessoa.name)}`;
      btn.addEventListener('click', async () => {
        const person = { id: pessoa.id, name: pessoa.name };
        savePerson(person);
        state.person = person;
        await routeForPerson();
      });
      grid.appendChild(btn);
    });
  }

  function cleanConviteFromUrl() {
    const url = new URL(window.location.href);
    url.searchParams.delete('convite');
    window.history.replaceState({}, '', url.toString());
  }

  async function handleConvite(code) {
    try {
      const data = await api(`/api/invites/${code}`);
      if (data.ativado) {
        saveCouple({ pessoa1: data.pessoa1, pessoa2: data.pessoa2 });
        cleanConviteFromUrl();
        renderLoginButtons(data.pessoa1, data.pessoa2);
        const person = loadPerson();
        if (person) {
          state.person = person;
          await routeForPerson();
        } else {
          showView('login');
        }
      } else {
        showView('convite-join');
        $('#btn-join-submit').onclick = () => submitJoin(code);
      }
    } catch (e) {
      console.error(e);
      showView('convite-invalido');
    }
  }

  async function submitJoin(code) {
    const nome = $('#join-nome').value.trim();
    const nomeParceiro = $('#join-nome-parceiro').value.trim();
    const errEl = $('#join-error');
    errEl.hidden = true;
    if (!nome || !nomeParceiro) {
      errEl.textContent = 'Preencha os dois nomes pra continuar.';
      errEl.hidden = false;
      return;
    }
    try {
      const data = await api(`/api/invites/${code}/activate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, nomeParceiro })
      });
      saveCouple({ pessoa1: data.pessoa1, pessoa2: data.pessoa2 });
      cleanConviteFromUrl();
      renderLoginButtons(data.pessoa1, data.pessoa2);
      showView('como-baixar');
    } catch (e) {
      console.error(e);
      errEl.textContent = 'Não consegui liberar o acesso agora. Tenta de novo em instantes.';
      errEl.hidden = false;
    }
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
  async function loadAllQuestions() {
    if (!state.allQuestions) {
      const data = await api('/api/questions');
      state.allQuestions = data.perguntas;
    }
    return state.allQuestions;
  }

  async function startQuiz() {
    setLoading('Preparando suas perguntas...');
    await loadAllQuestions();
    state.completing = false;
    state.questions = state.allQuestions;
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
        const skip = texto === NAO_SEI_TEXTO;
        btn.className = 'option-btn' + (skip ? ' option-btn-skip' : '') + (existing === texto ? ' selected' : '');
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
        const skip = texto === NAO_SEI_TEXTO;
        btn.className = 'option-btn' + (skip ? ' option-btn-skip' : '') + (selected.includes(texto) ? ' selected' : '');
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

      const skipBtn = document.createElement('button');
      skipBtn.className = 'btn-link skip-question' + (existing === NAO_SEI_TEXTO ? ' selected' : '');
      skipBtn.textContent = NAO_SEI_TEXTO;
      skipBtn.addEventListener('click', () => {
        answerAndAdvance(q.id, NAO_SEI_TEXTO);
      });
      area.appendChild(skipBtn);
    } else {
      const textarea = document.createElement('textarea');
      textarea.className = 'open-answer';
      textarea.placeholder = 'Escreva à vontade...';
      textarea.value = existing && existing !== NAO_SEI_TEXTO ? existing : '';
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

      const skipBtn = document.createElement('button');
      skipBtn.className = 'btn-link skip-question' + (existing === NAO_SEI_TEXTO ? ' selected' : '');
      skipBtn.textContent = NAO_SEI_TEXTO;
      skipBtn.addEventListener('click', () => {
        answerAndAdvance(q.id, NAO_SEI_TEXTO);
      });
      area.appendChild(skipBtn);
    }
  }

  function answerAndAdvance(questionId, value) {
    state.answers[questionId] = value;
    if (!state.completing) saveAnswers(state.person.id, state.answers);
    if (state.index >= state.questions.length - 1) {
      if (state.completing) {
        finishCompletion();
      } else {
        finishQuiz();
      }
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
      loadDevotional('#devotional-content-result').catch(console.error);
    } catch (e) {
      console.error(e);
      setLoading('Deu um probleminha pra gerar seu resultado. Tenta recarregar a página em instantes.');
    }
  }

  // ---------- COMPLETAR PERGUNTA(S) NOVA(S) ----------
  // Quando uma pergunta nova é adicionada ao banco depois que a pessoa já
  // respondeu tudo, ela não reabre o questionário inteiro — só mostra a(s)
  // pergunta(s) ainda sem resposta, sem tocar em nada que já foi respondido.
  async function startCompleteFlow(pendingIds) {
    setLoading('Preparando pergunta nova...');
    await loadAllQuestions();
    state.completing = true;
    state.questions = state.allQuestions.filter((q) => pendingIds.includes(q.id));
    state.answers = {};
    state.index = 0;
    showView('quiz');
    renderQuestion();
  }

  async function finishCompletion() {
    setLoading('Salvando sua resposta...');
    try {
      const partner = partnerOf(state.person);
      await api('/api/test/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          respondent_id: state.person.id,
          responses: state.answers,
          partner_id: partner.id
        })
      });
    } catch (e) {
      console.error(e);
    }
    state.completing = false;
    await loadDashboard();
  }

  // ---------- DASHBOARD ----------
  async function loadDashboard() {
    setLoading('Carregando seu painel...');
    const me = state.person;
    const partner = partnerOf(me);
    $('#dash-name').textContent = me.name;
    $('#notes-partner-name').textContent = partner.name;

    try {
      const myStatus = await api(`/api/test/status/${me.id}`);
      const pending = myStatus.pending || [];
      const pendingCard = $('#pending-card');
      if (pending.length) {
        $('#pending-text').textContent = pending.length === 1
          ? 'Tem 1 pergunta nova pra você responder — não mexe em nada que você já respondeu.'
          : `Tem ${pending.length} perguntas novas pra você responder — não mexe em nada que você já respondeu.`;
        pendingCard.hidden = false;
        $('#btn-complete-pending').onclick = () => {
          startCompleteFlow(pending).catch((e) => {
            console.error(e);
            setLoading('Não consegui carregar a pergunta nova. Tenta de novo em instantes.');
          });
        };
      } else {
        pendingCard.hidden = true;
      }
    } catch (e) {
      $('#pending-card').hidden = true;
    }

    try {
      const resultData = await api(`/api/test/result/${me.id}`);
      $('#dash-result-text').textContent = resultData.result.texto;
      renderProfileCharts(resultData.result.scores);
      renderGrowthPoints(resultData.result.pontosCrescimento);
    } catch (e) {
      $('#dash-result-text').textContent = 'Ainda não deu pra gerar — tenta atualizar a página.';
    }

    let partnerReady = false;
    try {
      const partnerStatus = await api(`/api/test/status/${partner.id}`);
      const statusCard = $('#partner-status-card');
      partnerReady = partnerStatus.status === 'submitted';
      if (!partnerReady) {
        $('#partner-status-text').textContent =
          `${partner.name} ainda não respondeu o dele(a). Suas dicas e desafios só ficam disponíveis quando ${partner.name} completar o questionário também.`;
        statusCard.hidden = false;
      } else {
        // os dois já responderam — nada a avisar aqui, as dicas já falam por si
        statusCard.hidden = true;
        // garante que a análise cruzada exista (endpoint é cacheado, seguro chamar sempre)
        await api('/api/test/process', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ respondent_id_1: me.id, respondent_id_2: partner.id })
        }).catch(() => {});
      }
    } catch (e) {
      $('#partner-status-card').hidden = false;
      $('#partner-status-text').textContent = 'Não consegui checar o status do seu par agora.';
    }

    $('#ics-url').value = `${window.location.origin}/api/calendar/${me.id}/${partner.id}/${encodeURIComponent(me.name)}.ics`;

    state.partnerReady = partnerReady;
    state.partnerName = partner.name;

    await refreshTips();
    await loadMission();
    await loadJournal();
    await loadDevotional('#devotional-content');
    await refreshPushButtonState();
    showView('dashboard');
  }

  // ---------- devocional do dia ----------
  async function loadDevotional(targetSelector) {
    const wrap = $(targetSelector);
    try {
      const data = await api('/api/devotional/today');
      if (!data.devotional) {
        wrap.innerHTML = data.motivo === 'fora_do_periodo'
          ? '<p class="mission-empty">O ciclo de devocionais desse período já terminou.</p>'
          : '<p class="mission-empty">Sem devocional no fim de semana — o próximo chega na segunda-feira.</p>';
        return;
      }
      const d = data.devotional;
      wrap.innerHTML = `
        <div class="devotional-box">
          <span class="devotional-ref">${escapeHtml(d.referencia)}</span>
          <p class="devotional-verse">"${escapeHtml(d.texto)}"</p>
          <p class="devotional-estudo">${escapeHtml(d.estudo)}</p>
        </div>
      `;
    } catch (e) {
      console.error(e);
      wrap.innerHTML = '<p class="mission-empty">Não consegui carregar o devocional agora.</p>';
    }
  }

  // ---------- missão individual ----------
  async function loadMission() {
    if (!state.partnerReady) {
      $('#mission-current').innerHTML =
        `<p class="mission-empty">Sua missão libera assim que ${escapeHtml(state.partnerName || 'seu par')} completar o questionário também.</p>`;
      $('#mission-history').innerHTML = '';
      return;
    }
    try {
      const data = await api(`/api/missions/${state.person.id}`);
      renderMissionCurrent(data.current);
      renderMissionHistory(data.history || []);
    } catch (e) {
      console.error(e);
      $('#mission-current').innerHTML = '<p class="mission-empty">Não consegui carregar sua missão agora.</p>';
    }
  }

  function renderMissionCurrent(mission) {
    const wrap = $('#mission-current');
    if (!mission) {
      wrap.innerHTML = '<p class="mission-empty">Nenhuma missão disponível agora.</p>';
      return;
    }
    wrap.innerHTML = `
      <div class="mission-box">
        <span class="mission-area">${escapeHtml(mission.area)}</span>
        <p class="mission-text">${escapeHtml(mission.texto)}</p>
        <div class="mission-actions">
          <button class="btn-mission-done" id="btn-mission-done">Fiz essa missão</button>
          <button class="btn-mission-skip" id="btn-mission-skip">Não fiz dessa vez</button>
        </div>
      </div>
    `;
    $('#btn-mission-done').addEventListener('click', () => completeMission('feita').catch(console.error));
    $('#btn-mission-skip').addEventListener('click', () => completeMission('nao_feita').catch(console.error));
  }

  async function completeMission(status) {
    await api(`/api/missions/${state.person.id}/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    await loadMission();
  }

  function renderMissionHistory(history) {
    const wrap = $('#mission-history');
    if (!history.length) {
      wrap.innerHTML = '';
      return;
    }
    wrap.innerHTML = '';
    history.slice(0, 8).forEach((m) => {
      const div = document.createElement('div');
      div.className = 'entry-card';
      const date = new Date(m.completedAt || m.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
      const statusLabel = m.status === 'feita' ? 'Feita' : 'Não fiz';
      div.innerHTML = `<div class="entry-meta"><span>${date} · ${escapeHtml(m.area)}</span><span class="entry-status ${m.status}">${statusLabel}</span></div>${escapeHtml(m.texto)}`;
      wrap.appendChild(div);
    });
  }

  // ---------- perfil em números (gráficos) ----------
  function renderProfileCharts(scores) {
    renderLinguagemChart(scores.linguagem_amor || {});
    renderPersonalidadeChart(scores.personalidade || {});
    renderBadges(scores);
  }

  function renderLinguagemChart(linguagem) {
    const wrap = $('#chart-linguagem');
    wrap.innerHTML = '';
    const ranking = linguagem.ranking || [];
    const contagens = linguagem.contagens || {};
    const max = Math.max(1, ...ranking.map((tag) => contagens[tag] || 0));
    ranking.forEach((tag) => {
      const valor = contagens[tag] || 0;
      const pct = Math.max(6, Math.round((valor / max) * 100));
      const row = document.createElement('div');
      row.className = 'bar-row';
      row.innerHTML = `
        <div class="bar-row-label"><span>${escapeHtml(LINGUAGEM_LABEL[tag] || tag)}</span><span>${valor}</span></div>
        <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
      `;
      wrap.appendChild(row);
    });
  }

  function renderPersonalidadeChart(personalidade) {
    const wrap = $('#chart-personalidade');
    wrap.innerHTML = '';
    const contagens = personalidade.contagens || {};
    PERSONALIDADE_AXES.forEach((eixo) => {
      const va = contagens[eixo.a] || 0;
      const vb = contagens[eixo.b] || 0;
      const total = va + vb;
      const pctA = total ? Math.round((va / total) * 100) : 50;
      const pctB = 100 - pctA;
      const row = document.createElement('div');
      row.className = 'axis-row';
      row.innerHTML = `
        <div class="axis-labels"><span>${eixo.labelA} ${pctA}%</span><span>${pctB}% ${eixo.labelB}</span></div>
        <div class="axis-track${total ? '' : ' empatado'}">
          <div class="axis-fill-a" style="width:${pctA}%"></div>
          <div class="axis-fill-b" style="width:${pctB}%"></div>
        </div>
      `;
      wrap.appendChild(row);
    });
  }

  function renderBadges(scores) {
    const wrap = $('#chart-badges');
    wrap.innerHTML = '';
    const temp = scores.temperamento && scores.temperamento.dominantes && scores.temperamento.dominantes[0];
    const apegoDom = scores.apego && scores.apego.dominante;
    [TEMPERAMENTO_INFO[temp], APEGO_INFO[apegoDom]].filter(Boolean).forEach((info) => {
      const btn = document.createElement('button');
      btn.className = 'stat-badge';
      btn.textContent = info.nome;
      btn.addEventListener('click', () => openInfoModal(info));
      wrap.appendChild(btn);
    });
  }

  function openInfoModal(info) {
    $('#modal-title').textContent = info.nome;
    $('#modal-desc').textContent = info.descricao;
    const list = $('#modal-strengths');
    list.innerHTML = '';
    (info.pontos_fortes || []).forEach((texto) => {
      const li = document.createElement('li');
      li.textContent = texto;
      list.appendChild(li);
    });
    $('#modal-tip').textContent = info.como_potencializar;
    $('#info-modal').hidden = false;
  }

  function closeInfoModal() {
    $('#info-modal').hidden = true;
  }

  function renderGrowthPoints(pontos) {
    const wrap = $('#growth-list');
    wrap.innerHTML = '';
    if (!pontos || !pontos.length) {
      wrap.innerHTML = '<p class="entries-empty">Ainda não deu pra calcular — tenta atualizar a página.</p>';
      return;
    }
    pontos.forEach((p) => {
      const div = document.createElement('div');
      div.className = 'growth-item';
      div.innerHTML = `<span class="growth-area">${escapeHtml(p.area)}</span>${escapeHtml(p.texto)}`;
      wrap.appendChild(div);
    });
  }

  // ---------- diário (humor, conquistas, notas) ----------
  async function loadJournal() {
    try {
      const data = await api(`/api/journal/${state.person.id}`);
      const entries = data.entries || [];
      renderMoodPicker(entries);
      renderMoodTrend(entries);
      renderAchievements(entries);
      renderNotes(entries);
    } catch (e) {
      console.error(e);
    }
  }

  function renderMoodPicker(entries) {
    const wrap = $('#mood-picker');
    wrap.innerHTML = '';
    const todayStr = new Date().toISOString().slice(0, 10);
    const todaysMood = [...entries].reverse().find((e) => e.type === 'humor' && e.createdAt.slice(0, 10) === todayStr);
    MOOD_OPTIONS.forEach((m) => {
      const btn = document.createElement('button');
      btn.className = 'mood-btn' + (todaysMood && todaysMood.mood === m.key ? ' selected' : '');
      btn.textContent = m.label;
      btn.addEventListener('click', () => {
        addMoodEntry(m.key).catch(console.error);
      });
      wrap.appendChild(btn);
    });
  }

  async function addMoodEntry(moodKey) {
    await api(`/api/journal/${state.person.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'humor', mood: moodKey })
    });
    await loadJournal();
  }

  function renderMoodTrend(entries) {
    const wrap = $('#mood-trend');
    const moods = entries.filter((e) => e.type === 'humor').slice(-14);
    if (!moods.length) {
      wrap.innerHTML = '<p class="mood-trend-empty">Seus check-ins de humor vão aparecer aqui.</p>';
      return;
    }
    wrap.innerHTML = '';
    moods.forEach((entry, idx) => {
      const m = MOOD_BY_KEY[entry.mood];
      const valor = m ? m.valor : 3;
      const bar = document.createElement('div');
      bar.className = 'mood-bar' + (idx === moods.length - 1 ? ' latest' : '');
      bar.style.height = `${Math.max(15, Math.round((valor / 5) * 100))}%`;
      bar.title = m ? m.label : '';
      wrap.appendChild(bar);
    });
    const last = MOOD_BY_KEY[moods[moods.length - 1].mood];
    if (last) {
      const label = document.createElement('span');
      label.className = 'muted small';
      label.style.marginLeft = '8px';
      label.textContent = `hoje: ${last.label}`;
      wrap.appendChild(label);
    }
  }

  function renderEntryList(wrap, entries, emptyText) {
    if (!entries.length) {
      wrap.innerHTML = `<p class="entries-empty">${emptyText}</p>`;
      return;
    }
    wrap.innerHTML = '';
    entries.forEach((entry) => {
      const div = document.createElement('div');
      div.className = 'entry-card';
      const date = new Date(entry.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
      div.innerHTML = `<div class="entry-meta"><span>${date}</span><button class="entry-remove" data-id="${entry.id}">Remover</button></div>${escapeHtml(entry.text)}`;
      wrap.appendChild(div);
    });
    wrap.querySelectorAll('.entry-remove').forEach((btn) => {
      btn.addEventListener('click', () => removeJournalEntry(btn.dataset.id).catch(console.error));
    });
  }

  function renderAchievements(entries) {
    const conquistas = entries.filter((e) => e.type === 'conquista').slice().reverse();
    renderEntryList($('#achievements-list'), conquistas, 'Nenhuma conquista registrada ainda.');
  }

  function renderNotes(entries) {
    const notas = entries.filter((e) => e.type === 'nota' && e.sobre === state.notesFilter).slice().reverse();
    renderEntryList($('#notes-list'), notas, 'Nenhuma nota por aqui ainda.');
  }

  async function removeJournalEntry(entryId) {
    await api(`/api/journal/${state.person.id}/${entryId}`, { method: 'DELETE' });
    await loadJournal();
  }

  async function addAchievement() {
    const input = $('#achievement-input');
    const text = input.value.trim();
    if (!text) return;
    await api(`/api/journal/${state.person.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'conquista', text })
    });
    input.value = '';
    await loadJournal();
  }

  async function addNote() {
    const input = $('#note-input');
    const text = input.value.trim();
    if (!text) return;
    await api(`/api/journal/${state.person.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'nota', text, sobre: state.notesFilter })
    });
    input.value = '';
    await loadJournal();
  }

  async function refreshTips() {
    const me = state.person;
    const partner = partnerOf(me);
    const list = $('#tips-list');
    if (!state.partnerReady) {
      list.innerHTML = `<p class="tip-empty">Suas dicas liberam assim que ${escapeHtml(partner.name)} completar o questionário também.</p>`;
      return;
    }
    list.innerHTML = '<p class="tip-empty">Carregando...</p>';
    try {
      const data = await api(`/api/tips/${me.id}/${partner.id}/mine/${encodeURIComponent(me.name)}`);
      if (!data.tips.length) {
        list.innerHTML = '<p class="tip-empty">Ainda não chegou nenhuma dica — a primeira aparece na próxima segunda, quinta ou sábado.</p>';
        return;
      }
      list.innerHTML = '';
      [...data.tips].reverse().forEach((tip, idx) => {
        const isLatest = idx === 0;
        const card = document.createElement('div');
        card.className = 'tip-card' + (isLatest ? '' : ' collapsed');
        const date = new Date(`${tip.date}T00:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });
        const tipos = Array.isArray(tip.tipo) ? tip.tipo : [tip.tipo];
        const tipoLabel = tipos.map((t) => TIP_TIPO_LABEL[t]).filter(Boolean).join(' + ');
        card.innerHTML = `
          <span class="tip-date">
            <span class="tip-date-meta"><span>${date}</span>${tipoLabel ? `<span class="tip-tipo">${tipoLabel}</span>` : ''}</span>
            <span class="tip-toggle-icon" aria-hidden="true">▾</span>
          </span>
          <div class="tip-body">${escapeHtml(tip.texto)}</div>
        `;
        card.addEventListener('click', () => {
          card.classList.toggle('collapsed');
        });
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

  // ---------- notificações push ----------
  function isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  }
  function isIos() {
    return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
  }

  async function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return null;
    try {
      return await navigator.serviceWorker.register('/sw.js');
    } catch (e) {
      console.error('Falha ao registrar service worker', e);
      return null;
    }
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
  }

  async function refreshPushButtonState() {
    const btn = $('#btn-enable-push');
    const explainer = $('#push-explainer');
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      btn.hidden = true;
      explainer.textContent = 'Esse navegador não suporta notificações. No iPhone, use o Safari.';
      return;
    }
    if (isIos() && !isStandalone()) {
      btn.textContent = 'Ativar notificações';
      explainer.textContent = 'No iPhone: toque em Compartilhar e depois em "Adicionar à Tela de Início". Abra o app por esse ícone e volte aqui pra ativar.';
      return;
    }
    try {
      const reg = await registerServiceWorker();
      const sub = reg ? await reg.pushManager.getSubscription() : null;
      if (sub) {
        btn.textContent = 'Notificações ativadas';
        btn.disabled = true;
        explainer.textContent = 'Tudo certo — as dicas novas vão te avisar direto nesse aparelho.';
      } else {
        btn.textContent = 'Ativar notificações';
        btn.disabled = false;
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function enablePush() {
    const btn = $('#btn-enable-push');
    try {
      const { enabled, publicKey } = await api('/api/push/public-key');
      if (!enabled) {
        $('#push-explainer').textContent = 'Notificações ainda não foram configuradas no servidor.';
        return;
      }
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        $('#push-explainer').textContent = 'Permissão não concedida — dá pra ativar depois nas configurações do navegador.';
        return;
      }
      const reg = await registerServiceWorker();
      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey)
      });
      await api('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personId: state.person.id, subscription: subscription.toJSON() })
      });
      btn.textContent = 'Notificações ativadas';
      btn.disabled = true;
      $('#push-explainer').textContent = 'Tudo certo — as dicas novas vão te avisar direto nesse aparelho.';
    } catch (e) {
      console.error(e);
      $('#push-explainer').textContent = 'Não consegui ativar agora. Tenta de novo em instantes.';
    }
  }

  // ---------- eventos ----------
  $('#btn-como-baixar-continuar').addEventListener('click', () => {
    showView('login');
  });

  $('#modal-close').addEventListener('click', closeInfoModal);
  $('#info-modal').addEventListener('click', (e) => {
    if (e.target.id === 'info-modal') closeInfoModal();
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

  $('#btn-enable-push').addEventListener('click', () => {
    enablePush().catch(console.error);
  });

  $('#btn-add-achievement').addEventListener('click', () => {
    addAchievement().catch(console.error);
  });
  $('#achievement-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addAchievement().catch(console.error);
  });

  $('#btn-add-note').addEventListener('click', () => {
    addNote().catch(console.error);
  });
  document.querySelectorAll('#notes-toggle .toggle-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.notesFilter = btn.dataset.sobre;
      document.querySelectorAll('#notes-toggle .toggle-btn').forEach((b) => b.classList.toggle('selected', b === btn));
      loadJournal().catch(console.error);
    });
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

  registerServiceWorker();

  init().catch((e) => {
    console.error(e);
    showView('login');
  });
})();
