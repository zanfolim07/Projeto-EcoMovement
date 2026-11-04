import type { Missao, NovaSubmissao, PosicaoRanking, ResumoPontos, StatusSubmissao, Submissao } from '../types';
import { request, usandoApi, USUARIO_ID } from './api';
import { missoesMock } from './mock/missoesMock';

export function listarMissoes(): Promise<Missao[]> {
  if (!usandoApi) return missoesMock.listarMissoes();
  return request<Missao[]>(`/missoes?usuarioId=${USUARIO_ID}`);
}

export function buscarMissao(id: number): Promise<Missao> {
  if (!usandoApi) return missoesMock.buscarMissao(id);
  return request<Missao>(`/missoes/${id}?usuarioId=${USUARIO_ID}`);
}

export function listarSubmissoes(): Promise<Submissao[]> {
  if (!usandoApi) return missoesMock.listarSubmissoes();
  return request<Submissao[]>(`/usuarios/${USUARIO_ID}/submissoes`);
}

export function buscarPontos(): Promise<ResumoPontos> {
  if (!usandoApi) return missoesMock.buscarPontos();
  return request<ResumoPontos>(`/usuarios/${USUARIO_ID}/pontos`);
}

export function listarRanking(): Promise<PosicaoRanking[]> {
  if (!usandoApi) return missoesMock.listarRanking();
  return request<PosicaoRanking[]>('/ranking');
}

export function enviarSubmissao(nova: NovaSubmissao): Promise<Submissao> {
  if (!usandoApi) return missoesMock.enviarSubmissao(nova);

  const formulario = new FormData();
  formulario.append('usuarioId', USUARIO_ID);
  formulario.append('missaoId', String(nova.missaoId));
  formulario.append('tipoEvidencia', nova.tipoEvidencia);
  if (nova.duracaoSegundos !== undefined) {
    formulario.append('duracaoSegundos', String(nova.duracaoSegundos));
  }
  formulario.append('arquivo', nova.arquivo);

  return request<Submissao>('/submissoes', { method: 'POST', body: formulario });
}

export function listarSubmissoesPorStatus(status?: StatusSubmissao): Promise<Submissao[]> {
  if (!usandoApi) return missoesMock.listarSubmissoesPorStatus(status);
  return request<Submissao[]>(`/submissoes${status ? `?status=${status}` : ''}`);
}

export function avaliarSubmissao(id: number, decisao: 'aprovar' | 'rejeitar'): Promise<Submissao> {
  if (!usandoApi) return missoesMock.avaliarSubmissao(id, decisao);
  return request<Submissao>(`/submissoes/${id}/${decisao}`, { method: 'PUT' });
}

export function excluirSubmissao(id: number): Promise<void> {
  if (!usandoApi) return missoesMock.excluirSubmissao(id);
  return request<void>(`/submissoes/${id}`, { method: 'DELETE' });
}

export function reiniciarTeste(): Promise<void> {
  if (!usandoApi) return missoesMock.reiniciarTeste();
  return request<void>(`/usuarios/${USUARIO_ID}/submissoes`, { method: 'DELETE' });
}
