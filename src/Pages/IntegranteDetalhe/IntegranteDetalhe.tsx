import { Link, useParams } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { buscarIntegrante, integrantes } from '../../data/integrantes';
import { usePageTitle } from '../../hooks/usePageTitle';
import NaoEncontrada from '../NaoEncontrada/NaoEncontrada';

export default function IntegranteDetalhe() {
  const { memberId } = useParams<{ memberId: string }>();
  const integrante = buscarIntegrante(memberId);
  usePageTitle(integrante?.nome ?? 'Integrante não encontrado');

  if (!integrante) {
    return (
      <NaoEncontrada
        titulo="Integrante não encontrado."
        descricao="Não encontramos um integrante com esse endereço. Volte para conhecer toda a equipe."
        destino={{ to: '/integrantes', label: 'Ver integrantes' }}
      />
    );
  }

  const outros = integrantes.filter((item) => item.id !== integrante.id);

  return (
    <main className="mx-auto max-w-240 px-6 pt-10 pb-20 md:pt-14">
      <nav className="mb-8" aria-label="Caminho da página">
        <ol className="flex list-none flex-wrap items-center gap-2 p-0 text-sm text-muted">
          <li>
            <Link to="/integrantes" className="font-semibold text-brand underline underline-offset-4">Integrantes</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{integrante.nome}</li>
        </ol>
      </nav>

      <article className="grid items-center gap-8 rounded-3xl border border-line p-6 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-12 md:p-10">
        <img
          src={integrante.foto}
          alt={`Foto de ${integrante.nome}`}
          className="mx-auto aspect-square w-full max-w-52 rounded-full object-cover"
        />

        <div>
          <p className="mb-2 text-xs font-extrabold tracking-[0.08em] text-brand uppercase">Integrante EcoMovement</p>
          <h1 className="mb-4 text-2xl font-bold leading-tight text-ink md:text-3xl">{integrante.nome}</h1>

          <dl className="mb-6 grid grid-cols-2 gap-4 sm:max-w-80">
            <div className="rounded-2xl bg-surface p-4">
              <dt className="text-xs text-muted">RM</dt>
              <dd className="m-0 text-base font-semibold text-ink">{integrante.rm.replace('RM ', '')}</dd>
            </div>
            <div className="rounded-2xl bg-surface p-4">
              <dt className="text-xs text-muted">Turma</dt>
              <dd className="m-0 text-base font-semibold text-ink">{integrante.turma}</dd>
            </div>
          </dl>

          <h2 className="mb-3 text-base font-bold text-ink">Contribuições no front-end</h2>
          <ul className="mb-8 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted marker:text-brand">
            {integrante.contribuicoes.map((contribuicao) => (
              <li key={contribuicao}>{contribuicao}</li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <a
              href={integrante.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-ink px-5 text-sm font-semibold text-white no-underline hover:bg-ink/85"
            >
              <FaGithub aria-hidden="true" /> GitHub
            </a>
            <a
              href={integrante.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#0A66C2] px-5 text-sm font-semibold text-white no-underline hover:bg-[#0954a0]"
            >
              <FaLinkedin aria-hidden="true" /> LinkedIn
            </a>
          </div>
        </div>
      </article>

      <section className="mt-14" aria-labelledby="outros-integrantes">
        <h2 id="outros-integrantes" className="mb-5 text-lg font-bold text-ink">Conheça também</h2>
        <ul className="grid list-none grid-cols-2 gap-4 p-0 sm:grid-cols-4">
          {outros.map((item) => (
            <li key={item.id}>
              <Link
                to={`/integrantes/${item.id}`}
                className="flex h-full flex-col items-center gap-3 rounded-2xl border border-line p-4 text-center no-underline transition hover:-translate-y-1 hover:border-brand/40"
              >
                <img src={item.foto} alt="" className="size-16 rounded-full object-cover" />
                <span className="text-xs font-semibold text-ink">{item.nome}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
