export const WHATSAPP_PHONE = '5521999999999'; // Substituir pelo número real

export const PLANS = [
  {
    id: 'semanal',
    name: 'Semanal',
    subtitle: 'Pra quem quer testar',
    price: 249,
    period: '/semana',
    badge: null,
    features: [
      'Bike elétrica pronta pra rodar',
      'Manutenção por nossa conta',
      'Suporte no WhatsApp todo dia',
      'Troca de bateria inclusa',
      'Devolveu? Sem multa nenhuma',
    ],
    highlighted: false,
  },
  {
    id: 'minha-bike',
    name: 'Minha Bike',
    subtitle: 'Roda 18 meses e a bike é tua',
    price: 289,
    period: '/semana',
    badge: 'MAIS POPULAR',
    features: [
      'Bike elétrica pronta pra rodar',
      'Manutenção por nossa conta',
      'Suporte prioritário',
      'Troca de bateria inclusa',
      'Depois de 18 meses, a bike é sua',
    ],
    highlighted: true,
  },
  {
    id: 'mensal',
    name: 'Mensal',
    subtitle: 'Melhor preço por mês',
    price: 899,
    period: '/mês',
    badge: 'MAIS ECONÔMICO',
    features: [
      'Bike elétrica pronta pra rodar',
      'Manutenção por nossa conta',
      'Suporte prioritário',
      'Troca de bateria inclusa',
      'Economia de R$ 97/mês',
    ],
    highlighted: false,
  },
] as const;

export const STATS = [
  { value: 347, suffix: '+', label: 'entregadores rodando' },
  { value: 52000, suffix: '+', label: 'km pedalados no mês' },
  { value: 4.8, suffix: '★', label: 'nota dos entregadores' },
] as const;

export const FAQ_ITEMS = [
  {
    question: 'Que documento eu preciso pra alugar?',
    answer: 'RG ou CNH e um comprovante de endereço. Manda foto pelo WhatsApp e a gente resolve.',
  },
  {
    question: 'E se a bike der pau no meio do trampo?',
    answer: 'Manutenção já tá no plano. A gente troca a bike em até 24h úteis, sem custo nenhum pra você.',
  },
  {
    question: 'Nunca andei de bike elétrica, é difícil?',
    answer: 'Se você pedala bike normal, já sabe. É igualzinho, só que o motor te ajuda nas subidas. Em 5 minutos tu pega o jeito.',
  },
  {
    question: 'Aceita Pix?',
    answer: 'Pix, cartão de crédito ou débito. Paga adiantado pelo período que escolher.',
  },
  {
    question: 'Se eu quiser devolver antes, pago multa?',
    answer: 'Não, zero multa. Só avisa com 2 dias de antecedência e tá resolvido.',
  },
  {
    question: 'A bateria aguenta quantos km?',
    answer: 'Até 60km com uma carga. Dá pra fazer o dia inteiro de entrega sem precisar recarregar.',
  },
] as const;

export const TESTIMONIALS = [
  {
    name: 'Rafael M.',
    role: 'Entregador iFood, Méier',
    text: 'cara, sem brincadeira, dobrei o que eu fazia no mês. com a bike elétrica eu pego o dobro de corrida e chego em casa de boa, sem aquele cansaço de antes. melhor decisão que tomei esse ano',
    time: '14:32',
  },
  {
    name: 'Anderson P.',
    role: 'Entregador Rappi, Tijuca',
    text: 'foi muito rápido mano, mandei msg no whats e em menos de 2 dias já tava com a bike. e o melhor: não preciso me preocupar com manutenção, eles resolvem tudo. isso pra mim faz toda diferença',
    time: '09:47',
  },
  {
    name: 'Diego L.',
    role: 'Entregador 99Food, Barra',
    text: 'antes eu torrava uma grana com gasolina da moto, agora é só o aluguel da bike e o resto fica comigo. no fim do mês sobra muito mais. recomendo demais pra quem quer guardar uma grana',
    time: '18:15',
  },
  {
    name: 'Juliana S.',
    role: 'Entregadora Rappi, Tijuca',
    text: 'no começo achei que ia ser complicado, mas foi super tranquilo. em dois dias já tava rodando. e os morros da Tijuca que eu sofria antes? agora subo tudo de boa, chego nos clientes rápido e sem suar',
    time: '10:23',
  },
] as const;
