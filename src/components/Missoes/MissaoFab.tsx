import { LuTarget } from 'react-icons/lu';
import { useMissoes } from '../../hooks/useMissoes';

export default function MissaoFab() {
  const { abrirPainel, painelAberto, missoes } = useMissoes();
  const disponiveis = missoes.filter((missao) => missao.status === 'DISPONIVEL' && missao.tipoEvidencia !== 'AUTOMATICA').length;

  if (painelAberto) return null;

  return (
    <div className="group fixed right-4 bottom-4 z-40 flex items-center gap-3 md:right-6 md:bottom-6">
      <span
        className="pointer-events-none rounded-full bg-ink px-4 py-2 text-xs font-semibold whitespace-nowrap text-white opacity-0 shadow-lg transition duration-200 translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100"
        aria-hidden="true"
      >
        Fazer missão
      </span>
      <button
        type="button"
        onClick={abrirPainel}
        aria-label="Fazer missão"
        aria-haspopup="dialog"
        className="bg-gradient-brand relative flex size-14 cursor-pointer items-center justify-center rounded-full border-0 text-white shadow-[0_10px_25px_rgb(24_133_219_/_0.45)] transition duration-200 hover:scale-105 active:scale-95 md:size-16"
      >
        <LuTarget className="size-7" aria-hidden="true" />
        {disponiveis > 0 && (
          <span className="absolute -top-1 -right-1 flex size-5.5 items-center justify-center rounded-full bg-eco text-[0.65rem] font-bold text-white ring-2 ring-white">
            {disponiveis}
          </span>
        )}
      </button>
    </div>
  );
}
