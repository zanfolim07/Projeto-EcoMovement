import { useEffect, useRef, useState } from 'react';
import { LuArrowLeft, LuHeart, LuHeartCrack, LuTrophy } from 'react-icons/lu';
import { PONTOS_POR_ACERTO, PONTOS_QUIZ, perguntasQuiz, TENTATIVAS_QUIZ, VIDAS_QUIZ } from '../../data/quiz';
import { useMissoes } from '../../hooks/useMissoes';

interface QuizMissaoProps {
  onVoltar: () => void;
}

function estiloAlternativa(indice: number, escolhida: number | null, correta: number) {
  if (escolhida !== indice) return 'bg-white text-ink';
  return indice === correta ? 'bg-eco-soft text-eco-dark' : 'bg-red-100 text-red-600';
}

export default function QuizMissao({ onVoltar }: QuizMissaoProps) {
  const { acertosQuiz, pontosQuiz, quizEncerrado, tentativasRestantesQuiz, registrarAcertoQuiz, iniciarQuiz } = useMissoes();
  const [rodada, setRodada] = useState(() => pendentes(acertosQuiz));
  const [posicao, setPosicao] = useState(0);
  const [escolhida, setEscolhida] = useState<number | null>(null);
  const [vidas, setVidas] = useState(VIDAS_QUIZ);
  const [finalizado, setFinalizado] = useState(quizEncerrado);

  const iniciou = useRef(false);
  useEffect(() => {
    if (iniciou.current || quizEncerrado) return;
    iniciou.current = true;
    iniciarQuiz();
  }, [iniciarQuiz, quizEncerrado]);

  const indicePergunta = rodada[posicao];
  const pergunta = perguntasQuiz[indicePergunta];
  const respondida = escolhida !== null;
  const ultima = posicao === rodada.length - 1 || vidas === 0;
  const progresso = ((posicao + (respondida ? 1 : 0)) / rodada.length) * 100;
  const completo = acertosQuiz.length === perguntasQuiz.length;

  function responder(indice: number) {
    if (respondida) return;
    setEscolhida(indice);
    if (indice === pergunta.correta) {
      registrarAcertoQuiz(indicePergunta);
    } else {
      setVidas((atual) => atual - 1);
    }
  }

  function avancar() {
    if (ultima) {
      setFinalizado(true);
      return;
    }
    setPosicao((atual) => atual + 1);
    setEscolhida(null);
  }

  function tentarDeNovo() {
    iniciarQuiz();
    setRodada(pendentes(acertosQuiz));
    setPosicao(0);
    setEscolhida(null);
    setVidas(VIDAS_QUIZ);
    setFinalizado(false);
  }

  return (
    <div className="flex flex-1 flex-col bg-soul">
      {!finalizado && (
        <section className="px-7 pt-2 pb-10 text-white">
          <h3 className="m-0 text-[2rem] leading-tight font-bold">Quiz EcoMovement</h3>
          <p className="mt-2 mb-0 text-xs leading-relaxed text-white/85">
            Teste o que você sabe sobre sustentabilidade. São {perguntasQuiz.length} perguntas e cada acerto vale {PONTOS_POR_ACERTO} Pontos
            Soul. Você tem {VIDAS_QUIZ} vidas: errou, perde uma. São {TENTATIVAS_QUIZ} tentativas e sair no meio também conta como uma.
          </p>
        </section>
      )}

      <section
        className={`flex flex-1 flex-col px-6 pb-8 ${finalizado ? 'pt-6' : 'rounded-t-[3rem] bg-white pt-8'}`}
        aria-labelledby="quiz-pergunta"
      >
        {finalizado ? (
          <Resultado
            completo={completo}
            pontosQuiz={pontosQuiz}
            podeTentarDeNovo={!completo && !quizEncerrado && tentativasRestantesQuiz > 0}
            onTentarDeNovo={tentarDeNovo}
            onVoltar={onVoltar}
          />
        ) : (
          <>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onVoltar}
                className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-ink hover:bg-slate-100"
                aria-label="Voltar às missões"
              >
                <LuArrowLeft className="size-6" aria-hidden="true" />
              </button>
              <div
                className="h-3.5 flex-1 overflow-hidden rounded-full bg-slate-100"
                role="progressbar"
                aria-label="Progresso do quiz"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progresso)}
              >
                <span className="block h-full rounded-full bg-soul transition-[width] duration-500" style={{ width: `${progresso}%` }} />
              </div>
              <span className="flex shrink-0 items-center gap-1.5 text-lg font-medium text-ink" aria-label={`${vidas} vidas`}>
                <LuHeart className="size-7 fill-red-500 text-red-500" aria-hidden="true" />
                {vidas}
              </span>
            </div>

            <p className="mt-8 mb-0 text-xs font-semibold tracking-wide text-soul uppercase">
              Pergunta {posicao + 1} de {rodada.length}
            </p>
            <h3 id="quiz-pergunta" className="mt-2 mb-8 text-xl leading-snug font-normal text-ink">
              {pergunta.pergunta}
            </h3>

            <ul className="m-0 mb-8 flex list-none flex-col gap-4 p-0" aria-live="polite">
              {pergunta.alternativas.map((alternativa, indice) => (
                <li key={alternativa}>
                  <button
                    type="button"
                    onClick={() => responder(indice)}
                    disabled={respondida}
                    aria-pressed={escolhida === indice}
                    className={`w-full cursor-pointer rounded-3xl border-0 px-6 py-5 text-left text-base font-semibold shadow-[0_6px_16px_rgb(15_23_42_/_0.12)] transition duration-200 enabled:hover:-translate-y-0.5 disabled:cursor-default ${estiloAlternativa(indice, escolhida, pergunta.correta)}`}
                  >
                    {alternativa}
                  </button>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={avancar}
              disabled={!respondida}
              className="mt-auto min-h-14 w-full cursor-pointer rounded-full border-0 bg-soul text-lg font-bold text-white shadow-[0_8px_20px_rgb(83_96_255_/_0.35)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {ultima ? 'Concluir' : 'Próxima'}
            </button>
          </>
        )}
      </section>
    </div>
  );
}

