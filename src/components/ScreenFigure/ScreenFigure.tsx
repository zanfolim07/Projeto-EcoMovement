interface ScreenFigureProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

export default function ScreenFigure({ src, alt, caption, className = '' }: ScreenFigureProps) {
  return (
    <figure className={`m-0 text-center ${className}`}>
      <img
        className="mx-auto block w-full max-w-47.5 transition duration-300 hover:-translate-y-1.5"
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
      {caption && <figcaption className="mt-3.5 text-xs font-semibold text-muted">{caption}</figcaption>}
    </figure>
  );
}
