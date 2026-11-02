import type { ReactNode } from 'react';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export default function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-brand px-6 pt-16 pb-20 text-white md:px-12 md:pt-20 md:pb-24 xl:pt-28 xl:pb-32">
      <span className="pointer-events-none absolute -top-40 right-0 -z-10 size-120 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
      <span
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgb(255_255_255_/_0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255_/_0.06)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-300">
        <p className="mb-4 text-xs font-extrabold tracking-[0.12em] text-white/80 uppercase">{eyebrow}</p>
        <h1 className="m-0 max-w-200 text-3xl lg:max-w-250 xl:max-w-270 leading-[1.12] font-extrabold tracking-tight text-balance md:text-5xl xl:text-6xl">{title}</h1>
        {description && <p className="mt-5 mb-0 max-w-160 text-base lg:max-w-200 xl:max-w-220 leading-relaxed text-white/90 md:text-lg xl:text-xl">{description}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
