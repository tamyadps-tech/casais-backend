// ESPELHO — ferramenta individual, 100% estática (roda inteira no navegador,
// sem servidor, sem salvar nada em lugar nenhum além do aparelho de quem
// responde). Reaproveita as mesmas 39 perguntas de temperamento, apego e
// feridas de infância do app de casais (mesmo texto, mesmas tags de
// pontuação), só que sem precisar de parceiro(a) nem de conta.

const QUESTIONS = [
  // ---------- temperamento ----------
  {
    id: 'TEM01', categoria: 'temperamento', tipo: 'multipla_escolha',
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
    id: 'TEM02', categoria: 'temperamento', tipo: 'multipla_escolha',
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
    id: 'TEM03', categoria: 'temperamento', tipo: 'multipla_escolha',
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
    id: 'TEM04', categoria: 'temperamento', tipo: 'multipla_escolha',
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
    id: 'TEM05', categoria: 'temperamento', tipo: 'multipla_escolha',
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
    id: 'TEM06', categoria: 'temperamento', tipo: 'multipla_escolha',
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
    id: 'TEM07', categoria: 'temperamento', tipo: 'multipla_escolha',
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
    id: 'TEM08', categoria: 'temperamento', tipo: 'multipla_escolha',
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
    id: 'TEM09', categoria: 'temperamento', tipo: 'multipla_escolha',
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
    id: 'TEM10', categoria: 'temperamento', tipo: 'multipla_escolha',
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
    id: 'TEM11', categoria: 'temperamento', tipo: 'escala',
    texto: 'De 1 a 5, o quanto você se irrita rápido quando algo sai do seu controle.',
    escala: { min: 1, max: 5, min_label: 'Quase nada me tira do sério', max_label: 'Exploto fácil quando perco o controle da situação' },
    dimensao: 'colerico'
  },
  {
    id: 'TEM12', categoria: 'temperamento', tipo: 'escala',
    texto: 'De 1 a 5, o quanto você precisa de tempo sozinho(a) pra processar as coisas antes de falar sobre elas.',
    escala: { min: 1, max: 5, min_label: 'Falo na hora, não preciso processar', max_label: 'Preciso de bastante tempo em silêncio antes de conseguir colocar em palavras' },
    dimensao: 'melancolico'
  },

  // ---------- apego ----------
  {
    id: 'APE01', categoria: 'apego', tipo: 'multipla_escolha',
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
    id: 'APE02', categoria: 'apego', tipo: 'multipla_escolha',
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
    id: 'APE03', categoria: 'apego', tipo: 'multipla_escolha',
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
    id: 'APE04', categoria: 'apego', tipo: 'multipla_escolha',
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
    id: 'APE05', categoria: 'apego', tipo: 'multipla_escolha',
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
    id: 'APE06', categoria: 'apego', tipo: 'multipla_escolha',
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
    id: 'APE07', categoria: 'apego', tipo: 'multipla_escolha',
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
    id: 'APE08', categoria: 'apego', tipo: 'multipla_escolha',
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
    id: 'APE09', categoria: 'apego', tipo: 'multipla_escolha',
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
    id: 'APE10', categoria: 'apego', tipo: 'multipla_escolha',
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
    id: 'APE11', categoria: 'apego', tipo: 'escala',
    texto: 'De 1 a 5, o quanto você sente necessidade de confirmação constante de que é amado(a).',
    escala: { min: 1, max: 5, min_label: 'Quase nenhuma — confio sem precisar de provas', max_label: 'Muita — preciso sentir isso o tempo todo' },
    dimensao: 'ansioso'
  },
  {
    id: 'APE12', categoria: 'apego', tipo: 'escala',
    texto: 'De 1 a 5, o quanto é fácil pra você se abrir emocionalmente com o parceiro(a).',
    escala: { min: 1, max: 5, min_label: 'Muito difícil — prefiro guardar pra mim', max_label: 'Muito fácil — me abro sem medo' },
    dimensao: 'evitativo', inverso: true
  },
  {
    id: 'APE13', categoria: 'apego', tipo: 'escala',
    texto: 'De 1 a 5, o quanto discussões de relacionamento mexem com seu sono ou seu apetite.',
    escala: { min: 1, max: 5, min_label: 'Nada — sigo minha rotina normal', max_label: 'Muito — fico afetado(a) fisicamente' },
    dimensao: 'ansioso'
  },
  {
    id: 'APE14', categoria: 'apego', tipo: 'escala',
    texto: 'De 1 a 5, o quanto você se identifica com se aproximar e se afastar das pessoas sem entender totalmente por quê.',
    escala: { min: 1, max: 5, min_label: 'Nunca me identifico com isso', max_label: 'Me identifico muito com isso' },
    dimensao: 'desorganizado'
  },

  // ---------- feridas da infância ----------
  {
    id: 'FER01', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
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
    id: 'FER02', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
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
    id: 'FER03', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
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
    id: 'FER04', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
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
    id: 'FER05', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
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
    id: 'FER06', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
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
    id: 'FER07', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
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
    id: 'FER08', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
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
    id: 'FER09', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
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
    id: 'FER10', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
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
    id: 'FER11', categoria: 'feridas_infancia', tipo: 'escala',
    texto: 'De 1 a 5, o quanto você sente medo de ser abandonado(a) pelas pessoas que ama.',
    escala: { min: 1, max: 5, min_label: 'Quase nenhum', max_label: 'Um medo bem presente' },
    dimensao: 'abandono'
  },
  {
    id: 'FER12', categoria: 'feridas_infancia', tipo: 'escala',
    texto: 'De 1 a 5, o quanto situações de injustiça (mesmo pequenas) mexem muito com você.',
    escala: { min: 1, max: 5, min_label: 'Quase não me afetam', max_label: 'Me afetam profundamente' },
    dimensao: 'injustica'
  },
  {
    id: 'FER13', categoria: 'feridas_infancia', tipo: 'escala',
    texto: 'De 1 a 5, o quanto é difícil confiar plenamente em alguém, mesmo quando a pessoa não te deu motivos.',
    escala: { min: 1, max: 5, min_label: 'Confio com facilidade', max_label: 'É muito difícil confiar de verdade' },
    dimensao: 'traicao'
  },

  // ---------- estilo de vida (pra orientação de compatibilidade) ----------
  {
    id: 'EST01', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'Sobre formar família e ter filhos, o que mais representa você hoje?',
    opcoes: [
      { texto: 'Quero muito ser pai/mãe, é uma prioridade clara', tag: 'filhos_sim' },
      { texto: 'Estou aberto(a), mas não é uma urgência', tag: 'filhos_aberto' },
      { texto: 'Prefiro não ter filhos', tag: 'filhos_nao' },
      { texto: 'Já tenho filhos e quero mais', tag: 'filhos_tem_quer_mais' },
      { texto: 'Já tenho filhos e minha família está completa', tag: 'filhos_tem_completo' },
      { texto: 'Ainda estou decidindo sobre isso', tag: 'filhos_indeciso' }
    ]
  },
  {
    id: 'EST02', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'Quando pensa em férias ideais, o que mais combina com você?',
    opcoes: [
      { texto: 'Aventura — trilha, natureza, lugar novo e desafiador', tag: 'ferias_aventura' },
      { texto: 'Descanso total — praia, rede, sem compromisso nenhum', tag: 'ferias_descanso' },
      { texto: 'Cultura — museus, história, gastronomia de um lugar novo', tag: 'ferias_cultura' },
      { texto: 'Perto de casa, com família e amigos por perto', tag: 'ferias_perto' },
      { texto: 'Qualquer lugar, desde que seja com quem eu amo', tag: 'ferias_flexivel' },
      { texto: 'Prefiro economizar a viajar', tag: 'ferias_economizar' }
    ]
  },
  {
    id: 'EST03', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'Sobre dinheiro, qual frase mais parece com você?',
    opcoes: [
      { texto: 'Gosto de planejar tudo, poupar e ter reserva', tag: 'dinheiro_planejador' },
      { texto: 'Vivo mais no presente, gasto com o que me faz feliz agora', tag: 'dinheiro_presente' },
      { texto: 'Falar de dinheiro me deixa desconfortável, prefiro evitar o assunto', tag: 'dinheiro_desconfortavel' },
      { texto: 'Sou bem aberto(a) e direto(a) quando o assunto é dinheiro', tag: 'dinheiro_aberto' },
      { texto: 'Gosto de investir e fazer o dinheiro trabalhar', tag: 'dinheiro_investidor' },
      { texto: 'Ainda estou aprendendo a lidar bem com isso', tag: 'dinheiro_aprendendo' }
    ]
  },
  {
    id: 'EST04', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'Morar perto da sua família é algo que você considera...',
    opcoes: [
      { texto: 'Muito importante, quero ficar sempre por perto', tag: 'familia_perto_essencial' },
      { texto: 'Importante, mas não abriria mão de uma boa oportunidade por isso', tag: 'familia_perto_flexivel' },
      { texto: 'Pouco importante, prefiro seguir onde a vida me levar', tag: 'familia_perto_baixo' },
      { texto: 'Já moro longe e está tudo bem assim', tag: 'familia_longe_ok' },
      { texto: 'Prefiro morar longe, por opção mesmo', tag: 'familia_longe_opcao' },
      { texto: 'Nunca parei pra pensar nisso', tag: 'familia_perto_indefinido' }
    ]
  },
  {
    id: 'EST05', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'Entre ter um lugar fixo e estável ou viver viajando bastante, você se identifica mais com...',
    opcoes: [
      { texto: 'Lugar fixo — gosto de raiz, rotina e um lar bem estabelecido', tag: 'estilo_fixo' },
      { texto: 'Grandes viagens — gosto de me mudar, conhecer, não criar raízes fixas', tag: 'estilo_viajante' },
      { texto: 'Um equilíbrio — uma base fixa, com viagens frequentes', tag: 'estilo_equilibrado' },
      { texto: 'Depende muito da fase da vida', tag: 'estilo_depende' },
      { texto: 'Ainda não vivi o suficiente pra saber o que prefiro', tag: 'estilo_indefinido' },
      { texto: 'Gostaria de viajar mais, mas hoje não é possível', tag: 'estilo_deseja_viajar' }
    ]
  },
  {
    id: 'EST06', categoria: 'estilo_vida', tipo: 'selecao_multipla', max_selecoes: 3,
    texto: 'Quais desses sonhos mais representam o que você imagina pra sua vida? (escolha até 3)',
    opcoes: [
      { texto: 'Ter um negócio ou projeto próprio', tag: 'sonho_empreender' },
      { texto: 'Construir uma família grande e unida', tag: 'sonho_familia' },
      { texto: 'Morar em outro país ou cidade', tag: 'sonho_morar_fora' },
      { texto: 'Ter estabilidade financeira e paz', tag: 'sonho_estabilidade' },
      { texto: 'Viajar o mundo', tag: 'sonho_viajar' },
      { texto: 'Deixar um legado — em arte, trabalho ou comunidade', tag: 'sonho_legado' }
    ]
  },
  {
    id: 'EST07', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'Sobre fé ou espiritualidade, o que mais representa você?',
    opcoes: [
      { texto: 'Central na minha vida, organizo minha rotina em torno disso', tag: 'fe_central' },
      { texto: 'Importante, mas vivida de um jeito mais pessoal e leve', tag: 'fe_pessoal' },
      { texto: 'Respeito quem tem fé, mas não é algo que eu pratico', tag: 'fe_respeito' },
      { texto: 'Não faz parte da minha vida', tag: 'fe_nao' },
      { texto: 'Estou em busca, ainda sem definição', tag: 'fe_busca' },
      { texto: 'Prefiro não falar sobre isso', tag: 'fe_prefere_nao_falar' }
    ]
  },
  {
    id: 'EST08', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'Sobre sair, balada e festas, o que mais representa você hoje?',
    opcoes: [
      { texto: 'Adoro, vou sempre que posso', tag: 'social_ama' },
      { texto: 'Gosto, mas com moderação — de vez em quando está ótimo', tag: 'social_moderado' },
      { texto: 'Prefiro encontros pequenos e tranquilos a festas grandes', tag: 'social_intimo' },
      { texto: 'Não é mais algo que me atrai muito', tag: 'social_baixo' },
      { texto: 'Nunca fui muito de balada, prefiro outros programas', tag: 'social_nao' },
      { texto: 'Depende muito da companhia', tag: 'social_depende' }
    ]
  },
  {
    id: 'EST09', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'Sobre rotina no dia a dia, você se sente mais...',
    opcoes: [
      { texto: 'Estruturado(a) — gosto de plano, horário, previsibilidade', tag: 'rotina_estruturado' },
      { texto: 'Espontâneo(a) — prefiro decidir na hora, sem plano fixo', tag: 'rotina_espontaneo' },
      { texto: 'Um equilíbrio — gosto de alguma estrutura, com espaço pro imprevisto', tag: 'rotina_equilibrado' },
      { texto: 'Depende muito da fase da vida', tag: 'rotina_depende' },
      { texto: 'Gostaria de ter mais rotina do que tenho hoje', tag: 'rotina_deseja_mais' },
      { texto: 'Gostaria de ter menos rotina do que tenho hoje', tag: 'rotina_deseja_menos' }
    ]
  },
  {
    id: 'EST10', categoria: 'estilo_vida', tipo: 'selecao_multipla', max_selecoes: 4,
    texto: 'Do que você mais gosta no tempo livre? (escolha até 4)',
    opcoes: [
      { texto: 'Leitura', tag: 'gosta_leitura' },
      { texto: 'Esportes ou atividade física', tag: 'gosta_esportes' },
      { texto: 'Arte, música ou cinema', tag: 'gosta_arte' },
      { texto: 'Natureza e ar livre', tag: 'gosta_natureza' },
      { texto: 'Tecnologia e games', tag: 'gosta_tecnologia' },
      { texto: 'Cozinhar ou gastronomia', tag: 'gosta_gastronomia' }
    ]
  },
  {
    id: 'EST11', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'Sobre o hábito de leitura, o que mais representa você?',
    opcoes: [
      { texto: 'Leio bastante, é parte da minha rotina', tag: 'leitura_muita' },
      { texto: 'Leio de vez em quando, quando um livro me chama atenção', tag: 'leitura_as_vezes' },
      { texto: 'Prefiro outros formatos (podcast, vídeo, áudio) a ler', tag: 'leitura_outros_formatos' },
      { texto: 'Não é um hábito meu hoje, mas gostaria que fosse', tag: 'leitura_deseja' },
      { texto: 'Não curto muito ler, e tudo bem com isso', tag: 'leitura_nao' },
      { texto: 'Leio bastante, mas mais por trabalho ou estudo do que por prazer', tag: 'leitura_funcional' }
    ]
  }
];

