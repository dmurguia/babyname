import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import './Tabs.css';

interface TabsProps {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}

export function Tabs({ children }: TabsProps) {
  return <div className="tabs">{children}</div>;
}

interface TabsListProps {
  children: ReactNode;
}

export function TabsList({ children }: TabsListProps) {
  return <div className="tabs-list">{children}</div>;
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  active: boolean;
  onClick: () => void;
}

export function TabsTrigger({ children, active, onClick }: TabsTriggerProps) {
  return (
    <button className={cn('tabs-trigger', active && 'tabs-trigger-active')} onClick={onClick}>
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  activeValue: string;
  children: ReactNode;
}

export function TabsContent({ value, activeValue, children }: TabsContentProps) {
  if (value !== activeValue) return null;
  return <div className="tabs-content animate-fade-in">{children}</div>;
}
