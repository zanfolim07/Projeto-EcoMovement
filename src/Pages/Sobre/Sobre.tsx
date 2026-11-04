import { LuActivity, LuCamera, LuClock, LuGitMerge, LuLock, LuMapPin, LuScanEye } from 'react-icons/lu';
import InfoList from '../../components/InfoList/InfoList';
import PageHero from '../../components/PageHero/PageHero';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { areasImpacto, passosSobre, recursosEcossistema, valores } from '../../data/sobre';
import { usePageTitle } from '../../hooks/usePageTitle';

const camadas = [
  { icone: LuCamera, titulo: 'Evidência', descricao: 'Foto, vídeo, QR Code ou OCR conforme a natureza da ação.' },
  { icone: LuClock, titulo: 'Temporal', descricao: 'Horário e duração precisam fazer sentido para a missão.' },
  { icone: LuMapPin, titulo: 'Geográfica', descricao: 'O GPS confirma que a ação aconteceu onde deveria.' },
  { icone: LuScanEye, titulo: 'Visual', descricao: 'A IA identifica objeto, categoria e possíveis duplicidades.' },
  { icone: LuActivity, titulo: 'Comportamental', descricao: 'Frequência e histórico revelam padrões fora do normal.' },
  { icone: LuGitMerge, titulo: 'Cruzamento de dados', descricao: 'O motor de regras junta todos os sinais e decide.' },
];

