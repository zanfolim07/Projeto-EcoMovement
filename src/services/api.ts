const API_PADRAO = 'https://ecomovement-api.onrender.com';

const API_URL = (import.meta.env.VITE_API_URL ?? API_PADRAO).trim().replace(/\/+$/, '');

export const usandoApi = API_URL !== '';

export const USUARIO_ID = import.meta.env.VITE_USUARIO_ID ?? '1';

export class ErroApi extends Error {
  status: number;

  constructor(mensagem: string, status: number) {
    super(mensagem);
    this.status = status;
  }
}

export async function request<T>(caminho: string, opcoes: RequestInit = {}): Promise<T> {
  const resposta = await fetch(API_URL + caminho, opcoes);

  if (!resposta.ok) {
    const corpo = await resposta.json().catch(() => null);
    throw new ErroApi(corpo?.mensagem ?? `Erro ${resposta.status} ao acessar a API.`, resposta.status);
  }

  const texto = await resposta.text();
  return (texto ? JSON.parse(texto) : undefined) as T;
}

export function urlDaApi(url: string): string {
  if (!usandoApi) return url;
  const { pathname, search } = new URL(url, API_URL);
  return API_URL + pathname + search;
}
