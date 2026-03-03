import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import './Textarea.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="textarea-wrapper">
        {label && <label className="textarea-label">{label}</label>}
        <textarea
          ref={ref}
          className={cn('textarea', error && 'textarea-error', className)}
          {...props}
        />
        {error && <span className="textarea-error-message">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
