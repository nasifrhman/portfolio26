import React, { ReactNode } from 'react';

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
      <p className="kicker">§ {kicker}</p>
      <h1>{title}</h1>
      {children ? <div className="page-lede">{children}</div> : null}
    </header>
  );
};
