import { useEffect } from 'react';

export function usePageTitle(titulo?: string) {
  useEffect(() => {
    document.title = titulo ? `${titulo} | EcoMovement` : 'EcoMovement';
  }, [titulo]);
}
