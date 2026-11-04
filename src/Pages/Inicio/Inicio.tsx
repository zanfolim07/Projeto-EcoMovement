import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuCamera, LuCircleCheck, LuShieldCheck, LuTrophy } from 'react-icons/lu';
import Button from '../../components/Button/Button';
import { buttonClasses } from '../../components/Button/buttonStyles';
import Card from '../../components/Card/Card';
import SectionHeader from '../../components/SectionHeader/SectionHeader';

import imagemInicio from '../../assets/img/imagem-inicio.png';
import imgOqueSomos from '../../assets/img/img-oque-somos.png';
import imgConhecaArvore from '../../assets/img/img-conheca-arvore.png';

import { badges, heroStats, introFeatures, treeCards } from '../../data/inicio';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useMissoes } from '../../hooks/useMissoes';

const etapas = [
  {
    icone: LuCamera,
    titulo: 'Cumpra a missão',
    descricao: 'Escolha uma ação sustentável e registre a evidência com foto ou vídeo direto pela câmera.',
  },
  {
    icone: LuShieldCheck,
    titulo: 'O EcoGuard valida',
    descricao: 'IA e motor de regras cruzam tempo, local e histórico antes de aprovar qualquer envio.',
  },
  {
    icone: LuTrophy,
    titulo: 'Suba no ranking',
    descricao: 'Pontos aprovados fazem sua árvore crescer e te aproximam da conta de energia coberta.',
  },
];

const garantias = ['Auditado pelo EcoGuard', '6 camadas antifraude', '100% por mérito'];

