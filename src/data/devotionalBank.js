// DEVOCIONAL DO CASAL — um estudo pra ser lido junto, todo santo dia
// (inclusive fim de semana), por um período de 3 meses. Conteúdo fixo (sem
// custo de IA), com um novo devocional por dia numa rotação — ver
// src/routes/devotional.js pra como o dia de hoje é escolhido (e pra como
// o fim do período de 3 meses é tratado).
//
// Cada entrada tem `versiculos` (um array — quase sempre 1, às vezes 2
// quando um segundo texto realmente aprofunda o primeiro, nunca só pra
// encher) e um `estudo` mais longo: um pouco de contexto, a ligação com a
// vida real, e um convite genuíno de reflexão — não só uma pergunta rápida
// de sim ou não. O banco cobre quatro frentes: o casal, quem cada um é
// individualmente, as relações ao redor (amizade, perdão, comunidade) e a
// família (filhos, pais, o que se herda e o que se escolhe repetir).

const devotionalBank = [
  // ---------- sobre o casal ----------
  {
    versiculos: [
      { referencia: 'João 15:12', texto: 'Amem-se uns aos outros, assim como eu os amei.' },
      { referencia: 'João 15:13', texto: 'Ninguém tem maior amor do que este: de dar alguém a sua vida pelos seus amigos.' }
    ],
    estudo: 'Jesus não deixa o "como amar" em aberto — ele dá a régua: "assim como eu os amei". Isso é amor que se doa antes de cobrar retorno, que continua mesmo quando não é conveniente. No casamento, é fácil o amor virar troca — eu faço isso, você faz aquilo. Hoje, façam um pelo outro algo que não seria "obrigação de casal", só porque decidiram amar assim. Percebam o que muda quando o gesto não espera nada de volta.'
  },
  {
    versiculos: [
      { referencia: '1 Coríntios 13:4-5', texto: 'O amor é paciente, é bondoso; não inveja, não se vangloria, não se orgulha. Não maltrata, não busca seus próprios interesses, não se ira facilmente, não guarda rancor.' }
    ],
    estudo: 'Esse trecho é lido em quase todo casamento, mas raramente é revisitado depois — e é aí que ele mais serve. Não é uma descrição de sentimento, é uma lista de escolhas diárias. Releiam juntos, devagar, palavra por palavra, e perguntem um ao outro com honestidade: qual dessas a gente mais precisa treinar essa semana, não em teoria, mas na próxima situação real que vier?'
  },
  {
    versiculos: [
      { referencia: 'Eclesiastes 4:9-10', texto: 'Melhor é serem dois do que um, porque têm melhor paga do seu trabalho. Se um cair, o outro levanta o seu companheiro; mas ai do que está só, pois, caindo, não haverá quem o levante.' }
    ],
    estudo: 'O texto não fala de romance — fala de sustento mútuo em momentos difíceis, o tipo de apoio que só aparece quando alguém realmente cai. Pensem juntos: qual foi a última vez que um de vocês "caiu" — cansaço, um erro, uma notícia ruim — e o outro segurou, mesmo sem ser pedido? Digam isso em voz alta um pro outro. Gratidão nomeada fortalece mais do que gratidão sentida em silêncio.'
  },
  {
    versiculos: [
      { referencia: 'Colossenses 3:12-14', texto: 'Revestam-se, pois, como eleitos de Deus, santos e amados, de profunda compaixão, bondade, humildade, mansidão e paciência... Acima de tudo, porém, revistam-se do amor, que é o vínculo da perfeição.' }
    ],
    estudo: 'Repare na ordem: primeiro vem uma lista de virtudes que se aprendem e se praticam — compaixão, bondade, paciência — e só depois o amor aparece como o que amarra tudo isso junto, como um cinto que segura uma roupa inteira. Ou seja, amor sem essas outras peças desamarra fácil. Qual dessas peças está mais frouxa entre vocês agora — a paciência, a mansidão, a humildade? Escolham uma pra fortalecer essa semana, de propósito.'
  },
  {
    versiculos: [
      { referencia: 'Provérbios 15:1', texto: 'A resposta branda desvia o furor, mas a palavra dura suscita a ira.' }
    ],
    estudo: 'Esse provérbio não promete que a resposta branda evita todo conflito — promete que ela desvia o furor, o ponto de ebulição que transforma uma diferença em briga. A palavra dura, mesmo quando "tem razão", geralmente alimenta o incêndio que já estava aceso. Combinem agora, enquanto estão calmos, um sinal simples que qualquer um dos dois possa usar no meio de uma discussão esquentando — uma palavra, um gesto — pra lembrar o outro (e a si mesmo) de responder brando.'
  },
  {
    versiculos: [
      { referencia: 'Gênesis 2:24', texto: 'Por isso deixará o homem pai e mãe, e se unirá à sua mulher, e serão uma só carne.' }
    ],
    estudo: '"Unir-se" é o verbo original por trás dessa frase, e ele carrega a ideia de colar, de grudar com força — não é um estado que se atinge uma vez no altar e permanece sozinho depois. "Deixar" pai e mãe também é ativo: significa que a lealdade número um do casal precisa ser um com o outro, antes até da própria família de origem, quando os dois entram em conflito. Existe hoje alguma prioridade — trabalho, família de origem, hábito antigo — competindo com essa união? O que vocês podem fazer essa semana pra se sentir mais "uma só carne" do que ontem?'
  },
  {
    versiculos: [
      { referencia: 'Filipenses 2:3-4', texto: 'Nada façam por rivalidade ou vanglória, mas com humildade, considerando cada um os outros superiores a si mesmo, olhando não somente para o que é seu, mas também para o que é dos outros.' }
    ],
    estudo: '"Considerar o outro superior a si mesmo" não é se anular — é o oposto de competir por quem cedeu mais, quem trabalhou mais, quem está certo com mais frequência. É uma escolha de atenção: olhar pro interesse do outro com a mesma seriedade que se olha pro próprio. Hoje, perguntem um ao outro: "o que você mais precisa de mim essa semana?" — e escutem de verdade a resposta, sem já formular a réplica enquanto o outro ainda fala.'
  },
  {
    versiculos: [
      { referencia: 'Efésios 4:31-32', texto: 'Toda amargura, e cólera, e ira, e gritaria, e blasfêmias sejam tiradas dentre vós... Sede uns para com os outros benignos, misericordiosos, perdoando-se uns aos outros, como também Deus vos perdoou em Cristo.' }
    ],
    estudo: 'O texto pede pra "tirar" a amargura antes de pedir bondade — como se dissesse que perdão de verdade exige um passo de remoção, não só um sentimento bonito por cima de uma mágoa intacta. Existe algo pequeno (ou não tão pequeno) que ainda pesa entre vocês, guardado, não resolvido? Talvez hoje seja o dia de nomear isso — não pra reabrir a discussão inteira, mas pra soltar o que ainda está sendo carregado em silêncio.'
  },
  {
    versiculos: [
      { referencia: '1 Pedro 4:8', texto: 'Sobretudo, tende ardente amor uns para com os outros, porque o amor cobre uma multidão de pecados.' }
    ],
    estudo: '"Cobrir" aqui não é fingir que nada aconteceu — é a escolha de não ficar catalogando cada falha do outro como prova contra ele. Casais que duram constroem esse tipo de amor generoso, que não precisa fazer justiça de cada deslize. Vocês têm espaço pra imperfeição um do outro, ou cobram perfeição demais, guardando uma lista mental de pontos contra? Conversem sobre isso com honestidade hoje.'
  },
  {
    versiculos: [
      { referencia: 'Rute 1:16-17', texto: 'Aonde quer que fores, irei eu, e onde quer que pousares, ali pousarei eu; o teu povo é o meu povo, o teu Deus é o meu Deus. Onde quer que morreres, morrerei eu, e ali serei sepultada.' }
    ],
    estudo: 'Rute diz isso pra sogra, não pro marido — é um dos votos de lealdade mais intensos da Bíblia, e nasce de uma escolha, não de uma obrigação (Rute podia ter voltado pra sua terra, e quase o fez). Lealdade real é o que sobra depois que a opção fácil de sair já foi considerada e recusada. O que significa "ir junto" pra vocês, especificamente nessa fase da vida que estão vivendo agora — não em teoria, no que está acontecendo essa semana?'
  },
  {
    versiculos: [
      { referencia: 'Marcos 10:8-9', texto: 'E já não são mais dois, mas uma só carne. Portanto, o que Deus ajuntou, não separe o homem.' }
    ],
    estudo: '"Não separe o homem" é dito no plural das forças que corroem uma relação aos poucos — não só o divórcio formal, mas cada pequena escolha que distancia: uma prioridade colocada acima da outra pessoa, um segredo guardado, uma pessoa de fora recebendo a intimidade que deveria ser só do casal. Proteger a relação é decisão diária, feita de palavras, de tempo e de com quem vocês compartilham as dores do casamento. Existe algo, hoje, ameaçando essa união aos poucos, sem parecer grave?'
  },
  {
    versiculos: [
      { referencia: 'Provérbios 27:17', texto: 'Como o ferro com o ferro se afia, assim o homem afia o rosto do seu amigo.' }
    ],
    estudo: 'Afiar ferro com ferro gera atrito, faísca — o processo não é confortável, mas é o que deixa a lâmina útil. Um casamento saudável também deveria ter esse efeito: te deixar melhor, mais afiado, não mais acomodado. Em que área específica seu parceiro(a) tem te ajudado a crescer — te desafiando, te corrigindo com amor, te tirando da zona de conforto? Digam isso um ao outro hoje, como reconhecimento, não como cobrança.'
  },
  {
    versiculos: [
      { referencia: 'Cantares 8:6-7', texto: 'Põe-me como selo sobre o teu coração... porque o amor é forte como a morte... As muitas águas não podem apagar este amor, nem os rios afogá-lo.' }
    ],
    estudo: 'Cantares dos Cânticos é o único livro da Bíblia inteiramente dedicado ao amor humano, físico e emocional, sem vergonha disso — vale lembrar que desejo e intimidade fazem parte do plano, não são um "apesar de". A imagem das "muitas águas" fala de tudo que tenta apagar um amor: cansaço, rotina, aperto financeiro, tempo. Que águas vocês já atravessaram juntos e sobreviveram? Lembrem disso concretamente quando a próxima onda vier — porque ela vem.'
  },
  {
    versiculos: [
      { referencia: 'Romanos 12:10', texto: 'Amem-se cordialmente uns aos outros com amor fraternal, preferindo-vos em honra uns aos outros.' }
    ],
    estudo: '"Preferir em honra" é um hábito, não um sentimento — é a prática de dar ao outro o crédito, o espaço, a palavra final, sem guardar isso como um placar de quem cedeu mais vezes. É fácil fazer isso quando custa pouco; o teste real é quando custa alguma coisa de verdade — tempo, orgulho, vontade própria. Onde isso apareceu entre vocês essa semana? E onde ainda falta?'
  },
  {
    versiculos: [
      { referencia: 'Salmos 133:1', texto: 'Oh, quão bom e quão suave é que os irmãos vivam em união!' }
    ],
    estudo: 'O salmo celebra união como algo raro e bom de se ver — não como algo automático entre pessoas que se amam. União não é ausência de diferença; casais unidos continuam discordando de coisas, só que escolhem estar juntos apesar disso, repetidamente. Hoje, sem motivo especial nenhum, celebrem algo simples juntos — um café mais devagar, uma piada antiga, uma caminhada curta. Não precisa de ocasião pra ser bom.'
  },
  {
    versiculos: [
      { referencia: 'Tiago 1:19', texto: 'Sabei isto, meus amados irmãos: todo homem seja pronto para ouvir, tardio para falar, tardio para se irar.' }
    ],
    estudo: 'A ordem importa: ouvir vem primeiro, falar depois, e a ira fica por último — quase como se o texto estivesse dizendo que boa parte da raiva nasce de gente que fala rápido demais sobre algo que não ouviu direito. Qual de vocês dois precisa treinar mais "ouvir antes de responder"? Digam isso um ao outro com carinho hoje — não como cobrança, mas como um convite a crescer juntos nisso.'
  },
  {
    versiculos: [
      { referencia: 'Provérbios 31:10-11', texto: 'Mulher virtuosa, quem a achará? O seu valor muito excede o de rubis. O coração do seu marido está nela confiado, e não haverá falta de ganho.' }
    ],
    estudo: 'Esse poema descreve uma mulher cuja confiabilidade é tão constante que o marido literalmente descansa nela — não é sobre um momento heroico, é sobre décadas de consistência acumulada. Confiança real não se constrói com grandes gestos isolados, se constrói em pequenas entregas repetidas: fazer o que se promete, dizer a verdade mesmo quando incômoda, estar presente quando se diz que vai estar. O que, no dia a dia de vocês, reforça essa confiança? E o que, silenciosamente, a corrói?'
  },
  {
    versiculos: [
      { referencia: 'Hebreus 10:24-25', texto: 'E consideremo-nos uns aos outros, para nos estimularmos ao amor e às boas obras, não deixando a nossa congregação... mas admoestando-nos uns aos outros.' }
    ],
    estudo: '"Estimular" no texto original tem uma força quase provocadora — é empurrar o outro pra frente, de propósito, não só torcer passivamente por ele. Um casamento saudável funciona assim: cada um puxando o outro pra ser mais e melhor, não só dividindo a lista de tarefas da semana. Vocês têm incentivado um ao outro a crescer — na fé, na saúde, num sonho parado — ou a relação virou só administração do cotidiano?'
  },
  {
    versiculos: [
      { referencia: 'Provérbios 16:24', texto: 'Palavras suaves são favo de mel: doces para a alma, e saúde para os ossos.' }
    ],
    estudo: 'A imagem é física de propósito — o texto não diz que palavras gentis são "legais", diz que elas curam algo no corpo, nos ossos. Palavras têm peso biológico real: elas relaxam ou tensionam, aproximam ou afastam, de um jeito que o corpo sente antes da mente processar. Quando foi a última vez que vocês disseram algo gentil um ao outro sem motivo nenhum, só porque sim? Façam isso agora, antes de terminar de ler essa frase.'
  },
  {
    versiculos: [
      { referencia: '1 Tessalonicenses 5:11', texto: 'Por isso, exortai-vos uns aos outros, e edificai-vos uns aos outros, como já o fazeis.' }
    ],
    estudo: '"Edificar" é vocabulário de construção — tijolo sobre tijolo, com intenção e método, não por acaso. O oposto também é possível: cada crítica no calor de uma raiva, cada comentário sarcástico "de brincadeira", vai tirando tijolo da mesma construção. Façam um balanço honesto: as palavras que vocês têm trocado essa semana, no geral, constroem ou desgastam? O que dá pra ajustar a partir de hoje?'
  },
  {
    versiculos: [
      { referencia: 'Provérbios 3:5-6', texto: 'Confia no Senhor de todo o teu coração, e não te apoies no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.' }
    ],
    estudo: 'O provérbio não pede pra desligar a razão — pede pra não fazer dela o único apoio, especialmente nas decisões grandes e incertas do casal (mudança, dinheiro, filhos, saúde). "Reconhecê-lo em todos os caminhos" é um hábito de trazer Deus pra dentro da decisão, não só rezar depois que ela já foi tomada sozinho. Em decisões incertas, vocês costumam decidir só com a própria cabeça, na pressa, ou também abrem espaço pra buscar uma direção maior, com calma, juntos?'
  },
  {
    versiculos: [
      { referencia: 'Josué 24:15', texto: 'Porém, se vos parece mal aos vossos olhos servir ao Senhor, escolhei hoje a quem sirvais... Eu, porém, e a minha casa serviremos ao Senhor.' }
    ],
    estudo: 'Josué fala isso depois de décadas de liderança, como uma declaração deliberada sobre o rumo da própria família — não como algo que "aconteceu", mas como algo escolhido, publicamente, de propósito. Toda casa serve a alguma coisa, mesmo quando ninguém decide isso conscientemente: trabalho, aparência, conforto, aprovação. Que tipo de "casa" — valores, hábitos, fé, prioridades — vocês estão de fato construindo juntos hoje? É a que vocês escolheriam se parassem pra escolher de propósito, ou é a que simplesmente foi sobrando?'
  },
  {
    versiculos: [
      { referencia: 'Filipenses 4:6-7', texto: 'Não andeis ansiosos por coisa alguma; antes, as vossas petições sejam em tudo conhecidas diante de Deus... E a paz de Deus, que excede todo o entendimento, guardará os vossos corações.' }
    ],
    estudo: 'Repare que a promessa não é "e o problema vai desaparecer" — é que a paz vai guardar o coração, mesmo com o problema ainda ali. Isso muda a pergunta: não é sobre resolver toda ansiedade antes de ter paz, é sobre trazer a preocupação pra luz, em vez de carregá-la escondida. Existe uma preocupação do casal — financeira, familiar, de saúde — que vocês têm segurado sozinhos, cada um por dentro, em vez de trazer um pro outro e pra Deus juntos?'
  },
  {
    versiculos: [
      { referencia: 'Gálatas 6:2', texto: 'Levai as cargas uns dos outros, e assim cumprireis a lei de Cristo.' }
    ],
    estudo: 'O verbo aqui é sobre carregar peso físico, literalmente — não é um conselho abstrato, é uma instrução prática de dividir fardo real. Nem toda carga do parceiro(a) precisa ser resolvida por você; muitas vezes só precisa ser percebida e compartilhada. Qual carga — cansaço, ansiedade, um problema do trabalho, uma preocupação que não sai da cabeça — seu parceiro(a) está carregando essa semana, que você pode ajudar a dividir, mesmo sem resolver?'
  },

  // ---------- sobre si mesmo(a) ----------
  {
    versiculos: [
      { referencia: 'Salmos 139:13-14', texto: 'Pois formaste o meu interior, e me teceste no ventre de minha mãe... Eu te louvo porque de um modo assombroso e maravilhoso me formaste; maravilhosas são as tuas obras, e a minha alma o sabe muito bem.' }
    ],
    estudo: 'O salmista não louva por um feito ou conquista — louva pela própria existência, tecida com intenção antes mesmo de nascer. Antes de qualquer papel que você exerce hoje — parceiro(a), pai, mãe, profissional — existe quem você é diante de Deus, inteiro, sem precisar provar nada pra merecer esse valor. Pergunte-se com calma: o que em mim eu ainda não consegui aceitar como parte de quem sou? Não precisa responder agora — só deixe a pergunta ecoar durante o dia.'
  },
  {
    versiculos: [
      { referencia: 'Jeremias 29:11', texto: 'Porque eu bem sei os pensamentos que penso a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais.' }
    ],
    estudo: 'Essa promessa foi escrita pro povo de Israel no exílio, num momento em que o futuro parecia incerto e distante — não é uma frase de conforto vazio, é uma palavra dita bem no meio da espera difícil. É fácil viver comparando o próprio caminho com o de outras pessoas, como se o ritmo delas fosse a régua certa. Hoje, olhe pra sua trajetória sem comparação nenhuma — o que ela já te ensinou até aqui que ninguém mais poderia ter ensinado do mesmo jeito?'
  },
  {
    versiculos: [
      { referencia: '2 Coríntios 12:9', texto: 'E disse-me: A minha graça te basta, porque o meu poder se aperfeiçoa na fraqueza. De boa vontade, pois, me gloriarei nas minhas fraquezas, para que em mim habite o poder de Cristo.' }
    ],
    estudo: 'Paulo pediu três vezes pra ter essa fraqueza removida e a resposta foi "não" — mas veio junto uma reformulação completa do que a fraqueza significa. Existe uma fraqueza sua que você insiste em esconder, até de quem te ama? Pergunte-se com honestidade o que mudaria se você deixasse essa parte ser vista, em vez de gastar energia escondendo-a. Força de verdade não é ausência de fragilidade — é o que se constrói apesar dela, e às vezes por causa dela.'
  },
  {
    versiculos: [
      { referencia: 'Isaías 41:10', texto: 'Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.' }
    ],
    estudo: 'O "não temas" não vem sozinho — vem cercado de três verbos concretos: fortalecer, ajudar, sustentar. Não é só uma ordem pra parar de sentir medo, é uma promessa de companhia ativa dentro do medo. Qual medo você carrega hoje que nunca disse em voz alta pra ninguém? Escreva ele numa frase só, mesmo que ninguém mais leia — só nomear já tira uma parte do peso de carregar sozinho(a).'
  },
  {
    versiculos: [
      { referencia: 'Salmos 46:10', texto: 'Aquietai-vos, e sabei que eu sou Deus; serei exaltado entre as nações; serei exaltado na terra.' }
    ],
    estudo: 'O salmo inteiro fala de terremotos, guerra, caos — e é bem nesse cenário que vem o convite pra aquietar-se, não num momento de calmaria. Quietude, aqui, não é a ausência de problema, é uma escolha feita apesar dele. Quando foi a última vez que você ficou em silêncio de propósito — sem tela, sem som, só quieto(a)? Experimente 3 minutos disso hoje, antes de dormir, e note o que sobe à superfície quando o barulho de fora para.'
  },
  {
    versiculos: [
      { referencia: 'Provérbios 4:23', texto: 'Sobre tudo o que se deve guardar, guarda o teu coração, porque dele procedem as saídas da vida.' }
    ],
    estudo: 'Na cultura em que esse provérbio foi escrito, o coração não era só o lugar do sentimento — era o centro de decisão, de vontade, de tudo que uma pessoa faz. Guardá-lo, então, é vigiar não apenas o que se sente, mas o que se deixa entrar e se repetir ali dentro. O que você tem alimentado em pensamento ultimamente — gratidão, ressentimento, medo, esperança? Isso tem moldado suas atitudes e suas palavras mais do que você imagina, muitas vezes sem perceber.'
  },
  {
    versiculos: [
      { referencia: 'Gálatas 5:22-23', texto: 'Mas o fruto do Espírito é: amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança; contra estas coisas não há lei.' }
    ],
    estudo: 'É "fruto", no singular, e não "frutos" — como se essas nove qualidades crescessem juntas, do mesmo tronco, e não pudessem ser escolhidas separadamente como um cardápio. Não dá pra ter só paciência sem também crescer em mansidão; um puxa o outro. Releia a lista devagar, uma palavra de cada vez. Qual dessas qualidades você sente que mais amadureceu em você nos últimos anos? E qual ainda está claramente em construção, pedindo mais atenção?'
  },
  {
    versiculos: [
      { referencia: 'Eclesiastes 3:1', texto: 'Tudo tem o seu tempo determinado, e há tempo para todo o propósito debaixo do céu.' },
      { referencia: 'Eclesiastes 3:11', texto: 'Tudo fez formoso em seu tempo; também pôs no coração do homem a ideia da eternidade, sem que este possa descobrir a obra que Deus fez desde o princípio até ao fim.' }
    ],
    estudo: 'O livro inteiro de Eclesiastes é sobre aceitar que nem tudo se resolve ou se entende dentro do prazo que a gente gostaria. Existe algo em você que ainda está numa estação de espera — um sonho, uma cura, uma decisão que não amadureceu? A promessa não é que você vai entender o tempo de Deus agora; é que existe um tempo, mesmo quando invisível. Talvez hoje seja só o dia de aceitar que essa estação ainda não passou, sem se cobrar por isso.'
  },

  // ---------- sobre relações em geral ----------
  {
    versiculos: [
      { referencia: 'João 13:34-35', texto: 'Um novo mandamento vos dou: que vos ameis uns aos outros; assim como eu vos amei, que também vós ameis uns aos outros. Nisto todos conhecerão que sois meus discípulos, se vos amardes uns aos outros.' }
    ],
    estudo: 'Jesus diz isso logo depois de lavar os pés dos discípulos — o "assim como eu vos amei" vem com uma cena concreta de serviço, não é uma frase abstrata. E o marcador de identidade que ele escolhe não é doutrina, é o jeito como as pessoas se tratam. Pense em alguém fora do seu casamento — um amigo, um familiar, um colega — que precisa sentir esse tipo de amor de você essa semana. O que, na prática, você pode fazer por essa pessoa, não só sentir por ela?'
  },
  {
    versiculos: [
      { referencia: 'Mateus 18:21-22', texto: 'Então Pedro, aproximando-se dele, disse: Senhor, até quantas vezes pecará meu irmão contra mim, e eu lhe perdoarei? Até sete? Disse-lhe Jesus: Não te digo que até sete, mas até setenta vezes sete.' }
    ],
    estudo: 'Pedro já estava sendo generoso ao propor sete vezes — a resposta de Jesus não é um número literal pra contar, é uma forma de dizer "pare de contar". Perdão contado é perdão condicional, que acaba um dia. Existe alguém — não necessariamente seu cônjuge — que você ainda carrega uma mágoa não resolvida, talvez já catalogada mentalmente? Perdão não é fingir que não doeu; é escolher soltar o peso de carregar aquilo todos os dias, mesmo sem apagar o que aconteceu.'
  },
  {
    versiculos: [
      { referencia: 'Romanos 12:18', texto: 'Se for possível, quanto estiver em vós, tende paz com todos os homens.' }
    ],
    estudo: 'O texto tem duas ressalvas importantes: "se for possível" e "quanto estiver em vós" — reconhecendo que paz não depende só de você, e às vezes de fato não é possível. Mas a parte que depende de você, essa é uma responsabilidade real, não uma sugestão. Pense numa relação — de família, de trabalho, de amizade — que está tensa hoje. O que depende só de você pra buscar mais paz nela, mesmo que o outro lado ainda não mude ou nem perceba o esforço?'
  },
  {
    versiculos: [
      { referencia: 'Provérbios 18:24', texto: 'O homem que tem amigos deve mostrar-se amigável; e há um amigo mais chegado do que um irmão.' }
    ],
    estudo: 'A primeira metade do provérbio é uma condição, não uma garantia: ter bons amigos exige primeiro ser esse tipo de amigo, ativamente, e não só esperar que apareçam. Amizade que dura como a de um irmão não acontece por acidente — é regada com tempo investido, presença repetida, disponibilidade real. Quando foi a última vez que você investiu tempo de verdade numa amizade, sem ser por obrigação social ou compromisso? Amizade também precisa ser regada, ou ela seca sem ninguém perceber até ser tarde.'
  },
  {
    versiculos: [
      { referencia: '1 João 4:20-21', texto: 'Se alguém diz: Eu amo a Deus, e odeia a seu irmão, é mentiroso... E dele temos este mandamento: que quem ama a Deus, ame também seu irmão.' }
    ],
    estudo: 'João não deixa margem pra amor de Deus abstrato, separado das relações reais — chama de mentira qualquer amor que não aparece em como se trata quem está por perto, de carne e osso. É mais fácil amar a humanidade em geral do que amar a pessoa específica que te irritou ontem. O amor que dizemos ter só é real quando aparece nas relações concretas do dia a dia. Em qual relação sua isso está sendo mais testado agora, hoje mesmo?'
  },
  {
    versiculos: [
      { referencia: 'Efésios 4:29', texto: 'Nenhuma palavra torpe saia da vossa boca, mas só a que for boa para edificação da fé, para que dê graça aos que a ouvem.' }
    ],
    estudo: 'O padrão que o texto propõe não é só "não falar coisa ruim" — é mais alto do que isso: que a palavra sirva pra edificar e dar graça a quem ouve, um padrão ativo, não só a ausência de mal. Pense nas últimas conversas que você teve — em casa, no trabalho, com amigos. Suas palavras, no geral, têm construído ou desgastado quem está por perto de você? Escolha uma conversa de hoje pra praticar isso de propósito.'
  },

  // ---------- sobre família ----------
  {
    versiculos: [
      { referencia: 'Efésios 6:4', texto: 'E vós, pais, não provoqueis à ira a vossos filhos, mas criai-os na disciplina e admoestação do Senhor.' }
    ],
    estudo: 'O versículo tem duas partes que precisam andar juntas: não provocar à ira (o cuidado com o tom, a paciência, a justiça) e ainda assim criar com disciplina (não é ausência de limite). Um sem o outro desequilibra. Se você tem filhos, pense num momento recente em que reagiu no impulso — o que faria diferente com mais calma? Se ainda não tem, pense em como você foi criado(a): o que quer repetir, e o que quer conscientemente fazer diferente.'
  },
  {
    versiculos: [
      { referencia: 'Provérbios 22:6', texto: 'Ensina a criança no caminho em que deve andar, e, ainda quando for velho, não se desviará dele.' }
    ],
    estudo: 'A palavra traduzida como "ensina" tem raiz em "iniciar, dedicar" — mais próxima de formar um hábito do que de dar uma instrução pontual. Não é uma promessa mágica e automática, é sobre a força de uma formação consistente e repetida ao longo dos anos. Que valor você mais quer que marque a criação dos seus filhos (ou futuros filhos)? Não em teoria — de que jeito prático e concreto isso pode aparecer nessa semana específica, em uma ação real?'
  },
  {
    versiculos: [
      { referencia: 'Êxodo 20:12', texto: 'Honra a teu pai e a tua mãe, para que se prolonguem os teus dias na terra que o Senhor teu Deus te dá.' }
    ],
    estudo: 'Esse é o único dos dez mandamentos que vem com uma promessa anexada — um sinal de quanto peso essa relação carrega. "Honrar" não exige que a relação tenha sido perfeita; é possível honrar um pai ou mãe imperfeitos sem negar o que doeu. Como está sua relação com seus pais hoje? Existe algo não dito que ainda pesa entre vocês, ou algo bom que você nunca chegou a agradecer em voz alta, por vergonha ou pressa?'
  },
  {
    versiculos: [
      { referencia: 'Salmos 127:3-4', texto: 'Eis que os filhos são herança do Senhor, e o fruto do ventre o seu galardão. Como flechas na mão de um homem valente, assim são os filhos da mocidade.' }
    ],
    estudo: 'A imagem das flechas é interessante: uma flecha só serve bem se for cuidadosamente preparada e depois apontada e soltada, na direção certa, no momento certo — não segurada pra sempre. Criar filhos envolve esse equilíbrio entre investir de perto e, aos poucos, soltar. Se você tem filhos, o que tem tirado sua atenção deles ultimamente, mesmo estando fisicamente perto? Se ainda não tem, pense em como você imagina proteger tempo de qualidade quando esse dia chegar.'
  },
  {
    versiculos: [
      { referencia: 'Colossenses 3:20-21', texto: 'Vós, filhos, obedecei em tudo a vossos pais, porque isto é agradável ao Senhor. Vós, pais, não irriteis a vossos filhos, para que não se desanimem.' }
    ],
    estudo: 'De novo aparece essa dupla responsabilidade: uma instrução pros filhos, e logo em seguida uma pros pais — "para que não se desanimem" reconhece que cobrança sem cuidado quebra alguma coisa por dentro de uma criança, não só a comporta. Pense na sua própria infância — existe algo que seus pais fizeram, bem ou mal, que moldou o adulto que você é hoje? Como isso influencia, consciente ou inconscientemente, as escolhas que você faz agora, na sua própria família?'
  },
  {
    versiculos: [
      { referencia: 'Provérbios 17:6', texto: 'Coroa dos velhos são os filhos dos filhos; e a glória dos filhos são seus pais.' }
    ],
    estudo: 'O provérbio descreve uma corrente de honra que atravessa gerações nas duas direções — avós se orgulham dos netos, filhos encontram glória (não vergonha) nos próprios pais. É uma imagem de família como algo que se constrói ao longo do tempo, não só no presente imediato. Que tipo de legado de família você está construindo hoje — não em bens, mas em memórias e valores? O que você gostaria que os que vêm depois de você ainda sentissem, contassem ou repetissem da sua história?'
  }
];

module.exports = devotionalBank;
