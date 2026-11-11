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
    <header className={`page-header wrap anim-page-header ${className}`.trim()}>
      <GlassWords as="p" className="kicker anim-header-kicker">{kicker}</GlassWords>
      <GlassWords as="h1" className="anim-header-title">{title}</GlassWords>
      {children ? <div className="page-lede anim-header-lede"><GlassWords>{children}</GlassWords></div> : null}
    </header>
  );
};
