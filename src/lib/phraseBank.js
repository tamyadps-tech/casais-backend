// BANCO DE FRASES — variações de conselho, escritas pra durarem 3 meses
// (~13 semanas, 2 dicas por semana) sem repetir a mesma frase em sequência.
// ==========================================
// crossRules.js já decide O FATO (determinístico, sem IA). Este arquivo só
// cobre a segunda metade — a frase de conselho que acompanha o fato — com
// várias opções por categoria (`variant_key`, atribuído em crossRules.js).
// A rotação (qual variação usar dessa vez) é round-robin, guardada por
// casal em store.js (nextPhraseVariant) — nunca repete a mesma variação
// duas vezes seguidas dentro da mesma categoria.
//
// Placeholders: {{sobre}} e {{alvo}} são substituídos pelo nome real na
// hora de montar a dica (ver resolveConselho, no fim deste arquivo).
//
// Isso não substitui a IA — só garante variedade mesmo se a chave da
// Claude API não estiver configurada (modo mock) ou se quisermos parar de
// depender dela no dia a dia.

const store = require('./store');

const BANKS = {
  // ---------- valores e vida a dois (por nível de compatibilidade) ----------
  valores_alta: [
    'Guarda esse ponto em comum com carinho — ele vai ser uma base forte pra quando surgir alguma dúvida sobre o futuro de vocês.',
    'Vale celebrar isso hoje mesmo: manda uma mensagem pra {{sobre}} lembrando que vocês pensam parecido nesse ponto.',
    'Da próxima vez que bater insegurança sobre esse assunto, lembra desse alinhamento — vocês já remam na mesma direção aqui.',
    'Não precisa fazer nada demais, só reconhecer: isso é um chão firme que vocês constroem juntos, dia após dia.',
    'Aproveita esse alinhamento pra sonhar um pouco mais alto juntos nesse assunto — vocês têm terreno seguro pra isso.',
    'Um bom jeito de fortalecer isso é comentar com {{sobre}}, de vez em quando, o quanto essa sintonia te deixa tranquilo(a).',
    'Guarda essa certeza pro dia em que a rotina apertar — saber que vocês concordam aqui já é um alívio a menos pra carregar.',
    'Vale a pena voltar nesse ponto quando estiverem planejando o futuro — é uma base sólida pra construir em cima.',
    'Isso é o tipo de coisa que não precisa de discussão, só de gratidão — vocês já chegaram no mesmo lugar sozinhos.',
    'Deixa esse alinhamento te dar confiança nos momentos de dúvida — nem tudo precisa ser conversado do zero, isso vocês já resolveram.',
    'Comenta com {{sobre}} que percebeu essa sintonia — reconhecer em voz alta fortalece ainda mais o que já é sólido.',
    'Esse é um dos pontos que vale lembrar quando um dia acharem que estão discordando de tudo — aqui, pelo menos, vocês já concordam.',
    'Não deixa esse tipo de alinhamento passar batido — geralmente a gente só nota o que falta, e esquece de celebrar o que já funciona.',
    'Usa essa base como ponto de partida pra planejar o próximo passo de vocês nesse assunto, com mais leveza.',
    'Vale um mimo (ou um chocolate) só por isso — sintonia como essa não é tão comum assim, e merece ser celebrada.',
    'Confia nesse alinhamento nos dias mais estressados — é um dos motivos pra sentir que estão no caminho certo, juntos.',
    'Da próxima vez que decidirem algo relacionado a isso, vão com mais leveza — vocês já sabem que estão do mesmo lado.',
    'Guarda essa resposta na memória — ela pode ser um lembrete bom pros dias em que tudo parecer mais difícil entre vocês.',
    'Não custa nada reforçar isso com {{sobre}}: dizer que ficou feliz ao perceber que pensam parecido já é um gesto e tanto.',
    'Deixa esse ponto de acordo ser um descanso — nem tudo em uma relação precisa ser negociado, e isso aqui já está resolvido.'
  ],
  valores_boa: [
    'Já é um baita começo ter esse tanto em comum — vale usar isso como base pra entender com calma o que ainda diverge.',
    'Vocês não pensam igual em tudo aqui, mas o que já é comum já ajuda bastante — segue construindo a partir disso.',
    'Essa sobreposição já é sinal de que estão mais alinhados do que parece — o resto dá pra ir ajustando com conversa, sem pressa.',
    'Guarda o que já é igual como ponto de partida e usa isso pra chegar mais perto no que ainda difere.',
    'Não precisa que tudo bata 100% — o que já combina aqui é suficiente pra seguirem construindo juntos.',
    'Vale nomear pra {{sobre}} o que já é igual entre vocês, antes de entrar no que ainda diverge.',
    'Esse ponto em comum já é uma boa base — o resto é só questão de conversar com calma, sem cobrança.',
    'Aproveita que já tem alinhamento parcial aqui pra abrir uma conversa leve sobre o que falta se encontrar.',
    'Não é tudo igual, mas o suficiente já é igual — foca no que já funciona antes de mexer no que ainda não combina.',
    'Um bom próximo passo é comentar com {{sobre}} o que bateu igual — isso deixa o que ainda diverge mais fácil de conversar.',
    'Vocês já compartilham uma parte importante disso — dá pra usar como ponto de apoio quando surgir alguma diferença.',
    'Não subestima esse tanto de coisa em comum — mesmo parcial, já é terreno suficiente pra seguir alinhando o resto com o tempo.'
  ],
  valores_atencao: [
    'Não precisa resolver isso hoje — só vale abrir espaço pra entender com calma o porquê de cada resposta.',
    'Visões diferentes aqui não significam problema, só um assunto que ainda merece uma boa conversa entre vocês dois.',
    'Antes de decidir qualquer coisa, vale simplesmente perguntar a {{sobre}} o que está por trás dessa resposta.',
    'Esse é um bom tema pra colocar na mesa num momento tranquilo, sem pressa de já chegar numa conclusão.',
    'Divergir aqui não é sinal de alarme — é só um convite pra se conhecerem um pouco mais fundo nesse assunto.',
    'Vale a curiosidade genuína: pergunta pra {{sobre}} o que fez pensar assim, sem julgar a resposta.',
    'Guarda esse tema pra uma conversa calma — não precisa ser hoje, mas também não vale deixar pra sempre depois.',
    'É normal pensar diferente nisso — o importante é que os dois se sintam à vontade pra falar sobre o assunto sem medo.',
    'Antes de assumir que sabe o motivo da resposta de {{sobre}}, vale simplesmente perguntar — às vezes a explicação é mais simples do que parece.',
    'Esse não é um ponto pra resolver sozinho(a) — é um convite pra construir a resposta junto com {{sobre}}, com calma.',
    'Diferença de opinião aqui é só um sinal de que vale a pena conversar mais sobre esse assunto, sem pressa nem cobrança.',
    'Trata esse tema como uma porta aberta, não uma parede — pergunta, escuta, e vejam juntos o que faz sentido pros dois.'
  ],

  // ---------- linguagem do amor: reforço (o gesto já acontece) ----------
  reforco_linguagem: [
    'Continue assim — e de vez em quando, nomeia em voz alta que faz isso por amor, não por obrigação.',
    'Não precisa mudar nada aqui, só reforçar: {{sobre}} já sente isso vindo de você, então mantém o gesto vivo.',
    'Vale comentar com {{sobre}} que sabe o quanto esse gesto importa — dizer isso em voz alta fortalece ainda mais.',
    'Segue fazendo exatamente isso — é um dos jeitos mais diretos que você tem de fazer {{sobre}} se sentir amado(a).',
    'Não deixa esse gesto virar rotina invisível — de vez em quando, nomeia pra {{sobre}} por que você faz isso.',
    'Esse é um dos pontos fortes de vocês dois — vale proteger esse hábito mesmo nos dias mais corridos.',
    'Continue nesse caminho, e lembra: pequenos gestos repetidos valem mais que grandes gestos raros.',
    'Não precisa inventar nada novo aqui — só manter vivo o que já faz {{sobre}} se sentir amado(a).',
    'Vale um comentário simples pra {{sobre}}: que você percebe o quanto isso faz diferença, e que escolhe continuar fazendo.',
    'Esse gesto já é um dos pilares de como vocês se conectam — vale cuidar pra ele não desaparecer com a correria do dia a dia.'
  ],

  // ---------- linguagem do amor: gesto concreto sugerido, por linguagem ----------
  gesto_palavras_afirmacao: [
    'Manda uma mensagem ou fala pessoalmente algo específico que você admira em {{sobre}} — não um elogio genérico, um de verdade, sobre algo que ele(a) fez ou é',
    'Hoje, escolhe uma coisa concreta que {{sobre}} fez essa semana e diz em voz alta o quanto isso te marcou',
    'Escreve um bilhete curto com uma frase sincera sobre o que você admira em {{sobre}} — e deixa em algum lugar que ele(a) só vá achar depois'
  ],
  gesto_tempo_qualidade: [
    'Separa um tempinho só de vocês dois, sem celular — nem que sejam 20 minutos de conversa de verdade, olho no olho',
    'Propõe um programa simples só pros dois essa semana, sem tela no meio — só presença',
    'Desliga as notificações por uma hora e fica só com {{sobre}}, sem pressa de fazer nada além de estar junto'
  ],
  gesto_presentes: [
    'Um mimo pequeno e pensado — um bilhetinho escondido, o docinho que {{sobre}} ama, alguma coisinha que mostre que você prestou atenção no que faz ele(a) feliz. Não precisa ser caro, precisa ser sentido',
    'Leva pra casa aquele docinho ou lanchinho que {{sobre}} sempre comenta que gosta — sem ocasião especial, só porque sim',
    'Deixa um bilhetinho escondido em algum lugar que {{sobre}} vá encontrar sozinho(a), com uma frase simples de carinho',
    'Manda entregar (ou leva você mesmo) uma flor pra {{sobre}} sem nenhuma data especial — só pra ver a reação na hora',
    'Escreve à mão um motivo específico de hoje pra amar {{sobre}} e esconde o bilhete onde ele(a) vá achar sozinho(a)',
    'Compra ou faz algo pequeno que lembre um gosto específico de {{sobre}} — o que importa é mostrar que você prestou atenção, não o valor'
  ],
  gesto_atos_servico: [
    'Resolve algo que é de {{sobre}} sem que precise pedir — um gesto de cuidado silencioso vale mais que mil palavras',
    'Adianta uma tarefa que você sabe que {{sobre}} andava adiando, sem avisar antes — só faz',
    'Pergunta o que está pesando na rotina de {{sobre}} essa semana e assume uma dessas coisas sem que precise pedir duas vezes',
    'Cozinha (ou pede) o prato favorito de {{sobre}} num dia qualquer da semana, sem esperar nenhuma ocasião especial',
    'Organiza algo que {{sobre}} vinha adiando — mesmo que pequeno, o efeito de "alguém cuidou disso pra mim" é grande'
  ],
  gesto_toque_fisico: [
    'Busca mais contato físico no dia a dia — um abraço mais longo, a mão na de {{sobre}} sem motivo nenhum, só porque sim',
    'Antes de sair ou ao chegar em casa, troca um abraço de verdade, não só o de compromisso',
    'Senta perto, de conchinha ou de mãos dadas, nem que seja só durante uma série — o contato físico fala por si'
  ],

  // ---------- dinâmica de apego: cuidado por estilo do parceiro(a) ----------
  apego_estilo_seguro: [
    '{{sobre}} lida bem com espaço e com conflito — seu papel é só manter a consistência que já existe',
    'Não precisa fazer nada muito diferente aqui — {{sobre}} já tem uma base segura, só continue sendo previsível e presente',
    '{{sobre}} costuma dar e receber espaço com naturalidade — aproveita essa facilidade pra fortalecer a confiança entre vocês',
    'Essa segurança de {{sobre}} é uma base rara — cuida pra não dar por garantida, mesmo sendo mais fácil de manter'
  ],
  apego_estilo_ansioso: [
    'Dê reafirmação verbal com frequência e avise quando for demorar — a previsibilidade acalma mais que qualquer discurso',
    'Um simples aviso — tipo "te respondo em uma horinha" — evita que {{sobre}} passe esse tempo todo inseguro(a)',
    '{{sobre}} tende a precisar sentir isso com mais frequência — um "tá tudo bem entre a gente" de vez em quando faz diferença real',
    'Evita deixar mensagens sem resposta por muito tempo sem avisar — pra {{sobre}}, silêncio pode parecer distância'
  ],
  apego_estilo_evitativo: [
    'Respeite o espaço de {{sobre}} e não pressione por abertura emocional rápida — a confiança cresce com consistência, não com cobrança',
    'Quando {{sobre}} recuar, dá o espaço sem cobrar explicação na hora — ele(a) tende a voltar sozinho(a), no tempo certo',
    'Evita ultimato ou pressão pra "se abrir logo" — com {{sobre}}, a abertura emocional vem devagar, não por cobrança',
    '{{sobre}} demonstra cuidado mais por ação do que por palavra — repara nesses gestos em vez de esperar só declarações'
  ],
  apego_estilo_desorganizado: [
    'Seja o mais previsível e paciente possível, evite ultimatos — dê tempo mesmo quando {{sobre}} se afastar sem explicar',
    '{{sobre}} pode se aproximar e se afastar sem um padrão claro — não leva pro pessoal, é mais sobre o jeito dele(a) processar do que sobre você',
    'Mantém a calma quando {{sobre}} parecer contraditório(a) — consistência da sua parte ajuda mais do que tentar entender cada oscilação',
    'Evita reagir no mesmo tom quando {{sobre}} se fechar de repente — um respiro seu ajuda os dois a não escalar a situação'
  ],
  apego_persegue_ansioso: [
    'Dá um respiro antes de cobrar resposta ou proximidade — {{sobre}} tende a se aproximar mais quando não sente pressão',
    'Experimenta esperar um pouco mais antes de buscar reafirmação — {{sobre}} costuma recuar exatamente quando sente essa cobrança',
    'Quando bater a vontade de correr atrás, tenta segurar por alguns minutos — {{sobre}} tende a voltar sozinho(a) quando não sente que está sendo perseguido(a)',
    'Nem toda distância de {{sobre}} é sobre você — dar espaço, em vez de cobrar, costuma trazer ele(a) de volta mais rápido'
  ],
  apego_persegue_evitativo: [
    'Avise que precisa de um tempo, com um prazo curto ("preciso de uma hora, já volto") — isso evita que {{sobre}} entre em pânico',
    'Antes de se afastar pra processar algo, um aviso rápido já ajuda {{sobre}} a não interpretar como abandono',
    'Seu silêncio pode pesar mais pra {{sobre}} do que você imagina — um recado curto muda a forma como ele(a) recebe sua distância',
    'Da próxima vez que precisar de espaço, tenta nomear isso em voz alta — {{sobre}} lida melhor com a distância quando ela vem explicada'
  ],

  // ---------- cuidado por ferida da infância ----------
  ferida_rejeicao: [
    'Evite comparar {{sobre}} com outras pessoas e reforce que você aceita do jeito que é, mesmo nos dias difíceis',
    'Um elogio específico de vez em quando ajuda {{sobre}} a não duvidar do próprio valor nos momentos mais frágeis',
    'Cuidado redobrado com brincadeiras sobre aparência ou jeito de ser — pra {{sobre}}, isso pode pesar mais do que parece',
    'Reforçar que você escolhe {{sobre}} todo dia, sem precisar de motivo, ajuda a acalmar esse medo de não ser suficiente'
  ],
  ferida_abandono: [
    'Avise com antecedência quando for se ausentar ou demorar, e evite usar "vou embora" como argumento numa briga',
    'Mesmo numa discussão feia, evita ameaçar terminar ou sumir — pra {{sobre}}, isso mexe bem mais fundo do que a briga em si',
    'Um "eu não vou a lugar nenhum" dito de vez em quando, sem motivo aparente, ajuda {{sobre}} a se sentir mais seguro(a)',
    'Cumprir o que combina, mesmo em coisas pequenas, é o que mais constrói segurança pra {{sobre}}'
  ],
  ferida_humilhacao: [
    'Nunca corrija ou brinque em tom de deboche na frente de outras pessoas — leve pra uma conversa em particular',
    'Se precisar apontar algo, escolhe um momento só entre vocês dois — na frente de outros, {{sobre}} sente isso de um jeito bem mais pesado',
    'Cuidado com piadas sobre erros de {{sobre}} em grupo, mesmo sem má intenção — o efeito pode ser bem maior do que parece',
    'Reconhecer os acertos de {{sobre}} em público pesa tanto quanto evitar expor os erros — os dois lados ajudam'
  ],
  ferida_traicao: [
    'Mantenha consistência entre o que fala e o que faz, mesmo em coisas pequenas — confiança se constrói aos poucos',
    'Evite prometer o que não tem certeza que vai cumprir — pra {{sobre}}, promessa quebrada pesa mais do que parece',
    'Ser transparente sobre pequenas coisas do dia a dia ajuda {{sobre}} a não precisar desconfiar por hábito',
    'Se errar, admite direto — tentar disfarçar costuma doer bem mais em {{sobre}} do que o erro em si'
  ],
  ferida_injustica: [
    'Explique o motivo das suas decisões e evite tratar as coisas de forma desigual sem dar contexto',
    'Antes de decidir algo que envolve os dois, um "deixa eu te explicar por que penso assim" ajuda {{sobre}} a não sentir que foi injusto',
    'Evita aplicar regras diferentes pra situações parecidas — {{sobre}} percebe rápido quando algo parece desproporcional',
    'Reconhecer quando errou o tom ou foi desproporcional já ajuda bastante a acalmar {{sobre}} nesses momentos'
  ],

  // ---------- autorreflexão: fechamento (compartilhado entre estilos) ----------
  auto_apego_closing: [
    'Essa semana, quando notar esse padrão surgindo, só perceba — sem se cobrar, apenas observando',
    'Da próxima vez que isso aparecer, tenta só nomear pra você mesmo(a): "ah, é esse padrão de novo" — sem se julgar por isso',
    'Não precisa mudar nada agora — só prestar atenção em quando esse jeito de agir aparece já é um progresso',
    'Quando perceber isso essa semana, respira antes de reagir — só esse segundo a mais já muda bastante a resposta',
    'Guarda essa percepção pra você — não precisa comentar com ninguém, só reconhecer já ajuda a suavizar o padrão',
    'Se der pra notar (mentalmente ou de verdade) quando isso aparecer essa semana, você começa a enxergar o próprio padrão com mais clareza',
    'Não é sobre se corrigir da noite pro dia — é sobre perceber esse jeito de agir uma vez a mais do que percebia antes',
    'Da próxima vez, tenta se perguntar: "isso é sobre o presente ou sobre um medo antigo?" — só a pergunta já ajuda a separar as coisas'
  ],
  auto_ferida_closing: [
    'Da próxima vez que sentir isso, tenta nomear pra você mesmo(a) o que está por trás da reação, antes de agir',
    'Quando essa sensibilidade aparecer, respira um pouco antes de responder — geralmente a primeira reação não é a mais justa',
    'Não precisa se cobrar por sentir isso — só reconhecer que essa ferida existe já é o primeiro passo pra lidar melhor com ela',
    'Da próxima vez, tenta se perguntar se a situação de agora é do tamanho da reação que veio, ou se é mais sobre o passado',
    'Guarda essa autopercepção com carinho — entender de onde vem a dor já ajuda a não descontar isso em quem você ama',
    'Se notar essa ferida mexendo essa semana, tenta esperar um pouco antes de reagir — o tempo costuma trazer mais clareza',
    'Não é sobre deixar de sentir — é sobre reconhecer, cada vez mais rápido, quando esse gatilho específico foi acionado',
    'Da próxima vez que isso doer, tenta separar o que é da situação de agora do que é uma ferida mais antiga'
  ]
};

function substitute(texto, finding) {
  return texto
    .replace(/\{\{sobre\}\}/g, finding.sobre)
    .replace(/\{\{alvo\}\}/g, finding.alvo);
}

// Escolhe a próxima variação (rotação round-robin por casal + categoria) e
// substitui os placeholders — usada no lugar do `sugestao_acao` padrão de
// um finding sempre que ele carregar um `variant_key` reconhecido aqui.
// Sem `variant_key` ou sem banco correspondente, devolve o texto padrão
// que já vem do próprio finding (nunca quebra o fluxo).
function resolveConselho(finding, coupleId) {
  if (!finding) return null;
  const pool = finding.variant_key && BANKS[finding.variant_key];
  if (!pool || !pool.length) return finding.sugestao_acao;
  const idx = store.nextPhraseVariant(coupleId, finding.variant_key, pool.length);
  let texto = substitute(pool[idx], finding);
  if (finding.extra_nota) texto += `. ${finding.extra_nota}`;
  return texto;
}

module.exports = { BANKS, resolveConselho };
