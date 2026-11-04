import type { ContatoPayload } from '../types';
import { request, usandoApi } from './api';

export async function enviarContato(contato: ContatoPayload): Promise<void> {
  if (!usandoApi) {
    return;
  }

  await request<void>('/contatos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contato),
  });
}
