import { Routes, Route } from 'react-router-dom';
import Inicio from './Pages/Inicio/Inicio';
import Home from './Pages/Home/Home';
import Integrantes from './Pages/Integrantes/Integrantes';
import IntegranteDetalhe from './Pages/IntegranteDetalhe/IntegranteDetalhe';
import Sobre from './Pages/Sobre/Sobre';
import FAQ from './Pages/FAQ/FAQ';
import Contato from './Pages/Contato/Contato';
import Solucao from './Pages/Solucao/Solucao';
import Missoes from './Pages/Missao/Missao';
import MissaoDetalhe from './Pages/MissaoDetalhe/MissaoDetalhe';
import NaoEncontrada from './Pages/NaoEncontrada/NaoEncontrada';
import Admin from './Pages/Admin/Admin';
import Layout from './components/Layout/Layout';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/integrantes" element={<Integrantes />} />
        <Route path="/integrantes/:memberId" element={<IntegranteDetalhe />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/solucao" element={<Solucao />} />
        <Route path="/missoes" element={<Missoes />} />
        <Route path="/missoes/:missaoId" element={<MissaoDetalhe />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NaoEncontrada />} />
      </Route>
    </Routes>
  );
}
