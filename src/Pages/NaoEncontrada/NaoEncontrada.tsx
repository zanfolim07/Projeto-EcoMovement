import { Link } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { usePageTitle } from '../../hooks/usePageTitle';

interface NaoEncontradaProps {
  titulo?: string;
  descricao?: string;
  destino?: { to: string; label: string };
}

export default function NaoEncontrada({
  titulo = 'Página não encontrada.',
  descricao = 'O endereço acessado não existe ou foi movido. Que tal voltar ao início e fazer uma missão?',
  destino = { to: '/inicio', label: 'Voltar ao início' },
}: NaoEncontradaProps) {
  usePageTitle('Página não encontrada');

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-240 flex-col justify-center px-6 py-14 md:py-20">
      <SectionHeader as="h1" eyebrow="Erro 404" title={titulo} description={descricao} />
      <Link
        to={destino.to}
        className="mt-8 inline-flex min-h-12 w-fit items-center justify-center rounded-2xl bg-brand px-6 text-sm font-semibold text-white no-underline hover:bg-brand-dark"
      >
        {destino.label}
      </Link>
    </main>
  );
}
