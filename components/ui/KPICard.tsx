import React from 'react';
import { Card } from './Card';
import { TrendIndicator } from './TrendIndicator';
import { KPI } from '../../types';

interface KPICardProps {
  title: string;
  data: KPI;
  icon?: React.ReactNode;
}

export const KPICard: React.FC<KPICardProps> = ({ title, data, icon }) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-apple-border shadow-apple-card hover:shadow-apple-hover transition-all duration-300 group cursor-default">
      <div className="flex flex-col h-full justify-between">
         <div className="flex justify-between items-start mb-3">
            <span className="text-[13px] font-medium text-apple-subtext group-hover:text-apple-text transition-colors">{title}</span>
            {icon && (
              <div className="w-8 h-8 rounded-full bg-apple-gray flex items-center justify-center text-apple-text opacity-70 group-hover:opacity-100 transition-opacity">
                {React.cloneElement(icon as React.ReactElement, { size: 14 })}
              </div>
            )}
         </div>
         
         <div>
            <div className="flex items-baseline gap-2">
               <span className="text-[28px] font-bold text-apple-text tracking-tight leading-none">{data.value}</span>
            </div>
            
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-dashed border-gray-100">
               {data.trend && (
                 <div className="flex items-center bg-gray-50 rounded-md px-1.5 py-0.5">
                    <TrendIndicator direction={data.trend} />
                 </div>
               )}
               <span className="text-xs text-apple-subtext truncate max-w-[120px]">{data.subValue}</span>
               {data.target && (
                  <span className="ml-auto text-[10px] font-medium text-apple-subtext bg-apple-gray px-2 py-0.5 rounded-full">
                     Goal: {data.target}
                  </span>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};