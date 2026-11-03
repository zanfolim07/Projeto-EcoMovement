import { useEffect, useState, type FormEvent } from 'react';
import { LuCheck, LuLogOut, LuTrash2, LuX } from 'react-icons/lu';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { useMissoes } from '../../hooks/useMissoes';
import { usePageTitle } from '../../hooks/usePageTitle';
import { loginAdmin } from '../../services/adminService';
import { urlDaApi, usandoApi } from '../../services/api';
import { avaliarSubmissao, excluirSubmissao, listarSubmissoesPorStatus } from '../../services/missoesService';
import type { AdminLogado, StatusSubmissao, Submissao } from '../../types';
import { formatarData, formatarTempo } from '../../utils/formatadores';

const filtros: { valor: StatusSubmissao; rotulo: string }[] = [
  { valor: 'EM_ANALISE', rotulo: 'Em análise' },
  { valor: 'APROVADA', rotulo: 'Aprovadas' },
  { valor: 'REJEITADA', rotulo: 'Rejeitadas' },
];

function Evidencia({ submissao }: { submissao: Submissao }) {
  if (!submissao.evidenciaUrl) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl bg-panel p-4 text-center text-xs text-muted">
        {submissao.tipoEvidencia === 'AUTOMATICA'
          ? 'Concluída automaticamente pela SoulUp (sem arquivo).'
          : 'Sem arquivo de evidência.'}
      </div>
    );
  }

  if (submissao.tipoEvidencia === 'VIDEO') {
    return (
      <video className="aspect-video w-full rounded-2xl bg-ink object-contain" src={urlDaApi(submissao.evidenciaUrl)} controls preload="metadata">
        Seu navegador não reproduz este vídeo.
      </video>
    );
  }

  return <FotoAmpliavel src={urlDaApi(submissao.evidenciaUrl)} alt={`Evidência da missão ${submissao.titulo}`} />;
}

