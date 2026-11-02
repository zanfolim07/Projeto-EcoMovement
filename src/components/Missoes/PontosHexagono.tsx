interface PontosHexagonoProps {
  pontos: number;
  tom?: 'eco' | 'soul';
}

export default function PontosHexagono({ pontos, tom = 'eco' }: PontosHexagonoProps) {
  return (
    <span
      className={`clip-hexagon flex size-13 shrink-0 items-center justify-center text-sm font-bold text-white ${tom === 'eco' ? 'bg-eco' : 'bg-soul'}`}
      aria-label={`${pontos} pontos`}
    >
      +{pontos}
    </span>
  );
}
