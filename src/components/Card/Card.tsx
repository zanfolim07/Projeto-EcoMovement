interface CardProps {
  title: string;
  description: string;
  icon?: string;
  highlight?: boolean;
  selected?: boolean;
  onSelect?: () => void;
}

export default function Card({
  title,
  description,
  icon,
  highlight = false,
  selected = false,
  onSelect,
}: CardProps) {
  const isHighlighted = selected || (!onSelect && highlight);

  return (
    <article
      className={`flex flex-col items-start rounded-3xl p-8 text-left transition duration-200 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-3 focus-visible:outline-brand/35 focus-visible:outline-offset-3 ${onSelect ? 'cursor-pointer' : ''} ${isHighlighted ? 'bg-brand text-white' : 'bg-slate-100 text-copy'}`}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (onSelect && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          onSelect();
        }
      }}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      aria-pressed={onSelect ? selected : undefined}
    >
      {icon && (
        <div className={`mb-6 flex size-19 items-center justify-center rounded-full ${isHighlighted ? 'bg-white' : 'bg-slate-200'}`}>
          <img className="size-9 object-contain [filter:brightness(0)_saturate(100%)_invert(39%)_sepia(98%)_saturate(1196%)_hue-rotate(179deg)_brightness(89%)_contrast(88%)]" src={icon} alt="" aria-hidden="true" />
        </div>
      )}
      <h3 className="mb-3 text-xl font-bold">{title}</h3>
      <p className="m-0 text-sm leading-relaxed opacity-90">{description}</p>
    </article>
  );
}