// Opção universal de "pular sem chutar", igual ao app de casais — some
// que toda pergunta de múltipla/seleção precise ter uma opção "escape",
// evitando resposta forçada quando o tema não se aplica ou a pessoa não
// sabe. Injetada automaticamente aqui em vez de repetida em cada pergunta.
const NAO_SEI_TEXTO = 'Não sei / não se aplica';
QUESTIONS.forEach((q) => {
  if (q.tipo === 'multipla_escolha' || q.tipo === 'selecao_multipla') {
    q.opcoes.push({ texto: NAO_SEI_TEXTO, tag: 'neutro' });
  }
});

// ---------- "tipo de parceiro(a) ideal" — só compatibilidade comportamental ----------
// Cada tag de estilo de vida (EST01-11) aponta pra uma frase descrevendo
// uma característica de quem tende a combinar bem, no dia a dia, com
// alguém desse perfil. Isso NÃO é compatibilidade emocional/profunda —
// só estilo de vida e comportamento (ver o texto de abertura da seção).
const TAG_TO_PARCEIRO_IDEAL = {
  filhos_sim: 'quer ser pai/mãe também, ou pelo menos está genuinamente aberto(a) a essa possibilidade — não dá pra multiplicar um sonho desses sozinho(a)',
  filhos_aberto: 'não trata o tema filhos como um ultimato, e topa construir essa decisão junto, no tempo certo',
  filhos_nao: 'também não deseja ter filhos, ou pelo menos respeita profundamente que essa escolha continue sendo sua',
  filhos_tem_quer_mais: 'abraça de coração os filhos que você já tem e também deseja aumentar a família',
  filhos_tem_completo: 'entende e celebra que sua família, do jeito que está, já é completa',
  filhos_indeciso: 'tem paciência pra essa decisão amadurecer junto, sem pressionar um lado ou outro',

  ferias_aventura: 'topa sair da zona de conforto com você, sem precisar de conforto garantido o tempo todo',
  ferias_descanso: 'sabe desacelerar de verdade ao seu lado, sem transformar toda pausa numa maratona de passeios',
  ferias_cultura: 'gosta de aprender e se encantar com lugares novos tanto quanto você',
  ferias_perto: 'valoriza os mesmos momentos simples perto de quem vocês amam',
  ferias_flexivel: 'não faz do destino um problema — o que importa pra ele(a) também é a companhia',
  ferias_economizar: 'compartilha sua prioridade por estabilidade financeira, mesmo quando isso significa abrir mão de um passeio',

  dinheiro_planejador: 'também valoriza planejamento e segurança financeira, sem tratar isso como frieza',
  dinheiro_presente: 'entende seu jeito mais leve com dinheiro sem te julgar por isso',
  dinheiro_desconfortavel: 'tem paciência pra construir junto com você a coragem de falar sobre esse assunto',
  dinheiro_aberto: 'também consegue ser direto(a) e transparente sobre dinheiro, sem rodeio nem vergonha',
  dinheiro_investidor: 'compartilha o interesse por fazer o dinheiro do casal crescer, com responsabilidade',
  dinheiro_aprendendo: 'topa aprender junto com você, sem cobrança, esse tipo de conversa',

  familia_perto_essencial: 'entende e valoriza o quanto sua família de origem importa pra você',
  familia_perto_flexivel: 'consegue equilibrar com você a proximidade da família e as oportunidades que a vida trouxer',
  familia_perto_baixo: 'não faz da distância da família um problema, e apoia aonde a vida levar vocês',
  familia_longe_ok: 'está em paz com a distância física da família, assim como você',
  familia_longe_opcao: 'entende que essa é uma escolha sua consciente, não uma perda a ser lamentada',
  familia_perto_indefinido: 'tem paciência pra essa resposta amadurecer junto com o tempo',

  estilo_fixo: 'também valoriza raiz, estabilidade e um lar bem construído',
  estilo_viajante: 'compartilha essa vontade de se mover, de não se prender a um único lugar',
  estilo_equilibrado: 'busca o mesmo equilíbrio entre ter uma base e viver novidades',
  estilo_depende: 'consegue se adaptar com você, fase a fase, sem rigidez',
  estilo_indefinido: 'topa descobrir isso ao seu lado, sem pressa',
  estilo_deseja_viajar: 'entende esse desejo represado e ajuda a abrir espaço pra ele, quando for possível',

  sonho_empreender: 'apoia (ou compartilha) sua vontade de construir algo próprio',
  sonho_familia: 'também sonha com uma família grande e unida, e investe nisso de verdade',
  sonho_morar_fora: 'está aberto(a) à ideia de recomeçar em outro lugar com você',
  sonho_estabilidade: 'valoriza paz e estabilidade tanto quanto você',
  sonho_viajar: 'tem esse mesmo apetite por conhecer o mundo',
  sonho_legado: 'entende a importância de deixar algo maior que o presente, e te ajuda a construir isso',

  fe_central: 'compartilha ou respeita profundamente o lugar central que a fé ocupa na sua vida',
  fe_pessoal: 'entende sua espiritualidade mais pessoal, sem exigir que ela caiba num formato fixo',
  fe_respeito: 'trata sua fé (ou a ausência dela) com respeito genuíno, sem tentar te converter a nada',
  fe_nao: 'não faz da fé um ponto de pressão ou cobrança na relação',
  fe_busca: 'tem paciência pra caminhar com você enquanto essa busca ainda está em aberto',
  fe_prefere_nao_falar: 'respeita esse limite, sem forçar a conversa antes da hora',

  social_ama: 'gosta de sair e curtir a vida social tanto quanto você',
  social_moderado: 'topa equilibrar com você os momentos de festa e os de calma',
  social_intimo: 'prefere, como você, encontros pequenos e verdadeiros a agito grande',
  social_baixo: 'não cobra uma vida social agitada que já não combina mais com você',
  social_nao: 'tem outros programas favoritos que combinam com os seus',
  social_depende: 'entende que a companhia importa mais que o programa em si, assim como você',

  rotina_estruturado: 'também se sente bem com plano e previsibilidade, sem achar isso chato',
  rotina_espontaneo: 'gosta de decidir na hora tanto quanto você, sem se sentir perdido(a) sem roteiro',
  rotina_equilibrado: 'busca o mesmo meio-termo entre estrutura e espontaneidade',
  rotina_depende: 'se adapta com você, sem exigir uma rotina fixa demais',
  rotina_deseja_mais: 'te ajuda a construir mais estrutura, sem cobrar isso como fraqueza sua',
  rotina_deseja_menos: 'te ajuda a soltar um pouco o controle, sem julgar essa vontade',

  gosta_leitura: 'valoriza — ou pelo menos respeita de verdade — seu tempo com um livro',
  gosta_esportes: 'topa se mexer com você, ou pelo menos torce genuinamente pelas suas conquistas físicas',
  gosta_arte: 'se encanta com arte, música ou cinema do jeito que você se encanta',
  gosta_natureza: 'gosta de ar livre e natureza tanto quanto você',
  gosta_tecnologia: 'entende seu interesse por tecnologia e games, sem achar isso perda de tempo',
  gosta_gastronomia: 'compartilha, ou aprecia de verdade, seu gosto por cozinha e gastronomia',

  leitura_muita: 'valoriza e talvez até compartilhe esse seu hábito de leitura constante',
  leitura_as_vezes: 'respeita seu ritmo de leitura, sem cobrar mais do que você já faz por prazer',
  leitura_outros_formatos: 'entende que aprender pode vir de várias formas, não só do livro',
  leitura_deseja: 'te incentiva a criar esse hábito, sem pressa nem cobrança',
  leitura_nao: 'não faz da leitura um critério de valor — te aceita como você é',
  leitura_funcional: 'entende que sua leitura tem propósito prático, e valoriza isso também'
};

