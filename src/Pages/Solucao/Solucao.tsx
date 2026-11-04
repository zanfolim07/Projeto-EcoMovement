import { useState } from 'react';
import Button from '../../components/Button/Button';
import PageHero from '../../components/PageHero/PageHero';
import ScreenFigure from '../../components/ScreenFigure/ScreenFigure';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import TelaSolucaoCard from '../../components/TelaSolucaoCard/TelaSolucaoCard';
import { evolucaoArvore, telasComunidade, telasSolucao } from '../../data/telasSolucao';
import { useMissoes } from '../../hooks/useMissoes';
import { usePageTitle } from '../../hooks/usePageTitle';
import { categoriasSolucao } from '../../types';
import type { CategoriaSolucao } from '../../types';

type FiltroSolucao = 'Todas' | CategoriaSolucao;
const filtros: readonly FiltroSolucao[] = ['Todas', ...categoriasSolucao];

export default function Solucao() {
  usePageTitle('Solução do projeto');
  const { abrirPainel } = useMissoes();
  const [categoria, setCategoria] = useState<FiltroSolucao>('Todas');
  const telasVisiveis = telasSolucao.filter((tela) => categoria === 'Todas' || tela.categoria === categoria);

  return (
    <main className="w-full bg-white">
      <PageHero
        eyebrow="Prototipagem no Figma"
        title="Uma experiência sustentável pensada para acontecer na prática."
        description="O protótipo define a identidade visual, a disposição dos elementos e a experiência de missões, validação, pontos e comunidade. O fluxo de missões já funciona aqui no site."
      >
        <Button variant="light" onClick={abrirPainel}>
          Experimentar o fluxo de missões
        </Button>
      </PageHero>

      <section className="mx-auto w-full max-w-300 px-6 pt-20 pb-24 md:px-12 lg:pt-24" aria-labelledby="galeria-titulo">
        <SectionHeader id="galeria-titulo" eyebrow="Telas desenvolvidas" title="Explore as telas do EcoMovement." />

        <div className="mt-8 inline-flex max-w-full flex-wrap gap-1 rounded-3xl sm:rounded-full bg-surface p-1.5 ring-1 ring-line" role="group" aria-label="Filtrar telas por categoria">
          {filtros.map((filtro) => (
            <button
              key={filtro}
              type="button"
              aria-pressed={categoria === filtro}
              aria-controls="galeria-telas"
              onClick={() => setCategoria(filtro)}
              className={`min-h-10 cursor-pointer rounded-full border-0 px-5 text-sm font-semibold transition-colors ${
                categoria === filtro ? 'bg-brand text-white shadow-[0_6px_16px_rgb(24_133_219_/_0.3)]' : 'bg-transparent text-muted hover:text-ink'
              }`}
            >
              {filtro}
            </button>
          ))}
        </div>
        <p className="mt-4 mb-10 text-sm text-muted" role="status" aria-live="polite">
          {telasVisiveis.length} telas em {categoria.toLocaleLowerCase('pt-BR')}.
        </p>

        <div id="galeria-telas" className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-14 xl:gap-y-20">
          {telasVisiveis.map((tela) => (
            <TelaSolucaoCard key={tela.id} tela={tela} />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface py-20 lg:py-28" aria-labelledby="arvore-titulo">
        <div className="mx-auto w-full max-w-300 px-6 md:px-12">
          <SectionHeader
            id="arvore-titulo"
            eyebrow="Árvore digital"
            title="Cada missão faz sua árvore evoluir."
            description="A árvore começa como um galho seco e ganha folhas, frutos e flores conforme o participante completa missões e conquista badges."
          />
          <div className="mt-10 grid grid-cols-2 items-end gap-6 sm:grid-cols-3 lg:grid-cols-5 xl:gap-10">
            {evolucaoArvore.map((tela) => (
              <ScreenFigure key={tela.title} src={tela.src} alt={`Árvore digital no ${tela.title}`} caption={tela.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-300 px-6 py-20 md:px-12 lg:py-28" aria-labelledby="comunidade-titulo">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <SectionHeader
            id="comunidade-titulo"
            eyebrow="Comunidade"
            title="Floresta digital e ranking coletivo."
            description="As árvores da comunidade formam uma floresta que cresce com o engajamento de todos. O ranking mostra quem mais contribuiu, e as florestas do Top 10 recebem recompensas exclusivas."
          />
          <div className="grid grid-cols-2 gap-6">
            {telasComunidade.map((tela) => (
              <ScreenFigure key={tela.title} src={tela.src} alt={tela.title} caption={tela.title} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
