import MemberCard from '../../components/MemberCard/MemberCard';
import PageHero from '../../components/PageHero/PageHero';
import { integrantes } from '../../data/integrantes';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function Integrantes() {
  usePageTitle('Integrantes');

  return (
    <main className="w-full bg-white">
      <PageHero
        eyebrow="Nossa equipe"
        title="Quem somos"
        description="Um grupo de desenvolvedores da turma 1TDSPV que acredita que pequenas ações do dia a dia geram grandes impactos, conectando comportamento consciente a benefícios reais."
      />

      <div className="mx-auto flex max-w-300 flex-wrap justify-center gap-x-8 gap-y-20 px-5 pt-28 pb-24 lg:pb-32 xl:gap-x-12">
        {integrantes.map((integrante) => (
          <MemberCard key={integrante.id} integrante={integrante} />
        ))}
      </div>
    </main>
  );
}
