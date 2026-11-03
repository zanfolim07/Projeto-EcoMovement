import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { missaoQuiz, perguntasQuiz, QUIZ_MISSAO_ID, TENTATIVAS_QUIZ } from '../data/quiz';
import { buscarPontos, enviarSubmissao, listarMissoes, listarSubmissoes, reiniciarTeste } from '../services/missoesService';
import { carregarProgressoQuiz, limparProgressoQuiz, pontosDosAcertos, salvarProgressoQuiz } from '../services/quizService';
import type { ProgressoQuiz } from '../services/quizService';
import type { Missao, NovaSubmissao, Submissao } from '../types';
import { MissoesContext } from './missoesContext';

function missaoQuizComProgresso(progresso: ProgressoQuiz): Missao {
  const acertos = progresso.acertos.length;
  return {
    ...missaoQuiz,
    progresso: acertos,
    status: progresso.concluidoEm ? 'CONCLUIDA' : acertos > 0 || progresso.tentativas ? 'EM_PROGRESSO' : 'DISPONIVEL',
  };
}

function submissaoDoQuiz(progresso: ProgressoQuiz): Submissao[] {
  if (!progresso.concluidoEm) return [];
  return [
    {
      id: -QUIZ_MISSAO_ID,
      missaoId: QUIZ_MISSAO_ID,
      titulo: missaoQuiz.titulo,
      pontos: pontosDosAcertos(progresso.acertos),
      status: 'APROVADA',
      enviadaEm: progresso.concluidoEm,
      concluidaEm: progresso.concluidoEm,
    },
  ];
}

export default function MissoesProvider({ children }: { children: ReactNode }) {
  const [missoes, setMissoes] = useState<Missao[]>([]);
  const [submissoes, setSubmissoes] = useState<Submissao[]>([]);
  const [pontosApi, setPontosApi] = useState(0);
  const [progressoQuiz, setProgressoQuiz] = useState<ProgressoQuiz>(carregarProgressoQuiz);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [painelAberto, setPainelAberto] = useState(false);

  function carregarDados() {
    return Promise.all([listarMissoes(), listarSubmissoes(), buscarPontos()])
      .then(([listaMissoes, listaSubmissoes, resumo]) => {
        setMissoes(listaMissoes);
        setSubmissoes(listaSubmissoes);
        setPontosApi(resumo.total);
        setErro('');
      })
      .catch(() => setErro('Não foi possível carregar as missões.'))
      .finally(() => setCarregando(false));
  }

  function recarregar() {
    setCarregando(true);
    return carregarDados();
  }

  useEffect(() => {
    carregarDados();
  }, []);

  async function enviarEvidencia(nova: NovaSubmissao) {
    const submissao = await enviarSubmissao(nova);
    await carregarDados();
    return submissao;
  }

  async function reiniciar() {
    await reiniciarTeste();
    limparProgressoQuiz();
    setProgressoQuiz({ acertos: [] });
    await carregarDados();
  }

  function atualizarQuiz(alterar: (atual: ProgressoQuiz) => ProgressoQuiz) {
    setProgressoQuiz((atual) => {
      const novo = alterar(atual);
      salvarProgressoQuiz(novo);
      return novo;
    });
  }

  function registrarAcertoQuiz(indice: number) {
    atualizarQuiz((atual) => {
      if (atual.acertos.includes(indice)) return atual;
      const acertos = [...atual.acertos, indice];
      const completo = acertos.length === perguntasQuiz.length;
      return { ...atual, acertos, concluidoEm: completo ? (atual.concluidoEm ?? new Date().toISOString()) : atual.concluidoEm };
    });
  }

  function iniciarQuiz() {
    atualizarQuiz((atual) => {
      if (atual.concluidoEm) return atual;
      const tentativas = (atual.tentativas ?? 0) + 1;
      return { ...atual, tentativas, concluidoEm: tentativas >= TENTATIVAS_QUIZ ? new Date().toISOString() : undefined };
    });
  }

  const pontosQuiz = pontosDosAcertos(progressoQuiz.acertos);

  const valor = {
    missoes: carregando || erro ? missoes : [missaoQuizComProgresso(progressoQuiz), ...missoes],
    submissoes: [...submissaoDoQuiz(progressoQuiz), ...submissoes],
    pontos: pontosApi + pontosQuiz,
    pontosQuiz,
    acertosQuiz: progressoQuiz.acertos,
    carregando,
    erro,
    recarregar,
    enviarEvidencia,
    registrarAcertoQuiz,
    iniciarQuiz,
    quizEncerrado: Boolean(progressoQuiz.concluidoEm),
    tentativasRestantesQuiz: Math.max(TENTATIVAS_QUIZ - (progressoQuiz.tentativas ?? 0), 0),
    reiniciar,
    painelAberto,
    abrirPainel: () => setPainelAberto(true),
    fecharPainel: () => setPainelAberto(false),
  };

  return <MissoesContext.Provider value={valor}>{children}</MissoesContext.Provider>;
}
