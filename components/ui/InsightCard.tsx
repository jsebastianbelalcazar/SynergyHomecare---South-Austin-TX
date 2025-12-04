import React from 'react';
import { Insight } from '../../types';
import { CheckCircle2, AlertTriangle, Info, AlertCircle } from 'lucide-react';

interface InsightCardProps {
  insights: Insight[];
}

export const InsightCard: React.FC<InsightCardProps> = ({ insights }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'danger': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStyle = (type: string) => {
    switch (type) {
      case 'success': return 'bg-white border-l-4 border-l-green-500 shadow-sm';
      case 'warning': return 'bg-white border-l-4 border-l-amber-400 shadow-sm';
      case 'danger': return 'bg-white border-l-4 border-l-red-500 shadow-sm';
      default: return 'bg-white border-l-4 border-l-blue-500 shadow-sm';
    }
  };

  return (
    <div className="space-y-3">
      {insights.map((insight, idx) => (
        <div 
          key={idx} 
          className={`p-4 rounded-xl border border-apple-border/60 flex gap-3.5 items-start transition-transform hover:scale-[1.01] ${getStyle(insight.type)}`}
        >
          <div className="shrink-0 mt-0.5">{getIcon(insight.type)}</div>
          <p className="text-sm text-apple-text leading-relaxed font-medium">{insight.text}</p>
        </div>
      ))}
    </div>
  );
};