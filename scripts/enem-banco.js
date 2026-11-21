/* ENEM Bíblico — banco de questões e montagem dos cadernos.
   Usado por enem-biblico.html (cadernos/gabarito) e enem-correcao.html (correção). */
/* =========================================================
   BANCO DE QUESTÕES — 5 áreas × 6 questões (30)
   d: F (fácil) · M (média) · D (difícil)
   t/f: texto-base e fonte · e: enunciado · c: correta · w: erradas · r: comentário
   ========================================================= */
const AREAS = [
  {nome:"Pentateuco e Livros Históricos", desc:"Gênesis a Ester"},
  {nome:"Livros Poéticos e Proféticos",   desc:"Jó a Malaquias"},
  {nome:"Evangelhos e Atos",              desc:"Mateus a Atos dos Apóstolos"},
  {nome:"Epístolas e Apocalipse",         desc:"Romanos a Apocalipse"},
  {nome:"Doutrina, Interpretação e Vida Cristã", desc:"Fundamentos da fé e aplicação prática"}
];

const BANCO = [
/* ---------- ÁREA 1 ---------- */
{a:0,d:"F",f:"1 Reis 11–12",
 e:"Após a morte de Salomão, o reino de Israel se dividiu em Reino do Norte (Israel) e Reino do Sul (Judá). Como ficaram as tribos nessa divisão?",
 c:"Norte com 10 tribos e Sul com 2 tribos.",
 w:["Norte com 2 tribos e Sul com 10 tribos.",
    "Norte com 9 tribos e Sul com 3 tribos.",
    "Norte com 6 tribos e Sul com 6 tribos.",
    "Norte com 3 tribos e Sul com 9 tribos."],
 r:"O profeta Aías anunciou a Jeroboão que ele receberia dez tribos (1 Rs 11.31). Judá e Benjamim ficaram com Roboão, no Sul (1 Rs 12.20-21)."},

{a:0,d:"M",f:"1 Reis 12",
 e:"Quem foram os primeiros reis do Reino do Norte e do Reino do Sul, respectivamente, logo depois da divisão?",
 c:"Jeroboão no Norte e Roboão no Sul.",
 w:["Roboão no Norte e Jeroboão no Sul.",
    "Nadabe no Norte e Abias no Sul.",
    "Onri no Norte e Asa no Sul.",
    "Acabe no Norte e Josafá no Sul."],
 r:"Roboão, filho de Salomão, ficou com Judá; Jeroboão, filho de Nebate, foi feito rei sobre Israel (1 Rs 12.17-20). Nadabe e Abias foram os sucessores de cada um."},

{a:0,d:"M",f:"2 Reis 17 e 25",
 e:"Após a morte de Salomão, Israel se dividiu em Reino do Norte (Israel) e Reino do Sul (Judá). Os dois reinos acabaram conquistados por impérios estrangeiros, em épocas diferentes. Quais impérios conquistaram o Reino do Norte e o Reino do Sul, respectivamente?",
 c:"Assíria conquistou o Norte, e Babilônia, o Sul.",
 w:["Babilônia conquistou o Norte, e Assíria, o Sul.",
    "Assíria conquistou o Norte, e Pérsia, o Sul.",
    "Egito conquistou o Norte, e Babilônia, o Sul.",
    "Pérsia conquistou o Norte, e Assíria, o Sul."],
 r:"Samaria caiu diante da Assíria (2 Rs 17.6), por volta de 722 a.C. Jerusalém foi destruída por Nabucodonosor, rei da Babilônia (2 Rs 25.8-11), por volta de 586 a.C. A Pérsia foi o império que depois permitiu a volta dos judeus."},

{a:0,d:"M",f:"Números 20.7-12",
 e:"Moisés conduziu Israel por quarenta anos, mas Deus não permitiu que ele entrasse em Canaã. Qual atitude de Moisés levou a essa decisão?",
 c:"Ferir a rocha em Meribá, quando Deus mandou falar a ela.",
 w:["Fazer um bezerro de ouro enquanto o povo esperava no Sinai.",
    "Quebrar as tábuas da Lei ao descer do monte Sinai.",
    "Casar-se com uma mulher cuxita contra a vontade de Miriã.",
    "Matar um egípcio quando ainda vivia no palácio de Faraó."],
 r:"Deus ordenou: “falai à rocha” (Nm 20.8), mas Moisés a feriu duas vezes, e o Senhor disse que, por isso, ele não introduziria o povo na terra (Nm 20.12). O bezerro foi feito por Arão (Êx 32); as tábuas quebradas, o casamento (Nm 12) e o egípcio (Êx 2) não foram o motivo."},

{a:0,d:"D",f:"Esdras, Neemias e Ester",
 e:"Associe os personagens judeus do período persa às suas atuações:<br><b>I.</b> Esdras &nbsp; <b>II.</b> Neemias &nbsp; <b>III.</b> Ester<br>(a) Intercedeu diante do rei Assuero para livrar os judeus de um decreto de extermínio.<br>(b) Liderou a reconstrução dos muros de Jerusalém, enfrentando oposição.<br>(c) Escriba que preparou o coração para buscar, cumprir e ensinar a Lei do Senhor.<br>A associação correta é",
 c:"I–c, II–b, III–a.",
 w:["I–b, II–c, III–a.",
    "I–a, II–b, III–c.",
    "I–c, II–a, III–b.",
    "I–b, II–a, III–c."],
 r:"Esdras 7.10 (ensino da Lei), Neemias 2–6 (muros) e Ester 4–8 (intercessão diante de Assuero)."},

{a:0,d:"M",f:"1 Samuel 15.22",
 t:"Porém Samuel disse: Tem, porventura, o Senhor tanto prazer em holocaustos e sacrifícios como em que se obedeça à palavra do Senhor? Eis que o obedecer é melhor do que o sacrificar; e o atender melhor é do que a gordura de carneiros.",
 e:"Samuel repreende Saul, que desobedeceu a uma ordem clara de Deus e alegou ter poupado o melhor do gado para oferecê-lo em sacrifício. O princípio afirmado pelo profeta é que",
 c:"nenhum ato de culto, por mais generoso, substitui a obediência à palavra de Deus.",
 w:["Deus rejeita qualquer sacrifício feito com animais tomados como despojo de guerra.",
    "o erro de Saul foi oferecer o sacrifício sem esperar a chegada do profeta Samuel.",
    "a obediência dispensa o culto, porque Deus nunca se agradou de holocaustos.",
    "a boa intenção de Saul de honrar a Deus pesava mais do que a ordem recebida."],
 r:"O problema não era o sacrifício em si (a Lei o ordenava), e sim usá-lo para encobrir a desobediência. Oferecer sem esperar Samuel foi outro episódio (1 Sm 13.8-14)."},

/* ---------- ÁREA 2 ---------- */
{a:1,d:"F",f:"Provérbios 1.1; 25.1; 30–31",
 e:"A maior parte do livro de Provérbios é atribuída a qual autor?",
 c:"Salomão.",
 w:["Davi.",
    "Asafe.",
    "Agur.",
    "Ezequias."],
 r:"“Provérbios de Salomão, filho de Davi” (Pv 1.1). Agur e o rei Lemuel escreveram os capítulos 30 e 31; os homens de Ezequias apenas copiaram provérbios de Salomão (Pv 25.1). Davi e Asafe escreveram salmos."},

{a:1,d:"M",f:"Jonas 1.3",
 e:"Quando Deus mandou Jonas pregar em Nínive, o profeta fugiu em direção contrária. Para onde ele tentou ir?",
 c:"Para Társis.",
 w:["Para Jope.",
    "Para Tarso.",
    "Para Damasco.",
    "Para Babilônia."],
 r:"Jonas “se levantou para fugir de diante da face do Senhor para Társis”. Jope foi apenas o porto onde ele embarcou (Jn 1.3). Tarso é a cidade de Paulo, no Novo Testamento."},

{a:1,d:"M",f:"Jeremias 1.4-7",
 e:"Ao ser chamado por Deus, qual profeta respondeu que não sabia falar porque era ainda uma criança, e ouviu: “Não digas: Eu sou uma criança”?",
 c:"Jeremias.",
 w:["Isaías.",
    "Samuel.",
    "Ezequiel.",
    "Amós."],
 r:"Jeremias foi chamado ainda jovem (Jr 1.6-7). Isaías disse ser “homem de impuros lábios” (Is 6.5); Samuel foi chamado menino, mas não deu essa resposta (1 Sm 3); Amós era boieiro (Am 7.14)."},

{a:1,d:"D",f:"Daniel 5",
 e:"Durante um banquete em que usou os utensílios tirados do templo de Jerusalém, um rei viu uma mão escrever na parede do palácio, e Daniel interpretou a mensagem. Quem era esse rei?",
 c:"Belsazar.",
 w:["Nabucodonosor.",
    "Dario, o medo.",
    "Ciro, o persa.",
    "Evil-Merodaque."],
 r:"Belsazar fez o banquete e, naquela mesma noite, foi morto; Dario, o medo, tomou o reino (Dn 5.30-31). Nabucodonosor havia trazido os utensílios (Dn 5.2). Evil-Merodaque foi outro rei da Babilônia (2 Rs 25.27)."},

{a:1,d:"M",f:"Daniel 3.17-18",
 t:"Eis que o nosso Deus, a quem nós servimos, é que nos pode livrar; ele nos livrará do forno de fogo ardente e da tua mão, ó rei. E, se não, fica sabendo, ó rei, que não serviremos a teus deuses nem adoraremos a estátua de ouro que levantaste.",
 e:"A resposta de Sadraque, Mesaque e Abede-Nego ao rei Nabucodonosor mostra uma fé que",
 c:"confia que Deus pode livrar, mas continua fiel mesmo que o livramento não venha.",
 w:["tem certeza do livramento e, por isso, não teme a fornalha nem a ameaça do rei.",
    "depende de uma promessa de livramento que Deus havia feito aos três antes do julgamento do rei.",
    "vê a fornalha como sinal de que Deus tinha abandonado o povo no cativeiro.",
    "busca o martírio para mostrar ao rei a força da religião de Israel."],
 r:"O ponto central é o “E, se não” (Dn 3.18): a fidelidade deles não dependia do milagre. Deus não havia prometido o livramento antes, e eles não buscaram a morte; obedeceram a Deus aceitando qualquer resultado."},

{a:1,d:"D",f:"Jeremias 29.11",
 t:"Porque eu bem sei os pensamentos que penso de vós, diz o Senhor; pensamentos de paz e não de mal, para vos dar o fim que esperais.",
 e:"Esse versículo faz parte de uma carta que Jeremias enviou aos judeus levados cativos para a Babilônia. No versículo anterior, Deus diz que os visitaria quando se cumprissem setenta anos (Jr 29.10). Uma leitura fiel ao contexto entende que essa promessa",
 c:"sustentava a esperança numa espera longa, apontando para a restauração no tempo de Deus.",
 w:["garantia que cada um dos exilados veria, com os próprios olhos, o fim do cativeiro na Babilônia.",
    "anunciava a volta para Jerusalém em dois anos, como diziam outros profetas da época.",
    "prometia que o povo prosperaria na Babilônia e não precisaria mais voltar para Judá.",
    "era dirigida aos que ficaram em Jerusalém, e não aos que foram levados para o exílio."],
 r:"Setenta anos significavam que muitos dos que leram a carta não veriam a volta. O falso profeta Hananias é que anunciava dois anos (Jr 28.3). Deus mandou buscar a paz da cidade (29.7), mas prometeu trazê-los de volta (29.14)."},

/* ---------- ÁREA 3 ---------- */
{a:2,d:"F",f:"Mateus 2.1,23; Lucas 2.4,39",
 e:"Em qual cidade Jesus nasceu e em qual cidade Ele foi criado, respectivamente?",
 c:"Nasceu em Belém e foi criado em Nazaré.",
 w:["Nasceu em Nazaré e foi criado em Belém.",
    "Nasceu em Belém e foi criado em Cafarnaum.",
    "Nasceu em Jerusalém e foi criado em Nazaré.",
    "Nasceu em Belém e foi criado em Betânia."],
 r:"Jesus nasceu em Belém da Judeia (Mt 2.1) e cresceu em Nazaré, na Galileia (Lc 2.39-40). Cafarnaum foi a base do ministério dele (Mt 4.13)."},

{a:2,d:"F",f:"Mateus 9.9; Lucas 5.27",
 e:"Antes de ser chamado por Jesus, qual era a ocupação do discípulo Mateus, também chamado Levi?",
 c:"Cobrador de impostos (publicano).",
 w:["Pescador no mar da Galileia, como Pedro.",
    "Médico na cidade de Antioquia.",
    "Carpinteiro em Nazaré.",
    "Fabricante de tendas em Tarso."],
 r:"Jesus o viu “assentado na alfândega” (Mt 9.9). Pescadores eram Pedro, André, Tiago e João; Lucas era médico (Cl 4.14); Paulo fazia tendas (At 18.3)."},

{a:2,d:"M",f:"João 2.1-11",
 e:"Segundo o Evangelho de João, qual foi o primeiro sinal (milagre) realizado por Jesus, e onde aconteceu?",
 c:"Transformou água em vinho, em Caná da Galileia.",
 w:["Curou o filho de um oficial, em Caná da Galileia.",
    "Transformou água em vinho, em Cafarnaum.",
    "Multiplicou pães e peixes, perto de Betsaida.",
    "Curou um paralítico no tanque de Betesda."],
 r:"“Jesus principiou assim os seus sinais em Caná da Galileia” (Jo 2.11). A cura do filho do oficial foi o segundo sinal, também a partir de Caná (Jo 4.46-54); Betesda vem em João 5."},

{a:2,d:"M",f:"Atos 7.54-60; 12.1-2",
 e:"Quem foi o primeiro cristão morto por causa da fé, segundo o livro de Atos?",
 c:"Estêvão, apedrejado em Jerusalém.",
 w:["Tiago, irmão de João, morto por Herodes.",
    "Filipe, um dos sete diáconos escolhidos.",
    "Barnabé, companheiro de Paulo nas viagens.",
    "Ananias, o discípulo que batizou Paulo."],
 r:"Estêvão foi apedrejado depois do seu discurso, com Saulo presente (At 7.58). Tiago foi o primeiro dos apóstolos a morrer, mais tarde (At 12.2)."},

{a:2,d:"D",f:"Evangelho de João; Apocalipse 22.16",
 e:"No Evangelho de João, Jesus usa várias vezes a expressão “Eu sou” para revelar quem Ele é. Qual das declarações abaixo NÃO aparece nesse Evangelho?",
 c:"“Eu sou a resplandecente estrela da manhã.”",
 w:["“Eu sou o pão vivo que desceu do céu.”",
    "“Eu sou a luz do mundo.”",
    "“Eu sou o caminho, e a verdade, e a vida.”",
    "“Eu sou a videira verdadeira.”"],
 r:"A “resplandecente estrela da manhã” está em Apocalipse 22.16. Os “Eu sou” de João: pão da vida e pão vivo que desceu do céu (6.35,51), luz do mundo (8.12), porta (10.9), bom Pastor (10.11), ressurreição e vida (11.25), caminho, verdade e vida (14.6) e videira verdadeira (15.1)."},

{a:2,d:"M",f:"Lucas 15.28-29",
 t:"Mas ele se indignou e não queria entrar. E, saindo o pai, instava com ele. Mas, respondendo ele, disse ao pai: Eis que te sirvo há tantos anos, sem nunca transgredir o teu mandamento, e nunca me deste um cabrito para alegrar-me com os meus amigos.",
 e:"Jesus contou a parábola do filho pródigo a fariseus e escribas que murmuravam porque ele recebia pecadores (Lc 15.1-2). A atitude do filho mais velho representa",
 c:"uma religiosidade apoiada no próprio desempenho, que não se alegra com a graça dada a pecadores.",
 w:["os gentios, que se ressentiam de Israel ter sido escolhido por Deus antes deles.",
    "o servo fiel, que Jesus elogia por ter obedecido ao pai durante tantos anos.",
    "os discípulos, que ainda não entendiam a missão de Jesus entre os pecadores.",
    "um filho injustiçado, cuja queixa o pai acaba reconhecendo como justa no final da história contada."],
 r:"O filho mais velho espelha os ouvintes que murmuravam: cumpriam regras, mas não entendiam o coração do pai. O pai não lhe dá razão; convida-o a se alegrar (Lc 15.31-32)."},

/* ---------- ÁREA 4 ---------- */
{a:3,d:"F",f:"1 Timóteo 4.12",
 e:"“Ninguém despreze a tua mocidade; mas sê o exemplo dos fiéis…” Paulo escreveu essa orientação a qual de seus colaboradores?",
 c:"Timóteo.",
 w:["Tito.",
    "Silas.",
    "Marcos.",
    "Filemom."],
 r:"Timóteo era jovem e liderava a igreja em Éfeso (1 Tm 1.3; 4.12). Tito estava em Creta; Silas acompanhou Paulo na 2ª viagem; Marcos escreveu um Evangelho; Filemom recebeu uma carta curta sobre Onésimo."},

{a:3,d:"M",f:"Apocalipse 1.11; 2–3",
 e:"Em Apocalipse 2 e 3, Jesus envia cartas a sete igrejas da Ásia. Qual destas cidades NÃO está entre elas?",
 c:"Corinto.",
 w:["Éfeso.",
    "Esmirna.",
    "Laodiceia.",
    "Filadélfia."],
 r:"As sete são Éfeso, Esmirna, Pérgamo, Tiatira, Sardes, Filadélfia e Laodiceia (Ap 1.11). Corinto, na Grécia, recebeu duas cartas de Paulo."},

{a:3,d:"D",f:"Filemom 10-16",
 e:"Na carta a Filemom, Paulo pede que ele receba de volta, como irmão, um escravo que havia fugido e se convertido. Qual era o nome desse escravo?",
 c:"Onésimo.",
 w:["Onesíforo.",
    "Epafras.",
    "Tíquico.",
    "Epafrodito."],
 r:"“Peço-te por meu filho Onésimo, que gerei nas minhas prisões” (Fm 10). Onesíforo visitou Paulo preso (2 Tm 1.16); Epafras, Tíquico e Epafrodito eram colaboradores de Paulo."},

{a:3,d:"M",f:"Gálatas 5.22-23",
 e:"Qual das alternativas abaixo NÃO faz parte do fruto do Espírito, segundo Gálatas 5.22-23?",
 c:"Humildade.",
 w:["Longanimidade.",
    "Mansidão.",
    "Temperança.",
    "Benignidade."],
 r:"O fruto do Espírito é: caridade (amor), gozo, paz, longanimidade, benignidade, bondade, fé, mansidão e temperança. A humildade é ensinada em outros textos (Fp 2.3), mas não está nessa lista."},

{a:3,d:"M",f:"Tiago 2.17-18",
 t:"Assim também a fé, se não tiver as obras, é morta em si mesma. Mas dirá alguém: Tu tens a fé, e eu tenho as obras; mostra-me a tua fé sem as tuas obras, e eu te mostrarei a minha fé pelas minhas obras.",
 e:"Paulo afirma que somos salvos pela fé, e não pelas obras (Ef 2.8-9). Tiago afirma que a fé sem obras é morta. Essas afirmações se harmonizam porque",
 c:"a fé que salva é uma fé viva, que produz obras como fruto, e não como causa da salvação.",
 w:["a salvação começa pela fé, mas só se completa com as obras feitas depois da conversão.",
    "Paulo trata da salvação dos gentios, e Tiago, da salvação dos judeus convertidos.",
    "Tiago corrige um exagero de Paulo, mostrando que só a fé, sem as obras, não é suficiente para salvar.",
    "Tiago fala das obras da Lei de Moisés, e Paulo, das obras de caridade com os pobres."],
 r:"Os dois combatem erros diferentes: Paulo, a ideia de ganhar a salvação; Tiago, uma fé só de palavras. As obras não completam a salvação, elas mostram que a fé é verdadeira (Tg 2.18; Ef 2.10)."},

{a:3,d:"D",f:"Filipenses 4.11-13",
 t:"Não digo isto como por necessidade, porque já aprendi a contentar-me com o que tenho. Sei estar abatido e sei também ter abundância; em toda maneira e em todas as coisas, estou instruído, tanto a ter fartura como a ter fome, tanto a ter abundância como a padecer necessidade. Posso todas as coisas naquele que me fortalece.",
 e:"Filipenses 4.13 é muito citado em competições e desafios pessoais. Lido no seu contexto, em que Paulo escrevia preso e agradecia uma oferta da igreja, o versículo significa que",
 c:"Cristo fortalece o crente para ser fiel e contente em qualquer situação, na fartura ou na falta.",
 w:["Cristo dá ao crente a força necessária para alcançar qualquer objetivo que ele coloque diante de Deus.",
    "Paulo agradece a oferta porque, sem ela, não teria forças para suportar aquela prisão.",
    "o crente maduro aprende a não depender da ajuda e das ofertas de outros irmãos.",
    "a fé verdadeira livra o crente de passar por situações de necessidade e de fome."],
 r:"O “todas as coisas” do v. 13 são as situações do v. 12: fartura e fome, abundância e necessidade. Paulo já tinha aprendido o contentamento (v. 11) e, mesmo assim, elogia a ajuda da igreja (v. 14)."},

/* ---------- ÁREA 5 ---------- */
{a:4,d:"F",f:"Mateus 28.19; 1 Coríntios 11.23-26",
 e:"Quais são as duas ordenanças que Jesus deixou para a Igreja praticar?",
 c:"O batismo nas águas e a Ceia do Senhor.",
 w:["O batismo nas águas e o casamento.",
    "A Ceia do Senhor e o lava-pés dos irmãos.",
    "O batismo nas águas e o dízimo.",
    "A Ceia do Senhor e o jejum."],
 r:"Jesus mandou batizar (Mt 28.19) e celebrar a Ceia “em memória de mim” (1 Co 11.24-25). Casamento, dízimo, jejum e lava-pés aparecem na Bíblia, mas não são as duas ordenanças da Igreja."},

{a:4,d:"M",f:"Cânon bíblico",
 e:"A Bíblia usada pelas igrejas evangélicas tem quantos livros ao todo, e como eles se dividem entre Antigo e Novo Testamento?",
 c:"66 livros: 39 no Antigo e 27 no Novo Testamento.",
 w:["66 livros: 27 no Antigo e 39 no Novo Testamento.",
    "73 livros: 46 no Antigo e 27 no Novo Testamento.",
    "66 livros: 37 no Antigo e 29 no Novo Testamento.",
    "72 livros: 39 no Antigo e 33 no Novo Testamento."],
 r:"São 39 livros no Antigo e 27 no Novo Testamento. A Bíblia católica tem 73, porque inclui 7 livros a mais no Antigo Testamento (os deuterocanônicos)."},

{a:4,d:"D",f:"Êxodo 20.1-17; Deuteronômio 5.6-21",
 e:"Os Dez Mandamentos aparecem duas vezes no Pentateuco. Em quais capítulos?",
 c:"Êxodo 20 e Deuteronômio 5.",
 w:["Êxodo 20 e Levítico 19.",
    "Êxodo 12 e Deuteronômio 6.",
    "Gênesis 9 e Êxodo 20.",
    "Levítico 20 e Números 15."],
 r:"Os mandamentos são dados no Sinai (Êx 20) e repetidos por Moisés antes da entrada em Canaã (Dt 5). Levítico 19 tem muitas leis parecidas, e Deuteronômio 6 traz o “Ouve, Israel”, mas não a lista dos dez."},

{a:4,d:"M",f:"Mateus 3.16-17",
 t:"E, sendo Jesus batizado, saiu logo da água, e eis que se lhe abriram os céus, e viu o Espírito de Deus descendo como pomba e vindo sobre ele. E eis que uma voz dos céus dizia: Este é o meu Filho amado, em quem me comprazo.",
 e:"No batismo de Jesus, o Filho está nas águas, o Espírito desce e a voz do Pai fala dos céus, tudo ao mesmo tempo. Esse texto é muito usado para ilustrar a doutrina da Trindade, segundo a qual",
 c:"há um só Deus, que existe eternamente em três pessoas: Pai, Filho e Espírito Santo.",
 w:["existem três deuses diferentes, que agem sempre juntos e em perfeito acordo.",
    "Deus é uma só pessoa, que se manifesta ora como Pai, ora como Filho, ora como Espírito Santo.",
    "o Pai e o Filho são pessoas, mas o Espírito Santo é a força ativa de Deus.",
    "o Filho é a primeira criatura do Pai e, por isso, não é eterno como Ele."],
 r:"Os três aparecem ao mesmo tempo e distintos, o que exclui a ideia de uma só pessoa “trocando de forma”. A Bíblia afirma um só Deus (Dt 6.4) e trata Pai, Filho e Espírito como pessoas divinas (Mt 28.19; Jo 1.1; At 5.3-4)."},

{a:4,d:"M",f:"Mateus 18.21-22",
 t:"Então, Pedro, aproximando-se dele, disse: Senhor, até quantas vezes pecará meu irmão contra mim, e eu lhe perdoarei? Até sete? Jesus lhe disse: Não te digo que até sete, mas até setenta vezes sete.",
 e:"Com a resposta “setenta vezes sete”, Jesus ensina que",
 c:"o perdão não deve ter limite contado, pois reflete o perdão sem medida que recebemos de Deus.",
 w:["devemos perdoar sempre, mas só depois que o ofensor reparar todo o dano que causou.",
    "o perdão deve ser dado sete vezes, número que na Bíblia representa a perfeição.",
    "perdoar significa voltar a confiar na pessoa como antes, como se a ofensa nunca tivesse existido.",
    "o limite do perdão é maior para os irmãos da igreja do que para os de fora."],
 r:"Jesus conta em seguida a parábola do servo que foi perdoado de uma dívida enorme e não perdoou uma pequena (Mt 18.23-35). Perdoar não exige reparação prévia e não é o mesmo que fingir que nada aconteceu."},

{a:4,d:"M",f:"Mateus 24.36,42",
 t:"Porém daquele Dia e hora ninguém sabe, nem os anjos do céu, mas unicamente meu Pai. […] Vigiai, pois, porque não sabeis a que hora há de vir o vosso Senhor.",
 e:"Um vídeo viral afirma ter descoberto, com cálculos feitos a partir de números da Bíblia, a data exata da volta de Jesus. À luz do texto, a postura cristã adequada é",
 c:"rejeitar a marcação de datas e viver vigilante, pronto para a volta de Cristo a qualquer hora.",
 w:["aceitar o cálculo com cautela, já que os números da Bíblia podem esconder datas futuras.",
    "entender que só os anjos conhecem a data e que, por isso, ela ainda não foi revelada aos homens.",
    "concluir que a volta de Cristo é simbólica, já que ninguém consegue prever o dia.",
    "esperar sinais bem visíveis antes de se preparar, pois o dia ainda pode estar longe."],
 r:"Nem os anjos sabem o dia (Mt 24.36). A volta é real (At 1.11), e a resposta bíblica é vigiar sempre (Mt 24.42-44), não calcular datas nem adiar a preparação."}
];