function pendentes(acertos: number[]) {
  return perguntasQuiz.map((_, indice) => indice).filter((indice) => !acertos.includes(indice));
}

interface ResultadoProps {
  completo: boolean;
  pontosQuiz: number;
  podeTentarDeNovo: boolean;
  onTentarDeNovo: () => void;
  onVoltar: () => void;
}

function Resultado({ completo, pontosQuiz, podeTentarDeNovo, onTentarDeNovo, onVoltar }: ResultadoProps) {
  const Icone = completo ? LuTrophy : LuHeartCrack;

  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center text-white" role="status">
      <Icone className="mb-5 size-20 text-white" strokeWidth={1.75} aria-hidden="true" />
      <h3 id="quiz-pergunta" className="mb-3 text-2xl font-bold text-white">
        {completo ? 'Quiz concluído!' : 'Não foi dessa vez'}
      </h3>
      <p className="mb-8 text-center text-sm leading-relaxed text-white/85">
        {completo
          ? 'Você acertou todas as perguntas e completou a missão.'
          : podeTentarDeNovo
            ? 'Os pontos das respostas certas já são seus. Você ainda tem mais uma tentativa para as perguntas que faltam.'
            : 'Os pontos das respostas certas já são seus. Suas tentativas acabaram e o quiz foi encerrado.'}
      </p>
      <div className="self-stretch py-2">
        <p className="m-0 text-center text-5xl font-bold text-white">
          {pontosQuiz}
          <span className="text-xl text-white/70">/{PONTOS_QUIZ}</span>
        </p>
        <p className="mt-1 mb-0 text-center text-xs text-white/80">Pontos Soul no quiz</p>
      </div>

      <div className="mt-10 flex w-full flex-col gap-3">
        {podeTentarDeNovo && (
          <button type="button" onClick={onTentarDeNovo} className="min-h-14 w-full cursor-pointer rounded-full border-0 bg-white text-lg font-bold text-soul hover:bg-white/90">
            Tentar de novo
          </button>
        )}
        <button
          type="button"
          onClick={onVoltar}
          className={`min-h-14 w-full cursor-pointer rounded-full text-lg font-bold ${podeTentarDeNovo ? 'border-2 border-white bg-transparent text-white hover:bg-white/15' : 'border-0 bg-white text-soul hover:bg-white/90'}`}
        >
          Voltar às missões
        </button>
      </div>
    </div>
  );
}
