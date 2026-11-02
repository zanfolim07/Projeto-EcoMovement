interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
  as?: 'h1' | 'h2';
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  id,
  as: Heading = 'h2',
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`max-w-192 ${className}`}>
      <p className="mb-2 text-xs font-extrabold tracking-[0.08em] text-brand uppercase">{eyebrow}</p>
      <Heading
        id={id}
        className={`mb-3 font-bold leading-tight text-ink ${Heading === 'h1' ? 'text-3xl md:text-4xl xl:text-5xl' : 'text-2xl md:text-3xl xl:text-4xl'}`}
      >
        {title}
      </Heading>
      {description && <p className="m-0 text-sm leading-relaxed text-muted md:text-base xl:text-lg">{description}</p>}
    </div>
  );
}
