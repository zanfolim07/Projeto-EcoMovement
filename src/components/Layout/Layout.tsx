import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import MissaoFab from '../Missoes/MissaoFab';
import PainelMissoes from '../Missoes/PainelMissoes';
import { useMissoes } from '../../hooks/useMissoes';

export default function Layout() {
  const { pathname } = useLocation();
  const { painelAberto } = useMissoes();
  const isHomePage = pathname === '/';

  return (
    <>
      <ScrollToTop />
      {!isHomePage && <Header />}
      <div className="flex-1 animate-page-enter" key={pathname}>
        <Outlet />
      </div>
      {!isHomePage && <Footer />}
      <MissaoFab />
      {painelAberto && <PainelMissoes />}
    </>
  );
}
