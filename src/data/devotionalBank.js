// DEVOCIONAL DO CASAL — um versículo curto + um estudo pensado pra ser lido
// junto, de segunda a sexta, por um período de 3 meses. Conteúdo fixo (sem
// custo de IA), com um novo devocional a cada dia útil numa rotação — ver
// src/routes/devotional.js pra como o dia de hoje é escolhido (e pra como
// fins de semana e o fim do período de 3 meses são tratados). A partir da
// entrada 25, o banco deixa de
// falar só sobre o casal e passa a trazer reflexões mais profundas sobre
// si mesmo, sobre relações em geral (amizade, perdão, comunidade) e sobre
// família (filhos, pais, o que se herda e o que se escolhe repetir) — o
// autoconhecimento e a vida ao redor do casal importam tanto quanto o
// relacionamento a dois.

const devotionalBank = [
  {
    referencia: 'João 15:12',
    texto: 'Amem-se uns aos outros, assim como eu os amei.',
    estudo: 'Jesus não pede um amor qualquer — pede o mesmo padrão do amor dele, que se doa antes de cobrar retorno. Hoje, façam um pelo outro algo que não seria "obrigação", só por amor mesmo.'
  },
  {
    referencia: '1 Coríntios 13:4-5',
    texto: 'O amor é paciente, é bondoso; não inveja, não se vangloria, não se orgulha. Não maltrata, não busca seus próprios interesses, não se ira facilmente, não guarda rancor.',
    estudo: 'Releiam essa lista juntos e perguntem um ao outro: qual dessas palavras a gente mais precisa treinar essa semana?'
  },
  {
    referencia: 'Eclesiastes 4:9-10',
    texto: 'Melhor é serem dois do que um, porque têm melhor paga do seu trabalho. Se um cair, o outro levanta o seu companheiro; mas ai do que está só, pois, caindo, não haverá quem o levante.',
    estudo: 'Conversem sobre um momento recente em que um segurou o outro. Agradeçam um ao outro por isso, em voz alta.'
  },
  {
    referencia: 'Colossenses 3:14',
    texto: 'Sobre tudo isso, porém, revistam-se do amor, que é o elo perfeito.',
    estudo: 'Amor não é só sentimento — é o que mantém tudo o resto (paciência, perdão, humildade) unido. Qual desses "elos" vocês precisam reforçar hoje?'
  },
  {
    referencia: 'Provérbios 15:1',
    texto: 'A resposta branda desvia o furor, mas a palavra dura suscita a ira.',
    estudo: 'Na próxima discussão, antes de responder no mesmo tom, façam uma pausa de alguns segundos. Combinem isso um com o outro agora, enquanto estão calmos.'
  },
  {
    referencia: 'Gênesis 2:24',
    texto: 'Por isso deixará o homem pai e mãe, e se unirá à sua mulher, e serão uma só carne.',
    estudo: '"Unir-se" é um verbo ativo, não um estado que acontece sozinho. O que vocês podem fazer hoje pra se sentir mais "um" do que ontem?'
  },
  {
    referencia: 'Filipenses 2:3-4',
    texto: 'Nada façam por rivalidade ou vanglória, mas com humildade, considerando cada um os outros superiores a si mesmo, olhando não somente para o que é seu, mas também para o que é dos outros.',
    estudo: 'Hoje, pergunte ao seu parceiro(a): "o que você mais precisa de mim essa semana?" — e escute de verdade a resposta, sem já pensar no que vai dizer em seguida.'
  },
  {
    referencia: 'Efésios 4:32',
    texto: 'Sejam uns para com os outros bondosos, misericordiosos, perdoando-se uns aos outros, como também Deus os perdoou em Cristo.',
    estudo: 'Existe algo pequeno que ainda pesa entre vocês? Talvez hoje seja o dia de soltar isso, sem precisar reabrir a discussão inteira.'
  },
  {
    referencia: '1 Pedro 4:8',
    texto: 'O amor cobre uma multidão de pecados.',
    estudo: 'Ninguém é perfeito todos os dias. O amor de vocês tem espaço pra imperfeição um do outro, ou vocês cobram perfeição demais?'
  },
  {
    referencia: 'Rute 1:16',
    texto: 'Aonde quer que fores, irei eu, e onde quer que pousares, ali pousarei eu; o teu povo é o meu povo, o teu Deus é o meu Deus.',
    estudo: 'Um dos maiores votos de lealdade da Bíblia. O que significa "ir junto" pra vocês, nessa fase específica da vida de vocês?'
  },
  {
    referencia: 'Marcos 10:9',
    texto: 'Portanto, o que Deus ajuntou, não separe o homem.',
    estudo: 'Proteger a relação também é decisão diária — de palavras, de prioridades, de com quem vocês compartilham as dores do casal.'
  },
  {
    referencia: 'Provérbios 27:17',
    texto: 'Como o ferro com o ferro se afia, assim o homem afia o rosto do seu amigo.',
    estudo: 'Um bom relacionamento também deveria te fazer crescer. Em que área seu parceiro(a) tem te ajudado a ser uma pessoa melhor?'
  },
  {
    referencia: 'Cantares 8:7',
    texto: 'As muitas águas não podem apagar este amor, nem os rios afogá-lo.',
    estudo: 'Que "águas" (cansaço, rotina, aperto financeiro) vocês já atravessaram juntos e sobreviveram? Lembrem disso quando a próxima onda vier.'
  },
  {
    referencia: 'Romanos 12:10',
    texto: 'Amem-se cordialmente uns aos outros com amor fraternal, preferindo-vos em honra uns aos outros.',
    estudo: '"Preferir em honra" é colocar o outro em primeiro lugar sem ressentimento. Onde isso apareceu entre vocês essa semana?'
  },
  {
    referencia: 'Salmos 133:1',
    texto: 'Oh, quão bom e quão suave é que os irmãos vivam em união!',
    estudo: 'União não é ausência de diferença — é escolher estar junto apesar dela. Celebrem algo simples juntos hoje, sem motivo especial.'
  },
  {
    referencia: 'Tiago 1:19',
    texto: 'Toda pessoa seja pronta para ouvir, tardia para falar, tardia para se irar.',
    estudo: 'Quem de vocês precisa treinar mais "ouvir antes de responder"? Digam um ao outro, com carinho, sem transformar isso em cobrança.'
  },
  {
    referencia: 'Provérbios 31:10-11',
    texto: 'Mulher virtuosa, quem a achará? O seu valor muito excede o de rubis. O coração do seu marido está nela confiado.',
    estudo: 'Confiança se constrói com consistência, não com grandes gestos únicos. O que reforça a confiança de vocês no dia a dia?'
  },
  {
    referencia: 'Hebreus 10:24-25',
    texto: 'E consideremo-nos uns aos outros, para nos estimularmos ao amor e às boas obras, admoestando-nos uns aos outros.',
    estudo: 'Vocês têm incentivado um ao outro a crescer (fé, saúde, sonhos) ou só têm dividido tarefas do dia a dia?'
  },
  {
    referencia: 'Provérbios 16:24',
    texto: 'Palavras suaves são favo de mel: doces para a alma, e saúde para os ossos.',
    estudo: 'Quando foi a última vez que vocês disseram algo gentil um ao outro sem motivo nenhum? Façam isso hoje, antes de terminar de ler.'
  },
  {
    referencia: '1 Tessalonicenses 5:11',
    texto: 'Por isso, exortem-se uns aos outros, e edifiquem-se uns aos outros, como já o fazem.',
    estudo: '"Edificar" é construir, não destruir com palavras no calor de uma raiva. O que vocês estão construindo juntos essa semana?'
  },
  {
    referencia: 'Provérbios 3:5-6',
    texto: 'Confia no Senhor de todo o teu coração, e não te apoies no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.',
    estudo: 'Em decisões incertas do casal, vocês costumam decidir só com a própria cabeça, ou também buscam uma direção maior?'
  },
  {
    referencia: 'Josué 24:15',
    texto: 'Eu e a minha casa serviremos ao Senhor.',
    estudo: 'Que tipo de "casa" (valores, hábitos, fé) vocês estão escolhendo construir juntos, de propósito, e não só por acaso?'
  },
  {
    referencia: 'Filipenses 4:6-7',
    texto: 'Não andem ansiosos por coisa alguma; em tudo, pela oração e súplicas, apresentem seus pedidos a Deus. E a paz de Deus, que excede todo entendimento, guardará o coração de vocês.',
    estudo: 'Existe uma preocupação do casal (financeira, familiar, de saúde) que vocês têm carregado sozinhos, em vez de trazer pra Deus e um pro outro?'
  },
  {
    referencia: 'Gálatas 6:2',
    texto: 'Levem as cargas uns dos outros, e assim cumprirão a lei de Cristo.',
    estudo: 'Qual carga (cansaço, ansiedade, um problema do trabalho) seu parceiro(a) está carregando essa semana, que você pode ajudar a dividir?'
  },

  // ---------- sobre si mesmo(a) ----------
  {
    referencia: 'Salmos 139:14',
    texto: 'Eu te louvo porque de um modo assombroso e maravilhoso me formaste; maravilhosas são as tuas obras, e a minha alma o sabe muito bem.',
    estudo: 'Antes de qualquer papel que você exerce — parceiro(a), pai, mãe, profissional — existe quem você é diante de Deus, inteiro, sem precisar provar nada. Hoje, pergunte-se com calma: o que em mim eu ainda não consegui aceitar como parte de quem sou? Não precisa responder agora — só deixe a pergunta ecoar.'
  },
  {
    referencia: 'Jeremias 29:11',
    texto: 'Porque eu bem sei os pensamentos que penso a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais.',
    estudo: 'É fácil viver comparando o próprio caminho com o de outras pessoas. Hoje, olhe pra sua trajetória sem comparação nenhuma — o que ela já te ensinou até aqui que ninguém mais poderia ter ensinado do mesmo jeito?'
  },
  {
    referencia: '2 Coríntios 12:9',
    texto: 'E disse-me: A minha graça te basta, porque o meu poder se aperfeiçoa na fraqueza.',
    estudo: 'Existe uma fraqueza sua que você insiste em esconder, até de quem te ama? Pergunte-se com honestidade o que mudaria se você deixasse essa parte ser vista — força não é ausência de fragilidade, é o que se constrói apesar dela.'
  },
  {
    referencia: 'Isaías 41:10',
    texto: 'Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus.',
    estudo: 'Qual medo você carrega hoje que nunca disse em voz alta pra ninguém? Escreva ele numa frase só, mesmo que ninguém mais leia — só nomear já tira uma parte do peso de carregar sozinho(a).'
  },
  {
    referencia: 'Salmos 46:10',
    texto: 'Aquietai-vos, e sabei que eu sou Deus.',
    estudo: 'Quando foi a última vez que você ficou em silêncio de propósito — sem tela, sem som, só quieto(a)? Experimente 3 minutos disso hoje, antes de dormir, e note o que sobe à superfície quando o barulho de fora para.'
  },
  {
    referencia: 'Provérbios 4:23',
    texto: 'Sobre tudo o que se deve guardar, guarda o teu coração, porque dele procedem as saídas da vida.',
    estudo: 'O que você tem alimentado em pensamento ultimamente — gratidão, ressentimento, medo, esperança? Isso tem moldado suas atitudes e suas palavras mais do que você imagina, muitas vezes sem perceber.'
  },
  {
    referencia: 'Gálatas 5:22-23',
    texto: 'Mas o fruto do Espírito é: amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança.',
    estudo: 'Releia essa lista devagar, uma palavra de cada vez. Qual dessas qualidades você sente que mais amadureceu em você nos últimos anos? E qual ainda está claramente em construção?'
  },
  {
    referencia: 'Eclesiastes 3:1',
    texto: 'Tudo tem o seu tempo determinado, e há tempo para todo o propósito debaixo do céu.',
    estudo: 'Existe algo em você que ainda está numa estação de espera — um sonho, uma cura, uma decisão que não amadureceu? Talvez hoje seja só o dia de aceitar que essa estação ainda não passou, sem se cobrar por isso.'
  },

  // ---------- sobre relações em geral ----------
  {
    referencia: 'João 13:34-35',
    texto: 'Um novo mandamento vos dou: que vos ameis uns aos outros, assim como eu vos amei. Nisto todos conhecerão que sois meus discípulos, se vos amardes uns aos outros.',
    estudo: 'Pense em alguém fora do seu casamento — um amigo, um familiar, um colega — que precisa sentir esse tipo de amor de você essa semana. O que, na prática, você pode fazer por essa pessoa?'
  },
  {
    referencia: 'Mateus 18:21-22',
    texto: 'Então Pedro, aproximando-se dele, disse: Senhor, até quantas vezes pecará meu irmão contra mim, e eu lhe perdoarei? Até sete? Disse-lhe Jesus: Não te digo que até sete, mas até setenta vezes sete.',
    estudo: 'Existe alguém — não necessariamente seu cônjuge — que você ainda carrega uma mágoa não resolvida? Perdão não é fingir que não doeu; é escolher soltar o peso de carregar aquilo todos os dias.'
  },
  {
    referencia: 'Romanos 12:18',
    texto: 'Se for possível, quanto estiver em vós, tende paz com todos os homens.',
    estudo: 'Pense numa relação — de família, de trabalho, de amizade — que está tensa hoje. O que depende só de você pra buscar mais paz nela, mesmo que o outro lado ainda não mude?'
  },
  {
    referencia: 'Provérbios 18:24',
    texto: 'O homem que tem amigos deve mostrar-se amigável; e há um amigo mais chegado do que um irmão.',
    estudo: 'Quando foi a última vez que você investiu tempo de verdade numa amizade, sem ser por obrigação social ou compromisso? Amizade também precisa ser regada, ou ela seca sem ninguém perceber.'
  },
  {
    referencia: '1 João 4:20',
    texto: 'Se alguém diz: Eu amo a Deus, e odeia a seu irmão, é mentiroso. Pois quem não ama a seu irmão, ao qual viu, como pode amar a Deus, a quem não viu?',
    estudo: 'O amor que dizemos ter só é real quando aparece nas relações concretas do dia a dia, com gente de carne e osso. Em qual relação sua isso está sendo mais testado agora?'
  },
  {
    referencia: 'Efésios 4:29',
    texto: 'Nenhuma palavra torpe saia da vossa boca, mas só a que for boa para edificação da fé, para que dê graça aos que a ouvem.',
    estudo: 'Pense nas últimas conversas que você teve — em casa, no trabalho, com amigos. Suas palavras, no geral, têm construído ou desgastado quem está por perto de você?'
  },

  // ---------- sobre família ----------
  {
    referencia: 'Efésios 6:4',
    texto: 'E vós, pais, não provoqueis à ira a vossos filhos, mas criai-os na disciplina e admoestação do Senhor.',
    estudo: 'Se você tem filhos, pense num momento recente em que reagiu no impulso — o que faria diferente com mais calma? Se ainda não tem, pense em como você foi criado(a): o que quer repetir, e o que quer fazer diferente.'
  },
  {
    referencia: 'Provérbios 22:6',
    texto: 'Ensina a criança no caminho em que deve andar, e, ainda quando for velho, não se desviará dele.',
    estudo: 'Que valor você mais quer que marque a criação dos seus filhos (ou futuros filhos)? Não em teoria — de que jeito prático e concreto isso pode aparecer essa semana?'
  },
  {
    referencia: 'Êxodo 20:12',
    texto: 'Honra a teu pai e a tua mãe, para que se prolonguem os teus dias na terra.',
    estudo: 'Como está sua relação com seus pais hoje? Existe algo não dito que ainda pesa entre vocês, ou algo bom que você nunca chegou a agradecer em voz alta?'
  },
  {
    referencia: 'Salmos 127:3',
    texto: 'Eis que os filhos são herança do Senhor, e o fruto do ventre o seu galardão.',
    estudo: 'Se você tem filhos, o que tem tirado sua atenção deles ultimamente, mesmo estando fisicamente perto? Se ainda não tem, pense em como você imagina proteger tempo de qualidade quando esse dia chegar.'
  },
  {
    referencia: 'Colossenses 3:20-21',
    texto: 'Vós, filhos, obedecei em tudo a vossos pais, porque isto é agradável ao Senhor. Vós, pais, não irriteis a vossos filhos, para que não se desanimem.',
    estudo: 'Pense na sua própria infância — existe algo que seus pais fizeram, bem ou mal, que moldou o adulto que você é hoje? Como isso influencia as escolhas que você faz agora, na sua própria família?'
  },
  {
    referencia: 'Provérbios 17:6',
    texto: 'Coroa dos velhos são os filhos dos filhos; e a glória dos filhos são seus pais.',
    estudo: 'Que tipo de legado de família você está construindo hoje — não em bens, mas em memórias e valores? O que você gostaria que os que vêm depois de você ainda sentissem da sua história?'
  }
];

module.exports = devotionalBank;
