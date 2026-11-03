import { useContext } from 'react';
import { MissoesContext } from '../context/missoesContext';

export function useMissoes() {
  const contexto = useContext(MissoesContext);
  if (!contexto) {
    throw new Error('useMissoes deve ser usado dentro de <MissoesProvider>.');
  }
  return contexto;
}