// ---------- blocos de texto (montados por combinação, como o phraseBank do app de casais) ----------

const TEMPERAMENTO_BLOCKS = {
  sanguineo: 'Você tem uma energia que contagia — entra numa sala e o clima muda. Isso não é sorte, é temperamento: você se energiza com gente, com novidade, com movimento. Nas relações, isso te torna alguém fácil de amar no início — divertido(a), espontâneo(a), sem meias palavras. O ponto de atenção é a constância: o mesmo entusiasmo que te faz começar mil coisas às vezes te faz sumir antes delas darem fruto, inclusive em conversas difíceis que pedem repetição, não só um momento de coragem. Sua força não é ficar sério(a) o tempo todo — é aprender a manter a chama acesa mesmo quando a novidade já passou.',
  colerico: 'Você decide rápido, fala o que pensa e não tem paciência pra rodeio — isso é raro e valioso, principalmente quando alguém precisa de clareza numa hora de caos. Você provavelmente é a pessoa que os outros procuram quando algo precisa ser resolvido de verdade. Nas relações, essa mesma força pode pesar: sua franqueza, dita rápido demais ou no calor do momento, pode soar como dureza pra quem só queria ser ouvido, não corrigido. Não é sobre parar de ser direto(a) — é sobre escolher o segundo certo pra dizer o que precisa ser dito.',
  melancolico: 'Você sente fundo, pensa fundo, e nota detalhes que a maioria das pessoas passa reto. Essa profundidade é um presente raro numa época que valoriza o rápido e o superficial — você ama com camadas, não com clichês. O risco é a introspecção virar isolamento: processar tanto por dentro que quem está do lado de fora nunca sabe o que está se passando, e interpreta seu silêncio como distância, não como cuidado. Sua tarefa não é sentir menos — é aprender a compartilhar o processo, não só a conclusão.',
  fleumatico: 'Você é o tipo de pessoa que estabiliza o ambiente só por estar nele — calmo(a), paciente, difícil de tirar do sério. Isso é raro, e quem convive com você sente esse chão firme, mesmo sem saber nomear. O outro lado dessa calma é a passividade: evitar todo atrito pode significar que suas próprias necessidades ficam sempre em último lugar, até que um dia elas transbordam de um jeito que ninguém, nem você, esperava. Sua paz não precisa virar silêncio — dá pra se posicionar com a mesma calma que você já tem em tudo mais.'
};