export default function Sobre() {
  usePageTitle('Sobre');

  return (
    <main className="w-full overflow-hidden bg-white">
      <PageHero
        eyebrow="Nossa proposta"
        title="Transformando ações do dia a dia em pontos verificáveis."
        description="O EcoMovement torna ações sustentáveis do mundo real verificáveis e pontuáveis dentro da SoulUp, sem abrir brecha para fraude e sem travar com o crescimento da base de usuários."
      />

      <section className="mx-auto w-full max-w-300 px-6 pt-20 md:px-12 lg:pt-24">
        <SectionHeader eyebrow="Nosso propósito" title="Duas camadas trabalhando juntas." />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl bg-brand p-8 text-white md:p-10">
            <p className="mb-6 text-xs font-extrabold tracking-[0.12em] text-white/70 uppercase">Produto</p>
            <h3 className="mb-3 text-2xl font-bold">EcoMovement</h3>
            <p className="m-0 text-sm leading-relaxed text-white/90 md:text-base">
              Missões, EcoScore, EcoPoints, ranking, árvore digital, floresta digital e badges: a experiência que o usuário vê dentro da SoulUp.
            </p>
          </article>
          <article className="rounded-3xl bg-ink p-8 text-white md:p-10">
            <p className="mb-6 text-xs font-extrabold tracking-[0.12em] text-[#7DC4F5] uppercase">Confiança</p>
            <h3 className="mb-3 text-2xl font-bold">EcoGuard</h3>
            <p className="m-0 text-sm leading-relaxed text-white/75 md:text-base">
              O motor de regras e antifraude que decide se uma submissão é válida, cruzando o resultado da IA com GPS, tempo, frequência e histórico do usuário.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-300 gap-10 px-6 pt-24 md:grid-cols-[1fr_1.4fr] md:px-12 lg:gap-20 lg:pt-32 xl:gap-28">
        <div className="md:sticky md:top-28 md:self-start">
          <SectionHeader
            eyebrow="Como funciona"
            title="Uma jornada clara do primeiro desafio ao impacto."
            description="Cinco etapas separam uma ação no mundo real de uma posição no ranking."
          />
        </div>

        <ol className="m-0 flex list-none flex-col p-0">
          {passosSobre.map((passo, indice) => (
            <li key={passo.title} className="relative flex gap-5 pb-10 last:pb-0">
              {indice < passosSobre.length - 1 && <span className="absolute top-12 bottom-0 left-6 w-px bg-line" aria-hidden="true" />}
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand text-sm font-extrabold text-white">{passo.number}</span>
              <div className="pt-1.5">
                <h3 className="mb-2 text-lg font-bold text-ink md:text-xl">{passo.title}</h3>
                <p className="m-0 text-sm leading-relaxed text-muted">{passo.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="relative mt-24 overflow-hidden bg-ink text-white lg:mt-32" aria-labelledby="camadas-titulo">
        <span className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-brand/40 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto max-w-300 px-6 py-14 md:px-12 md:py-20">

          <div className="relative max-w-160">
            <p className="mb-2 text-xs font-extrabold tracking-[0.08em] text-[#7DC4F5] uppercase">Segurança e validação</p>
            <h2 id="camadas-titulo" className="m-0 text-2xl leading-tight font-bold md:text-4xl">
              Seis camadas para que cada ponto represente uma ação real.
            </h2>
            <p className="mt-4 mb-0 text-sm leading-relaxed text-white/70 md:text-base">
              A IA nunca é prova absoluta: ela só fornece sinais. Quem decide é o motor de regras do EcoGuard.
            </p>
          </div>

          <ul className="relative mt-12 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
            {camadas.map(({ icone: Icone, titulo, descricao }) => (
              <li key={titulo} className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
                <Icone className="size-6 text-[#7DC4F5]" aria-hidden="true" />
                <h3 className="mt-4 mb-1.5 text-base font-bold">{titulo}</h3>
                <p className="m-0 text-sm leading-relaxed text-white/70">{descricao}</p>
              </li>
            ))}
          </ul>

          <p className="relative mt-8 mb-0 flex items-start gap-3 border-t border-white/10 pt-6 text-sm leading-relaxed text-white/70">
            <LuLock className="mt-0.5 size-4 shrink-0 text-[#7DC4F5]" aria-hidden="true" />
            Proteção de dados com HTTPS/TLS, senhas com hash e salt, minimização dos dados coletados e separação entre dados pessoais e analíticos.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-300 px-6 pt-24 md:px-12 lg:pt-32">
        <SectionHeader eyebrow="Impacto na prática" title="Quando a plataforma evolui, a comunidade também evolui." />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {areasImpacto.map((area) => (
            <article key={area.title} className="rounded-3xl bg-surface p-7 ring-1 ring-line">
              <h3 className="mb-3 text-lg leading-snug font-bold text-ink">{area.title}</h3>
              <p className="m-0 text-sm leading-relaxed text-muted">{area.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-300 gap-10 px-6 pt-24 md:grid-cols-[1fr_1.4fr] md:px-12 lg:gap-20 lg:pt-32 xl:gap-28">
        <SectionHeader eyebrow="O ecossistema" title="Seu esforço ganha forma, memória e companhia." />
        <InfoList items={recursosEcossistema} />
      </section>

      <section className="px-4 pt-24 md:px-12 lg:pt-32">
        <div className="mx-auto grid max-w-300 overflow-hidden rounded-[2rem] bg-gradient-brand text-white md:grid-cols-2">
          <article className="border-b border-white/20 p-8 md:border-r md:border-b-0 md:p-12">
            <p className="mb-4 text-xs font-extrabold tracking-[0.12em] text-white/75 uppercase">Missão</p>
            <h2 className="m-0 text-xl leading-snug font-bold md:text-2xl">Transformar ações sustentáveis em elementos verificáveis e pontuáveis.</h2>
          </article>
          <article className="p-8 md:p-12">
            <p className="mb-4 text-xs font-extrabold tracking-[0.12em] text-white/75 uppercase">Visão</p>
            <h2 className="m-0 text-xl leading-snug font-bold md:text-2xl">Ser a camada de confiança da SoulUp.</h2>
            <p className="mt-3 mb-0 text-sm leading-relaxed text-white/85">
              Fazer com que cada EcoScore e cada EcoPoint representem, de fato, uma ação sustentável real e verificada.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-300 px-6 pt-24 pb-24 md:px-12 lg:py-32">
        <SectionHeader eyebrow="Valores" title="O que orienta cada escolha do projeto." />
        <ul className="mt-10 grid list-none gap-x-10 gap-y-8 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-14">
          {valores.map((valor, indice) => (
            <li key={valor.title} className="border-t-2 border-line pt-5">
              <span className="text-xs font-extrabold text-brand">{String(indice + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 mb-2 text-lg font-bold text-ink">{valor.title}</h3>
              <p className="m-0 text-sm leading-relaxed text-muted">{valor.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
