import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/Button/Button';
import PageHero from '../../components/PageHero/PageHero';
import { usePageTitle } from '../../hooks/usePageTitle';
import { enviarContato } from '../../services/contatoService';
import type { ContatoPayload } from '../../types';

const inputClassName =
  'w-full rounded-2xl border border-slate-300 bg-white px-3.5 py-3 text-sm leading-relaxed text-copy outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-3 focus:ring-brand/20 aria-invalid:border-red-600';

export default function Contato() {
  usePageTitle('Contato');
  const [status, setStatus] = useState<'idle' | 'sucesso' | 'erro'>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContatoPayload>();

  async function onSubmit(dados: ContatoPayload) {
    try {
      await enviarContato(dados);
      setStatus('sucesso');
      reset();
    } catch {
      setStatus('erro');
    }
  }

  return (
    <main className="w-full bg-white">
      <PageHero
        eyebrow="Fale com a gente"
        title="Contato"
        description="Dúvidas, sugestões ou algum problema na plataforma? Nossa equipe está pronta para ouvir você."
      />

      <div className="mx-auto w-full max-w-160 px-6 pt-16 pb-24 lg:pt-20 lg:pb-32">
        <section aria-labelledby="contato-form-title">
          <form
            className="w-full rounded-[2rem] bg-white px-6 py-8 shadow-[0_24px_60px_rgb(15_23_42_/_0.1)] ring-1 ring-line md:px-10 md:py-10"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <h2 id="contato-form-title" className="mb-6 text-xl leading-tight font-bold text-ink">Envie sua mensagem</h2>

            <div className="mb-4 flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink" htmlFor="nome">Nome</label>
              <input
                className={inputClassName}
                id="nome"
                type="text"
                autoComplete="name"
                placeholder="Digite seu nome"
                aria-invalid={Boolean(errors.nome)}
                aria-describedby={errors.nome ? 'nome-erro' : undefined}
                {...register('nome', {
                  required: 'Informe seu nome.',
                  minLength: { value: 3, message: 'O nome deve ter pelo menos 3 caracteres.' },
                })}
              />
              {errors.nome && <span id="nome-erro" className="text-xs text-red-600">{errors.nome.message}</span>}
            </div>

            <div className="mb-4 flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink" htmlFor="email">E-mail</label>
              <input
                className={inputClassName}
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Digite seu e-mail"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-erro' : undefined}
                {...register('email', {
                  required: 'Informe seu e-mail.',
                  pattern: { value: /\S+@\S+\.\S+/, message: 'Informe um e-mail válido.' },
                })}
              />
              {errors.email && <span id="email-erro" className="text-xs text-red-600">{errors.email.message}</span>}
            </div>

            <div className="mb-4 flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink" htmlFor="mensagem">Mensagem</label>
              <textarea
                className={`${inputClassName} min-h-32 resize-y`}
                id="mensagem"
                placeholder="Escreva sua mensagem"
                rows={5}
                aria-invalid={Boolean(errors.mensagem)}
                aria-describedby={errors.mensagem ? 'mensagem-erro' : undefined}
                {...register('mensagem', {
                  required: 'Escreva sua mensagem.',
                  minLength: { value: 10, message: 'A mensagem deve ter pelo menos 10 caracteres.' },
                })}
              />
              {errors.mensagem && <span id="mensagem-erro" className="text-xs text-red-600">{errors.mensagem.message}</span>}
            </div>

            <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">
              {isSubmitting ? 'Enviando…' : 'Enviar'}
            </Button>

            <div aria-live="polite">
              {status === 'sucesso' && (
                <p className="mt-4 mb-0 text-center text-xs leading-relaxed text-green-700" role="status">
                  Mensagem enviada com sucesso. Obrigado por entrar em contato!
                </p>
              )}
              {status === 'erro' && (
                <p className="mt-4 mb-0 text-center text-xs leading-relaxed text-red-600" role="alert">
                  Não foi possível enviar sua mensagem. Tente novamente.
                </p>
              )}
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
