import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import './Card.css';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export function Card({ children, className, padding = 'md', hover = false }: CardProps) {
  return (
    <div className={cn('card', `card-padding-${padding}`, hover && 'card-hover', className)}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('card-header', className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn('card-title', className)}>{children}</h3>;
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('card-content', className)}>{children}</div>;
}