const APEGO_BLOCKS = {
  seguro: 'O psiquiatra John Bowlby, criador da teoria do apego, descreveu como os primeiros vínculos da vida constroem aquilo que ele chamou de "modelo interno de funcionamento" — uma espécie de mapa inconsciente de como esperamos que o amor funcione. O seu mapa, pelo visto, foi desenhado com uma base sólida: você confia com naturalidade, se comunica sem drama e lida com a distância do parceiro(a) sem entrar em pânico. Isso não significa que você nunca se magoa — significa que você se recupera sem precisar de crise. É um dos ativos mais valiosos que alguém pode levar pra uma relação, e provavelmente você nem percebe o quanto isso é raro.',
  ansioso: 'Bowlby e, décadas depois, a psicóloga Mary Ainsworth, mapearam um padrão que se repete: quando o cuidado na infância foi inconsistente — presente às vezes, ausente em outras, imprevisível — a criança aprende a ficar em alerta, monitorando sinais de que o vínculo pode sumir a qualquer momento. Esse alerta não desliga na vida adulta. Ele aparece como a vigilância que você sente quando uma mensagem demora, como a necessidade de confirmação que às vezes parece grande demais pra quem está do outro lado. Não é carência — é um sistema de alarme treinado cedo demais, numa época em que você não tinha escolha. E sistemas de alarme se recalibram, com consciência e com prática.',
  evitativo: 'Existe um padrão de apego, bem descrito na tradição que vem de Bowlby, em que a criança aprende — muitas vezes numa casa onde pedir colo não trazia colo — que a forma mais segura de não sofrer decepção é nunca precisar de ninguém o bastante pra isso doer. Isso te deu uma independência real, quase admirável. O custo é que abrir mão dela, mesmo com quem você ama, pode parecer perigoso, mesmo quando não é. Intimidade não é sua inimiga — é só um território que seu corpo ainda trata como arriscado, por hábito antigo, não por escolha atual.',
  desorganizado: 'Esse é o padrão de apego mais estudado atualmente, porque é o mais contraditório por dentro: uma parte de você busca intimidade com tudo, e outra parte foge dela com a mesma intensidade, quase ao mesmo tempo. Pesquisas ligadas a Bowlby e continuadas por autoras como Mary Main mostram que isso costuma nascer quando a mesma pessoa que deveria ser fonte de segurança também foi, em algum momento, fonte de medo — mesmo sem intenção. Não é indecisão de caráter. É um sistema nervoso que aprendeu duas mensagens opostas ao mesmo tempo e ainda está tentando decidir qual delas é verdade.'
};

