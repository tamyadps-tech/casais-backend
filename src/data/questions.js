// ==========================================
// BANCO DE PERGUNTAS
// ==========================================
// Tipos de pergunta:
//  - multipla_escolha  — escolhe 1 opção
//  - selecao_multipla  — escolhe até `max_selecoes` opções (usado em
//                        valores_vida e conhecer_melhor, onde faz sentido
//                        a pessoa marcar mais de uma coisa)
//  - escala            — 1 a 5, com as duas pontas explicadas
//  - aberta            — texto livre
//
// Cada opção de múltipla/seleção carrega uma "tag" interna (não exibida ao
// usuário) usada pelo motor de pontuação (src/lib/scoring.js). Perguntas de
// escala carregam "dimensao" com o mesmo propósito. As perguntas de
// valores_vida e conhecer_melhor guardam a resposta literal, sem pontuação
// psicológica — servem para cruzamento de informações entre o casal.
//
// `ativa: false` tira a pergunta do banco realmente usado sem apagá-la do
// código-fonte — é assim que reservamos perguntas que não fazem sentido
// pro uso pessoal de hoje, mas podem valer a pena numa futura versão
// comercial/multi-casal do app (ver VAL10 abaixo).

const allQuestions = [
  // ==========================================
  // PERSONALIDADE
  // ==========================================
  {
    id: 'PER01',
    categoria: 'personalidade',
    tipo: 'multipla_escolha',
    texto: 'Depois de uma semana daquelas, o que te faz sentir com a bateria cheia de novo?',
    opcoes: [
      { texto: 'Sair com um grupo grande de amigos', tag: 'extrovertido' },
      { texto: 'Ficar em casa, sozinho(a), no silêncio', tag: 'introvertido' },
      { texto: 'Uma night animada, com música alta', tag: 'extrovertido' },
      { texto: 'Uma série boa e o sofá te esperando', tag: 'introvertido' },
      { texto: 'Conhecer várias pessoas novas em um evento', tag: 'extrovertido' },
      { texto: 'Uma caminhada sozinho(a), só organizando os pensamentos', tag: 'introvertido' },
      { texto: 'Um jantar com poucos amigos bem próximos', tag: 'introvertido' },
      { texto: 'Qualquer roda de conversa — quanto mais gente, melhor', tag: 'extrovertido' }
    ]
  },
  {
    id: 'PER02',
    categoria: 'personalidade',
    tipo: 'multipla_escolha',
    texto: 'Uma decisão importante bateu na sua porta. Qual costuma ser o seu primeiro movimento?',
    opcoes: [
      { texto: 'Fazer uma lista de prós e contras bem fria', tag: 'racional' },
      { texto: 'Perguntar pro coração o que ele sente sobre isso', tag: 'emocional' },
      { texto: 'Buscar dados e a opinião de quem entende do assunto', tag: 'racional' },
      { texto: 'Imaginar como cada opção vai fazer as pessoas envolvidas se sentirem', tag: 'emocional' },
      { texto: 'Dormir com o assunto e ver o que o instinto diz no dia seguinte', tag: 'emocional' },
      { texto: 'Montar uma planilha — sim, uma planilha', tag: 'racional' },
      { texto: 'Ligar pra alguém de confiança só pra desabafar antes de decidir', tag: 'emocional' }
    ]
  },
  {
    id: 'PER03',
    categoria: 'personalidade',
    tipo: 'multipla_escolha',
    texto: 'Quando o assunto é planejar o futuro, você se pega mais...',
    opcoes: [
      { texto: 'Pensando em passos concretos e prazos realistas', tag: 'pratico' },
      { texto: 'Sonhando com o cenário ideal, sem se prender a detalhes', tag: 'idealista' },
      { texto: 'Olhando o que já deu certo antes como referência', tag: 'pratico' },
      { texto: 'Imaginando possibilidades que ainda nem existem', tag: 'idealista' },
      { texto: 'Calculando quanto vai custar e quanto tempo vai levar', tag: 'pratico' },
      { texto: 'Deixando a imaginação te levar longe antes de aterrissar', tag: 'idealista' }
    ]
  },
  {
    id: 'PER04',
    categoria: 'personalidade',
    tipo: 'multipla_escolha',
    texto: 'Uma viagem surgiu do nada, sem aviso. Qual é sua reação interna?',
    opcoes: [
      { texto: 'Já quero saber roteiro, hospedagem, tudo organizado', tag: 'estruturado' },
      { texto: 'Bora! Resolvo as malas na hora, adoro o improviso', tag: 'espontaneo' },
      { texto: 'Preciso de pelo menos uma lista antes de sair de casa', tag: 'estruturado' },
      { texto: 'A melhor parte da viagem é justamente não ter plano nenhum', tag: 'espontaneo' },
      { texto: 'Gosto de ter um esqueleto e deixar os detalhes fluírem', tag: 'espontaneo' },
      { texto: 'Cada dia com horário e atividade bem definida', tag: 'estruturado' }
    ]
  },
  {
    id: 'PER05',
    categoria: 'personalidade',
    tipo: 'multipla_escolha',
    texto: 'Numa festa cheia de gente que você não conhece, você...',
    opcoes: [
      { texto: 'Se joga, puxa assunto com quem estiver por perto', tag: 'extrovertido' },
      { texto: 'Fica num canto até alguém conhecido aparecer', tag: 'introvertido' },
      { texto: 'Curte observar antes de se soltar', tag: 'introvertido' },
      { texto: 'Vira o centro das atenções sem nem perceber', tag: 'extrovertido' },
      { texto: 'Prefere sair mais cedo e ir pra um lugar mais quieto', tag: 'introvertido' },
      { texto: 'Adora esse tipo de desafio social', tag: 'extrovertido' }
    ]
  },
  {
    id: 'PER06',
    categoria: 'personalidade',
    tipo: 'multipla_escolha',
    texto: 'Quando alguém te contraria numa discussão, o que pesa mais pra você?',
    opcoes: [
      { texto: 'Ter razão, com argumentos sólidos', tag: 'racional' },
      { texto: 'Que a outra pessoa não saia magoada', tag: 'emocional' },
      { texto: 'Resolver rápido, seguindo a lógica que faz mais sentido', tag: 'racional' },
      { texto: 'Entender o que a pessoa está sentindo antes de responder', tag: 'emocional' },
      { texto: 'Chegar numa conclusão justa, baseada nos fatos', tag: 'racional' },
      { texto: 'Preservar o vínculo, mesmo cedendo um pouco', tag: 'emocional' }
    ]
  },
  {
    id: 'PER07',
    categoria: 'personalidade',
    tipo: 'multipla_escolha',
    texto: 'Na hora de escolher um filme, o que mais te atrai?',
    opcoes: [
      { texto: 'Uma história baseada em fatos reais', tag: 'pratico' },
      { texto: 'Ficção científica ou fantasia, mundos que não existem', tag: 'idealista' },
      { texto: 'Documentário — gosto de aprender algo de verdade', tag: 'pratico' },
      { texto: 'Aquele roteiro filosófico que te faz pensar na vida', tag: 'idealista' },
      { texto: 'Comédia leve, sem muita firula', tag: 'pratico' },
      { texto: 'Um enredo cheio de simbolismo e metáforas', tag: 'idealista' }
    ]
  },
  {
    id: 'PER08',
    categoria: 'personalidade',
    tipo: 'multipla_escolha',
    texto: 'Sua mesa de trabalho (ou de estudos) geralmente está...',
    opcoes: [
      { texto: 'Organizada, cada coisa no seu lugar', tag: 'estruturado' },
      { texto: 'Uma bagunça criativa que só você entende', tag: 'espontaneo' },
      { texto: 'Com uma lista de tarefas sempre à vista', tag: 'estruturado' },
      { texto: 'Mudando de cara toda semana, sem padrão fixo', tag: 'espontaneo' },
      { texto: 'Planejada com antecedência pro dia seguinte', tag: 'estruturado' },
      { texto: 'Adaptada na hora, conforme o que aparece', tag: 'espontaneo' }
    ]
  },
  {
    id: 'PER09',
    categoria: 'personalidade',
    tipo: 'multipla_escolha',
    texto: 'Se seu final de semana ideal fosse um filme, qual seria o gênero?',
    opcoes: [
      { texto: 'Comédia romântica, com os amigos', tag: 'extrovertido' },
      { texto: 'Drama introspectivo, só você e seus pensamentos', tag: 'introvertido' },
      { texto: 'Aventura, sem roteiro definido', tag: 'espontaneo' },
      { texto: 'Documentário bem planejado, tipo museu ou trilha', tag: 'estruturado' },
      { texto: 'Ficção que expande a imaginação', tag: 'idealista' },
      { texto: 'Algo realista, sobre o cotidiano', tag: 'pratico' }
    ]
  },
  {
    id: 'PER10',
    categoria: 'personalidade',
    tipo: 'multipla_escolha',
    texto: 'Quando você erra em alguma coisa, o que geralmente vem primeiro?',
    opcoes: [
      { texto: 'Analisar friamente o que deu errado', tag: 'racional' },
      { texto: 'Sentir o peso emocional antes de qualquer análise', tag: 'emocional' },
      { texto: 'Já pensar num plano prático pra corrigir', tag: 'pratico' },
      { texto: 'Refletir sobre o significado maior daquele erro', tag: 'idealista' },
      { texto: 'Buscar apoio de alguém pra processar junto', tag: 'emocional' },
      { texto: 'Seguir em frente rápido, sem muito drama', tag: 'racional' }
    ]
  },
  {
    id: 'PER11',
    categoria: 'personalidade',
    tipo: 'escala',
    texto: "De 1 a 5, o quanto você se considera uma pessoa de rotina.",
    escala: {
      min: 1,
      max: 5,
      min_label: 'Odeio rotina — viver no improviso é o que me move',
      max_label: 'Amo rotina — ela me dá segurança e estrutura'
    },
    dimensao: 'estruturado'
  },
  {
    id: 'PER12',
    categoria: 'personalidade',
    tipo: 'escala',
    texto: 'De 1 a 5, o quanto suas decisões costumam ser guiadas mais pelo coração do que pela razão.',
    escala: {
      min: 1,
      max: 5,
      min_label: 'Sou bem racional — o sentimento entra depois',
      max_label: 'Sou bem guiado(a) pelo coração — a razão entra depois'
    },
    dimensao: 'emocional'
  },

  // ==========================================
  // TEMPERAMENTO
  // ==========================================
  {
    id: 'TEM01',
    categoria: 'temperamento',
    tipo: 'multipla_escolha',
    texto: 'Numa roda de amigos, qual desses papéis mais parece com você?',
    opcoes: [
      { texto: 'O(a) que puxa assunto e contagia todo mundo com energia', tag: 'sanguineo' },
      { texto: 'O(a) que toma a frente e organiza o que vai rolar', tag: 'colerico' },
      { texto: 'O(a) que observa, analisa e fala pouco — mas fala bem', tag: 'melancolico' },
      { texto: 'O(a) que fica tranquilo(a) no seu canto, sem se abalar com nada', tag: 'fleumatico' },
      { texto: 'Não me encaixo bem em nenhum desses, sou mais na minha', tag: 'neutro' },
      { texto: 'Um pouco de cada, depende muito do grupo', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM02',
    categoria: 'temperamento',
    tipo: 'multipla_escolha',
    texto: 'Quando um plano muda de última hora, sua reação mais provável é...',
    opcoes: [
      { texto: 'Adaptar na hora e já ficar animado(a) com o novo plano', tag: 'sanguineo' },
      { texto: 'Ficar irritado(a) e já pensar em como resolver rápido', tag: 'colerico' },
      { texto: 'Sentir um incômodo e pensar bastante sobre o que mudou', tag: 'melancolico' },
      { texto: 'Dar de ombros — tanto faz, vai que vai', tag: 'fleumatico' },
      { texto: 'Fico neutro(a), nem percebo tanta diferença', tag: 'neutro' },
      { texto: 'Reclamo baixinho e sigo o fluxo', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM03',
    categoria: 'temperamento',
    tipo: 'multipla_escolha',
    texto: 'Em um projeto em grupo, você tende a ser aquele(a) que...',
    opcoes: [
      { texto: 'Anima o time e mantém o clima leve', tag: 'sanguineo' },
      { texto: 'Assume a liderança e cobra resultado', tag: 'colerico' },
      { texto: 'Cuida dos detalhes que ninguém mais percebe', tag: 'melancolico' },
      { texto: 'Mantém a calma quando todo mundo já surtou', tag: 'fleumatico' },
      { texto: 'Fica na função que ninguém mais quer fazer, sem reclamar', tag: 'neutro' },
      { texto: 'Prefere só executar sua parte, sem se envolver demais', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM04',
    categoria: 'temperamento',
    tipo: 'multipla_escolha',
    texto: 'Quando alguém te corta no trânsito, o que passa mais rápido pela sua cabeça?',
    opcoes: [
      { texto: 'Um xingamento — e esquece em 2 minutos', tag: 'sanguineo' },
      { texto: 'Uma raiva forte, quase parte pro confronto', tag: 'colerico' },
      { texto: 'Fica remoendo aquilo o resto do trajeto', tag: 'melancolico' },
      { texto: 'Nem percebe direito, segue o dia normal', tag: 'fleumatico' },
      { texto: 'Nem lembra depois, esquece rápido', tag: 'neutro' },
      { texto: 'Fica tenso(a) por dentro, mas não demonstra nada', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM05',
    categoria: 'temperamento',
    tipo: 'multipla_escolha',
    texto: 'Como você costuma tomar decisões rápidas?',
    opcoes: [
      { texto: 'No impulso, animado(a) com a possibilidade', tag: 'sanguineo' },
      { texto: 'Rápido e direto, sem enrolação', tag: 'colerico' },
      { texto: 'Só depois de pensar em todos os ângulos possíveis', tag: 'melancolico' },
      { texto: 'Sem pressa — o tempo resolve', tag: 'fleumatico' },
      { texto: 'Peço a opinião de alguém antes de decidir', tag: 'neutro' },
      { texto: 'Evito decidir até que seja realmente necessário', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM06',
    categoria: 'temperamento',
    tipo: 'multipla_escolha',
    texto: 'O que mais te estressa numa relação?',
    opcoes: [
      { texto: 'Rotina parada, sem novidade nenhuma', tag: 'sanguineo' },
      { texto: 'Sentir que perdeu o controle da situação', tag: 'colerico' },
      { texto: 'Não conseguir entender o que se passa na cabeça do outro', tag: 'melancolico' },
      { texto: 'Confronto e discussão — prefere evitar', tag: 'fleumatico' },
      { texto: 'Falta de reconhecimento pelo que eu faço', tag: 'neutro' },
      { texto: 'Sentir que não tenho voz nas decisões', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM07',
    categoria: 'temperamento',
    tipo: 'multipla_escolha',
    texto: 'Diante de um problema sério, o que você faz primeiro?',
    opcoes: [
      { texto: 'Chama alguém pra conversar e desabafar', tag: 'sanguineo' },
      { texto: 'Parte pra ação, resolve logo', tag: 'colerico' },
      { texto: 'Analisa cada detalhe antes de fazer qualquer coisa', tag: 'melancolico' },
      { texto: 'Espera um pouco pra ver se o problema se resolve sozinho', tag: 'fleumatico' },
      { texto: 'Busca informações antes de fazer qualquer coisa', tag: 'neutro' },
      { texto: 'Tenta não pensar muito, distrai a cabeça primeiro', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM08',
    categoria: 'temperamento',
    tipo: 'multipla_escolha',
    texto: 'Como você reage a elogios em público?',
    opcoes: [
      { texto: 'Adora, se ilumina na hora', tag: 'sanguineo' },
      { texto: 'Aceita com orgulho, sente que mereceu', tag: 'colerico' },
      { texto: 'Fica sem graça, prefere reconhecimento em particular', tag: 'melancolico' },
      { texto: 'Agradece tranquilamente, sem alarde', tag: 'fleumatico' },
      { texto: 'Fica desconfiado(a), acha que tem segunda intenção', tag: 'neutro' },
      { texto: 'Devolve o elogio na mesma hora', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM09',
    categoria: 'temperamento',
    tipo: 'multipla_escolha',
    texto: 'Qual frase mais combina com você?',
    opcoes: [
      { texto: '"A vida é festa, bora aproveitar"', tag: 'sanguineo' },
      { texto: '"Se não for pra vencer, pra que fazer?"', tag: 'colerico' },
      { texto: '"Prefiro fazer certo do que fazer rápido"', tag: 'melancolico' },
      { texto: '"Devagar se vai ao longe"', tag: 'fleumatico' },
      { texto: '"Cada um no seu quadrado, sem drama"', tag: 'neutro' },
      { texto: '"O que vier, eu encaro"', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM10',
    categoria: 'temperamento',
    tipo: 'multipla_escolha',
    texto: 'Numa discussão de casal, você costuma...',
    opcoes: [
      { texto: 'Falar demais, deixar escapar o que sente na hora', tag: 'sanguineo' },
      { texto: 'Ir direto ao ponto, sem rodeios, mesmo que doa', tag: 'colerico' },
      { texto: 'Se fechar e só voltar a falar depois de processar tudo', tag: 'melancolico' },
      { texto: 'Evitar o confronto, esperar a poeira baixar', tag: 'fleumatico' },
      { texto: 'Tentar equilibrar, ouvir e falar na mesma medida', tag: 'neutro' },
      { texto: 'Buscar humor pra aliviar a tensão', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM11',
    categoria: 'temperamento',
    tipo: 'escala',
    texto: 'De 1 a 5, o quanto você se irrita rápido quando algo sai do seu controle.',
    escala: {
      min: 1,
      max: 5,
      min_label: 'Quase nada me tira do sério',
      max_label: 'Exploto fácil quando perco o controle da situação'
    },
    dimensao: 'colerico'
  },
  {
    id: 'TEM12',
    categoria: 'temperamento',
    tipo: 'escala',
    texto: 'De 1 a 5, o quanto você precisa de tempo sozinho(a) pra processar as coisas antes de falar sobre elas.',
    escala: {
      min: 1,
      max: 5,
      min_label: 'Falo na hora, não preciso processar',
      max_label: 'Preciso de bastante tempo em silêncio antes de conseguir colocar em palavras'
    },
    dimensao: 'melancolico'
  },

  // ==========================================
  // APEGO
  // ==========================================
  {
    id: 'APE01',
    categoria: 'apego',
    tipo: 'multipla_escolha',
    texto: 'Seu parceiro(a) demora mais que o normal pra responder uma mensagem. O que passa primeiro pela sua cabeça?',
    opcoes: [
      { texto: 'Nada demais, ele(a) deve estar ocupado(a)', tag: 'seguro' },
      { texto: 'Será que eu fiz alguma coisa errada?', tag: 'ansioso' },
      { texto: 'Nem percebo muito, sigo minha vida normalmente', tag: 'evitativo' },
      { texto: 'Fico incomodado(a), mas nem sei dizer se é medo ou raiva', tag: 'desorganizado' },
      { texto: 'Depende do dia, às vezes nem penso nisso', tag: 'neutro' },
      { texto: 'Fico na dúvida, mas não demonstro nada', tag: 'neutro' }
    ]
  },
  {
    id: 'APE02',
    categoria: 'apego',
    tipo: 'multipla_escolha',
    texto: 'Quando vocês estão de mal, o que você mais quer fazer?',
    opcoes: [
      { texto: 'Conversar logo, resolver e seguir em frente', tag: 'seguro' },
      { texto: 'Correr atrás, buscar reconciliação imediatamente', tag: 'ansioso' },
      { texto: 'Ter um tempo sozinho(a), longe do assunto', tag: 'evitativo' },
      { texto: 'Uma parte quer se aproximar, outra quer fugir', tag: 'desorganizado' },
      { texto: 'Prefiro deixar o tempo resolver, sem forçar nada', tag: 'neutro' },
      { texto: 'Fico mal, mas espero a outra pessoa dar o primeiro passo', tag: 'neutro' }
    ]
  },
  {
    id: 'APE03',
    categoria: 'apego',
    tipo: 'multipla_escolha',
    texto: 'Como você se sente quando seu parceiro(a) quer passar um tempo sem você (uma viagem com amigos, por exemplo)?',
    opcoes: [
      { texto: 'Tranquilo(a), confio e aproveito meu tempo também', tag: 'seguro' },
      { texto: 'Ansioso(a), fico pensando no que ele(a) está fazendo', tag: 'ansioso' },
      { texto: 'Até prefiro, gosto do meu espaço também', tag: 'evitativo' },
      { texto: 'Sinto falta, mas também um alívio — é confuso', tag: 'desorganizado' },
      { texto: 'Depende do clima da relação naquele momento', tag: 'neutro' },
      { texto: 'Fico bem, mas mando notícia de vez em quando', tag: 'neutro' }
    ]
  },
  {
    id: 'APE04',
    categoria: 'apego',
    tipo: 'multipla_escolha',
    texto: 'Falar sobre o futuro da relação (morar junto, casar) faz você sentir...',
    opcoes: [
      { texto: 'Empolgação — é natural pensar nisso junto', tag: 'seguro' },
      { texto: 'Ansiedade, quero ter certeza de que vai acontecer', tag: 'ansioso' },
      { texto: 'Um certo desconforto, prefiro ir vivendo um dia de cada vez', tag: 'evitativo' },
      { texto: 'Uma mistura de vontade de ir junto e vontade de fugir do assunto', tag: 'desorganizado' },
      { texto: 'Prefiro focar no presente, sem pensar tão à frente', tag: 'neutro' },
      { texto: 'Depende muito de como a conversa é conduzida', tag: 'neutro' }
    ]
  },
  {
    id: 'APE05',
    categoria: 'apego',
    tipo: 'multipla_escolha',
    texto: 'Quando seu parceiro(a) erra com você, sua reação mais comum é...',
    opcoes: [
      { texto: 'Falar com calma sobre o que senti', tag: 'seguro' },
      { texto: 'Cobrar bastante, com medo de que aconteça de novo', tag: 'ansioso' },
      { texto: 'Guardar pra mim e me distanciar sem explicar o motivo', tag: 'evitativo' },
      { texto: 'Explodir e, depois, me arrepender de como agi', tag: 'desorganizado' },
      { texto: 'Esperar um pedido de desculpas antes de reagir', tag: 'neutro' },
      { texto: 'Tentar entender o contexto antes de reagir', tag: 'neutro' }
    ]
  },
  {
    id: 'APE06',
    categoria: 'apego',
    tipo: 'multipla_escolha',
    texto: 'O que mais te dá segurança numa relação?',
    opcoes: [
      { texto: 'Saber que consigo confiar e ser eu mesmo(a)', tag: 'seguro' },
      { texto: 'Ter provas constantes de que sou amado(a)', tag: 'ansioso' },
      { texto: 'Ter minha independência preservada', tag: 'evitativo' },
      { texto: 'Sinceramente, nunca me senti totalmente seguro(a) numa relação', tag: 'desorganizado' },
      { texto: 'Ter uma rotina estável e previsível', tag: 'neutro' },
      { texto: 'Sentir que somos um time nas decisões', tag: 'neutro' }
    ]
  },
  {
    id: 'APE07',
    categoria: 'apego',
    tipo: 'multipla_escolha',
    texto: 'Quando você sente que está se apaixonando de verdade, o que costuma fazer?',
    opcoes: [
      { texto: 'Se permitir viver, com naturalidade', tag: 'seguro' },
      { texto: 'Já começar a temer perder a pessoa', tag: 'ansioso' },
      { texto: 'Ficar um pouco na defensiva, com medo de se expor demais', tag: 'evitativo' },
      { texto: 'Se aproximar e se afastar várias vezes, sem entender bem por quê', tag: 'desorganizado' },
      { texto: 'Fico observando com cautela antes de me entregar', tag: 'neutro' },
      { texto: 'Sigo o fluxo, sem pensar muito nisso', tag: 'neutro' }
    ]
  },
  {
    id: 'APE08',
    categoria: 'apego',
    tipo: 'multipla_escolha',
    texto: 'Numa festa, seu parceiro(a) está conversando animadamente com outra pessoa por um bom tempo. Você...',
    opcoes: [
      { texto: 'Nem liga, confia e segue curtindo a festa', tag: 'seguro' },
      { texto: 'Fica de olho, uma pontinha de ciúme aparece', tag: 'ansioso' },
      { texto: 'Nem nota, está distraído(a) com outra coisa', tag: 'evitativo' },
      { texto: 'Sente ciúme, mas evita demonstrar — guarda pra depois', tag: 'desorganizado' },
      { texto: 'Puxo assunto e me junto à conversa', tag: 'neutro' },
      { texto: 'Comento sobre isso depois, de boa', tag: 'neutro' }
    ]
  },
  {
    id: 'APE09',
    categoria: 'apego',
    tipo: 'multipla_escolha',
    texto: 'Depender emocionalmente de alguém é algo que você...',
    opcoes: [
      { texto: 'Faz com naturalidade — é parte de uma relação saudável', tag: 'seguro' },
      { texto: 'Busca bastante, às vezes até demais', tag: 'ansioso' },
      { texto: 'Evita ao máximo, prefere se virar sozinho(a)', tag: 'evitativo' },
      { texto: 'Deseja, mas ao mesmo tempo teme', tag: 'desorganizado' },
      { texto: 'Depende muito de quem é a pessoa', tag: 'neutro' },
      { texto: 'Tento equilibrar entre pedir ajuda e resolver sozinho(a)', tag: 'neutro' }
    ]
  },
  {
    id: 'APE10',
    categoria: 'apego',
    tipo: 'multipla_escolha',
    texto: 'Quando algo muito bom acontece na sua vida, qual é seu primeiro instinto?',
    opcoes: [
      { texto: 'Compartilhar com o parceiro(a) na hora, com alegria', tag: 'seguro' },
      { texto: 'Compartilhar e já esperar uma reação super entusiasmada', tag: 'ansioso' },
      { texto: 'Guardar pra mim por um tempo antes de contar', tag: 'evitativo' },
      { texto: 'Contar, mas já esperando que algo dê errado', tag: 'desorganizado' },
      { texto: 'Fico na dúvida se conto logo ou espero o momento certo', tag: 'neutro' },
      { texto: 'Comemoro sozinho(a) antes de contar pra alguém', tag: 'neutro' }
    ]
  },
  {
    id: 'APE11',
    categoria: 'apego',
    tipo: 'escala',
    texto: 'De 1 a 5, o quanto você sente necessidade de confirmação constante de que é amado(a).',
    escala: {
      min: 1,
      max: 5,
      min_label: 'Quase nenhuma — confio sem precisar de provas',
      max_label: 'Muita — preciso sentir isso o tempo todo'
    },
    dimensao: 'ansioso'
  },
  {
    id: 'APE12',
    categoria: 'apego',
    tipo: 'escala',
    texto: 'De 1 a 5, o quanto é fácil pra você se abrir emocionalmente com o parceiro(a).',
    escala: {
      min: 1,
      max: 5,
      min_label: 'Muito difícil — prefiro guardar pra mim',
      max_label: 'Muito fácil — me abro sem medo'
    },
    dimensao: 'evitativo',
    inverso: true
  },
  {
    id: 'APE13',
    categoria: 'apego',
    tipo: 'escala',
    texto: 'De 1 a 5, o quanto discussões de relacionamento mexem com seu sono ou seu apetite.',
    escala: {
      min: 1,
      max: 5,
      min_label: 'Nada — sigo minha rotina normal',
      max_label: 'Muito — fico afetado(a) fisicamente'
    },
    dimensao: 'ansioso'
  },
  {
    id: 'APE14',
    categoria: 'apego',
    tipo: 'escala',
    texto: 'De 1 a 5, o quanto você se identifica com se aproximar e se afastar das pessoas sem entender totalmente por quê.',
    escala: {
      min: 1,
      max: 5,
      min_label: 'Nunca me identifico com isso',
      max_label: 'Me identifico muito com isso'
    },
    dimensao: 'desorganizado'
  },

  // ==========================================
  // FERIDAS DA INFÂNCIA
  // ==========================================
  {
    id: 'FER01',
    categoria: 'feridas_infancia',
    tipo: 'multipla_escolha',
    texto: 'Quando alguém cancela um encontro com você de última hora, o que dói mais?',
    opcoes: [
      { texto: 'Sentir que não fui prioridade pra essa pessoa', tag: 'rejeicao' },
      { texto: 'O medo de que isso vire um padrão e a pessoa suma', tag: 'abandono' },
      { texto: 'Sentir que fiquei em segundo plano, meio invisível', tag: 'humilhacao' },
      { texto: 'Já ficar desconfiado(a) se a desculpa é verdadeira mesmo', tag: 'traicao' },
      { texto: 'Achar injusto, depois de tudo que eu tinha planejado', tag: 'injustica' },
      { texto: 'Nada muito profundo — só uma chatice do dia', tag: 'neutro' }
    ]
  },
  {
    id: 'FER02',
    categoria: 'feridas_infancia',
    tipo: 'multipla_escolha',
    texto: 'O que mais te machuca quando alguém te dá um feedback negativo?',
    opcoes: [
      { texto: 'O medo de estar sendo rejeitado(a) como pessoa', tag: 'rejeicao' },
      { texto: 'O medo de essa pessoa se afastar de mim por causa disso', tag: 'abandono' },
      { texto: 'A sensação de vergonha, como se todo mundo estivesse vendo', tag: 'humilhacao' },
      { texto: 'A desconfiança sobre a real intenção por trás do feedback', tag: 'traicao' },
      { texto: 'A sensação de que fui tratado(a) de forma desproporcional', tag: 'injustica' },
      { texto: 'Nada muito profundo, sigo em frente rápido', tag: 'neutro' }
    ]
  },
  {
    id: 'FER03',
    categoria: 'feridas_infancia',
    tipo: 'multipla_escolha',
    texto: 'Numa discussão, o que mais te machuca ouvir do seu parceiro(a)?',
    opcoes: [
      { texto: '"Eu não te quero mais por perto"', tag: 'rejeicao' },
      { texto: '"Vou embora"', tag: 'abandono' },
      { texto: '"Você é ridículo(a) por pensar assim"', tag: 'humilhacao' },
      { texto: '"Você não é confiável"', tag: 'traicao' },
      { texto: '"Você não merece isso"', tag: 'injustica' },
      { texto: 'Nenhuma frase específica — o tom de voz é o que mais pesa', tag: 'neutro' }
    ]
  },
  {
    id: 'FER04',
    categoria: 'feridas_infancia',
    tipo: 'multipla_escolha',
    texto: 'Quando criança, o que mais pesava pra você?',
    opcoes: [
      { texto: 'Sentir que não era escolhido(a) primeiro pros times ou brincadeiras', tag: 'rejeicao' },
      { texto: 'Ficar muito tempo sozinho(a), sem ninguém por perto', tag: 'abandono' },
      { texto: 'Ser corrigido(a) ou repreendido(a) na frente dos outros', tag: 'humilhacao' },
      { texto: 'Perceber promessas de adultos que não se cumpriam', tag: 'traicao' },
      { texto: 'Sentir que as regras eram diferentes (e piores) pra mim', tag: 'injustica' },
      { texto: 'Nada muito marcante, tive uma infância tranquila', tag: 'neutro' }
    ]
  },
  {
    id: 'FER05',
    categoria: 'feridas_infancia',
    tipo: 'multipla_escolha',
    texto: 'O que mais te dói quando alguém te compara com outra pessoa?',
    opcoes: [
      { texto: 'Sentir que não sou suficiente do jeito que sou', tag: 'rejeicao' },
      { texto: 'Medo de ser trocado(a) pela pessoa com quem fui comparado(a)', tag: 'abandono' },
      { texto: 'Vergonha de ser exposto(a) dessa forma', tag: 'humilhacao' },
      { texto: 'Sentir que a pessoa escondia o que realmente pensava de mim', tag: 'traicao' },
      { texto: 'Achar simplesmente injusto e desnecessário', tag: 'injustica' },
      { texto: 'Não costuma me incomodar tanto', tag: 'neutro' }
    ]
  },
  {
    id: 'FER06',
    categoria: 'feridas_infancia',
    tipo: 'multipla_escolha',
    texto: 'Como você reage quando percebe que foi excluído(a) de um convite ou grupo?',
    opcoes: [
      { texto: 'Dói bastante, mesmo que eu não demonstre', tag: 'rejeicao' },
      { texto: 'Fico com medo de perder essas pessoas de vez', tag: 'abandono' },
      { texto: 'Fico com vergonha de perguntar o motivo', tag: 'humilhacao' },
      { texto: 'Já penso em quem pode ter falado mal de mim', tag: 'traicao' },
      { texto: 'Fico revoltado(a), acho injusto', tag: 'injustica' },
      { texto: 'Não costuma me afetar muito', tag: 'neutro' }
    ]
  },
  {
    id: 'FER07',
    categoria: 'feridas_infancia',
    tipo: 'multipla_escolha',
    texto: 'O que mais te assusta na ideia de se abrir completamente com alguém?',
    opcoes: [
      { texto: 'Ser rejeitado(a) depois de mostrar quem realmente sou', tag: 'rejeicao' },
      { texto: 'Me apegar e depois essa pessoa desaparecer', tag: 'abandono' },
      { texto: 'Parecer fraco(a) ou ridículo(a) por sentir o que sinto', tag: 'humilhacao' },
      { texto: 'Essa pessoa usar isso contra mim depois', tag: 'traicao' },
      { texto: 'Não costumo ter medo disso', tag: 'neutro' },
      { texto: 'Medo de ser mal interpretado(a)', tag: 'neutro' }
    ]
  },
  {
    id: 'FER08',
    categoria: 'feridas_infancia',
    tipo: 'multipla_escolha',
    texto: 'Quando você comete um erro grande, o medo maior é...',
    opcoes: [
      { texto: 'Que as pessoas parem de gostar de mim por causa disso', tag: 'rejeicao' },
      { texto: 'Que isso afaste as pessoas de mim', tag: 'abandono' },
      { texto: 'O julgamento e a vergonha alheia', tag: 'humilhacao' },
      { texto: 'Que usem esse erro contra mim no futuro', tag: 'traicao' },
      { texto: 'Ser punido(a) de forma desproporcional ao erro', tag: 'injustica' },
      { texto: 'Aceitar e seguir em frente, sem muito peso', tag: 'neutro' }
    ]
  },
  {
    id: 'FER09',
    categoria: 'feridas_infancia',
    tipo: 'multipla_escolha',
    texto: 'Na infância, como as broncas costumavam ser?',
    opcoes: [
      { texto: 'Eu sentia que era eu, e não só a atitude, que estava sendo rejeitado(a)', tag: 'rejeicao' },
      { texto: 'Vinham acompanhadas de silêncio ou distanciamento', tag: 'abandono' },
      { texto: 'Aconteciam na frente de outras pessoas', tag: 'humilhacao' },
      { texto: 'Eu sentia que promessas feitas antes não eram cumpridas depois', tag: 'traicao' },
      { texto: 'Pareciam desproporcionais ao que eu tinha feito', tag: 'injustica' },
      { texto: 'Eram justas e bem explicadas', tag: 'neutro' }
    ]
  },
  {
    id: 'FER10',
    categoria: 'feridas_infancia',
    tipo: 'multipla_escolha',
    texto: 'O que mais dói quando alguém quebra uma promessa com você?',
    opcoes: [
      { texto: 'Sentir que não importo o suficiente pra que cumpram', tag: 'rejeicao' },
      { texto: 'Medo de que isso signifique que vão me deixar', tag: 'abandono' },
      { texto: 'Vergonha de ter acreditado', tag: 'humilhacao' },
      { texto: 'A quebra de confiança em si', tag: 'traicao' },
      { texto: 'A injustiça de ter contado com algo que não veio', tag: 'injustica' },
      { texto: 'Sigo em frente, não fico remoendo', tag: 'neutro' }
    ]
  },
  {
    id: 'FER11',
    categoria: 'feridas_infancia',
    tipo: 'escala',
    texto: 'De 1 a 5, o quanto você sente medo de ser abandonado(a) pelas pessoas que ama.',
    escala: {
      min: 1,
      max: 5,
      min_label: 'Quase nenhum',
      max_label: 'Um medo bem presente'
    },
    dimensao: 'abandono'
  },
  {
    id: 'FER12',
    categoria: 'feridas_infancia',
    tipo: 'escala',
    texto: 'De 1 a 5, o quanto situações de injustiça (mesmo pequenas) mexem muito com você.',
    escala: {
      min: 1,
      max: 5,
      min_label: 'Quase não me afetam',
      max_label: 'Me afetam profundamente'
    },
    dimensao: 'injustica'
  },
  {
    id: 'FER13',
    categoria: 'feridas_infancia',
    tipo: 'escala',
    texto: 'De 1 a 5, o quanto é difícil confiar plenamente em alguém, mesmo quando a pessoa não te deu motivos.',
    escala: {
      min: 1,
      max: 5,
      min_label: 'Confio com facilidade',
      max_label: 'É muito difícil confiar de verdade'
    },
    dimensao: 'traicao'
  },

  // ==========================================
  // LINGUAGEM DO AMOR
  // ==========================================
  {
    id: 'LIN01',
    categoria: 'linguagem_amor',
    tipo: 'multipla_escolha',
    texto: 'O que mais te faz sentir amado(a) no dia a dia?',
    opcoes: [
      { texto: 'Ouvir um "eu te amo" ou um elogio sincero', tag: 'palavras_afirmacao' },
      { texto: 'Ter um tempo só nosso, sem celular, sem pressa', tag: 'tempo_qualidade' },
      { texto: 'Receber algo que mostra que pensaram em mim', tag: 'presentes' },
      { texto: 'Ver o outro fazendo algo por mim sem eu pedir', tag: 'atos_servico' },
      { texto: 'Um abraço apertado ou a mão dada', tag: 'toque_fisico' },
      { texto: 'Simplesmente rir e se divertir junto', tag: 'neutro' }
    ]
  },
  {
    id: 'LIN02',
    categoria: 'linguagem_amor',
    tipo: 'multipla_escolha',
    texto: 'Se você pudesse escolher um presente de aniversário do seu parceiro(a), qual seria mais especial?',
    opcoes: [
      { texto: 'Uma carta ou mensagem bem escrita, com palavras de verdade', tag: 'palavras_afirmacao' },
      { texto: 'Um dia inteiro só nosso, sem distrações', tag: 'tempo_qualidade' },
      { texto: 'Algo físico que ele(a) escolheu pensando em mim', tag: 'presentes' },
      { texto: 'Ele(a) resolver algo que eu vinha adiando', tag: 'atos_servico' },
      { texto: 'Uma massagem ou um momento de carinho físico', tag: 'toque_fisico' },
      { texto: 'Uma surpresa que misturasse um pouco de tudo isso', tag: 'neutro' }
    ]
  },
  {
    id: 'LIN03',
    categoria: 'linguagem_amor',
    tipo: 'multipla_escolha',
    texto: 'O que mais te machuca quando o parceiro(a) deixa de fazer?',
    opcoes: [
      { texto: 'Nunca ouvir elogios ou palavras de carinho', tag: 'palavras_afirmacao' },
      { texto: 'Estar sempre no celular quando estamos juntos', tag: 'tempo_qualidade' },
      { texto: 'Esquecer datas ou detalhes importantes', tag: 'presentes' },
      { texto: 'Prometer ajudar e não cumprir', tag: 'atos_servico' },
      { texto: 'Evitar contato físico, tipo abraço ou beijo', tag: 'toque_fisico' },
      { texto: 'Debochar ou fazer pouco caso do que sinto', tag: 'neutro' }
    ]
  },
  {
    id: 'LIN04',
    categoria: 'linguagem_amor',
    tipo: 'multipla_escolha',
    texto: 'Depois de um dia difícil, o que você mais gostaria que seu parceiro(a) fizesse?',
    opcoes: [
      { texto: 'Me dissesse palavras que me acalmassem', tag: 'palavras_afirmacao' },
      { texto: 'Sentasse comigo, só ouvindo, presente de verdade', tag: 'tempo_qualidade' },
      { texto: 'Trouxesse algo que eu gosto, tipo minha comida favorita', tag: 'presentes' },
      { texto: 'Assumisse uma tarefa minha pra aliviar meu dia', tag: 'atos_servico' },
      { texto: 'Me desse um abraço bem longo', tag: 'toque_fisico' },
      { texto: 'Me desse um tempo sozinho(a) pra processar o dia', tag: 'neutro' }
    ]
  },
  {
    id: 'LIN05',
    categoria: 'linguagem_amor',
    tipo: 'multipla_escolha',
    texto: 'Como você prefere se despedir do seu parceiro(a) antes de um dia cheio?',
    opcoes: [
      { texto: 'Com um "te amo, vai dar tudo certo"', tag: 'palavras_afirmacao' },
      { texto: 'Com alguns minutos de conversa antes de sair', tag: 'tempo_qualidade' },
      { texto: 'Deixando um bilhetinho ou mensagem surpresa', tag: 'presentes' },
      { texto: 'Ajudando com algo prático antes de sair', tag: 'atos_servico' },
      { texto: 'Com um beijo ou abraço demorado', tag: 'toque_fisico' },
      { texto: 'Com uma piada boba que arranca um sorriso', tag: 'neutro' }
    ]
  },
  {
    id: 'LIN06',
    categoria: 'linguagem_amor',
    tipo: 'multipla_escolha',
    texto: 'Você se sente mais próximo(a) do seu parceiro(a) quando...',
    opcoes: [
      { texto: 'Ele(a) diz o quanto te admira', tag: 'palavras_afirmacao' },
      { texto: 'Vocês passam um tempo de qualidade, só os dois', tag: 'tempo_qualidade' },
      { texto: 'Ele(a) te dá algo que mostra que estava pensando em você', tag: 'presentes' },
      { texto: 'Ele(a) te ajuda com algo sem você precisar pedir', tag: 'atos_servico' },
      { texto: 'Vocês estão em contato físico, de mãos dadas ou abraçados', tag: 'toque_fisico' },
      { texto: 'Vocês compartilham os mesmos planos e sonhos', tag: 'neutro' }
    ]
  },
  {
    id: 'LIN07',
    categoria: 'linguagem_amor',
    tipo: 'multipla_escolha',
    texto: 'Se você tivesse que escolher só uma coisa pra manter numa relação, seria...',
    opcoes: [
      { texto: 'Boas conversas e palavras sinceras', tag: 'palavras_afirmacao' },
      { texto: 'Tempo de qualidade juntos', tag: 'tempo_qualidade' },
      { texto: 'Gestos e presentes que mostrem carinho', tag: 'presentes' },
      { texto: 'Ajuda mútua no dia a dia', tag: 'atos_servico' },
      { texto: 'Contato físico e carinho', tag: 'toque_fisico' },
      { texto: 'Respeito e liberdade mútua', tag: 'neutro' }
    ]
  },
  {
    id: 'LIN08',
    categoria: 'linguagem_amor',
    tipo: 'multipla_escolha',
    texto: 'O que mais te desanima quando o relacionamento parece mais distante?',
    opcoes: [
      { texto: 'Faltam elogios e palavras de carinho', tag: 'palavras_afirmacao' },
      { texto: 'Não temos mais tempo de qualidade', tag: 'tempo_qualidade' },
      { texto: 'Ninguém mais lembra de detalhes ou surpresas', tag: 'presentes' },
      { texto: 'Ninguém mais ajuda o outro nas tarefas', tag: 'atos_servico' },
      { texto: 'Falta contato físico', tag: 'toque_fisico' },
      { texto: 'O clima de leveza e humor desaparece', tag: 'neutro' }
    ]
  },
  {
    id: 'LIN09',
    categoria: 'linguagem_amor',
    tipo: 'multipla_escolha',
    texto: 'Qual dessas cenas te deixaria mais feliz num domingo qualquer?',
    opcoes: [
      { texto: 'Uma conversa longa e sincera sobre a vida', tag: 'palavras_afirmacao' },
      { texto: 'Um passeio a dois, sem pressa nenhuma', tag: 'tempo_qualidade' },
      { texto: 'Ganhar um mimo inesperado', tag: 'presentes' },
      { texto: 'Ver o parceiro(a) cuidando de uma tarefa da casa sem você pedir', tag: 'atos_servico' },
      { texto: 'Ficar de conchinha o dia inteiro', tag: 'toque_fisico' },
      { texto: 'Uma tarde de risadas e brincadeiras', tag: 'neutro' }
    ]
  },
  {
    id: 'LIN10',
    categoria: 'linguagem_amor',
    tipo: 'multipla_escolha',
    texto: 'Quando quer demonstrar amor pro seu parceiro(a), o que você faz naturalmente?',
    opcoes: [
      { texto: 'Digo com palavras o quanto amo e admiro', tag: 'palavras_afirmacao' },
      { texto: 'Reservo um tempo só pra gente', tag: 'tempo_qualidade' },
      { texto: 'Dou um presente ou mimo', tag: 'presentes' },
      { texto: 'Faço algo prático por ele(a)', tag: 'atos_servico' },
      { texto: 'Busco contato físico, abraço, carinho', tag: 'toque_fisico' },
      { texto: 'Tento fazer o outro rir, aliviar o clima', tag: 'neutro' }
    ]
  },
  {
    id: 'LIN11',
    categoria: 'linguagem_amor',
    tipo: 'escala',
    texto: 'De 1 a 5, o quanto receber elogios e palavras carinhosas é importante pra você se sentir amado(a).',
    escala: {
      min: 1,
      max: 5,
      min_label: 'Quase não faz diferença',
      max_label: 'Faz toda a diferença'
    },
    dimensao: 'palavras_afirmacao'
  },
  {
    id: 'LIN12',
    categoria: 'linguagem_amor',
    tipo: 'escala',
    texto: 'De 1 a 5, o quanto contato físico (abraço, mão dada, carinho) é importante pra você se sentir amado(a).',
    escala: {
      min: 1,
      max: 5,
      min_label: 'Quase não faz diferença',
      max_label: 'Faz toda a diferença'
    },
    dimensao: 'toque_fisico'
  },

  // ==========================================
  // VALORES & VIDA A DOIS
  // ==========================================
  {
    id: 'VAL01',
    categoria: 'valores_vida',
    subcategoria: 'valores',
    tipo: 'selecao_multipla',
    max_selecoes: 5,
    texto: 'Quais desses valores você diria que são os mais importantes pra guiar sua vida hoje? (escolha até 5)',
    opcoes: [
      { texto: 'Honestidade' }, { texto: 'Lealdade' }, { texto: 'Liberdade' },
      { texto: 'Família' }, { texto: 'Fé / espiritualidade' }, { texto: 'Ambição e crescimento' },
      { texto: 'Respeito' }, { texto: 'Generosidade' }, { texto: 'Autenticidade' }, { texto: 'Segurança' }
    ]
  },
  {
    id: 'VAL02',
    categoria: 'valores_vida',
    subcategoria: 'condutas_inegociaveis',
    tipo: 'selecao_multipla',
    max_selecoes: 5,
    texto: 'Quais dessas atitudes você considera completamente inegociáveis numa relação — motivo real de ruptura? (escolha até 5)',
    opcoes: [
      { texto: 'Traição física' }, { texto: 'Mentira constante' }, { texto: 'Agressão física ou verbal' },
      { texto: 'Desrespeito com a minha família' }, { texto: 'Falta de parceria financeira' },
      { texto: 'Vício não tratado' }, { texto: 'Desonestidade sobre o passado' },
      { texto: 'Falta de comunicação básica' }, { texto: 'Desrespeito aos meus limites pessoais' },
      { texto: 'Ausência total de apoio emocional' }
    ]
  },
  {
    id: 'VAL03',
    categoria: 'valores_vida',
    subcategoria: 'sonhos',
    tipo: 'selecao_multipla',
    max_selecoes: 5,
    texto: 'Dos sonhos abaixo, quais são os que mais mexem com você quando imagina seu futuro? (escolha até 5)',
    opcoes: [
      { texto: 'Ter uma casa própria' }, { texto: 'Viajar o mundo' }, { texto: 'Montar meu próprio negócio' },
      { texto: 'Construir uma família grande' }, { texto: 'Alcançar estabilidade financeira' },
      { texto: 'Ter uma carreira reconhecida' }, { texto: 'Viver de forma mais simples e tranquila' },
      { texto: 'Morar no exterior' }, { texto: 'Ter tempo livre pros meus hobbies' },
      { texto: 'Deixar um legado, ajudar outras pessoas' }
    ]
  },
  {
    id: 'VAL04',
    categoria: 'valores_vida',
    subcategoria: 'filhos',
    tipo: 'multipla_escolha',
    texto: 'Sobre ter filhos, o que mais descreve como você pensa hoje?',
    opcoes: [
      { texto: 'Quero, o quanto antes' }, { texto: 'Quero, mas sem pressa' },
      { texto: 'Quero, só depois de estabilidade financeira' }, { texto: 'Ainda não tenho certeza' },
      { texto: 'Prefiro não ter filhos biológicos, mas topo adoção' }, { texto: 'Não quero ter filhos' },
      { texto: 'Depende muito do que meu parceiro(a) sentir' }, { texto: 'Ainda estou processando essa decisão' }
    ]
  },
  {
    id: 'VAL05',
    categoria: 'valores_vida',
    subcategoria: 'quantos_filhos',
    tipo: 'multipla_escolha',
    texto: 'Se pensar num número, quantos filhos fariam sentido pro seu sonho de família?',
    opcoes: [
      { texto: 'Nenhum' }, { texto: '1' }, { texto: '2' }, { texto: '3' }, { texto: '4 ou mais' },
      { texto: 'Não faço ideia ainda' }, { texto: 'Prefiro adotar ao invés de definir um número' }
    ]
  },
  {
    id: 'VAL06',
    categoria: 'valores_vida',
    subcategoria: 'moradia',
    tipo: 'selecao_multipla',
    max_selecoes: 5,
    texto: 'Se pudesse escolher hoje onde construir sua vida, o que mais combinaria com você? (escolha até 5)',
    opcoes: [
      { texto: 'Uma cidade grande e agitada' }, { texto: 'Uma cidade do interior, mais calma' },
      { texto: 'O campo, longe da correria' }, { texto: 'Uma casa com quintal' },
      { texto: 'Um apartamento prático' }, { texto: 'Vitória, perto da família' },
      { texto: 'Fortaleza, perto da família' }, { texto: 'Outro estado ou país, começando do zero' },
      { texto: 'Onde meu parceiro(a) estiver — o lugar importa menos' }, { texto: 'Ainda não tenho uma resposta clara' }
    ]
  },
  {
    id: 'VAL07',
    categoria: 'valores_vida',
    subcategoria: 'cuidado_idosos',
    tipo: 'selecao_multipla',
    max_selecoes: 5,
    texto: 'Como você imagina que deveria ser o cuidado com os pais quando eles ficarem idosos? (escolha até 5)',
    opcoes: [
      { texto: 'Morar perto pra poder ajudar no dia a dia' }, { texto: 'Trazer pra morar com a gente' },
      { texto: 'Contratar cuidador(a) de confiança, mesmo morando perto' },
      { texto: 'Uma casa de repouso de qualidade, se for o melhor pra eles' },
      { texto: 'Dividir a responsabilidade entre os irmãos igualmente' },
      { texto: 'Assumir a maior parte da responsabilidade, mesmo com custo pessoal' },
      { texto: 'Ainda não parei pra pensar nisso' },
      { texto: 'Prefiro conversar sobre isso com a família com antecedência' },
      { texto: 'Depende muito da situação financeira na época' }
    ]
  },
  {
    id: 'VAL08',
    categoria: 'valores_vida',
    subcategoria: 'financas',
    tipo: 'selecao_multipla',
    max_selecoes: 5,
    texto: 'Sobre dinheiro no relacionamento, o que mais combina com você? (escolha até 5)',
    opcoes: [
      { texto: 'Conta conjunta pra tudo' }, { texto: 'Contas separadas, cada um paga sua parte' },
      { texto: 'Conta conjunta só pras despesas da casa' }, { texto: 'Quem ganha mais deveria contribuir mais' },
      { texto: 'Prefiro decidir isso mais pra frente' }, { texto: 'Dividir tudo sempre 50/50' },
      { texto: 'Um cuida das finanças, o outro confia' }, { texto: 'Ainda não conversamos sobre isso a fundo' }
    ]
  },
  {
    id: 'VAL09',
    categoria: 'valores_vida',
    subcategoria: 'fe',
    tipo: 'selecao_multipla',
    max_selecoes: 5,
    texto: 'Qual o papel da fé ou espiritualidade na vida que você imagina construir? (escolha até 5)',
    opcoes: [
      { texto: 'Central — quero viver e criar filhos dentro de uma fé' },
      { texto: 'Importante, mas de forma leve, sem rigidez' }, { texto: 'Respeito, mas não pratico' },
      { texto: 'Ainda estou em busca, sem definição' }, { texto: 'Não faz parte da minha vida' },
      { texto: 'Importante, desde que o casal compartilhe a mesma fé' },
      { texto: 'Cada um pode ter sua crença, sem problema' }, { texto: 'Prefiro não opinar sobre isso agora' }
    ]
  },
  {
    // Não faz sentido pro uso pessoal de Tamyris e Saulo agora — fica
    // desativada (não entra no banco ativo) mas guardada aqui pronta pra
    // uma futura versão comercial/multi-casal do app.
    id: 'VAL10',
    categoria: 'valores_vida',
    subcategoria: 'tempo_noivado',
    tipo: 'multipla_escolha',
    ativa: false,
    texto: 'Sobre o tempo entre noivado e casamento, o que faz mais sentido pra você?',
    opcoes: [
      { texto: 'O quanto antes, não vejo motivo pra esperar' }, { texto: 'Cerca de 1 ano, tempo de organizar bem' },
      { texto: 'Entre 1 e 2 anos' }, { texto: 'Mais de 2 anos, sem pressa nenhuma' },
      { texto: 'Depende só da parte financeira estar resolvida' }, { texto: 'Prefiro morar junto antes de casar' },
      { texto: 'Ainda não tenho uma opinião formada' }
    ]
  },
  {
    id: 'VAL11',
    categoria: 'valores_vida',
    subcategoria: 'tarefas_casa',
    tipo: 'selecao_multipla',
    max_selecoes: 5,
    texto: 'Como você imagina a divisão das tarefas de casa no dia a dia? (escolha até 5)',
    opcoes: [
      { texto: 'Dividido igualmente, sem exceção' }, { texto: 'Cada um assume o que tem mais facilidade' },
      { texto: 'Quem trabalha menos horas assume mais tarefas' }, { texto: 'Contratar ajuda sempre que possível' },
      { texto: 'Um cuida da casa, o outro do financeiro' }, { texto: 'Revezando por semana' },
      { texto: 'Ainda não parei pra pensar nisso' }, { texto: 'O importante é conversar e ajustar conforme a fase' }
    ]
  },
  {
    id: 'VAL12',
    categoria: 'valores_vida',
    subcategoria: 'casamento',
    tipo: 'selecao_multipla',
    max_selecoes: 5,
    texto: 'Se fosse pensar no dia do casamento hoje, o que mais combina com você? (escolha até 5)',
    opcoes: [
      { texto: 'Uma festa grande, com todo mundo que amamos' }, { texto: 'Algo pequeno e íntimo, só os mais próximos' },
      { texto: 'Simples no civil, sem grande cerimônia' }, { texto: 'Uma celebração ao ar livre, fora do convencional' },
      { texto: 'Uma cerimônia religiosa tradicional' }, { texto: 'Uma viagem só nós dois, no lugar da festa' },
      { texto: 'Ainda não pensei sobre isso' }, { texto: 'Depende do que fizer sentido financeiramente na época' }
    ]
  },

  // ==========================================
  // CONHECER MELHOR
  // ==========================================
  {
    id: 'CON01',
    categoria: 'conhecer_melhor',
    tipo: 'selecao_multipla',
    max_selecoes: 5,
    texto: 'O que seu parceiro(a) faz que faz seu coração se aquecer? (escolha até 5)',
    // tag = qual linguagem do amor esse gesto representa (usado pro cruzamento
    // de "o que o parceiro já faz hoje" vs "o que a pessoa mais precisa")
    opcoes: [
      { texto: 'Elogia e valoriza o que eu faço', tag: 'palavras_afirmacao' },
      { texto: 'Separa um tempo só pra mim, sem distrações', tag: 'tempo_qualidade' },
      { texto: 'Me surpreende com pequenos mimos', tag: 'presentes' },
      { texto: 'Resolve algo por mim sem eu pedir', tag: 'atos_servico' },
      { texto: 'Me abraça e busca contato físico', tag: 'toque_fisico' },
      { texto: 'Ri das minhas piadas, mesmo quando não são tão boas', tag: 'neutro' },
      { texto: 'Me apoia nas minhas decisões, mesmo discordando', tag: 'neutro' },
      { texto: 'Puxa assunto sobre meu dia com interesse genuíno', tag: 'tempo_qualidade' }
    ]
  },
  {
    // Separada da antiga "se afastar ou se fechar" — são reações
    // diferentes (uma é dar mais distância no dia a dia, a outra é fechar
    // por dentro/ficar na defensiva), então viraram duas perguntas.
    id: 'CON02',
    categoria: 'conhecer_melhor',
    tipo: 'selecao_multipla',
    max_selecoes: 5,
    texto: 'O que faz você se afastar numa relação — dar mais distância no dia a dia? (escolha até 5)',
    // tag = ferida da infância mais associada a esse gatilho (usado pros
    // "cuidados por ferida" no cruzamento de dados)
    opcoes: [
      { texto: 'Sentir que não estou sendo ouvido(a)', tag: 'rejeicao' },
      { texto: 'Perceber que só eu estou correndo atrás', tag: 'abandono' },
      { texto: 'Falta de atenção no dia a dia', tag: 'abandono' },
      { texto: 'Sentir que estou sozinho(a) nas decisões', tag: 'injustica' },
      { texto: 'Perceber desinteresse repetido pelo que eu conto', tag: 'rejeicao' },
      { texto: 'Comparações com outras pessoas', tag: 'rejeicao' },
      { texto: 'Promessas que não se cumprem', tag: 'traicao' },
      { texto: 'Sentir que meu espaço não é respeitado', tag: 'neutro' }
    ]
  },
  {
    id: 'CON03',
    categoria: 'conhecer_melhor',
    tipo: 'selecao_multipla',
    max_selecoes: 5,
    texto: 'O que te faz sentir amado(a) de verdade, na prática do dia a dia? (escolha até 5)',
    // tag = mesma linguagem do amor do bloco LIN — este é o 2º sinal direto
    // (o 3º é o teste de 10 perguntas) usado pra triangular a confiança
    opcoes: [
      { texto: 'Ouvir palavras carinhosas com frequência', tag: 'palavras_afirmacao' },
      { texto: 'Ter tempo de qualidade garantido', tag: 'tempo_qualidade' },
      { texto: 'Receber gestos e mimos inesperados', tag: 'presentes' },
      { texto: 'Ver o parceiro(a) se esforçando nas tarefas do dia a dia', tag: 'atos_servico' },
      { texto: 'Sentir contato físico e carinho', tag: 'toque_fisico' },
      { texto: 'Ser incluído(a) nos planos e decisões', tag: 'neutro' },
      { texto: 'Ser ouvido(a) sem julgamento', tag: 'neutro' },
      { texto: 'Ser apoiado(a) na frente de outras pessoas', tag: 'neutro' }
    ]
  },
  {
    id: 'CON04',
    categoria: 'conhecer_melhor',
    tipo: 'aberta',
    texto: 'Qual é a sua comida favorita — aquela que nunca enjoa?'
  },
  {
    id: 'CON05',
    categoria: 'conhecer_melhor',
    tipo: 'aberta',
    texto: 'E a sua sobremesa favorita, aquela capaz de salvar qualquer dia ruim?'
  },
  {
    id: 'CON06',
    categoria: 'conhecer_melhor',
    tipo: 'aberta',
    texto: 'Como você se imagina daqui a 1 ano — na vida pessoal, no trabalho, no relacionamento?'
  },
  {
    id: 'CON07',
    categoria: 'conhecer_melhor',
    tipo: 'aberta',
    texto: 'E daqui a 5 anos, onde você se vê?'
  },
  {
    id: 'CON08',
    categoria: 'conhecer_melhor',
    tipo: 'selecao_multipla',
    max_selecoes: 5,
    texto: 'Quais desses programas descrevem seu lazer favorito ao lado do parceiro(a)? (escolha até 5)',
    opcoes: [
      { texto: 'Maratonar séries e filmes' }, { texto: 'Sair pra comer fora' }, { texto: 'Viajar pra lugares novos' },
      { texto: 'Praticar esporte ou atividade física juntos' }, { texto: 'Ficar em casa jogando ou cozinhando' },
      { texto: 'Sair com amigos em grupo' }, { texto: 'Simplesmente conversar, sem pressa' }
    ]
  },
  {
    id: 'CON09',
    categoria: 'conhecer_melhor',
    tipo: 'selecao_multipla',
    max_selecoes: 5,
    texto: 'Se pudessem aprender uma habilidade nova juntos, quais te interessariam? (escolha até 5)',
    opcoes: [
      { texto: 'Dançar' }, { texto: 'Cozinhar pratos novos' }, { texto: 'Um idioma' }, { texto: 'Um instrumento musical' },
      { texto: 'Algum esporte' }, { texto: 'Artesanato ou pintura' }, { texto: 'Meditação ou yoga' },
      { texto: 'Algo sobre investir e cuidar das finanças' }
    ]
  },
  {
    id: 'CON10',
    categoria: 'conhecer_melhor',
    tipo: 'selecao_multipla',
    max_selecoes: 5,
    texto: 'Quais desses combinariam mais com a vida de vocês? (escolha até 5)',
    opcoes: [
      { texto: 'Ter um cachorro' }, { texto: 'Ter um gato' },
      { texto: 'Um peixe ou aquário' }, { texto: 'Nenhum, prefiro plantas' }, { texto: 'Um pássaro' },
      { texto: 'Algo mais exótico, tipo réptil' }
    ]
  },
  {
    id: 'CON11',
    categoria: 'conhecer_melhor',
    tipo: 'aberta',
    texto: 'Qual foi a lembrança mais marcante que vocês já viveram juntos até hoje?'
  },
  {
    id: 'CON12',
    categoria: 'conhecer_melhor',
    tipo: 'aberta',
    texto: 'O que você mais admira no seu parceiro(a) — algo que talvez ele(a) nem saiba que você percebe?'
  },
  {
    id: 'CON13',
    categoria: 'conhecer_melhor',
    tipo: 'aberta',
    texto: 'Como seria o seu "dia perfeito" com seu parceiro(a), do início ao fim?'
  },
  {
    id: 'CON14',
    categoria: 'conhecer_melhor',
    tipo: 'aberta',
    texto: 'Existe alguma música que, quando toca, te faz pensar imediatamente no seu parceiro(a) ou no relacionamento de vocês? Qual e por quê?'
  },
  {
    id: 'CON15',
    categoria: 'conhecer_melhor',
    tipo: 'aberta',
    texto: 'Se pudesse escrever uma frase que resume o que você deseja para esse relacionamento, qual seria?'
  },
  {
    // A outra metade da antiga CON02 — "se fechar" é diferente de "se
    // afastar": aqui é sobre ficar na defensiva / guardar o que sente,
    // não sobre criar distância física no dia a dia.
    id: 'CON16',
    categoria: 'conhecer_melhor',
    tipo: 'selecao_multipla',
    max_selecoes: 5,
    texto: 'O que faz você se fechar numa relação — ficar na defensiva ou guardar o que sente? (escolha até 5)',
    opcoes: [
      { texto: 'Brigas que viram gritaria', tag: 'humilhacao' },
      { texto: 'Críticas em público', tag: 'humilhacao' },
      { texto: 'Sentir que serei julgado(a) pelo que sinto', tag: 'humilhacao' },
      { texto: 'Medo de que usem isso contra mim depois', tag: 'traicao' },
      { texto: 'Silêncio prolongado depois de uma briga', tag: 'abandono' },
      { texto: 'Sentir que meus sentimentos são minimizados', tag: 'rejeicao' },
      { texto: 'Já ter me magoado por me abrir antes', tag: 'traicao' },
      { texto: 'Prefiro processar sozinho(a) antes de falar', tag: 'neutro' }
    ]
  }
];

const questions = allQuestions.filter((q) => q.ativa !== false);

module.exports = questions;
module.exports.all = allQuestions;
