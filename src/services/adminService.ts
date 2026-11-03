import type { AdminLogado } from '../types';
import { request, usandoApi } from './api';

export async function loginAdmin(email: string, senha: string): Promise<AdminLogado> {
  if (!usandoApi) {
    if (email.trim() === 'ecomovement@admin.com' && senha === '1234') {
      return { id: 0, nome: 'Admin EcoGuard' };
    }
    throw new Error('E-mail ou senha incorretos.');
  }

  return request<AdminLogado>('/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });
}