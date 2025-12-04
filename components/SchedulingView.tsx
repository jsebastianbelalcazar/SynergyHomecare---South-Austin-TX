

import React from 'react';
import { SchedulingData } from '../types';
import { Card } from './ui/Card';
import { KPICard } from './ui/KPICard';
import { InsightCard } from './ui/InsightCard';
import { PerformanceModule } from './ui/PerformanceModule';
import { CalendarCheck, Clock, Users, Sparkles, AlertTriangle, Layers, TrendingUp } from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, XAxis, YAxis, Bar
} from 'recharts';

interface Props {
  data: SchedulingData;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
     return (
      <div className="glass-tooltip px-3 py-2 rounded-lg text-xs">
        <div className="flex items-center gap-2">
           <span className="text-apple-subtext">{payload[0].name}:</span>
           <span className="font-bold text-apple-text">{payload[0].value}</span>
        </div>
      </div>
    );
  }
  return null;
};

// Bento Box style mini-card for Raw Stats
const StatBox = ({ label, value, sub, icon }: { label: string, value: string | number, sub?: string, icon: React.ReactNode }) => (
  <div className="bg-white p-4 rounded-xl border border-apple-border shadow-sm flex flex-col justify-between h-[100px] hover:shadow-apple-card transition-shadow">
     <div className="flex justify-between items-start">
        <span className="text-[11px] font-semibold text-apple-subtext uppercase tracking-wide">{label}</span>
        <div className="text-apple-subtext opacity-70">{icon}</div>
     </div>
     <div>
        <div className="text-2xl font-bold text-apple-text tracking-tight">{value}</div>
        {sub && <div className="text-[10px] text-apple-subtext truncate mt-0.5">{sub}</div>}
     </div>
  </div>
);

export const SchedulingView: React.FC<Props> = ({ data }) => {
  const COLORS = ['#002F5D', '#F36F21', '#8E8E93', '#D1D1D6'];
  const COMPLIANCE_COLORS = ['#34C759', '#FF3B30', '#FF9500', '#0071E3'];

  return (
    <div className="space-y-6 animate-fade-in">
       
       {/* 1. Efficiency Tier */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <KPICard 
          title="Clock Compliance" 
          data={data.summary_kpis.clock_compliance} 
          icon={<Clock />}
        />
        <KPICard 
          title="Modification Rate" 
          data={data.summary_kpis.modification_rate} 
          icon={<CalendarCheck />}
        />
        <KPICard 
          title="Service Mix (Personal)" 
          data={data.summary_kpis.service_distribution} 
          icon={<Users />}
        />
      </div>

       {/* 2. Volume Tier (Raw Stats) */}
       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
         <StatBox 
            label="Total Shifts" 
            value={data.original_stats.total_shifts.value} 
            sub="Q4 2025"
            icon={<Layers size={16} />}
         />
         <StatBox 
            label="Billable Hours" 
            value={data.original_stats.billable_hours.value} 
            sub={data.original_stats.billable_hours.subValue}
            icon={<Clock size={16} />}
         />
         <StatBox 
            label="Modifications" 
            value={data.original_stats.schedule_modifications.value} 
            sub={data.original_stats.schedule_modifications.subValue}
            icon={<CalendarCheck size={16} />}
         />
         {/* Derived Metric: Efficiency */}
         <StatBox 
            label="Avg Shift Length" 
            value={data.original_stats.avg_hours_per_shift || "6.7h"} 
            sub="Efficiency Metric"
            icon={<TrendingUp size={16} />}
         />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Columns */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Service Mix */}
             <Card title="Service Mix">
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.service_mix}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={75}
                        paddingAngle={3}
                        dataKey="count"
                        stroke="none"
                        cornerRadius={4}
                      >
                        {data.service_mix.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-2">
                   {data.service_mix.map((item, idx) => (
                     <div key={idx} className="flex items-center justify-between text-sm border-b border-gray-100 last:border-0 pb-2">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                            <span className="text-apple-text text-xs font-medium">{item.status}</span>
                        </div>
                        <span className="font-mono text-apple-subtext text-xs">{item.count}</span>
                     </div>
                   ))}
                </div>
             </Card>

             {/* Clock Compliance */}
             <Card title="Compliance Breakdown">
                <div className="h-[220px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={data.clock_compliance_breakdown} margin={{ left: 10, right: 30 }} barCategoryGap={15}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="status" type="category" width={10} tick={{ fontSize: 0 }} hide />
                      <Tooltip cursor={{fill: 'transparent'}} content={<CustomTooltip />} />
                      <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24}>
                        {data.clock_compliance_breakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COMPLIANCE_COLORS[index % COMPLIANCE_COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                 <div className="space-y-2 mt-2">
                   {data.clock_compliance_breakdown.map((item, idx) => (
                     <div key={idx} className="flex items-center justify-between text-sm border-b border-gray-100 last:border-0 pb-2">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COMPLIANCE_COLORS[idx % COMPLIANCE_COLORS.length] }}></div>
                            <span className="text-apple-text text-xs font-medium">{item.status}</span>
                        </div>
                        <span className="font-mono text-apple-subtext text-xs">{item.count}</span>
                     </div>
                   ))}
                </div>
             </Card>
          </div>

          {/* Activity Log - Finder List Style */}
          <Card title="Recent Activity" className="flex-1" noPadding>
             <div className="flex flex-col">
                {data.activity_log.map((log, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 border-b border-apple-border last:border-0 hover:bg-gray-50/50 transition-colors group cursor-default">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-apple-subtext shrink-0">
                       <span className="text-sm">⚡️</span>
                    </div>
                    <div className="flex-1 min-w-0">
                       <div className="flex justify-between items-baseline mb-0.5">
                          <span className="text-sm font-semibold text-apple-text truncate">{log.action}</span>
                          <span className="text-[10px] text-apple-subtext font-mono">{log.date}</span>
                       </div>
                       <p className="text-xs text-apple-subtext truncate">{log.detail}</p>
                    </div>
                  </div>
                ))}
                <div className="p-3 text-center border-t border-apple-border bg-gray-50/30 rounded-b-2xl">
                   <button className="text-xs font-medium text-solvo-navy hover:text-solvo-orange transition-colors">View Full History</button>
                </div>
             </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <PerformanceModule goals={data.performance_goals} title="Scheduling Goals" />
           
           <Card title="Smart Insights" icon={<Sparkles className="w-4 h-4 text-amber-500"/>}>
             <InsightCard insights={data.ai_insights} />
          </Card>
        </div>
      </div>
    </div>
  );
};