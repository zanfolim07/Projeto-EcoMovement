import { LuLoaderCircle } from 'react-icons/lu';
import { useDemora } from '../../hooks/useDemora';

interface AvisoConexaoProps {
  carregando: boolean;
  className?: string;
}

export default function AvisoConexao({ carregando, className = '' }: AvisoConexaoProps) {
  const demorando = useDemora(carregando);

  if (!carregando || !demorando) return null;

  return (
    <p
      role="status"
      className={`flex animate-fade-in items-start gap-3 rounded-2xl bg-brand-soft p-4 text-sm leading-relaxed text-brand-dark ${className}`}
    >
      <LuLoaderCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0 animate-spin" />
      <span>
        <strong className="block">Conectando ao servidor…</strong>
        A API está hospedada em um servidor gratuito que hiberna quando fica sem uso. O primeiro acesso pode levar até 1 minuto.
      </span>
    </p>
  );
}
