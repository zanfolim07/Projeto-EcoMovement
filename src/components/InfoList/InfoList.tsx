import type { ItemInformativo } from '../../types';

interface InfoListProps {
  items: readonly ItemInformativo[];
  highlightTitle?: boolean;
}

export default function InfoList({ items, highlightTitle = false }: InfoListProps) {
  return (
    <div className="mt-6 border-t border-line">
      {items.map((item) => (
        <article className="grid gap-1.5 border-b border-line py-5 md:grid-cols-[3rem_minmax(0,1fr)] md:gap-x-4" key={item.title}>
          {item.number && <span className="text-sm font-extrabold text-brand md:pt-1">{item.number}</span>}
          <div className={item.number ? '' : 'md:col-span-2'}>
            <h3 className={`mb-1.5 text-lg font-bold leading-tight md:text-xl ${highlightTitle ? 'text-brand' : 'text-ink'}`}>{item.title}</h3>
            <p className="m-0 max-w-208 text-sm leading-relaxed text-muted">{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
