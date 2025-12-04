import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TrendIndicatorProps {
  direction?: 'up' | 'down' | 'neutral';
  className?: string;
}

export const TrendIndicator: React.FC<TrendIndicatorProps> = ({ direction, className = '' }) => {
  if (direction === 'up') {
    return <TrendingUp className={`w-3.5 h-3.5 text-notion-green-text ${className}`} />;
  }
  if (direction === 'down') {
    return <TrendingDown className={`w-3.5 h-3.5 text-notion-red-text ${className}`} />;
  }
  return <Minus className={`w-3.5 h-3.5 text-notion-gray ${className}`} />;
};