import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LuCamera, LuRefreshCw, LuTimer, LuVideo, LuZap } from 'react-icons/lu';
import AvisoConexao from '../../components/AvisoConexao/AvisoConexao';
import Button from '../../components/Button/Button';
import { TEMPO_MAXIMO_SEGUNDOS } from '../../data/missoes';
import { useMissoes } from '../../hooks/useMissoes';
import { usePageTitle } from '../../hooks/usePageTitle';
import { ErroApi } from '../../services/api';
import { buscarMissao } from '../../services/missoesService';
import type { Dificuldade, Missao, StatusMissao, TipoEvidencia } from '../../types';
import { formatarTempo } from '../../utils/formatadores';
import NaoEncontrada from '../NaoEncontrada/NaoEncontrada';

type EstadoMissao =
  | { tipo: 'carregando' }
  | { tipo: 'sucesso'; missao: Missao }
  | { tipo: 'nao-encontrada' }
  | { tipo: 'erro'; mensagem: string };

const rotuloDificuldade: Record<Dificuldade, string> = {
  FACIL: 'Fácil',
  MEDIA: 'Média',
  DIFICIL: 'Difícil',
};

const rotuloStatus: Record<StatusMissao, { texto: string; classe: string }> = {
  DISPONIVEL: { texto: 'Disponível', classe: 'bg-brand-soft text-brand-dark' },
  EM_PROGRESSO: { texto: 'Em progresso', classe: 'bg-amber-50 text-amber-600' },
  EM_ANALISE: { texto: 'Em análise', classe: 'px-0 text-soul' },
  CONCLUIDA: { texto: 'Concluída', classe: 'bg-eco-soft text-eco-dark' },
};

const rotuloEvidencia: Record<TipoEvidencia, string> = {
  VIDEO: 'Vídeo na hora',
  FOTO: 'Foto na hora',
  AUTOMATICA: 'Automática',
  QUIZ: 'Quiz',
};

function IconeEvidencia({ tipo }: { tipo: TipoEvidencia }) {
  if (tipo === 'VIDEO') return <LuVideo aria-hidden="true" />;
  if (tipo === 'FOTO') return <LuCamera aria-hidden="true" />;
  return <LuZap aria-hidden="true" />;
}

export default function MissaoDetalhe() {
  const { missaoId } = useParams<{ missaoId: string }>();
  const id = Number(missaoId);

  if (!Number.isInteger(id) || id <= 0) return <MissaoNaoEncontrada />;
  return <ConteudoMissao key={id} id={id} />;
}

function MissaoNaoEncontrada() {
  return (
    <NaoEncontrada
      titulo="Missão não encontrada."
      descricao="Não encontramos uma missão com esse endereço. Veja as missões disponíveis e escolha outra."
      destino={{ to: '/missoes', label: 'Ver missões' }}
    />
  );
}

function ConteudoMissao({ id }: { id: number }) {
  const { abrirPainel } = useMissoes();
  const [estado, setEstado] = useState<EstadoMissao>({ tipo: 'carregando' });
  const [tentativa, setTentativa] = useState(0);

  usePageTitle(estado.tipo === 'sucesso' ? estado.missao.titulo : 'Missão');

  useEffect(() => {
    let ativo = true;

    buscarMissao(id)
      .then((missao) => ativo && setEstado({ tipo: 'sucesso', missao }))
      .catch((erro: unknown) => {
        if (!ativo) return;
        if (erro instanceof ErroApi && erro.status === 404) {
          setEstado({ tipo: 'nao-encontrada' });
        } else {
          setEstado({ tipo: 'erro', mensagem: 'Não foi possível carregar a missão. Verifique sua conexão e tente novamente.' });
        }
      });

    return () => {
      ativo = false;
    };
  }, [id, tentativa]);

  function tentarNovamente() {
    setEstado({ tipo: 'carregando' });
    setTentativa((atual) => atual + 1);
  }

  if (estado.tipo === 'nao-encontrada') return <MissaoNaoEncontrada />;

  return (
    <main className="mx-auto max-w-240 px-6 pt-10 pb-20 md:pt-14 xl:pb-28">
      <nav className="mb-8" aria-label="Caminho da página">
        <ol className="flex list-none flex-wrap items-center gap-2 p-0 text-sm text-muted">
          <li>
            <Link to="/missoes" className="font-semibold text-brand underline underline-offset-4">Missões</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{estado.tipo === 'sucesso' ? estado.missao.titulo : 'Detalhe'}</li>
        </ol>
      </nav>

      <AvisoConexao carregando={estado.tipo === 'carregando'} className="mb-6" />

      {estado.tipo === 'carregando' && (
        <div className="animate-pulse rounded-3xl border border-line p-6 md:p-10" role="status" aria-label="Carregando missão">
          <div className="mb-4 h-4 w-32 rounded-full bg-slate-200" />
          <div className="mb-6 h-8 w-3/4 rounded-full bg-slate-200" />
          <div className="mb-3 h-4 w-full rounded-full bg-slate-100" />
          <div className="h-4 w-2/3 rounded-full bg-slate-100" />
          <span className="sr-only">Carregando missão…</span>
        </div>
      )}

      {estado.tipo === 'erro' && (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center md:p-10" role="alert">
          <p className="mb-5 text-sm leading-relaxed text-red-700">{estado.mensagem}</p>
          <Button onClick={tentarNovamente}>
            <LuRefreshCw aria-hidden="true" /> Tentar novamente
          </Button>
        </div>
      )}

      {estado.tipo === 'sucesso' && <DetalheMissao missao={estado.missao} onFazerMissao={abrirPainel} />}
    </main>
  );
}

