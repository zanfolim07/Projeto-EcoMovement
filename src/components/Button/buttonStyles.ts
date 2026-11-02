export type ButtonVariant = 'primary' | 'light';

const buttonBase =
  'group inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-full border-0 px-7 text-sm font-bold no-underline transition duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0';

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-white shadow-[0_10px_24px_rgb(24_133_219_/_0.25)] hover:bg-brand-dark',
  light: 'bg-white text-brand shadow-[0_10px_30px_rgb(10_40_90_/_0.25)]',
};

export function buttonClasses(variant: ButtonVariant = 'primary', className = '') {
  return [buttonBase, buttonVariants[variant], className].filter(Boolean).join(' ');
}
