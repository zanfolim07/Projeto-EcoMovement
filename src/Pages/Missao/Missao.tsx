import { Link } from 'react-router-dom';
import AvisoConexao from '../../components/AvisoConexao/AvisoConexao';
import Button from '../../components/Button/Button';
import { buttonClasses } from '../../components/Button/buttonStyles';
import PageHero from '../../components/PageHero/PageHero';
import ScreenFigure from '../../components/ScreenFigure/ScreenFigure';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { passosMissao } from '../../data/passosMissao';
import { useMissoes } from '../../hooks/useMissoes';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function Missoes() {
  usePageTitle('Missões');
  const { abrirPainel, missoes, carregando, erro, recarregar } = useMissoes();
  const missoesDaApi = missoes.filter((missao) => missao.tipoEvidencia !== 'QUIZ');

  return (
    <main className="w-full bg-white">
      <PageHero
        eyebrow="Missões EcoMovement"
        title="Transforme ações sustentáveis em progresso."
        description="Escolha um desafio, envie a comprovação pela câmera e, depois da validação do EcoGuard, receba Pontos Soul e acompanhe sua evolução."
      >
        <Button variant="light" onClick={abrirPainel}>
          Fazer uma missão
        </Button>
        <Link to="/faq" className={buttonClasses('light')}>
          Tirar dúvidas
        </Link>
      </PageHero>

      <section className="mx-auto w-full max-w-300 px-6 pt-20 md:px-12 lg:pt-28" aria-labelledby="lista-missoes-title">
        <SectionHeader
          id="lista-missoes-title"
          eyebrow="Missões disponíveis"
          title="Escolha uma missão e veja os detalhes."
          className="mb-10"
        />

        <AvisoConexao carregando={carregando} className="mb-6" />

        {carregando && (
          <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6" role="status" aria-label="Carregando missões">
            {[0, 1, 2].map((item) => (
              <li key={item} className="h-36 animate-pulse rounded-3xl bg-slate-100" />
            ))}
          </ul>
        )}

        {!carregando && erro && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center" role="alert">
            <p className="mb-4 text-sm text-red-700">{erro}</p>
            <Button onClick={recarregar}>Tentar novamente</Button>
          </div>
        )}

        {!carregando && !erro && missoesDaApi.length === 0 && (
          <p className="rounded-3xl bg-surface p-6 text-center text-sm text-muted">Nenhuma missão cadastrada por enquanto.</p>
        )}

        {!carregando && !erro && missoesDaApi.length > 0 && (
          <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
            {missoesDaApi.map((missao) => (
              <li key={missao.id}>
                <Link
                  to={`/missoes/${missao.id}`}
                  className="flex h-full flex-col rounded-3xl border border-line p-5 text-left no-underline transition hover:-translate-y-1 hover:border-brand/40 xl:p-6"
                >
                  {missao.categoria && (
                    <span className="mb-2 text-xs font-extrabold tracking-[0.08em] text-brand uppercase">{missao.categoria}</span>
                  )}
                  <span className="mb-4 text-base leading-snug font-bold text-ink">{missao.titulo}</span>
                  <span className="mt-auto flex items-center justify-between text-xs text-muted">
                    <span className="font-semibold text-eco-dark">+{missao.pontos} Pontos Soul</span>
                    <span className="font-semibold text-brand">Ver detalhes →</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mx-auto w-full max-w-300 px-6 pt-20 pb-24 md:px-12 lg:pt-28 lg:pb-32" aria-labelledby="passos-title">
        <SectionHeader
          id="passos-title"
          eyebrow="Como participar"
          title="Realize uma missão em seis passos."
          className="mx-auto mb-16 text-center [text-align-last:center]"
        />

        <ol className="relative m-0 flex list-none flex-col gap-16 p-0 md:gap-10">
          <span className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-line md:block" aria-hidden="true" />
          {passosMissao.map((passo, index) => {
            const invertido = index % 2 === 1;
            return (
              <li className="relative grid items-center gap-8 md:grid-cols-2 md:gap-24" key={passo.title}>
                <span
                  className="absolute top-1/2 left-1/2 hidden size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-sm font-extrabold text-white ring-8 ring-white md:flex"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>

                <div className={invertido ? 'md:order-2' : ''}>
                  <ScreenFigure src={passo.image} alt={`Tela da missão: ${passo.title}`} />
                </div>

                <div className={`max-w-120 ${invertido ? 'md:justify-self-end' : ''}`}>
                  <span className="mb-3 inline-flex size-9 items-center justify-center rounded-full bg-brand text-sm font-extrabold text-white md:hidden">
                    {index + 1}
                  </span>
                  <p className="mb-2 hidden text-xs font-extrabold tracking-[0.08em] text-brand uppercase md:block">Passo {String(index + 1).padStart(2, '0')}</p>
                  <h3 className="mb-3 text-xl leading-tight font-bold text-ink md:text-2xl">{passo.title}</h3>
                  <p className="m-0 text-sm leading-relaxed text-muted md:text-base">{passo.description}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-20 flex flex-col items-center gap-4 text-center">
          <p className="m-0 text-lg font-bold text-ink">Pronto para começar?</p>
          <Button onClick={abrirPainel}>
            Fazer minha primeira missão
          </Button>
        </div>
      </section>
    </main>
  );
}
