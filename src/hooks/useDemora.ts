import { useEffect, useState } from 'react';

export function useDemora(ativo: boolean, milissegundos = 4000): boolean {
  const [demorando, setDemorando] = useState(false);

  useEffect(() => {
    if (!ativo) return;

    const temporizador = window.setTimeout(() => setDemorando(true), milissegundos);
    return () => {
      window.clearTimeout(temporizador);
      setDemorando(false);
    };
  }, [ativo, milissegundos]);

  return ativo && demorando;
}
