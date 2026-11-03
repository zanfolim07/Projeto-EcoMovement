import { missoesIniciais, submissoesIniciais } from '../../data/missoes';
import type { Missao, NovaSubmissao, Pontuacao, PosicaoRanking, ResumoPontos, StatusSubmissao, Submissao, UsuarioResumo } from '../../types';
import { ErroApi, USUARIO_ID } from '../api';

const missoes: Missao[] = missoesIniciais.map((missao) => ({ ...missao }));
const submissoes: Submissao[] = submissoesIniciais.map((submissao) => ({ ...submissao }));

const outrosUsuarios: (UsuarioResumo & Pontuacao)[] = [
  { usuarioId: 3, nome: 'Ana Souza', pontos: 170 },
  { usuarioId: 4, nome: 'Bruno Lima', pontos: 140 },
  { usuarioId: 5, nome: 'Carla Mendes', pontos: 110 },
  { usuarioId: 6, nome: 'Diego Rocha', pontos: 80 },
];

export const missoesMock = {
  async listarMissoes(): Promise<Missao[]> {
    return [...missoes];
  },

  async buscarMissao(id: number): Promise<Missao> {
    const missao = missoes.find((item) => item.id === id);
    if (!missao) throw new ErroApi(`Missão ${id} não encontrada.`, 404);
    return { ...missao };
  },

  async listarSubmissoes(): Promise<Submissao[]> {
    return [...submissoes];
  },

  async buscarPontos(): Promise<ResumoPontos> {
    let total = 0;
    for (const submissao of submissoes) {
      if (submissao.status === 'APROVADA') total += submissao.pontos;
    }
    return { total };
  },

  async listarRanking(): Promise<PosicaoRanking[]> {
    const { total } = await missoesMock.buscarPontos();
    const usuarios = [...outrosUsuarios, { usuarioId: Number(USUARIO_ID), nome: 'Usuário Demo', pontos: total }];
    usuarios.sort((a, b) => b.pontos - a.pontos || a.nome.localeCompare(b.nome));

    const ranking: PosicaoRanking[] = [];
    usuarios.forEach((usuario, indice) => {
      const anterior = ranking[indice - 1];
      const posicao = anterior && anterior.pontos === usuario.pontos ? anterior.posicao : indice + 1;
      ranking.push({ ...usuario, posicao });
    });
    return ranking;
  },

  async enviarSubmissao(nova: NovaSubmissao): Promise<Submissao> {
    const missao = missoes.find((item) => item.id === nova.missaoId);
    if (!missao) throw new Error('Missão não encontrada.');

    missao.progresso = missao.meta;
    missao.status = 'EM_ANALISE';

    const submissao: Submissao = {
      id: submissoes.length + 1,
      missaoId: missao.id,
      titulo: missao.titulo,
      pontos: missao.pontos,
      status: 'EM_ANALISE',
      duracaoSegundos: nova.duracaoSegundos,
      enviadaEm: new Date().toISOString(),
    };
    submissoes.push(submissao);

    return submissao;
  },

  async listarSubmissoesPorStatus(status?: StatusSubmissao): Promise<Submissao[]> {
    return submissoes.filter((submissao) => !status || submissao.status === status);
  },

  async avaliarSubmissao(id: number, decisao: 'aprovar' | 'rejeitar'): Promise<Submissao> {
    const submissao = submissoes.find((item) => item.id === id);
    if (!submissao) throw new Error('Submissão não encontrada.');

    submissao.status = decisao === 'aprovar' ? 'APROVADA' : 'REJEITADA';
    submissao.concluidaEm = new Date().toISOString();

    const missao = missoes.find((item) => item.id === submissao.missaoId);
    if (missao) missao.status = decisao === 'aprovar' ? 'CONCLUIDA' : 'DISPONIVEL';

    return submissao;
  },

  async excluirSubmissao(id: number): Promise<void> {
    const indice = submissoes.findIndex((item) => item.id === id);
    if (indice === -1) throw new Error('Submissão não encontrada.');

    const [removida] = submissoes.splice(indice, 1);
    const missao = missoes.find((item) => item.id === removida.missaoId);
    if (missao && missao.tipoEvidencia !== 'AUTOMATICA') {
      missao.status = 'DISPONIVEL';
      missao.progresso = 0;
    }
  },

  async reiniciarTeste(): Promise<void> {
    missoes.splice(0, missoes.length, ...missoesIniciais.map((missao) => ({ ...missao })));
    submissoes.splice(0, submissoes.length, ...submissoesIniciais.map((submissao) => ({ ...submissao })));
  },
};
