import { LuCamera, LuTimer, LuVideo } from 'react-icons/lu';
import type { Missao } from '../../types';
import { TEMPO_MAXIMO_SEGUNDOS } from '../../data/missoes';
import { formatarTempo } from '../../utils/formatadores';

interface InformacoesMissaoProps {
  missao: Missao;
  onContinuar: () => void;
}

export default function InformacoesMissao({ missao, onContinuar }: InformacoesMissaoProps) {
  const ehVideo = missao.tipoEvidencia === 'VIDEO';
  const tempoMaximo = TEMPO_MAXIMO_SEGUNDOS;

  const passos = [
    <>Ao tocar em <strong>Continuar</strong>, a câmera abre e o cronômetro de {formatarTempo(tempoMaximo)} já começa a contar.</>,
    <>{ehVideo ? 'Grave o vídeo mostrando a ação' : 'Tire a foto mostrando a ação'} dentro desse tempo.</>,
    <>Se não gostar do resultado, você pode {ehVideo ? 'gravar de novo' : 'tirar outra foto'}, mas o tempo continua correndo.</>,
    <>Quando o tempo acabar, não dá mais para refazer. Toque em <strong>Enviar</strong> para mandar a evidência para análise.</>,
  ];

  return (
    <div className="flex flex-1 flex-col px-6 pt-4 pb-8">
      <header className="mb-8 text-center">
        <h2 className="mb-3 text-lg font-bold text-ink">Informações</h2>
        <p className="mx-auto mb-4 max-w-72 text-center text-base leading-snug font-semibold text-ink">{missao.titulo}</p>
        <div className="flex justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-eco-soft px-3 py-1 text-xs font-semibold text-eco-dark">
            {ehVideo ? <LuVideo aria-hidden="true" /> : <LuCamera aria-hidden="true" />}
            {ehVideo ? 'Vídeo' : 'Foto'}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-eco-soft px-3 py-1 text-xs font-semibold text-eco-dark">
            <LuTimer aria-hidden="true" />
            {formatarTempo(tempoMaximo)}
          </span>
        </div>
      </header>

      <section className="mb-4 rounded-2xl bg-surface p-5">
        <h3 className="mb-2 text-sm font-bold text-ink">Como comprovar</h3>
        <p className="m-0 text-sm leading-relaxed text-copy">{missao.instrucoes}</p>
      </section>

      <section className="mb-8 rounded-2xl bg-surface p-5">
        <h3 className="mb-4 text-sm font-bold text-ink">Como realizar</h3>
        <ol className="m-0 flex list-none flex-col gap-4 p-0">
          {passos.map((passo, index) => (
            <li key={index} className="flex items-start gap-3 text-left text-sm leading-relaxed text-copy">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-eco text-xs font-bold text-white">
                {index + 1}
              </span>
              <span>{passo}</span>
            </li>
          ))}
        </ol>
      </section>

      <button
        type="button"
        onClick={onContinuar}
        className="mt-auto min-h-14 w-full cursor-pointer rounded-full border-0 bg-eco text-base font-bold text-white transition hover:bg-eco-dark active:scale-[0.98]"
      >
        Continuar
      </button>
    </div>
  );
}
