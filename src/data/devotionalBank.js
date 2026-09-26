// DEVOCIONAL DO CASAL — um versículo curto + um pequeno estudo prático,
// pensados pra serem lidos juntos, todos os dias. Conteúdo fixo (sem custo
// de IA), com um novo devocional a cada dia numa rotação — ver
// src/routes/devotional.js pra como o dia de hoje é escolhido.

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
  }
];

module.exports = devotionalBank;
