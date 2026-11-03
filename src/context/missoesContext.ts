import { createContext } from 'react';
import type { Missao, NovaSubmissao, Submissao } from '../types';

interface MissoesContextValue {
  missoes: Missao[];
  submissoes: Submissao[];
  pontos: number;
  pontosQuiz: number;
  acertosQuiz: number[];
  carregando: boolean;
  erro: string;
  recarregar: () => Promise<void>;
  enviarEvidencia: (nova: NovaSubmissao) => Promise<Submissao>;
  registrarAcertoQuiz: (indice: number) => void;
  iniciarQuiz: () => void;
  quizEncerrado: boolean;
  tentativasRestantesQuiz: number;
  reiniciar: () => Promise<void>;
  painelAberto: boolean;
  abrirPainel: () => void;
  fecharPainel: () => void;
}

export const MissoesContext = createContext<MissoesContextValue | null>(null);
