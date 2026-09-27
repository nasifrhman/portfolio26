import React, { ReactNode } from 'react';
import { GlassWords } from './GlassWords';

interface PageHeaderProps {
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  kicker,
  title,
  children,
  className = ''
}) => {
  return (
    <header className={`page-header wrap ${className}`.trim()}>
      <GlassWords as="p" className="kicker">{kicker}</GlassWords>
      <GlassWords as="h1">{title}</GlassWords>
      {children ? <div className="page-lede"><GlassWords>{children}</GlassWords></div> : null}
    </header>
  );
};
