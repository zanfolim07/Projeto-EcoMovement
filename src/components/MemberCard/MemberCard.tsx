import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import type { Integrante } from '../../types';

interface MemberCardProps {
  integrante: Integrante;
}

export default function MemberCard({ integrante }: MemberCardProps) {
  return (
    <article className="relative flex w-full max-w-70 flex-col items-center rounded-3xl border border-line bg-white px-6 pt-18 pb-7 text-center transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgb(15_23_42_/_0.08)]">
      <img
        className="absolute -top-12 left-1/2 size-24 -translate-x-1/2 rounded-full object-cover"
        src={integrante.foto}
        alt={`Foto de ${integrante.nome}`}
      />

      <h3 className="mb-2 flex min-h-11 items-center text-base leading-snug font-semibold text-ink">{integrante.nome}</h3>
      <p className="mb-5 text-xs text-muted">
        {integrante.rm} · Turma {integrante.turma}
      </p>

      <div className="flex justify-center gap-4">
        <a
          className="text-2xl text-brand transition hover:-translate-y-0.5"
          href={integrante.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`LinkedIn de ${integrante.nome}`}
        >
          <FaLinkedin />
        </a>
        <a
          className="text-2xl text-brand transition hover:-translate-y-0.5"
          href={integrante.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`GitHub de ${integrante.nome}`}
        >
          <FaGithub />
        </a>
      </div>

      <Link
        to={`/integrantes/${integrante.id}`}
        className="mt-5 text-sm font-semibold text-brand underline-offset-4 hover:underline"
        aria-label={`Ver perfil de ${integrante.nome}`}
      >
        Ver perfil →
      </Link>
    </article>
  );
}
