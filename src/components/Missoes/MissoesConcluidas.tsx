import { LuAward } from 'react-icons/lu';
import { QUIZ_MISSAO_ID } from '../../data/quiz';
import { useMissoes } from '../../hooks/useMissoes';
import type { Submissao } from '../../types';
import { formatarData, formatarMesAno } from '../../utils/formatadores';
import PontosHexagono from './PontosHexagono';

function dataDeReferencia(submissao: Submissao) {
  return submissao.concluidaEm ?? submissao.enviadaEm;
}

function StatusSubmissao({ submissao }: { submissao: Submissao }) {
  if (submissao.status === 'EM_ANALISE') {
    return <span className="rounded-full bg-eco px-4 py-2 text-xs font-bold text-white">Processando</span>;
  }

  if (submissao.status === 'REJEITADA') {
    return <span className="rounded-full bg-red-50 px-3 py-1.5 text-[0.7rem] font-semibold text-red-700">Rejeitada</span>;
  }

  return (
    <span className="flex flex-col items-center text-xs leading-tight text-copy">
      <LuAward className="mb-1 size-5 text-ink" aria-hidden="true" />
      Concluído em
      <span>{formatarData(dataDeReferencia(submissao))}</span>
    </span>
  );
}

export default function MissoesConcluidas() {
  const { submissoes, pontos } = useMissoes();

  const ordenadas = [...submissoes].sort((a, b) => dataDeReferencia(b).localeCompare(dataDeReferencia(a)));
  const grupos = ordenadas.reduce<Map<string, Submissao[]>>((mapa, submissao) => {
    const chave = formatarMesAno(dataDeReferencia(submissao));
    mapa.set(chave, [...(mapa.get(chave) ?? []), submissao]);
    return mapa;
  }, new Map());

  return (
    <div className="flex flex-1 flex-col gap-2 bg-panel">
      <section className="rounded-b-[2rem] bg-white px-7 pt-2 pb-8">
        <h2 className="mb-2 text-2xl font-bold text-ink">Missões concluídas</h2>
        <p className="mb-8 text-sm leading-relaxed text-muted">Confira suas conquistas e os pontos que você já acumulou.</p>
        <p className="mb-4 text-lg font-bold text-ink">Você já acumulou</p>
        <p className="m-0 text-4xl font-bold text-ink">{pontos}</p>
        <p className="m-0 text-xs text-copy">Pontos Soul em Missões</p>
      </section>

      <div className="flex-1 rounded-t-[2rem] bg-white px-7 py-7">
        {grupos.size === 0 && <p className="py-10 text-center text-sm text-muted">Você ainda não enviou nenhuma missão.</p>}
        {[...grupos].map(([mes, itens]) => (
          <section key={mes} aria-label={mes}>
            <h3 className="mb-1 text-base font-medium text-ink">{mes}</h3>
            <ul className="mb-4 list-none p-0">
              {itens.map((submissao) => (
                <li key={submissao.id} className="flex items-center gap-4 border-b border-line py-5 last:border-0">
                  <PontosHexagono pontos={submissao.pontos} tom={submissao.missaoId === 0 || submissao.missaoId === QUIZ_MISSAO_ID ? 'soul' : 'eco'} />
                  <p className="m-0 min-w-0 flex-1 text-sm leading-snug text-ink">{submissao.titulo}</p>
                  <StatusSubmissao submissao={submissao} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
