import { useState } from 'react';
import { LuSearch, LuX } from 'react-icons/lu';
import PageHero from '../../components/PageHero/PageHero';
import { faqSections } from '../../data/faq';
import { usePageTitle } from '../../hooks/usePageTitle';

function normalizar(texto: string) {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

export default function FAQ() {
  usePageTitle('FAQ');
  const [busca, setBusca] = useState('');
  const termo = normalizar(busca.trim());

  const secoes = faqSections
    .map((section, index) => ({
      ...section,
      index,
      questions: section.questions.filter((item) => !termo || normalizar(`${item.question} ${item.answer}`).includes(termo)),
    }))
    .filter((section) => section.questions.length > 0);
  const totalResultados = secoes.reduce((total, section) => total + section.questions.length, 0);

  return (
    <main className="w-full bg-white">
      <PageHero
        eyebrow="Central de ajuda"
        title="Perguntas frequentes"
        description="Respostas sobre o projeto, missões, EcoScore, EcoPoints, ranking, antifraude, árvore e floresta digital, badges e segurança."
      >
        <label className="relative w-full max-w-140">
          <span className="sr-only">Buscar no FAQ</span>
          <LuSearch className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            type="search"
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            placeholder="Busque por ranking, EcoScore, fraude..."
            className="min-h-14 w-full rounded-full border-0 bg-white pr-12 pl-13 text-sm text-ink shadow-[0_10px_30px_rgb(10_40_90_/_0.25)] outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-white/40 [&::-webkit-search-cancel-button]:hidden"
          />
          {busca && (
            <button
              type="button"
              onClick={() => setBusca('')}
              className="absolute top-1/2 right-3 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-0 bg-surface text-muted hover:text-ink"
              aria-label="Limpar busca"
            >
              <LuX className="size-4" aria-hidden="true" />
            </button>
          )}
        </label>
      </PageHero>

      <div className="mx-auto w-full max-w-240 px-6 pt-10 pb-24">
        <p className="sr-only" role="status" aria-live="polite">
          {termo ? `${totalResultados} perguntas encontradas.` : ''}
        </p>

        {secoes.length === 0 && (
          <div className="py-20 text-center [text-align-last:center]">
            <p className="mb-2 text-lg font-bold text-ink">Nenhuma pergunta encontrada.</p>
            <p className="m-0 text-sm text-muted">Tente outro termo, como “missão”, “pontos” ou “ranking”.</p>
          </div>
        )}

        {secoes.map((section) => (
          <section className="border-t border-line py-10 first-of-type:border-0 md:py-12" id={`faq-${section.index}`} key={section.title}>
            <h2 className="mb-5 text-xl leading-tight font-bold text-ink md:text-2xl">{section.title}</h2>
            <div className="flex flex-col gap-3">
              {section.questions.map((item) => (
                <details className="group" key={item.question} open={Boolean(termo) || undefined}>
                  <summary className="relative cursor-pointer list-none py-4 pr-12 text-base font-semibold text-ink md:text-lg [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <span
                      aria-hidden="true"
                      className="absolute top-1/2 right-0 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-lg leading-none font-normal text-white transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-0 mb-0 max-w-208 pr-12 pb-5 text-sm leading-relaxed text-muted">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
