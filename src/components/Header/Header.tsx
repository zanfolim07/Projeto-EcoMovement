import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { navItems } from '../../data/navegacao';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-line/70 bg-white">
      <div className="mx-auto flex max-w-300 items-center justify-between px-5 py-4">
        <Link to="/inicio" className="whitespace-nowrap text-xl font-extrabold no-underline" onClick={() => setIsMenuOpen(false)}>
          <span className="text-brand">Eco</span>
          <span className="text-copy">Movement</span>
        </Link>

        <button
          type="button"
          className="flex size-10 cursor-pointer flex-col items-center justify-center gap-1.25 rounded-lg border-0 bg-transparent md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          aria-controls="menu-principal"
        >
          <span className={`h-0.5 w-5.5 bg-brand transition ${isMenuOpen ? 'translate-y-1.75 rotate-45' : ''}`} />
          <span className={`h-0.5 w-5.5 bg-brand transition ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-5.5 bg-brand transition ${isMenuOpen ? '-translate-y-1.75 -rotate-45' : ''}`} />
        </button>

        <nav
          id="menu-principal"
          aria-label="Menu principal"
          className={`absolute top-full right-0 left-0 flex max-h-0 flex-col overflow-hidden bg-white shadow-md transition-[max-height] duration-250 md:static md:max-h-none md:flex-row md:gap-6 md:overflow-visible md:bg-transparent md:shadow-none lg:gap-8 ${isMenuOpen ? 'max-h-120' : ''}`}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative inline-block border-t border-line px-5 py-3.5 text-sm font-medium no-underline transition-colors hover:text-brand md:border-0 md:p-0 md:text-[0.8rem] lg:text-sm ${isActive ? 'font-semibold text-brand after:absolute after:right-5 after:bottom-0 after:left-5 after:block after:h-0.75 after:rounded-full after:bg-brand md:after:right-0 md:after:left-0 md:after:-bottom-1.5' : 'text-copy'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