function DetalheMissao({ missao, onFazerMissao }: { missao: Missao; onFazerMissao: () => void }) {
  const status = rotuloStatus[missao.status] ?? rotuloStatus.DISPONIVEL;
  const tempo = missao.tempoMaximoSegundos || TEMPO_MAXIMO_SEGUNDOS;
  const comCamera = missao.tipoEvidencia === 'VIDEO' || missao.tipoEvidencia === 'FOTO';
  const percentual = Math.min(Math.round((missao.progresso / Math.max(missao.meta, 1)) * 100), 100);

  return (
    <article className="rounded-3xl border border-line p-6 md:p-10 xl:p-12">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {missao.categoria && (
          <span className="text-xs font-extrabold tracking-[0.08em] text-brand uppercase">{missao.categoria}</span>
        )}
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${status.classe}`}>{status.texto}</span>
      </div>

      <h1 className="mb-4 text-2xl leading-tight font-bold text-ink md:text-3xl xl:text-4xl">{missao.titulo}</h1>
      <p className="mb-8 text-left text-base leading-relaxed text-muted xl:text-lg">{missao.descricao}</p>

      <dl className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4 [&_dd]:text-left">
        <div className="rounded-2xl bg-surface p-4">
          <dt className="text-xs text-muted">Recompensa</dt>
          <dd className="m-0 text-base font-semibold text-ink">{missao.pontos} Pontos Soul</dd>
        </div>
        <div className="rounded-2xl bg-surface p-4">
          <dt className="text-xs text-muted">Dificuldade</dt>
          <dd className="m-0 text-base font-semibold text-ink">{missao.dificuldade ? rotuloDificuldade[missao.dificuldade] : '—'}</dd>
        </div>
        <div className="rounded-2xl bg-surface p-4">
          <dt className="text-xs text-muted">Evidência</dt>
          <dd className="m-0 flex items-center gap-1.5 text-sm font-semibold text-ink">
            <IconeEvidencia tipo={missao.tipoEvidencia} />
            {rotuloEvidencia[missao.tipoEvidencia]}
          </dd>
        </div>
        <div className="rounded-2xl bg-surface p-4">
          <dt className="text-xs text-muted">{comCamera ? 'Tempo para registrar' : 'Progresso'}</dt>
          <dd className="m-0 flex items-center gap-1.5 text-base font-semibold text-ink">
            {comCamera ? (
              <>
                <LuTimer aria-hidden="true" /> {formatarTempo(tempo)}
              </>
            ) : (
              `${missao.progresso}/${missao.meta}`
            )}
          </dd>
        </div>
      </dl>

      {!comCamera && (
        <div className="mb-8 h-2.5 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-label="Progresso da missão" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentual}>
          <span className="block h-full rounded-full bg-eco" style={{ width: `${percentual}%` }} />
        </div>
      )}

      <h2 className="mb-3 text-base font-bold text-ink">Como comprovar</h2>
      <p className="mb-8 text-left text-sm leading-relaxed text-muted xl:text-base">{missao.instrucoes}</p>

      <div className="flex flex-wrap gap-3">
        {comCamera && missao.status === 'DISPONIVEL' && <Button onClick={onFazerMissao}>Fazer missão</Button>}
        <Link
          to="/missoes"
          className="inline-flex min-h-13 items-center rounded-full border border-line px-7 text-sm font-bold text-ink no-underline transition hover:border-brand/40"
        >
          Ver todas as missões
        </Link>
      </div>
    </article>
  );
}
