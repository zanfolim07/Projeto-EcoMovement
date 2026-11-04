import { useEffect, useRef, useState } from 'react';
import { LuCamera, LuCircleAlert, LuSquare, LuVideo } from 'react-icons/lu';
import { useMissoes } from '../../hooks/useMissoes';
import type { Missao, Submissao } from '../../types';
import { TEMPO_MAXIMO_SEGUNDOS } from '../../data/missoes';
import { formatarTempo } from '../../utils/formatadores';

interface CapturaEvidenciaProps {
  missao: Missao;
  onEnviado: (submissao: Submissao) => void;
}

export default function CapturaEvidencia({ missao, onEnviado }: CapturaEvidenciaProps) {
  const { enviarEvidencia } = useMissoes();
  const ehVideo = missao.tipoEvidencia === 'VIDEO';
  const tempoMaximo = TEMPO_MAXIMO_SEGUNDOS;

  const cameraRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const gravadorRef = useRef<MediaRecorder | null>(null);
  const inicioGravacaoRef = useRef(0);

  const [gravando, setGravando] = useState(false);
  const [restante, setRestante] = useState(tempoMaximo);
  const [duracaoVideo, setDuracaoVideo] = useState(0);
  const [avisoFechado, setAvisoFechado] = useState(false);
  const tempoEsgotado = restante === 0;
  const [arquivo, setArquivo] = useState<Blob | null>(null);
  const [previa, setPrevia] = useState('');
  const [erro, setErro] = useState(
    navigator.mediaDevices ? '' : 'Este navegador não permite usar a câmera. Abra o site em um navegador atualizado.',
  );
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (!navigator.mediaDevices) return;

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' }, audio: ehVideo })
      .then((stream) => {
        streamRef.current = stream;
        if (cameraRef.current) cameraRef.current.srcObject = stream;
      })
      .catch(() => setErro('Não foi possível acessar a câmera. Verifique a permissão do navegador.'));

    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [ehVideo]);

  useEffect(() => {
    const cronometro = window.setInterval(() => {
      setRestante((atual) => Math.max(atual - 1, 0));
    }, 1000);
    return () => window.clearInterval(cronometro);
  }, []);

  useEffect(() => {
    if (tempoEsgotado && gravadorRef.current?.state === 'recording') pararGravacao();
  }, [tempoEsgotado]);

  function iniciarGravacao() {
    if (!streamRef.current || tempoEsgotado) return;

    const partes: Blob[] = [];
    const gravador = new MediaRecorder(streamRef.current);
    gravador.ondataavailable = (evento) => partes.push(evento.data);
    gravador.onstop = () => {
      const video = new Blob(partes, { type: gravador.mimeType });
      setDuracaoVideo(Math.max(1, Math.round((Date.now() - inicioGravacaoRef.current) / 1000)));
      setArquivo(video);
      setPrevia(URL.createObjectURL(video));
    };

    gravador.start();
    gravadorRef.current = gravador;
    inicioGravacaoRef.current = Date.now();
    setGravando(true);
  }

  function pararGravacao() {
    gravadorRef.current?.stop();
    gravadorRef.current = null;
    setGravando(false);
  }

  function registrarDeNovo() {
    if (tempoEsgotado) return;
    setErro('');
    setArquivo(null);
    setPrevia('');
    setDuracaoVideo(0);
  }

  function tirarFoto() {
    const camera = cameraRef.current;
    if (!camera || !camera.videoWidth || tempoEsgotado) return;

    const canvas = document.createElement('canvas');
    canvas.width = camera.videoWidth;
    canvas.height = camera.videoHeight;
    canvas.getContext('2d')?.drawImage(camera, 0, 0);
    canvas.toBlob((foto) => {
      if (!foto) return;
      setArquivo(foto);
      setPrevia(URL.createObjectURL(foto));
    }, 'image/jpeg');
  }

  async function enviar() {
    if (!arquivo) return;

    setEnviando(true);
    setErro('');
    try {
      const submissao = await enviarEvidencia({
        missaoId: missao.id,
        tipoEvidencia: ehVideo ? 'VIDEO' : 'FOTO',
        arquivo,
        duracaoSegundos: ehVideo ? duracaoVideo : undefined,
      });
      onEnviado(submissao);
    } catch {
      setErro('Não foi possível enviar a evidência. Tente novamente.');
      setEnviando(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col px-4 pt-1 pb-5">
      <div className="mb-3 flex items-start justify-between">
        <button
          type="button"
          onClick={enviar}
          disabled={!arquivo || enviando}
          className="min-h-10 cursor-pointer rounded-full border-0 bg-eco px-6 text-sm font-bold text-white transition-colors hover:bg-eco-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          {enviando ? 'Enviando…' : 'Enviar'}
        </button>
        <div className="text-right" role="timer" aria-label="Tempo restante">
          <span className="block text-sm text-ink">Tempo restante</span>
          <span className={`block text-4xl font-bold tabular-nums ${restante <= 10 ? 'text-red-600' : 'text-ink'}`}>
            {formatarTempo(restante)}
          </span>
        </div>
      </div>

      <div className="relative flex min-h-100 flex-1 overflow-hidden rounded-3xl bg-ink">
        <video ref={cameraRef} className={`absolute inset-0 size-full object-cover ${previa ? 'hidden' : ''}`} autoPlay muted playsInline />

        {erro && !previa && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center text-white">
            <LuCircleAlert className="size-12" aria-hidden="true" />
            <p className="m-0 text-sm leading-relaxed" role="alert">{erro}</p>
          </div>
        )}

        {ehVideo && previa && (
          <video src={previa} className="absolute inset-0 size-full object-cover" controls playsInline />
        )}

        {!ehVideo && previa && <img src={previa} alt="Foto da evidência" className="absolute inset-0 size-full object-cover" />}

        {gravando && (
          <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white">
            <span className="size-2 animate-pulse rounded-full bg-red-500" /> Gravando
          </span>
        )}

        {tempoEsgotado && previa && !avisoFechado && (
          <button
            type="button"
            onClick={() => setAvisoFechado(true)}
            className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-5 border-0 bg-ink/75 p-8 text-center text-white"
          >
            <LuCircleAlert className="size-20" strokeWidth={1.75} aria-hidden="true" />
            <span className="max-w-64 text-lg leading-relaxed font-medium" role="status">
              O tempo acabou. Agora é só enviar para análise!
            </span>
          </button>
        )}

        {tempoEsgotado && !previa && !gravando && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-ink/85 p-8 text-center text-white">
            <LuCircleAlert className="size-20" strokeWidth={1.75} aria-hidden="true" />
            <span className="max-w-64 text-lg leading-relaxed font-medium" role="status">
              O tempo acabou e nenhuma evidência foi registrada. Volte e comece a missão de novo.
            </span>
          </div>
        )}
      </div>

      <div className="-mt-10 flex justify-center">
        {!ehVideo && !previa && (
          <button
            type="button"
            onClick={tirarFoto}
            disabled={Boolean(erro) || tempoEsgotado}
            aria-label="Tirar foto"
            className="relative flex size-20 cursor-pointer items-center justify-center rounded-full border-0 bg-eco text-white shadow-lg transition hover:bg-eco-dark active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LuCamera className="size-9" aria-hidden="true" />
          </button>
        )}

        {ehVideo && !previa && (
          <button
            type="button"
            onClick={() => (gravando ? pararGravacao() : iniciarGravacao())}
            disabled={Boolean(erro) || (tempoEsgotado && !gravando)}
            aria-label={gravando ? 'Parar gravação' : 'Iniciar gravação'}
            className={`relative flex size-20 cursor-pointer items-center justify-center rounded-full border-0 text-white shadow-lg transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${gravando ? 'bg-red-500' : 'bg-eco hover:bg-eco-dark'}`}
          >
            {gravando ? <LuSquare className="size-7 fill-current" aria-hidden="true" /> : <LuVideo className="size-9" aria-hidden="true" />}
          </button>
        )}

        {previa && !tempoEsgotado && (
          <button
            type="button"
            onClick={registrarDeNovo}
            disabled={enviando}
            className="relative min-h-12 cursor-pointer rounded-full border-0 bg-white px-6 text-sm font-semibold text-ink shadow-lg hover:bg-surface"
          >
            {ehVideo ? 'Gravar de novo' : 'Tirar outra foto'}
          </button>
        )}
      </div>

      {erro && previa && <p className="mt-3 mb-0 text-center text-xs text-red-600" role="alert">{erro}</p>}
    </div>
  );
}
