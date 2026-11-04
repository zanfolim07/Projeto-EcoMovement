import iconRobo from '../assets/icons/icon-robo.png';
import iconMoedas from '../assets/icons/icon-moeda.png';
import iconChip from '../assets/icons/icon-sistema.png';

import iconAlvo from '../assets/icons/icon alvo.png';
import iconCoroaLendario from '../assets/icons/icon coroa lendario.png';
import iconMedalhaArvore from '../assets/icons/icon medalha arvore.png';
import iconMedalhaBike from '../assets/icons/icon medalha bike.png';
import iconMedalhaCalendario30 from '../assets/icons/icon medalha calendario 30.png';
import iconMedalhaCalendario from '../assets/icons/icon medalha calendario.png';
import iconMedalhaCoracao from '../assets/icons/icon medalha coracao.png';
import iconMedalhaLivro from '../assets/icons/icon medalha livro.png';
import iconMedalhaPlant from '../assets/icons/icon medalha plant.png';
import iconRelogio from '../assets/icons/icon relogio.png';
import iconTrofeuBronze from '../assets/icons/icon trofeu bronze.png';
import iconTrofeuOuro from '../assets/icons/icon trofeu ouro.png';
import iconTrofeuPrata from '../assets/icons/icon trofeu prata.png';

import type { ItemInformativo } from '../types';

export interface Badge {
  icon: string;
  nome: string;
}

export const badges: readonly Badge[] = [
  { icon: iconAlvo, nome: 'Foco nas metas' },
  { icon: iconCoroaLendario, nome: 'Coroa lendária' },
  { icon: iconMedalhaArvore, nome: 'Guardião da árvore' },
  { icon: iconMedalhaBike, nome: 'Mobilidade limpa' },
  { icon: iconMedalhaCalendario30, nome: '30 dias seguidos' },
  { icon: iconMedalhaCalendario, nome: 'Constância' },
  { icon: iconMedalhaCoracao, nome: 'Engajamento solidário' },
  { icon: iconMedalhaLivro, nome: 'Aprendiz sustentável' },
  { icon: iconMedalhaPlant, nome: 'Primeira muda' },
  { icon: iconRelogio, nome: 'Pontualidade' },
  { icon: iconTrofeuBronze, nome: 'Troféu bronze' },
  { icon: iconTrofeuOuro, nome: 'Troféu ouro' },
  { icon: iconTrofeuPrata, nome: 'Troféu prata' },
];

export const heroStats: readonly ItemInformativo[] = [
  {
    title: 'Ganhe pontos',
    description: 'Complete missões e transforme suas ações em pontos dentro da plataforma.',
  },
  {
    title: 'Gere impacto',
    description: 'Seus pontos contribuem para iniciativas que fazem a diferença no mundo real.',
  },
  {
    title: 'Receba recompensas',
    description: 'Troque seus pontos por benefícios e vantagens exclusivas.',
  },
];

export const introFeatures: readonly ItemInformativo[] = [
  {
    title: 'EcoScore (0 a 100)',
    description:
      'A nota da sua submissão específica, calculada por pesos claros (Impacto ambiental 40%, Intensidade 20%, Evidência 20%, Dificuldade 10%, Consistência 10%).',
  },
  {
    title: 'EcoPoints',
    description:
      'Seus pontos acumulados (conversão 1:1 por submissão). Cada missão concluída ainda garante um bônus de +10% sobre o total de pontos acumulados.',
  },
  {
    title: 'Recompensas',
    description:
      'Cobertura integral da conta de energia elétrica para o usuário com maior pontuação ao final de 30 dias de competição! (Com apuração transparente e regras claras de desempate).',
  },
];

interface TreeCard {
  title: string;
  description: string;
  icon: string;
  highlight: boolean;
}

export const treeCards: readonly TreeCard[] = [
  {
    title: 'IA + Motor de Regras',
    description: 'A inteligência artificial apenas fornece sinais (fotos, QR codes, OCR de contas), mas quem decide a validação é o EcoGuard cruzando dados de GPS, tempo e histórico.',
    icon: iconRobo,
    highlight: true,
  },
  {
    title: 'Regra de Ouro (Anti Pay-to-Win)',
    description: 'Dinheiro não compra vantagem. Nenhum plano pago vende EcoPoints ou posições no ranking. A competição é 100% por mérito e impacto real.',
    icon: iconMoedas,
    highlight: false,
  },
  {
    title: 'As 6 Camadas de Proteção',
    description: 'Verificação de evidência, temporal, geográfica, visual, comportamental e cruzamento de dados.',
    icon: iconChip,
    highlight: false,
  },
];
