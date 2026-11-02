import { useState } from 'react';
import { LuAward } from 'react-icons/lu';
import { useMissoes } from '../../hooks/useMissoes';
import AvisoConexao from '../AvisoConexao/AvisoConexao';
import type { Missao, StatusMissao } from '../../types';
import MissaoItem from './MissaoItem';

type Filtro = 'TODAS' | StatusMissao;

const filtros: readonly { valor: Filtro; rotulo: string }[] = [
  { valor: 'TODAS', rotulo: 'Todas' },
  { valor: 'DISPONIVEL', rotulo: 'Disponíveis' },
  { valor: 'EM_PROGRESSO', rotulo: 'Em progresso' },
  { valor: 'EM_ANALISE', rotulo: 'Em análise' },
];

interface ListaMissoesProps {
  onComecar: (missao: Missao) => void;
  onVerConcluidas: () => void;
}

export default function ListaMissoes({ onComecar, onVerConcluidas }: ListaMissoesProps) {
  const { missoes, pontos, carregando, erro, recarregar } = useMissoes();
  const [filtro, setFiltro] = useState<Filtro>('TODAS');

  const disponiveis = missoes.filter((missao) => missao.status === 'DISPONIVEL').length;
  const visiveis = missoes.filter((missao) =>
    filtro === 'TODAS' ? missao.status !== 'CONCLUIDA' : missao.status === filtro,
  );

  return (
    <div className="flex flex-1 flex-col gap-2 bg-panel">
      <section className="rounded-b-[2rem] bg-white px-6 pt-2 pb-8">
        <h2 className="m-0 text-2xl leading-snug font-bold text-ink">
          Complete missões e acumule <span className="text-soul">Pontos Soul</span>
        </h2>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onVerConcluidas}
            className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full border-2 border-soul bg-white px-5 text-sm font-semibold text-soul transition-colors hover:bg-soul hover:text-white"
          >
            <LuAward aria-hidden="true" className="size-5" />
            Missões concluídas
          </button>
          <span className="text-xs text-muted">
            <strong className="text-lg text-soul">{pontos}</strong> Pontos Soul
          </span>
        </div>
      </section>

      <section className="flex-1 rounded-t-[2rem] bg-white px-6 pt-7 pb-6" aria-labelledby="lista-missoes-titulo">
        <h3 id="lista-missoes-titulo" className="m-0 text-xl font-bold text-ink">Missões</h3>
        <p className="mt-0.5 mb-5 text-sm text-copy">
          {disponiveis} {disponiveis === 1 ? 'missão disponível' : 'missões disponíveis'} agora
        </p>

        <div className="flex gap-1 overflow-x-auto rounded-full bg-slate-50 p-1.5" role="group" aria-label="Filtrar missões">
          {filtros.map((item) => (
            <button
              key={item.valor}
              type="button"
              aria-pressed={filtro === item.valor}
              onClick={() => setFiltro(item.valor)}
              className={`min-h-9 flex-1 cursor-pointer rounded-full border-0 px-3 text-xs font-medium whitespace-nowrap transition-colors ${filtro === item.valor ? 'bg-eco text-white' : 'bg-transparent text-copy hover:text-ink'}`}
            >
              {item.rotulo}
            </button>
          ))}
        </div>

        <AvisoConexao carregando={carregando} className="mt-4" />

        {carregando && (
          <ul className="mt-2 list-none p-0" aria-label="Carregando missões">
            {[1, 2, 3, 4].map((linha) => (
              <li key={linha} className="flex animate-pulse items-center gap-3 border-b border-line py-4">
                <span className="clip-hexagon size-11 bg-slate-200" />
                <span className="h-3 flex-1 rounded bg-slate-200" />
                <span className="h-8 w-20 rounded-full bg-slate-200" />
              </li>
            ))}
          </ul>
        )}

        {!carregando && erro && (
          <div className="mt-6 rounded-2xl bg-red-50 p-4 text-sm text-red-700" role="alert">
            <p className="m-0">{erro}</p>
            <button type="button" onClick={recarregar} className="mt-3 cursor-pointer rounded-full border-0 bg-red-600 px-4 py-2 text-xs font-semibold text-white">
              Tentar novamente
            </button>
          </div>
        )}

        {!carregando && !erro && (
          <ul className="mt-2 list-none p-0" aria-live="polite">
            {visiveis.map((missao) => (
              <MissaoItem key={missao.id} missao={missao} onComecar={onComecar} />
            ))}
            {visiveis.length === 0 && (
              <li className="py-10 text-center text-sm text-muted">Nenhuma missão nesta categoria por enquanto.</li>
            )}
          </ul>
        )}
      </section>
    </div>
  );
}
