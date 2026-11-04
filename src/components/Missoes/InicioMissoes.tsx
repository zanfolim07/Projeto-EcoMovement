import { useState } from 'react';
import type { IconType } from 'react-icons';
import { LuChevronRight, LuRotateCcw, LuTarget, LuTrophy } from 'react-icons/lu';
import { useMissoes } from '../../hooks/useMissoes';

interface InicioMissoesProps {
  onMissoes: () => void;
  onRanking: () => void;
}

const passos = [
  'Escolha uma missão e envie a foto ou o vídeo pela câmera.',
  'Aprove o envio no Painel EcoGuard (/admin).',
  'Veja seus Pontos Soul subirem no ranking.',
];

interface BotaoAcaoProps {
  icone: IconType;
  titulo: string;
  descricao: string;
  onClick: () => void;
}

function ReiniciarTeste() {
  const { reiniciar } = useMissoes();
  const [etapa, setEtapa] = useState<'inicial' | 'confirmando' | 'reiniciando' | 'erro'>('inicial');

  async function confirmar() {
    setEtapa('reiniciando');
    try {
      await reiniciar();
      setEtapa('inicial');
    } catch {
      setEtapa('erro');
    }
  }

  const botaoTexto = 'cursor-pointer border-0 bg-transparent p-0 text-xs font-semibold text-white';

  if (etapa === 'confirmando' || etapa === 'reiniciando') {
    return (
      <p className="m-0 flex items-center justify-center gap-3 text-xs text-white" role="group" aria-label="Confirmar reinício do teste">
        <span>Apagar seus envios e recomeçar?</span>
        <button type="button" onClick={confirmar} disabled={etapa === 'reiniciando'} className={botaoTexto}>
          {etapa === 'reiniciando' ? 'Reiniciando…' : 'Sim'}
        </button>
        <button type="button" onClick={() => setEtapa('inicial')} disabled={etapa === 'reiniciando'} className={botaoTexto}>
          Cancelar
        </button>
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <button type="button" onClick={() => setEtapa('confirmando')} className={`inline-flex items-center gap-1.5 ${botaoTexto}`}>
        <LuRotateCcw className="size-3.5" aria-hidden="true" />
        Reiniciar teste
      </button>
      {etapa === 'erro' && (
        <span className="text-xs text-white" role="alert">
          Não foi possível reiniciar. Tente novamente.
        </span>
      )}
    </div>
  );
}

function BotaoAcao({ icone: Icone, titulo, descricao, onClick }: BotaoAcaoProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-4 rounded-2xl border-0 bg-white p-4 text-left shadow-[0_12px_30px_rgb(20_24_90_/_0.25)]"
    >
      <Icone className="size-7 shrink-0 text-soul" aria-hidden="true" />
      <span className="min-w-0 flex-1">
        <span className="block text-lg leading-tight font-bold text-soul">{titulo}</span>
        <span className="mt-0.5 block text-xs text-muted">{descricao}</span>
      </span>
      <LuChevronRight className="size-5 shrink-0 text-soul/60" aria-hidden="true" />
    </button>
  );
}

export default function InicioMissoes({ onMissoes, onRanking }: InicioMissoesProps) {
  const { missoes, pontos } = useMissoes();
  const disponiveis = missoes.filter((missao) => missao.status === 'DISPONIVEL' && missao.tipoEvidencia !== 'AUTOMATICA').length;

  return (
    <div className="relative isolate flex flex-1 flex-col overflow-hidden bg-soul px-7 pt-2 pb-8 text-white">
      <span className="pointer-events-none absolute top-24 -right-24 -z-10 size-72 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
      <span className="pointer-events-none absolute -bottom-28 -left-24 -z-10 size-80 rounded-full bg-[#80D7DE]/20 blur-3xl" aria-hidden="true" />

      <div>
        <p className="m-0 flex items-center gap-1 text-[2.75rem] leading-none font-bold tracking-tight" aria-label="soul UP">
          soul
          <span className="flex size-8 items-center justify-center rounded-full border-[3px] border-white text-[0.6rem] font-extrabold tracking-normal">
            UP
          </span>
        </p>
        <h2 className="mt-1 mb-0 text-[2rem] font-bold text-white">EcoMovement</h2>
      </div>

      <section className="mt-6 rounded-3xl bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur-sm" aria-labelledby="como-testar-titulo">
        <p className="m-0 text-[0.8rem] leading-relaxed text-white/90">
          As missões e o ranking foram desenvolvidos para fins de demonstração e testes. O objetivo é permitir que você explore as
          funcionalidades e entenda, na prática, como funciona a dinâmica do sistema.
        </p>

        <h3 id="como-testar-titulo" className="mt-4 mb-3 text-xs font-semibold tracking-wide text-white/70 uppercase">
          Como testar
        </h3>
        <ol className="m-0 flex list-none flex-col gap-2.5 p-0">
          {passos.map((passo, indice) => (
            <li key={passo} className="flex items-start gap-3 text-sm leading-snug">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-soul">
                {indice + 1}
              </span>
              <span className="pt-0.5">{passo}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-auto flex flex-col gap-3 pt-6">
        <p className="m-0 mb-1 text-center text-xs text-white/80">
          Você tem <strong className="text-base text-white">{pontos}</strong> Pontos Soul
        </p>
        <BotaoAcao
          icone={LuTarget}
          titulo="Missões"
          descricao={disponiveis === 1 ? '1 missão disponível para enviar' : `${disponiveis} missões disponíveis para enviar`}
          onClick={onMissoes}
        />
        <BotaoAcao icone={LuTrophy} titulo="Ranking" descricao="Veja sua posição entre os participantes" onClick={onRanking} />
        <div className="mt-2">
          <ReiniciarTeste />
        </div>
      </div>
    </div>
  );
}
