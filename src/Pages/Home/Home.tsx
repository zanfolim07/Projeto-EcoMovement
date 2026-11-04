import { useNavigate } from 'react-router-dom';
import { LuLeaf, LuSparkles } from 'react-icons/lu';
import Button from '../../components/Button/Button';
import { usePageTitle } from '../../hooks/usePageTitle';
import imagemInicio from '../../assets/img/imagem-inicio.png';

export default function Home() {
  usePageTitle();
  const navigate = useNavigate();

  return (
    <section className="relative isolate flex min-h-screen w-full overflow-hidden bg-gradient-brand px-6 pt-14 text-white md:px-12 md:pt-0 lg:px-16">
      <span className="pointer-events-none absolute -top-40 left-1/3 -z-10 size-140 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
      <span
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgb(255_255_255_/_0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255_/_0.06)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        aria-hidden="true"
      />

      <div className="mx-auto grid w-full max-w-440 items-end gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12 xl:gap-16">
        <div className="self-center text-center [text-align-last:center] md:pt-16 md:text-left md:[text-align-last:auto] lg:py-24">
          <h1 className="m-0 text-[2.4rem] leading-[1.05] font-extrabold tracking-tight md:text-7xl lg:text-6xl xl:text-7xl 2xl:text-8xl">EcoMovement</h1>

          <p className="mt-5 mb-0 text-xl leading-snug font-light md:text-left md:text-3xl lg:text-2xl xl:text-[1.75rem] 2xl:text-3xl">
            Pequenas <strong className="font-bold text-[#C9F5D6]">ações</strong> geram grandes <strong className="font-bold text-[#C9F5D6]">impactos</strong>.
          </p>

          <p className="mx-auto mt-6 mb-0 max-w-120 text-base leading-relaxed text-white/90 md:mx-0 md:text-left lg:text-lg xl:text-xl">
            Acumule pontos no dia a dia, transforme seu estilo de vida em impacto real e veja sua árvore crescer junto com o mundo que você melhora.
          </p>

          <div className="mt-9 flex justify-center md:justify-start">
            <Button variant="light" onClick={() => navigate('/inicio')}>
              Entrar
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-100 md:max-w-130 lg:max-w-none">
          <span className="absolute inset-x-6 bottom-0 -z-10 aspect-square rounded-full bg-[linear-gradient(rgb(255_255_255_/_0.15),rgb(255_255_255_/_0.15)),linear-gradient(90deg,#1A87DB,#1473CF)]" aria-hidden="true" />
          <img
            src={imagemInicio}
            alt="Pessoa sorrindo enquanto usa o celular e segura um cartão, representando as ações do dia a dia"
            className="relative block max-h-150 w-full object-contain object-bottom lg:max-h-[92vh]"
            fetchPriority="high"
          />

          <div className="absolute top-[46%] -left-2 flex items-center gap-3 rounded-2xl bg-white p-3 pr-4 text-ink shadow-[0_18px_40px_rgb(10_40_90_/_0.25)] md:-left-10">
            <span className="flex size-10 items-center justify-center rounded-xl bg-eco text-white">
              <LuLeaf className="size-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-[0.7rem] text-muted">Sua árvore</span>
              <span className="block text-sm font-bold">Ganhou novas folhas</span>
            </span>
          </div>

          <div className="absolute right-0 bottom-[16%] flex items-center gap-3 rounded-2xl bg-white p-3 pr-4 text-ink shadow-[0_18px_40px_rgb(10_40_90_/_0.25)] md:-right-4">
            <span className="flex size-10 items-center justify-center rounded-xl bg-brand text-white">
              <LuSparkles className="size-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-[0.7rem] text-muted">Pontos Soul</span>
              <span className="block text-sm font-bold">+30 nesta semana</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
