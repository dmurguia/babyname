import { SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import './Select.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, options, className, ...props }: SelectProps) {
  return (
    <div className="select-wrapper">
      {label && <label className="select-label">{label}</label>}
      <select className={cn('select', className)} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
