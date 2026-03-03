import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  isLoading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'button',
        `button-${variant}`,
        `button-${size}`,
        isLoading && 'button-loading',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="button-spinner" />
          <span style={{ opacity: 0.7 }}>{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