const FERIDA_BLOCKS = {
  rejeicao: 'O médico Gabor Maté costuma dizer que trauma não é o que aconteceu com você — é o que aconteceu por dentro, na ausência de alguém que pudesse te ajudar a processar aquilo. Se a ferida de rejeição fala mais alto na sua história, é provável que, em algum momento — talvez com um pai ou mãe fisicamente presente, mas emocionalmente distante, ou indisponível demais pra validar quem você era de verdade — você tenha concluído, cedo, que precisava ser diferente do que era pra ser aceito(a). Isso te fez, talvez, um(a) leitor(a) fino(a) de expectativas alheias — e cansado(a) de tentar alcançá-las. A cura não é parar de se importar com o que os outros pensam. É parar de decidir seu valor a partir disso.',
  abandono: 'Quando a presença de alguém importante — por ausência física, emocional, ou pela imprevisibilidade de estar às vezes lá e às vezes não — não foi constante na infância, o corpo aprende uma lição difícil de desaprender: que amar é, mais cedo ou mais tarde, perder. Isso pode explicar por que você segura tão forte, por que o silêncio do outro lado pesa tanto mais do que deveria pesar num dia normal. Não é fraqueza — é um sistema de proteção bem treinado, que hoje reage a sinais pequenos como se fossem o sinal grande de sempre. A neurociência chama isso de aprendizagem preditiva: o cérebro usa o passado pra prever o futuro, mesmo quando o presente já é diferente.',
  humilhacao: 'Se o que mais dói em você é o julgamento, a exposição, o sentir-se pequeno(a) na frente dos outros, vale perguntar: houve, na sua história, correções feitas em público, comparações constantes, um adulto que ensinava através da vergonha em vez de através do exemplo? O psiquiatra e pesquisador de trauma Bessel van der Kolk descreve, em seu trabalho sobre como o corpo guarda os registros do que vivemos, que vergonha repetida na infância deixa uma marca física, não só emocional — um jeito de encolher, literalmente, diante do julgamento. Você não é excessivamente sensível. Você foi ensinado(a), cedo, a temer ser visto(a) por inteiro.',
  traicao: 'Confiar plenamente, mesmo quando ninguém te deu motivo pra desconfiar, pode parecer impossível se, em algum momento da sua história, uma promessa que deveria ter sido cumprida — de um pai, de uma mãe, de quem deveria ser previsível — simplesmente não foi. Não precisa ter sido um evento dramático; às vezes é a soma de pequenas quebras de palavra que, juntas, ensinaram um padrão: o que é dito nem sempre é o que acontece. Hoje isso aparece como uma desconfiança que chega antes da razão, testando a lealdade de gente que talvez nunca tenha te dado motivo pra isso. A confiança que foi quebrada cedo pode ser reconstruída — só não do dia pra noite, e não sozinho(a).',
  injustica: 'Se pequenas desigualdades te afetam profundamente demais pra quem está de fora, talvez, na sua história, regras tenham sido aplicadas de forma desigual — pra você, ou entre você e alguém mais próximo de um adulto importante. Uma criança que vive isso desenvolve um radar hipersensível pra desproporção, pra tratamento injusto, pra sentir que está sempre pagando mais caro do que deveria. Esse radar é, muitas vezes, correto — sua percepção de injustiça costuma ser real. O que vale treinar não é desligar essa sensibilidade, mas calibrar o tamanho da resposta ao tamanho real do problema, sem deixar que uma injustiça antiga responda no lugar da atual.'
};

