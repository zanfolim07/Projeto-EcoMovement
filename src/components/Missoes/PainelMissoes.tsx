import { useEffect, useRef, useState } from 'react';
import { LuChevronLeft, LuX } from 'react-icons/lu';
import { useMissoes } from '../../hooks/useMissoes';
import type { Missao, Submissao } from '../../types';
import CapturaEvidencia from './CapturaEvidencia';
import EnvioConfirmado from './EnvioConfirmado';
import InicioMissoes from './InicioMissoes';
import InformacoesMissao from './InformacoesMissao';
import ListaMissoes from './ListaMissoes';
import MissoesConcluidas from './MissoesConcluidas';
import QuizMissao from './QuizMissao';
import RankingMissoes from './RankingMissoes';

type Etapa =
  | { tela: 'inicio' }
  | { tela: 'ranking' }
  | { tela: 'lista' }
  | { tela: 'informacoes'; missao: Missao }
  | { tela: 'captura'; missao: Missao }
  | { tela: 'quiz' }
  | { tela: 'enviado'; submissao: Submissao }
  | { tela: 'concluidas' };

const INICIO: Etapa = { tela: 'inicio' };
const LISTA: Etapa = { tela: 'lista' };

function etapaAnterior(etapa: Etapa): Etapa {
  if (etapa.tela === 'captura') return { tela: 'informacoes', missao: etapa.missao };
  if (etapa.tela === 'lista' || etapa.tela === 'ranking') return INICIO;
  return LISTA;
}

export default function PainelMissoes() {
  const { fecharPainel } = useMissoes();
  const [etapa, setEtapa] = useState<Etapa>(INICIO);
  const conteudoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    function aoPressionarTecla(evento: KeyboardEvent) {
      if (evento.key === 'Escape') fecharPainel();
    }
    window.addEventListener('keydown', aoPressionarTecla);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', aoPressionarTecla);
    };
  }, [fecharPainel]);

  function irPara(novaEtapa: Etapa) {
    setEtapa(novaEtapa);
    conteudoRef.current?.scrollTo({ top: 0 });
  }

  const telaAzul = etapa.tela === 'inicio' || etapa.tela === 'ranking' || etapa.tela === 'quiz';
  const mostrarTitulo = etapa.tela !== 'inicio' && etapa.tela !== 'lista' && etapa.tela !== 'concluidas';
  const corBotao = telaAzul ? 'text-white hover:bg-white/15' : 'text-ink hover:bg-slate-100';

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        tabIndex={-1}
        aria-label="Fechar missões"
        onClick={fecharPainel}
        className="absolute inset-0 animate-fade-in cursor-default border-0 bg-ink/45 backdrop-blur-[2px]"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="painel-missoes-titulo"
        className="relative flex h-full w-full animate-panel-in flex-col bg-white shadow-2xl sm:max-w-md sm:overflow-hidden sm:rounded-l-[2rem]"
      >
        <header className={`flex items-center gap-1 px-4 py-4 ${telaAzul ? 'bg-soul' : ''}`}>
          <button
            type="button"
            onClick={() => (etapa.tela === 'inicio' ? fecharPainel() : irPara(etapaAnterior(etapa)))}
            className={`flex size-10 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent ${corBotao} ${etapa.tela === 'quiz' ? 'invisible' : ''}`}
            aria-label={etapa.tela === 'inicio' ? 'Fechar missões' : 'Voltar'}
          >
            <LuChevronLeft className="size-6" aria-hidden="true" />
          </button>
          <h2
            id="painel-missoes-titulo"
            className={`m-0 flex-1 text-base font-bold ${etapa.tela === 'quiz' ? 'text-center text-xl' : ''} ${telaAzul ? 'text-white' : 'text-ink'} ${mostrarTitulo ? '' : 'sr-only'}`}
          >
            {etapa.tela === 'ranking' || etapa.tela === 'quiz' ? 'EcoMovement' : 'Missões'}
          </h2>
          <button
            type="button"
            onClick={fecharPainel}
            className={`ml-auto flex size-10 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent ${corBotao}`}
            aria-label="Fechar missões"
          >
            <LuX className="size-5" aria-hidden="true" />
          </button>
        </header>

        <div ref={conteudoRef} className="flex flex-1 flex-col overflow-y-auto">
          {etapa.tela === 'inicio' && (
            <InicioMissoes onMissoes={() => irPara(LISTA)} onRanking={() => irPara({ tela: 'ranking' })} />
          )}
          {etapa.tela === 'ranking' && <RankingMissoes onVoltar={() => irPara(INICIO)} />}
          {etapa.tela === 'lista' && (
            <ListaMissoes
              onComecar={(missao) => irPara(missao.tipoEvidencia === 'QUIZ' ? { tela: 'quiz' } : { tela: 'informacoes', missao })}
              onVerConcluidas={() => irPara({ tela: 'concluidas' })}
            />
          )}
          {etapa.tela === 'informacoes' && (
            <InformacoesMissao missao={etapa.missao} onContinuar={() => irPara({ tela: 'captura', missao: etapa.missao })} />
          )}
          {etapa.tela === 'captura' && (
            <CapturaEvidencia missao={etapa.missao} onEnviado={(submissao) => irPara({ tela: 'enviado', submissao })} />
          )}
          {etapa.tela === 'enviado' && (
            <EnvioConfirmado
              submissao={etapa.submissao}
              onVoltar={() => irPara(LISTA)}
              onVerProgresso={() => irPara({ tela: 'concluidas' })}
            />
          )}
          {etapa.tela === 'quiz' && <QuizMissao onVoltar={() => irPara(LISTA)} />}
          {etapa.tela === 'concluidas' && <MissoesConcluidas />}
        </div>
      </aside>
    </div>
  );
}
