import { PONTOS_POR_ACERTO } from '../data/quiz';
import type { PosicaoRanking } from '../types';
import { USUARIO_ID } from './api';

const CHAVE = `ecomovement-quiz-${USUARIO_ID}`;

export interface ProgressoQuiz {
  acertos: number[];
  tentativas?: number;
  concluidoEm?: string;
}

export function carregarProgressoQuiz(): ProgressoQuiz {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE) ?? 'null');
    if (salvo && Array.isArray(salvo.acertos)) return salvo;
  } catch {
    return { acertos: [] };
  }
  return { acertos: [] };
}

export function salvarProgressoQuiz(progresso: ProgressoQuiz) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(progresso));
  } catch {
    return;
  }
}

export function limparProgressoQuiz() {
  try {
    localStorage.removeItem(CHAVE);
  } catch {
    return;
  }
}

export function somarQuizNoRanking(ranking: PosicaoRanking[], pontosQuiz: number): PosicaoRanking[] {
  if (pontosQuiz === 0) return ranking;

  const usuarios = ranking.map((item) =>
    String(item.usuarioId) === USUARIO_ID ? { ...item, pontos: item.pontos + pontosQuiz } : item,
  );
  usuarios.sort((a, b) => b.pontos - a.pontos || a.nome.localeCompare(b.nome));

  const resultado: PosicaoRanking[] = [];
  usuarios.forEach((usuario, indice) => {
    const anterior = resultado[indice - 1];
    const posicao = anterior && anterior.pontos === usuario.pontos ? anterior.posicao : indice + 1;
    resultado.push({ ...usuario, posicao });
  });
  return resultado;
}

export const pontosDosAcertos = (acertos: number[]) => acertos.length * PONTOS_POR_ACERTO;