const DAR_RECEBER_BLOCKS = {
  seguro: 'O pesquisador John Gottman passou décadas observando casais e descobriu que relações duradouras não são as que nunca têm conflito — são as que respondem bem aos "convites de conexão" um do outro: um comentário, um olhar, um pedido de atenção. Pelo seu perfil, você provavelmente já faz isso bem, quase sem perceber — dá espaço, recebe apoio, sabe pedir o que precisa sem drama. Sua missão, então, não é consertar algo quebrado em você — é usar essa facilidade pra ajudar quem você ama a desenvolver a mesma segurança, com paciência, sem cobrança.',
  ansioso: 'Você provavelmente dá muito — atenção, cuidado, presença — mas receber, pra você, vem carregado de uma pergunta silenciosa: "será que isso vai durar?". A psicóloga Sue Johnson, criadora da Terapia Focada na Emoção, descreve como pessoas com esse padrão de apego tendem a buscar reafirmação em vez de simplesmente confiar na reafirmação que já receberam. O treino aqui não é parar de precisar de proximidade — é aprender a receber sem já se preparar pra perder, e comunicar a necessidade antes que ela vire cobrança.',
  evitativo: 'Dar, pra você, muitas vezes significa resolver, cuidar, sustentar — fazer, não sentir junto. Receber é o lado que pede mais treino: deixar alguém entrar antes de estar exausto(a) de segurar tudo sozinho(a). A terapeuta Esther Perel fala sobre como a intimidade de verdade pede um equilíbrio entre autonomia e conexão — nenhuma das duas de menos. Você já domina a autonomia. A prática, agora, é permitir que alguém cuide de você também, sem que isso pareça uma ameaça à sua independência.',
  desorganizado: 'Dar e receber, pra você, provavelmente não seguem uma lógica fixa — variam com o dia, com o medo do momento, com o quanto você confia em quem está por perto naquela hora específica. Isso não é inconstância de caráter, é a marca de um sistema que aprendeu, ao mesmo tempo, que se aproximar é bom e é perigoso. A prática mais importante aqui não é escolher entre dar tudo ou não dar nada — é aprender a notar, no momento, qual parte sua está no comando, e nomear isso em voz alta pra quem você ama, em vez de deixar que só a ação fale por você.'
};

const CLOSING =
  'Nada disso é sentença. Padrão não é destino — é só o caminho que ficou mais fácil de andar, de tanto ser repetido. Reconhecer isso não é sobre se declarar quebrado(a) à espera de alguém que conserte, nem sobre alcançar uma perfeição solitária antes de merecer ser amado(a). É sobre saber, com clareza, de onde vêm suas reações mais automáticas — pra que elas parem de decidir por você.\n\n' +
  'Relação saudável não nasce de duas pessoas perfeitas. Nasce de duas pessoas que se conhecem o suficiente pra dar o que têm, pedir o que precisam, e comunicar quando o medo antigo está falando mais alto que a realidade presente. Ninguém precisa ser o(a) salvador(a) de ninguém — só testemunha e parceiro(a) do crescimento um do outro. Isso, sim, é multiplicação: duas histórias inteiras, escolhendo se somar, sem que nenhuma precise desaparecer pra caber na outra.';
