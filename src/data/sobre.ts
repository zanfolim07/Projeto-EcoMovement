import type { ItemInformativo } from '../types';

export const passosSobre: readonly ItemInformativo[] = [
  {
    number: '01',
    title: 'Realize a missão',
    description:
      'Escolha uma missão a partir da sua ficha técnica: nome, categoria, descrição da ação, impacto ambiental e nível de dificuldade.',
  },
  {
    number: '02',
    title: 'Comprove com a evidência certa',
    description:
      'Cada missão pede o tipo de evidência mais adequado: foto, vídeo, GPS, QR Code ou OCR, conforme a natureza da ação.',
  },
  {
    number: '03',
    title: 'O EcoGuard valida a ação',
    description:
      'A IA fornece sinais (objeto identificado, categoria, confiança, duplicidade), mas quem decide é o motor de regras do EcoGuard, cruzando esses sinais com GPS, horário, frequência e histórico em até 6 camadas de verificação.',
  },
  {
    number: '04',
    title: 'Receba seu EcoScore e acumule EcoPoints',
    description:
      'Cada submissão validada gera um EcoScore de 0 a 100, com pesos para impacto ambiental, intensidade, evidência, dificuldade e consistência. Os EcoPoints são a soma de todos os EcoScores válidos.',
  },
  {
    number: '05',
    title: 'Acompanhe sua evolução',
    description:
      'Veja seu progresso pela Árvore Digital, pela Floresta Digital da sua comunidade, pelos badges conquistados e pelo ranking.',
  },
];

export const areasImpacto: readonly ItemInformativo[] = [
  {
    title: 'Missões que cobrem o essencial',
    description:
      'O catálogo inclui posts e Moments com as hashtags do movimento, engajamento com perfis de ONGs, evolução da árvore digital, adição da árvore a uma floresta de comunidade e distribuição de frutos entre usuários.',
  },
  {
    title: 'Ranking com recompensa real',
    description:
      'O usuário com maior pontuação ao final de 30 dias de competição recebe a cobertura integral da conta de energia elétrica, com um processo de encerramento auditável: congelamento do ranking, cálculo da pontuação final, desempate e confirmação do vencedor.',
  },
  {
    title: 'Floresta Coletiva com prêmio para o Top 10',
    description:
      'Florestas que ficam entre as 10 mais desenvolvidas garantem alta recompensa em pontos e badges exclusivos para os usuários da comunidade.',
  },
];

export const recursosEcossistema: readonly ItemInformativo[] = [
  {
    title: 'Árvore Digital',
    description:
      'Começa morta, marrom-acinzentada e sem folhas, e evolui conforme o usuário engaja com conteúdos do movimento, completa missões e acumula badges, até virar uma árvore cheia de folhas, frutos e, nos níveis finais, flores.',
  },
  {
    title: 'Floresta Digital',
    description:
      'É a expansão coletiva do sistema de árvores por comunidade. Cresce pelo mesmo tipo de ação, mas em ritmo mais lento, exigindo que vários usuários engajem ao mesmo tempo, e reúne visivelmente as árvores de todos os participantes.',
  },
  {
    title: 'Badges',
    description:
      'Colecionáveis adquiridos por missões, engajamento e progressão da árvore/floresta, exibidos em uma faixa estilo escoteiro no perfil, com efeitos visuais que ficam mais chamativos quanto mais raro é o badge.',
  },
];

export const valores: readonly ItemInformativo[] = [
  { title: 'Verificação real', description: 'Cada ação é comprovada por evidência (foto, vídeo, GPS, QR Code ou OCR) antes de gerar qualquer pontuação.' },
  { title: 'Decisão nunca só da IA', description: 'A IA fornece sinais, mas quem decide a validade de uma submissão é o motor de regras do EcoGuard, cruzando GPS, horário, frequência e histórico.' },
  { title: 'Sem vantagem comprada', description: 'Nenhum plano pago pode vender EcoPoints ou vantagem de pontuação, nem hoje, nem em planos pagos futuros.' },
  { title: 'Transparência na apuração', description: 'O encerramento da competição segue um processo auditável: congelamento do ranking, cálculo da pontuação final, desempate e confirmação do vencedor.' },
  { title: 'Escalabilidade', description: 'O ranking nunca é somado em tempo real: uma camada de agregado com cache garante performance mesmo com o crescimento da base de usuários.' },
  { title: 'Custo consciente', description: 'Vídeo não é exigido por padrão; foto, QR Code e OCR cobrem a maior parte das missões, mantendo o sistema mais barato de operar.' },
];
