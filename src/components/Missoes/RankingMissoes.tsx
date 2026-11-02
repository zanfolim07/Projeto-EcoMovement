import { useCallback, useEffect, useState } from 'react';
import { USUARIO_ID } from '../../services/api';
import { listarRanking } from '../../services/missoesService';
import { somarQuizNoRanking } from '../../services/quizService';
import { useMissoes } from '../../hooks/useMissoes';
import type { PosicaoRanking } from '../../types';
import AvisoConexao from '../AvisoConexao/AvisoConexao';

const coresAvatar = ['bg-sky-200 text-sky-800', 'bg-rose-200 text-rose-800', 'bg-amber-200 text-amber-800', 'bg-emerald-200 text-emerald-800', 'bg-violet-200 text-violet-800', 'bg-orange-200 text-orange-800'];

const podio = [
  { indice: 1, altura: 'h-28', cor: 'bg-[#A8E6EF]', numero: 'text-5xl', deslocamento: 'mt-10' },
  { indice: 0, altura: 'h-40', cor: 'bg-[#F0897A]', numero: 'text-6xl', deslocamento: '' },
  { indice: 2, altura: 'h-24', cor: 'bg-[#BFD5FB]', numero: 'text-5xl', deslocamento: 'mt-14' },
];

function ehUsuarioAtual(item: PosicaoRanking) {
  return String(item.usuarioId) === USUARIO_ID;
}

function primeiroNome(item: PosicaoRanking) {
  return ehUsuarioAtual(item) ? 'Você' : item.nome.split(' ')[0];
}

function Avatar({ item, tamanho }: { item: PosicaoRanking; tamanho: string }) {
  const iniciais = item.nome
    .split(' ')
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('')
    .toUpperCase();

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full font-bold ring-2 ring-white ${tamanho} ${coresAvatar[item.usuarioId % coresAvatar.length]}`}
      aria-hidden="true"
    >
      {iniciais}
    </span>
  );
}

export default function RankingMissoes({ onVoltar }: { onVoltar: () => void }) {
  const { pontos, pontosQuiz } = useMissoes();
  const [ranking, setRanking] = useState<PosicaoRanking[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const buscarRanking = useCallback(
    () =>
      listarRanking()
        .then((lista) => {
          setRanking(somarQuizNoRanking(lista, pontosQuiz));
          setErro('');
        })
        .catch(() => setErro('Não foi possível carregar o ranking.'))
        .finally(() => setCarregando(false)),
    [pontosQuiz],
  );

  function carregar() {
    setCarregando(true);
    buscarRanking();
  }

  useEffect(() => {
    buscarRanking();
  }, [buscarRanking, pontos]);

  return (
    <div className="flex flex-1 flex-col bg-soul">
      <section className="flex items-end justify-center gap-4 px-6 pt-2" aria-label="Pódio">
        {podio.map(({ indice, altura, cor, numero, deslocamento }) => {
          const item = ranking[indice];
          return (
            <div key={indice} className={`flex w-full max-w-30 flex-col items-center ${deslocamento}`}>
              {item ? (
                <>
                  <Avatar item={item} tamanho="size-16 text-lg" />
                  <span className="mt-3 mb-4 max-w-full truncate text-base text-white">{primeiroNome(item)}</span>
                </>
              ) : (
                <span className={`mb-4 size-16 rounded-full bg-white/20 ${carregando ? 'animate-pulse' : ''}`} />
              )}
              <span className={`flex w-full items-start justify-center rounded-t-xl pt-3 font-extrabold text-white ${altura} ${cor} ${numero}`}>
                {item?.posicao ?? indice + 1}
              </span>
            </div>
          );
        })}
      </section>

      <section className="-mt-8 flex flex-1 flex-col rounded-t-[2.5rem] bg-white pt-14 pb-8" aria-labelledby="ranking-titulo">
        <h3 id="ranking-titulo" className="sr-only">
          Ranking de Pontos Soul
        </h3>

        <AvisoConexao carregando={carregando && ranking.length === 0} className="mx-6 mb-2" />

        {carregando && ranking.length === 0 && (
          <ul className="list-none p-0" aria-label="Carregando ranking">
            {[1, 2, 3, 4, 5].map((linha) => (
              <li key={linha} className="flex animate-pulse items-center gap-5 px-8 py-4">
                <span className="h-4 w-8 rounded bg-slate-200" />
                <span className="size-14 rounded-full bg-slate-200" />
                <span className="h-3 flex-1 rounded bg-slate-200" />
              </li>
            ))}
          </ul>
        )}

        {erro && (
          <div className="mx-6 rounded-2xl bg-red-50 p-4 text-sm text-red-700" role="alert">
            <p className="m-0">{erro}</p>
            <button type="button" onClick={carregar} className="mt-3 cursor-pointer rounded-full border-0 bg-red-600 px-4 py-2 text-xs font-semibold text-white">
              Tentar novamente
            </button>
          </div>
        )}

        {!erro && ranking.length > 0 && (
          <ol className="list-none p-0" aria-live="polite">
            {ranking.map((item) => {
              const atual = ehUsuarioAtual(item);
              return (
                <li
                  key={item.usuarioId}
                  aria-current={atual ? 'true' : undefined}
                  className={`flex items-center gap-5 border-l-[6px] py-3.5 pr-8 pl-6 ${atual ? 'border-eco bg-eco-soft' : 'border-transparent'}`}
                >
                  <span className="w-9 shrink-0 text-lg font-extrabold text-slate-300">#{item.posicao}</span>
                  <Avatar item={item} tamanho="size-14 text-base" />
                  <span className="min-w-0 flex-1 truncate text-base text-ink">
                    {atual ? `${item.nome} (você)` : item.nome}
                  </span>
                  <span className="shrink-0 text-base text-ink">{item.pontos}pts</span>
                </li>
              );
            })}
          </ol>
        )}

        <div className="mt-auto flex justify-center px-6 pt-8">
          <button
            type="button"
            onClick={onVoltar}
            className="min-h-14 w-full max-w-66 cursor-pointer rounded-full border-0 bg-soul text-lg font-bold text-white transition hover:brightness-110 active:scale-[0.98]"
          >
            Voltar
          </button>
        </div>
      </section>
    </div>
  );
}
