

import React from 'react';
import { Goal } from '../../types';
import { Card } from './Card';
import { Target } from 'lucide-react';

interface PerformanceModuleProps {
  goals: Goal[];
  title?: string;
}

const Ring = ({ percentage, color, size = 60, strokeWidth = 5 }: { percentage: number, color: string, size?: number, strokeWidth?: number }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-100"
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <span className="absolute text-[10px] font-bold text-apple-text">
        {Math.round(percentage)}%
      </span>
    </div>
  );
};

export const PerformanceModule: React.FC<PerformanceModuleProps> = ({ goals, title = "Performance Goals" }) => {
  const getStatusColor = (status: Goal['status']) => {
    switch (status) {
      case 'on-track': return '#34C759'; // Apple Green
      case 'at-risk': return '#FF9500'; // Apple Orange
      case 'behind': return '#FF3B30'; // Apple Red
      default: return '#0071E3'; // Apple Blue
    }
  };

  return (
    <Card title={title} icon={<Target className="w-4 h-4 text-solvo-navy" />}>
      <div className="space-y-5">
        {goals.map((goal, idx) => {
          let percentage = 0;
          
          if (goal.unit === '%') {
             percentage = Math.min(goal.current, 100);
          } else if (goal.reverse) {
             // For reverse metrics, if Current > Target, percentage is capped or full.
             // We want to show how "safe" it is. 
             // Actually for rings, let's show usage. 
             // If Limit is 50, and we are at 124, we are at 248% (Over).
             percentage = Math.min((goal.current / goal.target) * 100, 100);
          } else {
             percentage = Math.min((goal.current / goal.target) * 100, 100); 
          }

          return (
            <div key={idx} className="flex items-center gap-4 group">
              {/* Ring Visualization */}
              <div className="shrink-0">
                 <Ring percentage={percentage} color={getStatusColor(goal.status)} size={48} strokeWidth={4} />
              </div>

              {/* Text Data */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                   <span className="text-sm font-semibold text-apple-text truncate pr-2">{goal.label}</span>
                   <span className={`text-xs font-mono font-medium ${goal.status === 'behind' ? 'text-apple-red' : 'text-apple-subtext'}`}>
                     {goal.current} / {goal.target}{goal.unit}
                   </span>
                </div>
                <div className="flex items-center gap-1.5">
                   <div className={`w-1.5 h-1.5 rounded-full`} style={{ backgroundColor: getStatusColor(goal.status) }}></div>
                   <span className="text-[10px] text-apple-subtext uppercase tracking-wide font-medium">
                      {goal.status.replace('-', ' ')}
                   </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};