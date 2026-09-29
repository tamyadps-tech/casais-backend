// ESPELHO — ferramenta individual, 100% estática (roda inteira no navegador,
// sem servidor, sem salvar nada em lugar nenhum além do aparelho de quem
// responde). Reaproveita as mesmas 39 perguntas de temperamento, apego e
// feridas de infância do app de casais (mesmo texto, mesmas tags de
// pontuação), só que sem precisar de parceiro(a) nem de conta.

const QUESTIONS = [
  // ---------- temperamento ----------
  {
    id: 'TEM01', categoria: 'temperamento', tipo: 'multipla_escolha',
    texto: 'Imagine que você entra numa sala cheia de gente que não conhece. O que se move primeiro dentro de você?',
    opcoes: [
      { texto: 'Uma vontade quase instintiva de puxar conversa e contagiar o ambiente', tag: 'sanguineo' },
      { texto: 'Um impulso de entender rápido quem manda ali e assumir posição', tag: 'colerico' },
      { texto: 'Um olhar atento, avaliando cada pessoa antes de decidir se aproximar', tag: 'melancolico' },
      { texto: 'Uma calma tranquila, como se nada ali pedisse pressa', tag: 'fleumatico' },
      { texto: 'Nenhuma dessas — prefiro observar de fora, sem me encaixar em papel nenhum', tag: 'neutro' },
      { texto: 'Um pouco de tudo isso, dependendo de quem está na sala', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM02', categoria: 'temperamento', tipo: 'multipla_escolha',
    texto: 'Um plano em que você via com carinho desmorona de repente, sem aviso. O que acontece primeiro por dentro?',
    opcoes: [
      { texto: 'Uma faísca de curiosidade — já começo a pensar no que pode nascer disso', tag: 'sanguineo' },
      { texto: 'Uma irritação instantânea, e já começo a arquitetar como resolver', tag: 'colerico' },
      { texto: 'Um incômodo que fica girando, revivendo o que deu errado', tag: 'melancolico' },
      { texto: 'Uma aceitação quase automática — o que vier, eu absorvo', tag: 'fleumatico' },
      { texto: 'Praticamente nada — não sinto muita diferença entre o antes e o depois', tag: 'neutro' },
      { texto: 'Um resmungo silencioso, e sigo o que a vida decidiu por mim', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM03', categoria: 'temperamento', tipo: 'multipla_escolha',
    texto: 'Numa construção coletiva, onde ninguém decidiu ainda quem faz o quê, qual função você acaba ocupando sem nem perceber?',
    opcoes: [
      { texto: 'A que injeta ânimo no grupo e evita que o clima esfrie', tag: 'sanguineo' },
      { texto: 'A que assume o leme e cobra que as coisas de fato aconteçam', tag: 'colerico' },
      { texto: 'A que enxerga os detalhes que passariam despercebidos por qualquer outra pessoa', tag: 'melancolico' },
      { texto: 'A que segura a estabilidade quando todo mundo já perdeu a paciência', tag: 'fleumatico' },
      { texto: 'A que sobra — faço o que ninguém mais quis fazer, sem questionar', tag: 'neutro' },
      { texto: 'A que só cumpre sua parte, sem se misturar demais com o resto', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM04', categoria: 'temperamento', tipo: 'multipla_escolha',
    texto: 'Alguém te fecha no trânsito sem pedir licença. O que atravessa sua cabeça no primeiro segundo?',
    opcoes: [
      { texto: 'Um xingamento rápido — que já evapora antes do semáforo seguinte', tag: 'sanguineo' },
      { texto: 'Uma raiva que sobe quente, quase pedindo confronto', tag: 'colerico' },
      { texto: 'Uma reflexão incômoda que insiste em voltar pelo resto do caminho', tag: 'melancolico' },
      { texto: 'Quase nada — o corpo nem registra direito o que aconteceu', tag: 'fleumatico' },
      { texto: 'Esqueço no instante seguinte, como se nunca tivesse acontecido', tag: 'neutro' },
      { texto: 'Uma tensão que fica presa por dentro, sem sair pra lugar nenhum', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM05', categoria: 'temperamento', tipo: 'multipla_escolha',
    texto: 'Diante de uma decisão que não pode esperar, o que guia sua escolha?',
    opcoes: [
      { texto: 'O impulso do momento — decido animado(a) com a possibilidade que se abre', tag: 'sanguineo' },
      { texto: 'A pressa de resolver — decido rápido, sem enrolar', tag: 'colerico' },
      { texto: 'A necessidade de girar a questão por todos os ângulos antes de agir', tag: 'melancolico' },
      { texto: 'A confiança de que o tempo, por si, resolve o que precisa ser resolvido', tag: 'fleumatico' },
      { texto: 'A busca por uma segunda opinião antes de me comprometer', tag: 'neutro' },
      { texto: 'O adiamento — só decido quando não há mais escapatória', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM06', categoria: 'temperamento', tipo: 'multipla_escolha',
    texto: 'O que, numa relação, corrói sua paciência mais rápido do que qualquer outra coisa?',
    opcoes: [
      { texto: 'A rotina parada, sem nada de novo pra viver', tag: 'sanguineo' },
      { texto: 'A sensação de ter perdido as rédeas da situação', tag: 'colerico' },
      { texto: 'Não conseguir decifrar o que se passa por trás do silêncio do outro', tag: 'melancolico' },
      { texto: 'O confronto em si — prefiro qualquer coisa a discussão aberta', tag: 'fleumatico' },
      { texto: 'A falta de reconhecimento por tudo que já entreguei', tag: 'neutro' },
      { texto: 'A sensação de não ter voz nas decisões que me afetam', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM07', categoria: 'temperamento', tipo: 'multipla_escolha',
    texto: 'Um problema sério bate à porta sem avisar. Qual é o seu primeiro movimento, antes mesmo de pensar?',
    opcoes: [
      { texto: 'Ligar pra alguém e colocar tudo pra fora em voz alta', tag: 'sanguineo' },
      { texto: 'Partir direto pra ação — resolver antes de sentir', tag: 'colerico' },
      { texto: 'Recuar pra dentro e vasculhar cada detalhe antes de qualquer passo', tag: 'melancolico' },
      { texto: 'Esperar, quase por instinto, pra ver se o próprio tempo resolve', tag: 'fleumatico' },
      { texto: 'Buscar informação, entender o cenário antes de qualquer atitude', tag: 'neutro' },
      { texto: 'Distrair a cabeça primeiro, adiar o encontro com o problema', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM08', categoria: 'temperamento', tipo: 'multipla_escolha',
    texto: 'Alguém te elogia na frente de outras pessoas. O que acontece por dentro, antes mesmo da resposta sair da boca?',
    opcoes: [
      { texto: 'Um brilho instantâneo — eu adoro esse tipo de momento', tag: 'sanguineo' },
      { texto: 'Um orgulho tranquilo — sinto que era merecido', tag: 'colerico' },
      { texto: 'Um desconforto sutil — prefiro reconhecimento em particular', tag: 'melancolico' },
      { texto: 'Uma gratidão simples, sem grande alarde', tag: 'fleumatico' },
      { texto: 'Uma desconfiança — fico pensando se há segunda intenção ali', tag: 'neutro' },
      { texto: 'Um impulso de devolver o elogio na mesma hora', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM09', categoria: 'temperamento', tipo: 'multipla_escolha',
    texto: 'Se sua forma de viver virasse uma frase, qual dessas chegaria mais perto?',
    opcoes: [
      { texto: '"A vida é festa, bora aproveitar antes que passe"', tag: 'sanguineo' },
      { texto: '"Se não é pra vencer, pra que gastar energia?"', tag: 'colerico' },
      { texto: '"Prefiro fazer certo a fazer rápido"', tag: 'melancolico' },
      { texto: '"Devagar se vai ao longe, e eu não tenho pressa"', tag: 'fleumatico' },
      { texto: '"Cada um no seu quadrado, sem drama nenhum"', tag: 'neutro' },
      { texto: '"O que vier, eu encaro — sem muito planejamento"', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM10', categoria: 'temperamento', tipo: 'multipla_escolha',
    texto: 'No meio de uma discussão que dói de verdade, o que seu corpo faz antes da sua mente decidir?',
    opcoes: [
      { texto: 'Fala demais — as palavras escapam antes de eu conseguir filtrá-las', tag: 'sanguineo' },
      { texto: 'Vai direto ao ponto, mesmo sabendo que aquilo pode doer', tag: 'colerico' },
      { texto: 'Se fecha, e só volta a falar depois de processar tudo em silêncio', tag: 'melancolico' },
      { texto: 'Evita o confronto, espera a poeira baixar sozinha', tag: 'fleumatico' },
      { texto: 'Tenta equilibrar — ouvir tanto quanto fala', tag: 'neutro' },
      { texto: 'Busca humor, tenta aliviar o peso do momento', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM11', categoria: 'temperamento', tipo: 'escala',
    texto: 'Numa escala de 1 a 5, o quanto a sensação de perder o controle de uma situação acende alguma coisa forte dentro de você?',
    escala: { min: 1, max: 5, min_label: 'Quase nada — perder o controle não me abala', max_label: 'Muito — sinto que exploto por dentro quando isso acontece' },
    dimensao: 'colerico'
  },
  {
    id: 'TEM12', categoria: 'temperamento', tipo: 'escala',
    texto: 'De 1 a 5, o quanto você precisa se recolher em silêncio antes de conseguir transformar o que sente em palavras?',
    escala: { min: 1, max: 5, min_label: 'Nada — as palavras saem no mesmo instante em que sinto', max_label: 'Muito — preciso de um tempo a sós antes de conseguir nomear o que sinto' },
    dimensao: 'melancolico'
  },

  // ---------- apego ----------
  {
    id: 'APE01', categoria: 'apego', tipo: 'multipla_escolha',
    texto: 'O silêncio do celular, depois de mandar uma mensagem importante, costuma falar o quê primeiro na sua cabeça?',
    opcoes: [
      { texto: 'Nada — a pessoa deve estar ocupada, e tudo bem com isso', tag: 'seguro' },
      { texto: 'Um sussurro ansioso: será que eu fiz alguma coisa errada?', tag: 'ansioso' },
      { texto: 'Quase nada — sigo minha vida sem dar peso ao silêncio', tag: 'evitativo' },
      { texto: 'Um incômodo confuso, que eu nem sei nomear direito — medo? raiva?', tag: 'desorganizado' },
      { texto: 'Depende do dia — às vezes nem registro isso', tag: 'neutro' },
      { texto: 'Uma dúvida que fica ali, mas sem sair pra fora', tag: 'neutro' }
    ]
  },
  {
    id: 'APE02', categoria: 'apego', tipo: 'multipla_escolha',
    texto: 'Depois de uma briga, o que dentro de você mais pede pra acontecer primeiro?',
    opcoes: [
      { texto: 'Conversar logo, resolver e seguir — sem carregar peso pro dia seguinte', tag: 'seguro' },
      { texto: 'Correr atrás da reconciliação o quanto antes, nem que seja eu quem ceda primeiro', tag: 'ansioso' },
      { texto: 'Um tempo sozinho(a), longe do assunto, antes de qualquer conversa', tag: 'evitativo' },
      { texto: 'Uma parte de mim quer se aproximar, outra quer sumir — as duas ao mesmo tempo', tag: 'desorganizado' },
      { texto: 'Deixar o tempo agir, sem forçar nada além do necessário', tag: 'neutro' },
      { texto: 'Esperar — fico mal, mas espero o outro dar o primeiro passo', tag: 'neutro' }
    ]
  },
  {
    id: 'APE03', categoria: 'apego', tipo: 'multipla_escolha',
    texto: 'Seu parceiro(a) anuncia uma viagem só com amigos, sem você. O que se instala no seu peito quando ouve isso?',
    opcoes: [
      { texto: 'Uma tranquilidade genuína — confio, e aproveito meu próprio tempo também', tag: 'seguro' },
      { texto: 'Uma ansiedade que fica imaginando o que ele(a) está fazendo, sem parar', tag: 'ansioso' },
      { texto: 'Um certo alívio — gosto do meu espaço tanto quanto ele(a) precisa do dele(a)', tag: 'evitativo' },
      { texto: 'Uma saudade misturada com um alívio estranho — as duas coisas ao mesmo tempo', tag: 'desorganizado' },
      { texto: 'Depende do momento que a relação está vivendo', tag: 'neutro' },
      { texto: 'Uma paz relativa, com uma mensagem de vez em quando pra me situar', tag: 'neutro' }
    ]
  },
  {
    id: 'APE04', categoria: 'apego', tipo: 'multipla_escolha',
    texto: 'Quando a conversa vira pro futuro da relação — morar junto, construir uma vida — o que acorda dentro de você?',
    opcoes: [
      { texto: 'Uma empolgação natural, como se fosse óbvio pensar nisso junto', tag: 'seguro' },
      { texto: 'Uma ansiedade que busca certeza — preciso saber que aquilo vai mesmo acontecer', tag: 'ansioso' },
      { texto: 'Um desconforto sutil — prefiro viver um dia de cada vez, sem me prender ao amanhã', tag: 'evitativo' },
      { texto: 'Uma vontade de ir junto que, no minuto seguinte, vira vontade de fugir do assunto', tag: 'desorganizado' },
      { texto: 'Um foco maior no presente, sem me alongar demais no futuro', tag: 'neutro' },
      { texto: 'Depende de como a conversa é conduzida — do tom, não do tema', tag: 'neutro' }
    ]
  },
  {
    id: 'APE05', categoria: 'apego', tipo: 'multipla_escolha',
    texto: 'Quando a pessoa que você ama te machuca, mesmo sem querer, o que emerge primeiro?',
    opcoes: [
      { texto: 'Uma calma que consegue nomear o que senti, sem se perder no meio do caminho', tag: 'seguro' },
      { texto: 'Uma cobrança forte, movida pelo medo de que aquilo se repita', tag: 'ansioso' },
      { texto: 'Um recuo silencioso — me distancio sem sempre explicar por quê', tag: 'evitativo' },
      { texto: 'Uma explosão que, minutos depois, vira arrependimento por como agi', tag: 'desorganizado' },
      { texto: 'A espera por um pedido de desculpas antes de qualquer reação minha', tag: 'neutro' },
      { texto: 'Uma tentativa de entender o contexto antes de sentir qualquer coisa', tag: 'neutro' }
    ]
  },
  {
    id: 'APE06', categoria: 'apego', tipo: 'multipla_escolha',
    texto: 'O que, no fundo, faz você sentir que pode relaxar de verdade dentro de uma relação?',
    opcoes: [
      { texto: 'Saber que posso ser exatamente quem sou, sem precisar performar', tag: 'seguro' },
      { texto: 'Ter provas constantes — palavras, gestos, atenção — de que sou amado(a)', tag: 'ansioso' },
      { texto: 'Manter minha independência intacta, mesmo estando com alguém', tag: 'evitativo' },
      { texto: 'Honestamente? Nunca cheguei a sentir segurança plena numa relação', tag: 'desorganizado' },
      { texto: 'Uma rotina estável, onde eu sei o que esperar', tag: 'neutro' },
      { texto: 'Sentir que decidimos as coisas como time, não como indivíduos isolados', tag: 'neutro' }
    ]
  },
  {
    id: 'APE07', categoria: 'apego', tipo: 'multipla_escolha',
    texto: 'Quando você percebe que está se apaixonando de verdade, o que seu corpo faz antes da sua cabeça decidir qualquer coisa?',
    opcoes: [
      { texto: 'Se permite viver aquilo, com naturalidade, sem grandes resistências', tag: 'seguro' },
      { texto: 'Já começa a temer a perda da pessoa, mesmo antes de tê-la de fato', tag: 'ansioso' },
      { texto: 'Ergue uma defesa sutil, com medo de se expor além da conta', tag: 'evitativo' },
      { texto: 'Se aproxima e recua várias vezes, sem entender bem o próprio movimento', tag: 'desorganizado' },
      { texto: 'Observa com cautela, antes de se entregar por completo', tag: 'neutro' },
      { texto: 'Segue o fluxo, sem pensar demais no que está sentindo', tag: 'neutro' }
    ]
  },
  {
    id: 'APE08', categoria: 'apego', tipo: 'multipla_escolha',
    texto: 'Numa festa, seu parceiro(a) ri animado(a) com outra pessoa, por tempo demais pro seu gosto. O que se move em você?',
    opcoes: [
      { texto: 'Nada muito forte — confio, e sigo curtindo minha própria noite', tag: 'seguro' },
      { texto: 'Um ciúme que cresce enquanto eu fico de olho, sem conseguir desviar', tag: 'ansioso' },
      { texto: 'Quase nada — nem registro, estou distraído(a) com outra coisa', tag: 'evitativo' },
      { texto: 'Um ciúme que sinto por dentro, mas escondo pra tratar depois, em outro momento', tag: 'desorganizado' },
      { texto: 'Um impulso de me juntar à conversa, sem drama', tag: 'neutro' },
      { texto: 'Um comentário tranquilo sobre isso, mais tarde, sem peso', tag: 'neutro' }
    ]
  },
  {
    id: 'APE09', categoria: 'apego', tipo: 'multipla_escolha',
    texto: 'Precisar emocionalmente de alguém — de verdade, sem fingir que dá conta sozinho(a) — é algo que você...',
    opcoes: [
      { texto: 'Faz com naturalidade, entendendo que isso é parte de qualquer vínculo saudável', tag: 'seguro' },
      { texto: 'Busca intensamente, às vezes até além do que seria saudável', tag: 'ansioso' },
      { texto: 'Evita ao máximo — prefiro sempre encontrar meu próprio caminho', tag: 'evitativo' },
      { texto: 'Deseja e teme ao mesmo tempo, numa contradição que nunca se resolve de vez', tag: 'desorganizado' },
      { texto: 'Depende muito de quem é a pessoa do outro lado', tag: 'neutro' },
      { texto: 'Tenta equilibrar entre pedir ajuda e resolver por conta própria', tag: 'neutro' }
    ]
  },
  {
    id: 'APE10', categoria: 'apego', tipo: 'multipla_escolha',
    texto: 'Uma notícia boa chega na sua vida. Antes de contar pra alguém, o que seu instinto faz primeiro?',
    opcoes: [
      { texto: 'Compartilha na hora, com o parceiro(a), com alegria genuína', tag: 'seguro' },
      { texto: 'Compartilha, já na expectativa de uma reação grande o bastante pra confirmar que importo', tag: 'ansioso' },
      { texto: 'Guarda só pra si por um tempo, antes de sequer pensar em contar', tag: 'evitativo' },
      { texto: 'Conta, mas já se preparando internamente pra alguma decepção que pode vir depois', tag: 'desorganizado' },
      { texto: 'Fica em dúvida entre contar logo ou esperar o momento certo', tag: 'neutro' },
      { texto: 'Comemora sozinho(a), antes de dividir com qualquer pessoa', tag: 'neutro' }
    ]
  },
  {
    id: 'APE11', categoria: 'apego', tipo: 'escala',
    texto: 'De 1 a 5, o quanto você precisa sentir, de forma repetida, que é amado(a) — mesmo quando nada mudou de fato.',
    escala: { min: 1, max: 5, min_label: 'Quase nada — confio sem exigir provas constantes', max_label: 'Muito — preciso sentir isso confirmado o tempo todo' },
    dimensao: 'ansioso'
  },
  {
    id: 'APE12', categoria: 'apego', tipo: 'escala',
    texto: 'De 1 a 5, o quanto suas emoções mais cruas conseguem sair de dentro de você e chegar até quem você ama.',
    escala: { min: 1, max: 5, min_label: 'Quase nunca — prefiro guardar o que sinto pra mim', max_label: 'Com facilidade — me abro sem grande resistência' },
    dimensao: 'evitativo', inverso: true
  },
  {
    id: 'APE13', categoria: 'apego', tipo: 'escala',
    texto: 'De 1 a 5, o quanto uma discussão de relacionamento consegue invadir seu corpo — sono, apetite, concentração.',
    escala: { min: 1, max: 5, min_label: 'Nada — sigo minha rotina normalmente', max_label: 'Muito — fico fisicamente afetado(a) por dias' },
    dimensao: 'ansioso'
  },
  {
    id: 'APE14', categoria: 'apego', tipo: 'escala',
    texto: 'De 1 a 5, o quanto você reconhece em si esse movimento de se aproximar e se afastar das pessoas, sem entender de verdade por quê.',
    escala: { min: 1, max: 5, min_label: 'Nunca me reconheço nisso', max_label: 'Me reconheço demais nisso' },
    dimensao: 'desorganizado'
  },

  // ---------- feridas da infância ----------
  {
    id: 'FER01', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
    texto: 'Alguém cancela um encontro com você em cima da hora. Qual dor, especificamente, dói mais?',
    opcoes: [
      { texto: 'A sensação de não ter sido prioridade pra essa pessoa', tag: 'rejeicao' },
      { texto: 'O medo de que isso vire um padrão, até a pessoa simplesmente sumir', tag: 'abandono' },
      { texto: 'A sensação de ficar invisível, em segundo plano, sem peso nenhum', tag: 'humilhacao' },
      { texto: 'A desconfiança imediata sobre se a desculpa é mesmo verdadeira', tag: 'traicao' },
      { texto: 'A revolta de ter se planejado tanto pra nada', tag: 'injustica' },
      { texto: 'Nada muito profundo — é só uma chatice do dia', tag: 'neutro' }
    ]
  },
  {
    id: 'FER02', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
    texto: 'Um feedback negativo chega. O que dói de verdade não é o conteúdo — é o quê, exatamente?',
    opcoes: [
      { texto: 'O medo de estar sendo rejeitado(a) como pessoa, não só corrigido(a) numa tarefa', tag: 'rejeicao' },
      { texto: 'O medo de que essa pessoa se afaste de mim por causa disso', tag: 'abandono' },
      { texto: 'A vergonha de sentir que todo mundo está vendo minha falha', tag: 'humilhacao' },
      { texto: 'A desconfiança sobre a real intenção por trás daquelas palavras', tag: 'traicao' },
      { texto: 'A sensação de estar sendo tratado(a) de forma desproporcional ao que fiz', tag: 'injustica' },
      { texto: 'Nada muito profundo — sigo em frente rápido', tag: 'neutro' }
    ]
  },
  {
    id: 'FER03', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
    texto: 'Numa discussão, qual dessas frases, se ditas, deixariam uma marca mais funda em você?',
    opcoes: [
      { texto: '"Eu não te quero mais por perto"', tag: 'rejeicao' },
      { texto: '"Vou embora"', tag: 'abandono' },
      { texto: '"Você é ridículo(a) por pensar assim"', tag: 'humilhacao' },
      { texto: '"Você não é confiável"', tag: 'traicao' },
      { texto: '"Você não merece isso"', tag: 'injustica' },
      { texto: 'Nenhuma frase específica — o tom de voz pesa mais que as palavras', tag: 'neutro' }
    ]
  },
  {
    id: 'FER04', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
    texto: 'Voltando à infância: o que mais pesava, silenciosamente, sem que ninguém precisasse dizer em voz alta?',
    opcoes: [
      { texto: 'Não ser escolhido(a) primeiro — pros times, pras brincadeiras, pra atenção', tag: 'rejeicao' },
      { texto: 'Passar muito tempo sozinho(a), sem ninguém por perto de verdade', tag: 'abandono' },
      { texto: 'Ser corrigido(a) na frente dos outros, com todo mundo vendo', tag: 'humilhacao' },
      { texto: 'Perceber que promessas de adultos, com frequência, não se cumpriam', tag: 'traicao' },
      { texto: 'Sentir que as regras eram diferentes — e piores — só pra mim', tag: 'injustica' },
      { texto: 'Nada muito marcante — tive uma infância tranquila', tag: 'neutro' }
    ]
  },
  {
    id: 'FER05', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
    texto: 'Ser comparado(a) com outra pessoa — mesmo sem querer — costuma abrir qual ferida específica?',
    opcoes: [
      { texto: 'A sensação de não ser suficiente do jeito que sou', tag: 'rejeicao' },
      { texto: 'O medo de ser trocado(a) pela pessoa com quem fui comparado(a)', tag: 'abandono' },
      { texto: 'A vergonha de ser exposto(a) dessa forma, na frente de quem quer que seja', tag: 'humilhacao' },
      { texto: 'A sensação de que a pessoa escondia o que realmente pensava de mim', tag: 'traicao' },
      { texto: 'A revolta simples por achar aquilo desnecessário e injusto', tag: 'injustica' },
      { texto: 'Não costuma me incomodar muito', tag: 'neutro' }
    ]
  },
  {
    id: 'FER06', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
    texto: 'Descobrir que foi deixado(a) de fora de um convite ou grupo mexe com você de que jeito, por dentro?',
    opcoes: [
      { texto: 'Dói bastante, mesmo que eu não demonstre nada pra fora', tag: 'rejeicao' },
      { texto: 'Acende o medo de perder essas pessoas de vez', tag: 'abandono' },
      { texto: 'Traz vergonha — até de perguntar o motivo', tag: 'humilhacao' },
      { texto: 'Faz eu já pensar em quem pode ter falado mal de mim', tag: 'traicao' },
      { texto: 'Gera uma revolta — acho simplesmente injusto', tag: 'injustica' },
      { texto: 'Não costuma me afetar muito', tag: 'neutro' }
    ]
  },
  {
    id: 'FER07', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
    texto: 'Na ideia de se abrir por completo com alguém — sem filtro, sem edição — o que mais assusta?',
    opcoes: [
      { texto: 'Ser rejeitado(a) depois de mostrar quem realmente sou, sem máscara', tag: 'rejeicao' },
      { texto: 'Me apegar de verdade e, depois, ver essa pessoa desaparecer', tag: 'abandono' },
      { texto: 'Parecer fraco(a) ou ridículo(a) por sentir o que sinto', tag: 'humilhacao' },
      { texto: 'Essa pessoa usar o que eu contei contra mim, mais tarde', tag: 'traicao' },
      { texto: 'Não costumo sentir medo nisso', tag: 'neutro' },
      { texto: 'Ser mal interpretado(a) no meio do caminho', tag: 'neutro' }
    ]
  },
  {
    id: 'FER08', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
    texto: 'Depois de cometer um erro grande, qual medo pesa mais do que o próprio erro?',
    opcoes: [
      { texto: 'Que as pessoas parem de gostar de mim por causa disso', tag: 'rejeicao' },
      { texto: 'Que isso afaste as pessoas de mim, aos poucos', tag: 'abandono' },
      { texto: 'O julgamento — a vergonha de ser visto(a) errando', tag: 'humilhacao' },
      { texto: 'Que usem esse erro contra mim, mais adiante, quando eu menos esperar', tag: 'traicao' },
      { texto: 'Ser punido(a) de um jeito desproporcional ao tamanho do erro', tag: 'injustica' },
      { texto: 'Aceito e sigo em frente, sem carregar muito peso', tag: 'neutro' }
    ]
  },
  {
    id: 'FER09', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
    texto: 'Pensando nas broncas que você recebia quando criança: qual dessas frases descreve melhor como elas eram?',
    opcoes: [
      { texto: 'Eu sentia que era eu, não só minha atitude, que estava sendo rejeitado(a)', tag: 'rejeicao' },
      { texto: 'Vinham acompanhadas de silêncio ou distanciamento, não só palavras', tag: 'abandono' },
      { texto: 'Aconteciam na frente de outras pessoas, sem nenhum cuidado com isso', tag: 'humilhacao' },
      { texto: 'Eu sentia que promessas feitas antes da bronca não eram cumpridas depois', tag: 'traicao' },
      { texto: 'Pareciam grandes demais pra pequenas coisas que eu tinha feito', tag: 'injustica' },
      { texto: 'Eram justas, e bem explicadas — sem deixar marcas', tag: 'neutro' }
    ]
  },
  {
    id: 'FER10', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
    texto: 'Quando alguém quebra uma promessa com você, o que exatamente é o centro da dor?',
    opcoes: [
      { texto: 'Sentir que eu não importo o suficiente pra que a promessa fosse mantida', tag: 'rejeicao' },
      { texto: 'O medo de que isso signifique que, mais cedo ou mais tarde, vão me deixar', tag: 'abandono' },
      { texto: 'A vergonha de ter acreditado, de ter confiado demais', tag: 'humilhacao' },
      { texto: 'A própria quebra de confiança — o fato em si', tag: 'traicao' },
      { texto: 'A injustiça de ter contado com algo que simplesmente não veio', tag: 'injustica' },
      { texto: 'Sigo em frente — não fico remoendo isso', tag: 'neutro' }
    ]
  },
  {
    id: 'FER11', categoria: 'feridas_infancia', tipo: 'escala',
    texto: 'De 1 a 5, o quanto o medo de ser abandonado(a) por quem você ama mora dentro de você, mesmo em dias calmos.',
    escala: { min: 1, max: 5, min_label: 'Quase nenhum — não é algo que me visita', max_label: 'Muito — é um medo que sinto quase sempre presente' },
    dimensao: 'abandono'
  },
  {
    id: 'FER12', categoria: 'feridas_infancia', tipo: 'escala',
    texto: 'De 1 a 5, o quanto situações de injustiça — mesmo as pequenas, cotidianas — conseguem te tirar do eixo.',
    escala: { min: 1, max: 5, min_label: 'Quase não me afetam', max_label: 'Me afetam profundamente, custam a passar' },
    dimensao: 'injustica'
  },
  {
    id: 'FER13', categoria: 'feridas_infancia', tipo: 'escala',
    texto: 'De 1 a 5, o quanto é difícil confiar de verdade em alguém, mesmo quando essa pessoa nunca te deu motivo nenhum pra desconfiança.',
    escala: { min: 1, max: 5, min_label: 'Confio com facilidade, sem grande esforço', max_label: 'É muito difícil confiar de verdade, mesmo sem motivo' },
    dimensao: 'traicao'
  },

  // ---------- estilo de vida (pra orientação de compatibilidade) ----------
  {
    id: 'EST01', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'Quando você imagina sua vida daqui a alguns anos, os filhos aparecem nesse retrato de que forma?',
    opcoes: [
      { texto: 'Aparecem com nitidez — quero muito ser pai/mãe, é algo que meu coração já decidiu', tag: 'filhos_sim' },
      { texto: 'Aparecem como possibilidade real, mas sem pressa nem urgência', tag: 'filhos_aberto' },
      { texto: 'Não aparecem — e estou em paz com isso', tag: 'filhos_nao' },
      { texto: 'Já fazem parte da minha vida, e ainda quero que a família cresça mais', tag: 'filhos_tem_quer_mais' },
      { texto: 'Já fazem parte da minha vida, e sinto que minha família está completa assim', tag: 'filhos_tem_completo' },
      { texto: 'Ainda é uma pergunta em aberto dentro de mim', tag: 'filhos_indeciso' }
    ]
  },
  {
    id: 'EST02', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'Se pudesse desenhar as férias que realmente recarregam você, qual cenário nasceria primeiro?',
    opcoes: [
      { texto: 'Uma trilha, um lugar desconhecido, um desafio que me tira do lugar comum', tag: 'ferias_aventura' },
      { texto: 'Uma rede, uma praia, silêncio e nenhum compromisso', tag: 'ferias_descanso' },
      { texto: 'Um museu, uma cidade nova pra explorar com calma e curiosidade', tag: 'ferias_cultura' },
      { texto: 'Perto de casa, cercado(a) de quem eu amo', tag: 'ferias_perto' },
      { texto: 'Qualquer lugar — o que importa de verdade é a companhia', tag: 'ferias_flexivel' },
      { texto: 'Sinceramente, prefiro guardar o dinheiro a gastar em viagem', tag: 'ferias_economizar' }
    ]
  },
  {
    id: 'EST03', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'Falar sobre dinheiro revela alguma coisa sobre cada um de nós. Qual frase te representa de verdade?',
    opcoes: [
      { texto: 'Gosto de planejar, poupar, ter uma reserva que me dá chão', tag: 'dinheiro_planejador' },
      { texto: 'Vivo mais o presente — gasto com o que me faz feliz agora', tag: 'dinheiro_presente' },
      { texto: 'Esse assunto me deixa desconfortável, e prefiro evitá-lo quando posso', tag: 'dinheiro_desconfortavel' },
      { texto: 'Sou direto(a) e transparente quando o assunto é dinheiro, sem rodeios', tag: 'dinheiro_aberto' },
      { texto: 'Gosto de investir, de fazer o dinheiro trabalhar por mim', tag: 'dinheiro_investidor' },
      { texto: 'Ainda estou aprendendo a lidar bem com isso, sem vergonha de admitir', tag: 'dinheiro_aprendendo' }
    ]
  },
  {
    id: 'EST04', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'Pensando na sua família de origem, o quanto a proximidade física com ela pesa nas suas decisões de vida?',
    opcoes: [
      { texto: 'Muito — quero ficar sempre por perto, isso não é negociável pra mim', tag: 'familia_perto_essencial' },
      { texto: 'Importa, mas eu não abriria mão de uma boa oportunidade só por isso', tag: 'familia_perto_flexivel' },
      { texto: 'Pouco — prefiro seguir onde a vida me levar', tag: 'familia_perto_baixo' },
      { texto: 'Já moro longe, e fiz as pazes com essa distância', tag: 'familia_longe_ok' },
      { texto: 'Prefiro morar longe, por escolha mesmo, não por circunstância', tag: 'familia_longe_opcao' },
      { texto: 'Nunca parei pra refletir sobre isso de verdade', tag: 'familia_perto_indefinido' }
    ]
  },
  {
    id: 'EST05', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'Entre criar raízes profundas num só lugar e viver em movimento constante, pra qual desses dois você se inclina de verdade?',
    opcoes: [
      { texto: 'Raízes — gosto de estabilidade, rotina, um lar bem construído', tag: 'estilo_fixo' },
      { texto: 'Movimento — gosto de mudar, descobrir, nunca me prender demais a um lugar', tag: 'estilo_viajante' },
      { texto: 'Um equilíbrio — uma base fixa, com viagens frequentes pra respirar', tag: 'estilo_equilibrado' },
      { texto: 'Depende muito da fase de vida que estou vivendo', tag: 'estilo_depende' },
      { texto: 'Ainda não vivi o suficiente pra saber, com sinceridade, o que prefiro', tag: 'estilo_indefinido' },
      { texto: 'Gostaria de viajar mais do que minha realidade hoje permite', tag: 'estilo_deseja_viajar' }
    ]
  },
  {
    id: 'EST06', categoria: 'estilo_vida', tipo: 'selecao_multipla', max_selecoes: 3,
    texto: 'Se você pudesse escolher só três sonhos pra levar com você pro resto da vida, quais estariam nessa lista? (escolha até 3)',
    opcoes: [
      { texto: 'Construir algo que seja só meu — um negócio, um projeto próprio', tag: 'sonho_empreender' },
      { texto: 'Formar uma família grande, unida, cheia de gente que se ama', tag: 'sonho_familia' },
      { texto: 'Recomeçar em outro país, outra cidade, outra versão de mim mesmo(a)', tag: 'sonho_morar_fora' },
      { texto: 'Alcançar estabilidade financeira e paz de verdade', tag: 'sonho_estabilidade' },
      { texto: 'Ver o mundo com os próprios olhos, viajando o quanto puder', tag: 'sonho_viajar' },
      { texto: 'Deixar um legado — em arte, trabalho ou comunidade — maior que minha própria vida', tag: 'sonho_legado' }
    ]
  },
  {
    id: 'EST07', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'Se alguém te perguntasse, hoje, qual é o lugar da fé na sua vida, o que você responderia sem pensar duas vezes?',
    opcoes: [
      { texto: 'Central — organizo minha rotina, minhas decisões, em torno disso', tag: 'fe_central' },
      { texto: 'Importante, mas vivida de um jeito pessoal, sem rótulo fixo', tag: 'fe_pessoal' },
      { texto: 'Respeito profundamente quem tem fé, mas não é algo que eu pratico', tag: 'fe_respeito' },
      { texto: 'Não faz parte da minha vida hoje', tag: 'fe_nao' },
      { texto: 'Estou em busca, sem uma resposta fechada ainda', tag: 'fe_busca' },
      { texto: 'Prefiro não abrir esse assunto', tag: 'fe_prefere_nao_falar' }
    ]
  },
  {
    id: 'EST08', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'Uma noite perfeita de sexta-feira, pra você, se parece mais com o quê?',
    opcoes: [
      { texto: 'Balada, música alta, gente por todo lado — eu no meio disso, vivo(a)', tag: 'social_ama' },
      { texto: 'Uma saída de vez em quando, com moderação — o suficiente', tag: 'social_moderado' },
      { texto: 'Um encontro pequeno, íntimo, com poucas pessoas que realmente importam', tag: 'social_intimo' },
      { texto: 'Sinceramente, isso já não me atrai como antes', tag: 'social_baixo' },
      { texto: 'Nunca foi muito o meu tipo de programa', tag: 'social_nao' },
      { texto: 'Depende inteiramente de quem está do meu lado', tag: 'social_depende' }
    ]
  },
  {
    id: 'EST09', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'No fundo, seu corpo se sente mais em paz com estrutura ou com espontaneidade?',
    opcoes: [
      { texto: 'Estrutura — gosto de plano, horário, previsibilidade', tag: 'rotina_estruturado' },
      { texto: 'Espontaneidade — prefiro decidir na hora, sem amarras', tag: 'rotina_espontaneo' },
      { texto: 'Um meio-termo — alguma estrutura, com espaço pro imprevisto', tag: 'rotina_equilibrado' },
      { texto: 'Depende muito da fase de vida que estou vivendo', tag: 'rotina_depende' },
      { texto: 'Queria ter mais estrutura do que tenho hoje', tag: 'rotina_deseja_mais' },
      { texto: 'Queria ter menos estrutura do que tenho hoje', tag: 'rotina_deseja_menos' }
    ]
  },
  {
    id: 'EST10', categoria: 'estilo_vida', tipo: 'selecao_multipla', max_selecoes: 4,
    texto: 'No seu tempo livre — aquele que ninguém cobra de você — o que mais te faz voltar pra si mesmo(a)? (escolha até 4)',
    opcoes: [
      { texto: 'Um livro aberto e o silêncio ao redor', tag: 'gosta_leitura' },
      { texto: 'O corpo em movimento — esporte, atividade física', tag: 'gosta_esportes' },
      { texto: 'Arte, música, cinema — qualquer coisa que me emocione', tag: 'gosta_arte' },
      { texto: 'O ar livre, a natureza, o espaço aberto', tag: 'gosta_natureza' },
      { texto: 'Tecnologia, games, o universo digital', tag: 'gosta_tecnologia' },
      { texto: 'Cozinhar, experimentar sabores, criar na cozinha', tag: 'gosta_gastronomia' }
    ]
  },
  {
    id: 'EST11', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'Qual dessas frases descreve, com mais honestidade, sua relação com a leitura hoje?',
    opcoes: [
      { texto: 'Leio bastante — é parte real da minha rotina', tag: 'leitura_muita' },
      { texto: 'Leio de vez em quando, quando um livro realmente me chama', tag: 'leitura_as_vezes' },
      { texto: 'Prefiro outros formatos — podcast, vídeo, áudio — a ler propriamente', tag: 'leitura_outros_formatos' },
      { texto: 'Não é um hábito meu hoje, mas é algo que eu gostaria de cultivar', tag: 'leitura_deseja' },
      { texto: 'Não curto muito ler, e fiz as pazes com isso', tag: 'leitura_nao' },
      { texto: 'Leio bastante, mas mais por necessidade — trabalho, estudo — do que por prazer', tag: 'leitura_funcional' }
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
  sanguineo: 'Você tem uma energia que contagia — entra numa sala e o clima muda. Isso não é sorte, é temperamento: dentro da psicologia da personalidade, o psicólogo Hans Eysenck e, mais tarde, o psiquiatra Robert Cloninger descreveram esse tipo de perfil como ligado a uma alta sensibilidade a recompensa e novidade — um sistema nervoso que se liga fácil com estímulo novo e gente nova. Estudos com gêmeos mostram que boa parte dessa tendência (algo entre 40% e 60%, dependendo do traço medido) tem base biológica, não é só escolha ou criação. Nas relações, isso te torna alguém fácil de amar no início — divertido(a), espontâneo(a), sem meias palavras. O ponto de atenção é a constância: o mesmo entusiasmo que te faz começar mil coisas às vezes te faz sumir antes delas darem fruto, inclusive em conversas difíceis que pedem repetição, não só um momento de coragem. Sua força não é ficar sério(a) o tempo todo — é aprender a manter a chama acesa mesmo quando a novidade já passou.',
  colerico: 'Você decide rápido, fala o que pensa e não tem paciência pra rodeio — isso é raro e valioso, principalmente quando alguém precisa de clareza numa hora de caos. Na literatura de temperamento, esse perfil costuma aparecer como alta energia combinada com baixa tolerância à frustração: Eysenck chamaria isso de um traço de alta ativação, e Cloninger descreveria como alta busca por novidade com pouca inibição comportamental — o freio que existe, mas que demora um pouco a ser acionado. Você provavelmente é a pessoa que os outros procuram quando algo precisa ser resolvido de verdade. Nas relações, essa mesma força pode pesar: sua franqueza, dita rápido demais ou no calor do momento, pode soar como dureza pra quem só queria ser ouvido, não corrigido. Não é sobre parar de ser direto(a) — é sobre escolher o segundo certo pra dizer o que precisa ser dito.',
  melancolico: 'Você sente fundo, pensa fundo, e nota detalhes que a maioria das pessoas passa reto. O psicólogo Jerome Kagan, num dos estudos longitudinais mais citados sobre temperamento, acompanhou crianças desde bebês e descreveu um grupo "altamente reativo" — mais sensível a estímulo novo, mais propenso à cautela e à introspecção — e mostrou que esse traço tende a persistir, com ajustes, até a vida adulta. Essa profundidade é um presente raro numa época que valoriza o rápido e o superficial — você ama com camadas, não com clichês. O risco é a introspecção virar isolamento: processar tanto por dentro que quem está do lado de fora nunca sabe o que está se passando, e interpreta seu silêncio como distância, não como cuidado. Sua tarefa não é sentir menos — é aprender a compartilhar o processo, não só a conclusão.',
  fleumatico: 'Você é o tipo de pessoa que estabiliza o ambiente só por estar nele — calmo(a), paciente, difícil de tirar do sério. É praticamente o espelho do perfil "baixa reatividade" que o mesmo Jerome Kagan descreveu em suas pesquisas: um sistema nervoso que reage pouco a estímulo novo e recupera o equilíbrio rápido depois de qualquer sobressalto. Isso é raro, e quem convive com você sente esse chão firme, mesmo sem saber nomear. O outro lado dessa calma é a passividade: evitar todo atrito pode significar que suas próprias necessidades ficam sempre em último lugar, até que um dia elas transbordam de um jeito que ninguém, nem você, esperava. Sua paz não precisa virar silêncio — dá pra se posicionar com a mesma calma que você já tem em tudo mais.'
};

// "Volume" do temperamento — o quanto a tendência dominante apareceu de
// forma isolada nas respostas (vs. dividida com outros estilos). Calculado
// em app.js a partir dos counts brutos que tally() já produzia mas que
// antes eram descartados depois de extrair só o topTag.
const TEMPERAMENTO_VOLUME_BLOCKS = {
  alto: 'Uma coisa que vale destacar sobre o volume desse traço: ele não apareceu sozinho por acaso — apareceu bem mais forte que as outras tendências nas suas respostas. Isso costuma significar que esse é o volume em que você vive boa parte do tempo, não só uma reação ocasional em dias ruins. Vale conhecer bem esse volume, porque é provavelmente nele que as pessoas mais próximas de você te reconhecem primeiro.',
  moderado: 'Sobre o volume desse traço: ele apareceu com força moderada nas suas respostas — presente e real, mas dividindo espaço com outras formas de reagir. Isso sugere alguma flexibilidade: dependendo do contexto, de quem está por perto ou do quanto você está cansado(a), outras facetas suas também aparecem com força.',
  sutil: 'Sobre o volume desse traço: nas suas respostas, nenhum temperamento isolado dominou com força — o seu perfil parece mais uma mistura equilibrada de estilos do que um traço único e dominante. Isso não é indefinição: costuma significar que você se adapta bastante ao contexto, puxando o estilo que a situação pede.'
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

// "Volume" emocional geral — reatividade média nas perguntas de escala
// (temperamento, apego e feridas), independente de qual tag cada uma
// pontua. Mede intensidade, não direção: quanto mais longe do centro (3)
// a pessoa marcou, em média, mais alto o volume emocional.
const VOLUME_EMOCIONAL_BLOCKS = {
  alto: 'Outro dado que vale registrar: no geral, suas respostas às perguntas de escala mostram uma reatividade emocional relativamente alta — você sente as coisas em alto volume, tanto no que te alegra quanto no que te incomoda. A neurocientista Lisa Feldman Barrett, uma das principais referências atuais em neurociência das emoções, defende que emoções não são reações automáticas e fixas, mas previsões que o cérebro constrói a partir de sinais do corpo somados à experiência passada — a chamada neurociência preditiva das emoções. Um volume emocional alto não é um defeito de fábrica: é um cérebro que aprendeu, com base na sua história, a prever com intensidade. E como são previsões aprendidas, também podem ser recalibradas, com consciência e repetição, ao longo do tempo.',
  medio: 'Outro dado que vale registrar: no geral, suas respostas às perguntas de escala mostram uma reatividade emocional moderada — você sente com clareza, mas normalmente sem ser dominado(a) pela intensidade do momento. Na perspectiva da neurociência preditiva das emoções, defendida por pesquisadoras como Lisa Feldman Barrett, isso sugere um sistema que prevê com relativo equilíbrio: reage ao que importa, sem inflar tudo o que acontece no caminho.',
  baixo: 'Outro dado que vale registrar: no geral, suas respostas às perguntas de escala mostram uma reatividade emocional mais comedida — você tende a registrar o que sente sem ser arrastado(a) por isso. Isso costuma funcionar como um estabilizador emocional numa relação, embora valha um cuidado: volume emocional baixo por fora às vezes é regulação real, e às vezes é emoção sendo sentida por dentro sem espaço pra sair. Vale se perguntar, com honestidade, qual das duas é a sua.'
};

const CLOSING =
  'Nada disso é sentença. Padrão não é destino — é só o caminho que ficou mais fácil de andar, de tanto ser repetido. Reconhecer isso não é sobre se declarar quebrado(a) à espera de alguém que conserte, nem sobre alcançar uma perfeição solitária antes de merecer ser amado(a). É sobre saber, com clareza, de onde vêm suas reações mais automáticas — pra que elas parem de decidir por você.\n\n' +
  'Relação saudável não nasce de duas pessoas perfeitas. Nasce de duas pessoas que se conhecem o suficiente pra dar o que têm, pedir o que precisam, e comunicar quando o medo antigo está falando mais alto que a realidade presente. Ninguém precisa ser o(a) salvador(a) de ninguém — só testemunha e parceiro(a) do crescimento um do outro. Isso, sim, é multiplicação: duas histórias inteiras, escolhendo se somar, sem que nenhuma precise desaparecer pra caber na outra.';