export default function Inicio() {
  usePageTitle('Início');
  const { abrirPainel } = useMissoes();
  const [selectedCard, setSelectedCard] = useState(treeCards[0].title);

  return (
    <main className="w-full overflow-x-hidden bg-white">
      <section className="relative isolate overflow-hidden bg-gradient-brand px-6 pt-14 text-white md:px-12 md:pt-20 lg:px-20 xl:px-24 2xl:px-32">
        <span className="pointer-events-none absolute -top-40 left-1/3 -z-10 size-140 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <span
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgb(255_255_255_/_0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255_/_0.06)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
          aria-hidden="true"
        />

        <div className="mx-auto grid w-full max-w-440 items-end gap-10 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_27rem] 2xl:grid-cols-[minmax(0,1fr)_30rem] xl:gap-16">
          <div className="pb-6 text-center md:text-left lg:pb-28">
            <h1 className="m-0 text-[2.1rem] leading-[1.1] font-extrabold tracking-tight md:text-5xl lg:text-[2.4rem] xl:text-[2.9rem] 2xl:text-[3.6rem]">
              <span className="md:block md:whitespace-nowrap">Suas ações sustentáveis </span>
              <span className="md:block md:whitespace-nowrap">
                viram <span className="text-[#C9F5D6]">prêmios reais.</span>
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-120 [text-align-last:center] text-base leading-relaxed text-white/90 md:mx-0 md:[text-align-last:auto] lg:text-lg xl:text-xl">
              Complete missões, tenha cada atitude auditada pelo EcoGuard e dispute a cobertura da sua conta de energia dentro da SoulUp.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <Button variant="light" onClick={abrirPainel}>
                Fazer uma missão
              </Button>
              <Link to="/solucao" className={buttonClasses('light')}>
                Ver a solução
              </Link>
            </div>

            <ul className="mt-8 flex list-none flex-wrap justify-center gap-x-5 gap-y-2 p-0 text-xs font-medium text-white/85 md:justify-start">
              {garantias.map((garantia) => (
                <li key={garantia} className="flex items-center gap-1.5">
                  <LuCircleCheck className="size-4 text-[#C9F5D6]" aria-hidden="true" />
                  {garantia}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-90 md:max-w-120 lg:max-w-none">
            <span className="absolute inset-x-6 bottom-0 -z-10 aspect-square rounded-full bg-[linear-gradient(rgb(255_255_255_/_0.15),rgb(255_255_255_/_0.15)),linear-gradient(90deg,#1A87DB,#1473CF)]" aria-hidden="true" />
            <img
              src={imagemInicio}
              alt="Pessoa sorrindo enquanto usa o celular, representando o EcoMovement"
              className="relative block max-h-130 w-full object-contain object-bottom lg:max-h-[40rem]"
              fetchPriority="high"
            />

            <div className="absolute top-[46%] -left-2 flex items-center gap-3 rounded-2xl bg-white p-3 pr-4 text-left text-ink shadow-[0_18px_40px_rgb(10_40_90_/_0.25)] md:-left-10 lg:-left-16">
              <span className="flex size-10 items-center justify-center rounded-xl bg-eco text-white">
                <LuCircleCheck className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[0.7rem] text-muted">Missão aprovada</span>
                <span className="block text-sm font-bold">+30 Pontos Soul</span>
              </span>
            </div>

            <div className="absolute right-0 bottom-[18%] flex items-center gap-3 rounded-2xl bg-white p-3 pr-4 text-left text-ink shadow-[0_18px_40px_rgb(10_40_90_/_0.25)] md:-right-4">
              <span className="flex size-10 items-center justify-center rounded-xl bg-brand text-white">
                <LuTrophy className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[0.7rem] text-muted">Ranking mensal</span>
                <span className="block text-sm font-bold">Você subiu para #1</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-5 -mt-12 flex w-full justify-center px-5">
        <ol className="m-0 grid w-full max-w-300 list-none overflow-hidden rounded-3xl bg-white p-0 shadow-[0_24px_60px_rgb(15_23_42_/_0.12)] ring-1 ring-line md:grid-cols-3">
          {heroStats.map((stat, indice) => (
            <li key={stat.title} className="flex gap-4 border-b border-line p-6 last:border-0 md:border-r md:border-b-0 lg:p-8">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                {indice + 1}
              </span>
              <div>
                <h2 className="mb-1 text-base font-bold text-ink">{stat.title}</h2>
                <p className="m-0 text-sm leading-relaxed text-muted">{stat.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <section className="mx-auto grid w-full max-w-300 items-center gap-12 px-6 pt-24 pb-20 md:grid-cols-2 md:px-12 lg:gap-20 lg:pt-32 xl:gap-28" aria-labelledby="como-funciona">
        <div>
          <SectionHeader id="como-funciona" eyebrow="Como funciona" title="Do mundo real para o seu ranking em três passos." />
          <p className="mt-1 mb-0 text-sm leading-relaxed text-muted md:text-base">
            Como provar que a sua reciclagem ou consumo consciente realmente aconteceu? No EcoMovement, cada ação vira uma evidência verificável e pontuável.
          </p>

          <ol className="mt-10 flex list-none flex-col gap-7 p-0">
            {etapas.map(({ icone: Icone, titulo, descricao }, indice) => (
              <li key={titulo} className="relative flex gap-5">
                {indice < etapas.length - 1 && <span className="absolute top-13 bottom-[-1.5rem] left-6 w-px bg-line" aria-hidden="true" />}
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand text-white">
                  <Icone className="size-5" aria-hidden="true" />
                </span>
                <div className="pt-1">
                  <h3 className="mb-1 text-base font-bold text-ink md:text-lg">{titulo}</h3>
                  <p className="m-0 text-sm leading-relaxed text-muted">{descricao}</p>
                </div>
              </li>
            ))}
          </ol>

          <Link className={buttonClasses('primary', 'mt-10')} to="/sobre">
            Conheça o projeto completo
          </Link>
        </div>

        <div className="relative mx-auto w-full max-w-80 lg:max-w-96">
          <span className="absolute inset-0 -z-10 m-auto size-[110%] rounded-full bg-[radial-gradient(circle,var(--color-brand-soft)_0%,transparent_70%)]" aria-hidden="true" />
          <img src={imgOqueSomos} alt="Celular exibindo a tela de missões do EcoMovement" loading="lazy" />
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink text-white" aria-labelledby="pontuacao-titulo">
        <span className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-brand/40 blur-3xl" aria-hidden="true" />
        <span className="pointer-events-none absolute -bottom-40 -left-24 size-96 rounded-full bg-eco/20 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto max-w-300 px-6 py-14 md:px-12 md:py-20">
          <div className="relative max-w-160">
            <p className="mb-2 text-xs font-extrabold tracking-[0.08em] text-[#7DC4F5] uppercase">Pontuação transparente</p>
            <h2 id="pontuacao-titulo" className="m-0 text-2xl leading-tight font-bold md:text-4xl">
              Regras claras do primeiro ponto até o prêmio final.
            </h2>
          </div>

          <div className="relative mt-12 grid gap-4 md:grid-cols-3">
            {introFeatures.map((feature, indice) => {
              const destaque = indice === introFeatures.length - 1;
              return (
                <article
                  key={feature.title}
                  className={`flex flex-col rounded-3xl p-7 ${destaque ? 'bg-gradient-brand shadow-[0_20px_50px_rgb(24_133_219_/_0.35)]' : 'bg-white/5 ring-1 ring-white/10'}`}
                >
                  <h3 className="mb-3 text-lg font-bold md:text-xl">{feature.title}</h3>
                  <p className={`m-0 text-sm leading-relaxed ${destaque ? 'text-white' : 'text-white/70'}`}>{feature.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-300 items-center gap-12 px-6 pt-24 pb-12 md:grid-cols-2 md:px-12 lg:gap-20 lg:pt-32">
        <div className="relative mx-auto w-full max-w-90 md:order-2 lg:max-w-115 xl:max-w-125">
          <img src={imgConhecaArvore} alt="Celular exibindo a comunidade e a árvore digital" loading="lazy" />
        </div>

        <div>
          <SectionHeader eyebrow="Árvore e floresta" title="Seu impacto ganha forma e cresce com a comunidade." />
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-surface p-5 ring-1 ring-line">
              <dt className="mb-2 text-sm font-bold text-ink">Árvore Digital</dt>
              <dd className="m-0 text-sm leading-relaxed text-muted">
                Começa como um galho seco e evolui a cada missão e badge. Nos níveis altos, gera frutos para compartilhar com amigos.
              </dd>
            </div>
            <div className="rounded-2xl bg-surface p-5 ring-1 ring-line">
              <dt className="mb-2 text-sm font-bold text-ink">Floresta Digital</dt>
              <dd className="m-0 text-sm leading-relaxed text-muted">
                A união das árvores da sua comunidade. O engajamento coletivo faz a floresta crescer e garante prêmios para o Top 10.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto w-full max-w-300 px-6 pt-12 pb-24 md:px-12 lg:pb-32" aria-labelledby="confianca-titulo">
        <SectionHeader
          id="confianca-titulo"
          eyebrow="Confiança"
          title="Uma competição justa, impossível de comprar."
          description="O EcoGuard é a camada de confiança por trás de cada ponto: nenhuma submissão vale sem passar por ele."
          className="mx-auto mb-12 text-center [text-align-last:center]"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {treeCards.map((card) => (
            <Card
              key={card.title}
              title={card.title}
              description={card.description}
              icon={card.icon}
              highlight={card.highlight}
              selected={selectedCard === card.title}
              onSelect={() => setSelectedCard(card.title)}
            />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface px-6 py-20 md:px-12 lg:py-24">
        <div className="mx-auto grid w-full max-w-300 items-center gap-12 md:grid-cols-[1fr_1.2fr]">
          <SectionHeader
            eyebrow="Conquistas"
            title="Badges que contam a sua história."
            description="Colecione insígnias em uma faixa estilo escoteiro. Quanto mais raro o desbloqueio entre os usuários, mais chamativo e valioso é o efeito visual."
          />

          <ul className="m-0 grid list-none grid-cols-4 justify-items-center gap-4 p-0 sm:grid-cols-5 md:gap-5">
            {badges.map((badge) => (
              <li key={badge.nome} className="flex items-center justify-center">
                <img src={badge.icon} alt={`Badge ${badge.nome}`} title={badge.nome} className="size-14 object-contain md:size-16" loading="lazy" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-24 md:px-12 lg:py-28">
        <div className="relative isolate mx-auto max-w-300 overflow-hidden rounded-[2rem] bg-gradient-brand px-6 py-14 text-center text-white md:py-18">
          <span className="pointer-events-none absolute -top-24 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-white/15 blur-3xl" aria-hidden="true" />
          <h2 className="m-0 text-2xl leading-tight font-bold text-balance md:text-4xl">Sua primeira missão leva poucos minutos.</h2>
          <p className="mx-auto mt-4 mb-0 max-w-120 [text-align-last:center] text-sm leading-relaxed text-white/90 md:text-base">
            Comece agora, acompanhe a validação em tempo real e veja seus Pontos Soul subirem no ranking.
          </p>
          <Button variant="light" onClick={abrirPainel} className="mt-8">
            Começar agora
          </Button>
        </div>
      </section>
    </main>
  );
}
