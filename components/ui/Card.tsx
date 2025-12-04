import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  action?: ReactNode;
  icon?: ReactNode;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, action, icon, noPadding = false }) => {
  return (
    <div className={`bg-white rounded-2xl border border-apple-border shadow-apple-card hover:shadow-apple-hover transition-all duration-300 ${className}`}>
      {(title || action || icon) && (
        <div className={`flex justify-between items-center ${noPadding ? 'p-5 pb-0' : 'p-5 mb-0'}`}>
          <div className="flex items-center gap-2.5">
            {icon && (
               <div className="text-apple-subtext">
                  {icon}
               </div>
            )}
            {title && <h3 className="text-[15px] font-semibold text-apple-text tracking-tight">{title}</h3>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={`flex-1 ${noPadding ? '' : 'p-5'}`}>
        {children}
      </div>
    </div>
  );
};