function FotoAmpliavel({ src, alt }: { src: string; alt: string }) {
  const [aberta, setAberta] = useState(false);

  useEffect(() => {
    if (!aberta) return;
    function fecharComEsc(evento: KeyboardEvent) {
      if (evento.key === 'Escape') setAberta(false);
    }
    window.addEventListener('keydown', fecharComEsc);
    return () => window.removeEventListener('keydown', fecharComEsc);
  }, [aberta]);

  return (
    <>
      <button
        type="button"
        onClick={() => setAberta(true)}
        className="block w-full cursor-zoom-in rounded-2xl border-0 bg-transparent p-0"
        aria-label="Ampliar foto"
      >
        <img className="aspect-video w-full rounded-2xl bg-ink object-contain" src={src} alt={alt} />
      </button>

      {aberta && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-6"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setAberta(false)}
        >
          <button
            type="button"
            onClick={() => setAberta(false)}
            className="absolute top-5 right-5 flex size-11 cursor-pointer items-center justify-center rounded-full border-0 bg-white/15 text-xl text-white transition-colors hover:bg-white/25"
            aria-label="Fechar"
          >
            <LuX aria-hidden="true" />
          </button>
          <img
            className="max-h-full max-w-full cursor-default rounded-2xl object-contain"
            src={src}
            alt={alt}
            onClick={(evento) => evento.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

const CHAVE_SESSAO = 'ecoguard-admin';
const inputClassName =
  'w-full rounded-2xl border border-slate-300 bg-white px-3.5 py-3 text-sm leading-relaxed text-copy outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-3 focus:ring-brand/20';

function lerAdminSalvo(): AdminLogado | null {
  try {
    const salvo = sessionStorage.getItem(CHAVE_SESSAO);
    return salvo ? (JSON.parse(salvo) as AdminLogado) : null;
  } catch {
    return null;
  }
}

export default function Admin() {
  usePageTitle('Painel EcoGuard');
  const [admin, setAdmin] = useState<AdminLogado | null>(lerAdminSalvo);

  function entrar(logado: AdminLogado) {
    try {
      sessionStorage.setItem(CHAVE_SESSAO, JSON.stringify(logado));
    } catch {
    }
    setAdmin(logado);
  }

  function sair() {
    try {
      sessionStorage.removeItem(CHAVE_SESSAO);
    } catch {
    }
    setAdmin(null);
  }

  return admin ? <PainelEcoGuard onSair={sair} /> : <FormLogin onEntrar={entrar} />;
}

function FormLogin({ onEntrar }: { onEntrar: (admin: AdminLogado) => void }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (!email.trim() || !senha) {
      setErro('Informe o e-mail e a senha.');
      return;
    }

    setEnviando(true);
    setErro('');
    try {
      onEntrar(await loginAdmin(email.trim(), senha));
    } catch (falha) {
      setErro(falha instanceof Error && falha.message !== 'Failed to fetch'
        ? falha.message
        : 'Não foi possível conectar à API. Verifique se a API Java está rodando.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-240 px-6 pt-14 pb-24 md:pt-18">
      <SectionHeader
        as="h1"
        eyebrow="Administração"
        title="Painel EcoGuard"
        description="Entre com o e-mail e a senha de administrador para analisar as evidências enviadas pelos usuários."
        className="mx-auto mb-8 max-w-md"
      />

      <form onSubmit={enviar} noValidate className="mx-auto flex max-w-md flex-col gap-5 rounded-3xl border border-line bg-white p-6 md:p-8">
        <div>
          <label htmlFor="admin-email" className="mb-2 block text-sm font-semibold text-ink">E-mail</label>
          <input
            className={inputClassName}
            id="admin-email"
            type="email"
            autoComplete="username"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
          />
        </div>

        <div>
          <label htmlFor="admin-senha" className="mb-2 block text-sm font-semibold text-ink">Senha</label>
          <input
            className={inputClassName}
            id="admin-senha"
            type="password"
            autoComplete="current-password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(evento) => setSenha(evento.target.value)}
          />
        </div>

        {erro && (
          <p className="m-0 rounded-2xl bg-red-50 p-3 text-sm text-red-700" role="alert">
            {erro}
          </p>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="min-h-11 cursor-pointer rounded-full border-0 bg-brand text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {enviando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </main>
  );
}

function PainelEcoGuard({ onSair }: { onSair: () => void }) {
  const { recarregar } = useMissoes();

  const [filtro, setFiltro] = useState<StatusSubmissao>('EM_ANALISE');
  const [submissoes, setSubmissoes] = useState<Submissao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [avaliando, setAvaliando] = useState<number | null>(null);

  const [versaoLista, setVersaoLista] = useState(0);

  useEffect(() => {
    listarSubmissoesPorStatus(filtro)
      .then((lista) => {
        setSubmissoes(lista);
        setErro('');
      })
      .catch(() => setErro('Não foi possível carregar as evidências. Verifique se a API Java está rodando.'))
      .finally(() => setCarregando(false));
  }, [filtro, versaoLista]);

  function trocarFiltro(novo: StatusSubmissao) {
    setCarregando(true);
    setFiltro(novo);
  }

  async function avaliar(submissao: Submissao, decisao: 'aprovar' | 'rejeitar') {
    setAvaliando(submissao.id);
    try {
      await avaliarSubmissao(submissao.id, decisao);
      setVersaoLista((versao) => versao + 1);
      await recarregar();
    } catch {
      setErro('Não foi possível avaliar a evidência.');
    } finally {
      setAvaliando(null);
    }
  }

  async function excluir(submissao: Submissao) {
    const confirmado = window.confirm(
      `Excluir o envio #${submissao.id} (${submissao.titulo})? A foto/vídeo será apagada do banco e, se estiver aprovado, os pontos deixam de contar.`,
    );
    if (!confirmado) return;

    setAvaliando(submissao.id);
    try {
      await excluirSubmissao(submissao.id);
      setVersaoLista((versao) => versao + 1);
      await recarregar();
    } catch {
      setErro('Não foi possível excluir o envio.');
    } finally {
      setAvaliando(null);
    }
  }

  return (
    <main className="mx-auto w-full max-w-240 px-6 pt-14 pb-24 md:pt-18">
      <SectionHeader
        as="h1"
        eyebrow="Administração"
        title="Painel EcoGuard"
        description="Analise as evidências enviadas pelos usuários, aprove ou rejeite cada missão e acompanhe o histórico. Os dados vêm da API Java e ficam salvos no banco Oracle."
        className="mb-6"
      />

      <div className="mb-8 flex justify-end">
        <button
          type="button"
          onClick={onSair}
          className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-full border border-line bg-white px-4 text-xs font-semibold text-copy transition-colors hover:bg-slate-100"
        >
          <LuLogOut aria-hidden="true" /> Sair
        </button>
      </div>

      {!usandoApi && (
        <p className="mb-6 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800">
          A API não está configurada (VITE_API_URL vazio). O painel está usando os dados de demonstração locais.
        </p>
      )}
      {erro && (
        <p className="mb-6 rounded-2xl bg-red-50 p-4 text-sm text-red-700" role="alert">
          {erro}
        </p>
      )}

      <section aria-labelledby="evidencias-title">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 id="evidencias-title" className="m-0 text-2xl font-bold text-ink">Evidências</h2>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar por status">
            {filtros.map((item) => (
              <button
                key={item.valor}
                type="button"
                role="tab"
                aria-selected={filtro === item.valor}
                onClick={() => trocarFiltro(item.valor)}
                className={`min-h-9 cursor-pointer rounded-full border-0 px-4 text-xs font-semibold transition-colors ${filtro === item.valor ? 'bg-eco text-white' : 'bg-panel text-copy hover:bg-line'}`}
              >
                {item.rotulo}
              </button>
            ))}
          </div>
        </div>

        {carregando && <p className="text-sm text-muted" role="status">Carregando evidências...</p>}
        {!carregando && submissoes.length === 0 && (
          <p className="rounded-2xl bg-panel p-8 text-center text-sm text-muted">Nenhuma evidência nesta categoria.</p>
        )}

        <ul className="grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {submissoes.map((submissao) => {
            return (
              <li key={submissao.id} className="flex flex-col rounded-3xl border border-line bg-white p-4">
                <Evidencia submissao={submissao} />
                <div className="mt-4 mb-2 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-muted">Envio #{submissao.id}</span>
                  <button
                    type="button"
                    disabled={avaliando === submissao.id}
                    onClick={() => excluir(submissao)}
                    className="flex size-8 cursor-pointer items-center justify-center rounded-full border-0 bg-soul text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                    aria-label={`Excluir envio #${submissao.id}`}
                    title="Excluir envio"
                  >
                    <LuTrash2 className="size-4" aria-hidden="true" />
                  </button>
                </div>
                <h3 className="mb-2 text-base leading-snug font-bold text-ink">{submissao.titulo}</h3>
                <p className="mb-4 text-xs leading-relaxed text-muted">
                  Usuário {submissao.usuarioId ?? 'não informado'} · enviada em {formatarData(submissao.enviadaEm)}
                  {submissao.duracaoSegundos !== undefined && submissao.duracaoSegundos !== null && ` · ${formatarTempo(submissao.duracaoSegundos)}`}
                  {' · '}
                  <strong className="text-eco">+{submissao.pontos} pts</strong>
                </p>

                {submissao.status === 'EM_ANALISE' && (
                  <div className="mt-auto flex gap-2">
                    <button
                      type="button"
                      disabled={avaliando === submissao.id}
                      onClick={() => avaliar(submissao, 'aprovar')}
                      className="inline-flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full border-0 bg-eco text-xs font-semibold text-white transition-colors hover:bg-eco-dark disabled:opacity-60"
                    >
                      <LuCheck aria-hidden="true" /> Aprovar
                    </button>
                    <button
                      type="button"
                      disabled={avaliando === submissao.id}
                      onClick={() => avaliar(submissao, 'rejeitar')}
                      className="inline-flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full border-0 bg-soul text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                    >
                      <LuX aria-hidden="true" /> Rejeitar
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
