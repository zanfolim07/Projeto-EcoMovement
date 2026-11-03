import type { Missao, PerguntaQuiz } from '../types';

export const QUIZ_MISSAO_ID = 100;
export const PONTOS_POR_ACERTO = 20;
export const VIDAS_QUIZ = 2;
export const TENTATIVAS_QUIZ = 2;

export const perguntasQuiz: readonly PerguntaQuiz[] = [
  {
    pergunta: 'O que significa desenvolvimento sustentável?',
    alternativas: [
      'Crescimento econômico ilimitado',
      'Atender o presente sem comprometer o futuro',
      'Reduzir apenas o uso de energia',
      'Produzir mais com menos custo',
    ],
    correta: 1,
  },
  {
    pergunta: 'Qual destes materiais leva mais tempo para se decompor na natureza?',
    alternativas: ['Papel', 'Casca de fruta', 'Garrafa de vidro', 'Tecido de algodão'],
    correta: 2,
  },
  {
    pergunta: 'Em qual lixeira da coleta seletiva deve ser descartado o plástico?',
    alternativas: ['Azul', 'Vermelha', 'Verde', 'Amarela'],
    correta: 1,
  },
  {
    pergunta: 'Qual atitude ajuda a reduzir a emissão de gases do efeito estufa?',
    alternativas: [
      'Deixar aparelhos em modo de espera',
      'Usar bicicleta ou transporte público',
      'Usar copos descartáveis',
      'Tomar banhos mais longos',
    ],
    correta: 1,
  },
  {
    pergunta: 'O que representa o símbolo dos três Rs da sustentabilidade?',
    alternativas: [
      'Reduzir, reutilizar e reciclar',
      'Reformar, revender e recomprar',
      'Recolher, retirar e remover',
      'Reabastecer, reaproveitar e repetir',
    ],
    correta: 0,
  },
];

export const PONTOS_QUIZ = perguntasQuiz.length * PONTOS_POR_ACERTO;

export const missaoQuiz: Missao = {
  id: QUIZ_MISSAO_ID,
  titulo: 'Complete o quiz EcoMovement',
  descricao: `Responda ${perguntasQuiz.length} perguntas sobre sustentabilidade.`,
  instrucoes: `Cada resposta certa vale ${PONTOS_POR_ACERTO} Pontos Soul. Você tem ${VIDAS_QUIZ} vidas e ${TENTATIVAS_QUIZ} tentativas.`,
  pontos: PONTOS_QUIZ,
  tipoEvidencia: 'QUIZ',
  meta: perguntasQuiz.length,
  progresso: 0,
  status: 'DISPONIVEL',
};
