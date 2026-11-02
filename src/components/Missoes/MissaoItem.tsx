import { LuBrain, LuCamera, LuVideo } from 'react-icons/lu';
import type { Missao } from '../../types';
import PontosHexagono from './PontosHexagono';

interface MissaoItemProps {
  missao: Missao;
  onComecar: (missao: Missao) => void;
}

function AcaoMissao({ missao, onComecar }: MissaoItemProps) {
  if (missao.status === 'CONCLUIDA') {
    return <span className="rounded-full bg-eco-soft px-4 py-2 text-xs font-bold text-eco-dark">Concluída</span>;
  }

  if (missao.status === 'EM_ANALISE') {
    return <span className="text-xs font-bold text-soul">Em análise</span>;
  }

  if (missao.tipoEvidencia === 'QUIZ') {
    return (
      <div className="flex flex-col items-center gap-1.5">
        <button
          type="button"
          onClick={() => onComecar(missao)}
          className="min-h-10 cursor-pointer rounded-full border-0 bg-soul px-5 text-sm font-bold text-white transition hover:brightness-110 active:scale-95"
          aria-label={`${missao.status === 'EM_PROGRESSO' ? 'Tentar de novo' : 'Começar'} missão: ${missao.titulo}`}
        >
          {missao.status === 'EM_PROGRESSO' ? 'Tentar de novo' : 'Começar'}
        </button>
        <span className="flex items-center gap-1 text-[0.65rem] text-muted">
          <LuBrain aria-hidden="true" />
          {missao.progresso}/{missao.meta} acertos
        </span>
      </div>
    );
  }

  if (missao.tipoEvidencia === 'AUTOMATICA') {
    const percentual = Math.round((missao.progresso / missao.meta) * 100);
    return (
      <div className="w-20 text-center">
        <span className="block text-xs text-copy">Progresso</span>
        <span className="block text-xl font-bold text-ink">
          {missao.progresso}/{missao.meta}
        </span>
        <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-slate-200">
          <span className="block h-full rounded-full bg-eco" style={{ width: `${percentual}%` }} />
        </span>
      </div>
    );
  }

  const ehVideo = missao.tipoEvidencia === 'VIDEO';

  return (
    <div className="flex flex-col items-center gap-1.5">
      <button
        type="button"
        onClick={() => onComecar(missao)}
        className="min-h-10 cursor-pointer rounded-full border-0 bg-eco px-5 text-sm font-bold text-white transition hover:bg-eco-dark active:scale-95"
        aria-label={`Começar missão: ${missao.titulo}`}
      >
        Começar
      </button>
      <span className="flex items-center gap-1 text-[0.65rem] text-muted">
        {ehVideo ? <LuVideo aria-hidden="true" /> : <LuCamera aria-hidden="true" />}
        {ehVideo ? 'Vídeo pelo app' : 'Foto pelo app'}
      </span>
    </div>
  );
}

export default function MissaoItem({ missao, onComecar }: MissaoItemProps) {
  return (
    <li className="flex items-center gap-4 border-b border-line py-5 last:border-0">
      <PontosHexagono pontos={missao.pontos} tom={missao.tipoEvidencia === 'QUIZ' ? 'soul' : 'eco'} />
      <p className="m-0 min-w-0 flex-1 text-left text-sm leading-snug text-ink">{missao.titulo}</p>
      <AcaoMissao missao={missao} onComecar={onComecar} />
    </li>
  );
}
