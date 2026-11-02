import { LuCircleCheck } from 'react-icons/lu';
import type { Submissao } from '../../types';

interface EnvioConfirmadoProps {
  submissao: Submissao;
  onVoltar: () => void;
  onVerProgresso: () => void;
}

export default function EnvioConfirmado({ submissao, onVoltar, onVerProgresso }: EnvioConfirmadoProps) {
  const ehVideo = submissao.duracaoSegundos !== undefined;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 py-10 text-center">
      <LuCircleCheck className="mb-8 size-24 text-eco" strokeWidth={1.75} aria-hidden="true" />
      <h2 className="mb-8 text-2xl leading-snug font-bold text-ink" role="status">
        {ehVideo ? 'Vídeo enviado' : 'Foto enviada'}
        <br />
        com sucesso
      </h2>
      <p className="mb-10 text-left text-sm leading-relaxed text-ink">
        Evidência enviada com sucesso!
        {ehVideo && ` Seu tempo foi de exatamente ${submissao.duracaoSegundos} segundos.`} A partir de agora, sua evidência
        está em análise. Acesse Missões Concluídas para acompanhar o seu progresso.
      </p>
      <div className="flex w-full justify-between gap-4">
        <button type="button" onClick={onVoltar} className="min-h-12 flex-1 cursor-pointer rounded-full border-0 bg-eco px-3 text-sm font-bold text-white hover:bg-eco-dark">
          Voltar às missões
        </button>
        <button type="button" onClick={onVerProgresso} className="min-h-12 flex-1 cursor-pointer rounded-full border-0 bg-eco px-3 text-sm font-bold text-white hover:bg-eco-dark">
          Ver progresso
        </button>
      </div>
    </div>
  );
}