/* Questões que entram na prova (índices do BANCO). Hoje são todas as 30 (6 por área):
   cerca de 2/3 objetivas, de lembrar a história, e 1/3 interpretativas.
   Para tirar ou trocar uma, mantenha 6 por área (o gabarito precisa de um total múltiplo de 5). */
const USAR = BANCO.map((_, i) => i);
const Q = BANCO.filter((_, i) => USAR.includes(i));
const NQ = Q.length;

/* =========================================================
   CADERNOS
   ========================================================= */
const CADERNOS = [
  {n:1, nome:"Azul",    cor:"#1f5fd6", txt:"#fff", seed:1907},
  {n:2, nome:"Amarelo", cor:"#f2c200", txt:"#000", seed:2026},
  {n:3, nome:"Rosa",    cor:"#e2559a", txt:"#fff", seed:4141},
  {n:4, nome:"Branco",  cor:"#ffffff", txt:"#000", seed:7777}
];
const LETRAS = ["A","B","C","D","E"];
const DIF = {F:"fácil",M:"média",D:"difícil"};

function rng(seed){ // mulberry32
  return function(){ seed|=0; seed=seed+0x6D2B79F5|0; let t=Math.imul(seed^seed>>>15,1|seed);
    t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; };
}
function embaralha(arr,r){ const a=arr.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
function maiorSequencia(a){ let m=1,c=1; for(let i=1;i<a.length;i++){c=a[i]===a[i-1]?c+1:1;m=Math.max(m,c);} return m; }

// monta um caderno: ordem embaralhada dentro de cada área e gabarito balanceado (6 de cada letra)
function montaCaderno(cad){
  const r = rng(cad.seed);
  const ordem = [];
  AREAS.forEach((_,ai)=> embaralha(Q.map((q,i)=>i).filter(i=>Q[i].a===ai), r).forEach(i=>ordem.push(i)));
  let pos;
  const base = []; for(let k=0;k<Q.length;k++) base.push(k%5);
  do { pos = embaralha(base, r); } while (maiorSequencia(pos) > 3);
  return ordem.map((qi,k)=>{
    const q = Q[qi], certa = pos[k];
    const erradas = embaralha(q.w, r);
    const alts = []; let e=0;
    for(let l=0;l<5;l++) alts.push(l===certa ? q.c : erradas[e++]);
    return {num:k+1, qi, q, alts, certa};
  });
}
const MONTADOS = CADERNOS.map(montaCaderno);
