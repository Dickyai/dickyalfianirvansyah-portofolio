import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  fullBleed?: boolean;
}

export function Container({ children, className = '', fullBleed = false }: ContainerProps) {
  return (
    <div className={`mx-auto ${fullBleed ? '' : 'px-5 sm:px-8 lg:px-12'} ${className}`}>
      {children}
    </div>
  );
}
