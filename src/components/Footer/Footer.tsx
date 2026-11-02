import { Link } from 'react-router-dom';
import { navItems } from '../../data/navegacao';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-brand w-full px-6 pt-10 pb-6 text-white">
      <div className="mx-auto flex max-w-300 flex-col gap-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-80">
            <p className="m-0 text-xl font-extrabold">EcoMovement</p>
            <p className="mt-2 mb-0 text-xs leading-relaxed text-white/85">
              Pequenas ações geram grandes impactos. Sustentabilidade gamificada no ecossistema SoulUp.
            </p>
          </div>

          <nav aria-label="Links do rodapé" className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="text-xs text-white no-underline hover:underline">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-center gap-3 border-t border-white/25 pt-5 sm:flex-row sm:justify-between">
          <p className="m-0 text-xs">© {year} EcoMovement | Todos os direitos reservados.</p>
          <Link to="/admin" className="text-xs font-semibold text-white no-underline hover:underline">
            Painel de administração
          </Link>
        </div>
      </div>
    </footer>
  );
}
