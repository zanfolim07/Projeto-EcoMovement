import type { Missao, Submissao } from '../types';

export const TEMPO_MAXIMO_SEGUNDOS = 120;

const INSTRUCOES_VIDEO =
  'Para comprovar a ação só é aceito vídeo gravado na hora, diretamente pela câmera do app, e não da galeria. O vídeo pode ter no máximo dois minutos.';
const INSTRUCOES_FOTO =
  'Para comprovar a ação só é aceita foto tirada na hora, diretamente pela câmera do app, e não da galeria. Enquadre bem a ação realizada.';
const INSTRUCOES_AUTOMATICA =
  'Esta missão é acompanhada automaticamente pela SoulUp. Cada ação realizada no app soma progresso até completar a meta.';

export const missoesIniciais: readonly Missao[] = [
  {
    id: 1,
    titulo: 'Fazer uma refeição com legumes e verduras',
    descricao: 'Grave o preparo ou o prato da sua refeição com legumes e verduras.',
    instrucoes: INSTRUCOES_VIDEO,
    pontos: 30,
    tipoEvidencia: 'VIDEO',
    meta: 1,
    progresso: 0,
    status: 'DISPONIVEL',
  },
  {
    id: 2,
    titulo: 'Separar lixo reciclável corretamente',
    descricao: 'Mostre a separação de plástico, papel, metal e vidro nas lixeiras corretas.',
    instrucoes: INSTRUCOES_VIDEO,
    pontos: 30,
    tipoEvidencia: 'VIDEO',
    meta: 1,
    progresso: 0,
    status: 'DISPONIVEL',
  },
  {
    id: 3,
    titulo: 'Usar garrafa ou copo reutilizável',
    descricao: 'Tire uma foto usando sua garrafa ou copo reutilizável no lugar do descartável.',
    instrucoes: INSTRUCOES_FOTO,
    pontos: 20,
    tipoEvidencia: 'FOTO',
    meta: 1,
    progresso: 0,
    status: 'DISPONIVEL',
  },
  {
    id: 4,
    titulo: 'Ir de bicicleta ou transporte público',
    descricao: 'Registre em foto seu deslocamento sustentável do dia.',
    instrucoes: INSTRUCOES_FOTO,
    pontos: 30,
    tipoEvidencia: 'FOTO',
    meta: 1,
    progresso: 0,
    status: 'DISPONIVEL',
  },
  {
    id: 5,
    titulo: 'Engajar em 10 perfis de ONGs',
    descricao: 'Siga e curta 10 posts, moments ou clipz de ONGs parceiras.',
    instrucoes: INSTRUCOES_AUTOMATICA,
    pontos: 30,
    tipoEvidencia: 'AUTOMATICA',
    meta: 10,
    progresso: 2,
    status: 'EM_PROGRESSO',
  },
  {
    id: 6,
    titulo: 'Publicar 20 posts com #EcoMovement',
    descricao: 'Use as hashtags #Sustentabilidade e #EcoMovement nas suas publicações.',
    instrucoes: INSTRUCOES_AUTOMATICA,
    pontos: 20,
    tipoEvidencia: 'AUTOMATICA',
    meta: 20,
    progresso: 7,
    status: 'EM_PROGRESSO',
  },
  {
    id: 7,
    titulo: 'Evoluir sua árvore digital 5 vezes',
    descricao: 'Complete missões e acumule badges para fazer sua árvore crescer.',
    instrucoes: INSTRUCOES_AUTOMATICA,
    pontos: 50,
    tipoEvidencia: 'AUTOMATICA',
    meta: 5,
    progresso: 1,
    status: 'EM_PROGRESSO',
  },
  {
    id: 8,
    titulo: 'Adicionar sua árvore na floresta de uma comunidade',
    descricao: 'Entre em uma comunidade e conecte sua árvore à floresta digital.',
    instrucoes: INSTRUCOES_AUTOMATICA,
    pontos: 30,
    tipoEvidencia: 'AUTOMATICA',
    meta: 1,
    progresso: 0,
    status: 'DISPONIVEL',
  },
  {
    id: 9,
    titulo: 'Compartilhar 10 Moments com #EcoMovement',
    descricao: 'Publique Moments usando as hashtags do movimento.',
    instrucoes: INSTRUCOES_AUTOMATICA,
    pontos: 20,
    tipoEvidencia: 'AUTOMATICA',
    meta: 10,
    progresso: 10,
    status: 'CONCLUIDA',
  },
];

export const submissoesIniciais: readonly Submissao[] = [
  {
    id: 1,
    missaoId: 0,
    titulo: 'Primeiro login',
    pontos: 50,
    status: 'APROVADA',
    enviadaEm: '2026-10-10T09:00:00.000Z',
    concluidaEm: '2026-10-10T09:00:00.000Z',
  },
  {
    id: 2,
    missaoId: 9,
    titulo: 'Compartilhar 10 Moments com #EcoMovement',
    pontos: 20,
    status: 'APROVADA',
    enviadaEm: '2026-10-14T18:30:00.000Z',
    concluidaEm: '2026-10-15T12:00:00.000Z',
  },
];
