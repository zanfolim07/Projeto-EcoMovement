import type { TelaSolucao } from '../../types';

interface TelaSolucaoCardProps {
  tela: TelaSolucao;
}

export default function TelaSolucaoCard({ tela }: TelaSolucaoCardProps) {
  return (
    <article className="group flex h-full flex-col items-center text-center">
      <img
        src={tela.imagem}
        alt={tela.alt}
        loading="lazy"
        decoding="async"
        className="h-72 w-full max-w-44 object-contain transition duration-300 group-hover:-translate-y-2"
      />
      <p className="mt-6 mb-1 text-xs font-bold text-brand">{tela.categoria}</p>
      <h3 className="mb-2 text-lg font-bold text-ink">{tela.titulo}</h3>
      <p className="m-0 max-w-72 text-sm leading-relaxed text-muted">{tela.descricao}</p>
    </article>
  );
}
