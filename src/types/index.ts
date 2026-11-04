export interface NavItem {
  label: string;
  to: string;
}

export interface Integrante {
  id: string;
  nome: string;
  rm: string;
  turma: string;
  foto: string;
  github: string;
  linkedin: string;
  contribuicoes: readonly string[];
}

interface FaqPergunta {
  question: string;
  answer: string;
}

export interface FaqSecao {
  title: string;
  questions: readonly FaqPergunta[];
}

export interface ItemInformativo {
  title: string;
  description: string;
  number?: string;
}

export interface PassoMissao {
  image: string;
  title: string;
  description: string;
}

export const categoriasSolucao = ['Missões', 'Comunidade', 'Perfil e conquistas'] as const;
export type CategoriaSolucao = (typeof categoriasSolucao)[number];

export interface TelaSolucao {
  id: string;
  titulo: string;
  categoria: CategoriaSolucao;
  imagem: string;
  alt: string;
  descricao: string;
  destaques: readonly string[];
}

export interface TelaComplementar {
  src: string;
  title: string;
}

export type TipoEvidencia = 'VIDEO' | 'FOTO' | 'AUTOMATICA' | 'QUIZ';

export type StatusMissao = 'DISPONIVEL' | 'EM_PROGRESSO' | 'EM_ANALISE' | 'CONCLUIDA';

export type StatusSubmissao = 'EM_ANALISE' | 'APROVADA' | 'REJEITADA';

export type Dificuldade = 'FACIL' | 'MEDIA' | 'DIFICIL';

export interface Missao {
  id: number;
  titulo: string;
  descricao: string;
  instrucoes: string;
  pontos: number;
  tipoEvidencia: TipoEvidencia;
  meta: number;
  progresso: number;
  status: StatusMissao;
  categoria?: string;
  dificuldade?: Dificuldade;
  tempoMaximoSegundos?: number;
}

export interface Submissao {
  id: number;
  missaoId: number;
  titulo: string;
  pontos: number;
  status: StatusSubmissao;
  duracaoSegundos?: number;
  enviadaEm: string;
  concluidaEm?: string;
  usuarioId?: number;
  tipoEvidencia?: TipoEvidencia;
  evidenciaUrl?: string | null;
}

export interface NovaSubmissao {
  missaoId: number;
  tipoEvidencia: Exclude<TipoEvidencia, 'AUTOMATICA' | 'QUIZ'>;
  arquivo: Blob;
  duracaoSegundos?: number;
}

export interface ResumoPontos {
  total: number;
}

export interface UsuarioResumo {
  usuarioId: number;
  nome: string;
}

export interface Pontuacao {
  pontos: number;
}

export type PosicaoRanking = UsuarioResumo & Pontuacao & { posicao: number };

export interface ContatoPayload {
  nome: string;
  email: string;
  mensagem: string;
}

export interface AdminLogado {
  id: number;
  nome: string;
}

export interface PerguntaQuiz {
  pergunta: string;
  alternativas: string[];
  correta: number;
}
