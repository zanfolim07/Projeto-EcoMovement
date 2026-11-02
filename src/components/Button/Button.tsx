import type { ReactNode } from 'react';
import { buttonClasses } from './buttonStyles';
import type { ButtonVariant } from './buttonStyles';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
}: ButtonProps) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={buttonClasses(variant, className)}>
      {children}
    </button>
  );
}
