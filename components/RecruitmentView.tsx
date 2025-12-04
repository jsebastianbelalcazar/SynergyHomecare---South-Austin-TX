

import React from 'react';
import { RecruitmentData } from '../types';
import { Card } from './ui/Card';
import { KPICard } from './ui/KPICard';
import { InsightCard } from './ui/InsightCard';
import { PerformanceModule } from './ui/PerformanceModule';
import { CheckCircle2, FileCheck, UserCheck, Sparkles, Clock, CalendarDays, FileText, Send } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, 
  AreaChart, Area, PieChart, Pie
} from 'recharts';

interface Props {
  data: RecruitmentData;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-tooltip px-3 py-2 rounded-lg text-xs">
        <p className="mb-1 font-semibold text-apple-text">{label}</p>
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

export const RecruitmentView: React.FC<Props> = ({ data }) => {
  // Apple/Solvo Hybrid Palette
  const COLORS = ['#002F5D', '#F36F21', '#8E8E93', '#34C759', '#0071E3', '#FF9500'];
  
  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* 1. Efficiency Tier (Percent KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <KPICard 
          title="Review Rate" 
          data={data.summary_kpis.review_rate} 
          icon={<FileCheck />}
        />
        <KPICard 
          title="Interview Pass Rate" 
          data={data.summary_kpis.interview_pass_rate} 
          icon={<CheckCircle2 />}
        />
        <KPICard 
          title="Offer Acceptance" 
          data={data.summary_kpis.offer_acceptance_rate} 
          icon={<UserCheck />}
        />
      </div>

      {/* 2. Volume Tier (Raw Stats) - New Layout */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
         <StatBox 
            label="Unreviewed" 
            value={data.original_stats.unreviewed_applicants.value} 
            sub={data.original_stats.unreviewed_applicants.subValue}
            icon={<FileText size={16} />}
         />
         <StatBox 
            label="Interviews" 
            value={data.original_stats.interviews_scheduled.value} 
            sub={data.original_stats.interviews_scheduled.subValue}
            icon={<CalendarDays size={16} />}
         />
         <StatBox 
            label="Onboarding" 
            value={data.original_stats.pending_onboarding.value} 
            sub={data.original_stats.pending_onboarding.subValue}
            icon={<CheckCircle2 size={16} />}
         />
         <StatBox 
            label="Response Time" 
            value={data.original_stats.avg_response_time.value} 
            sub={data.original_stats.avg_response_time.subValue}
            icon={<Clock size={16} />}
         />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content: Trends & Funnel */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Weekly Trends with Gradient */}
          <Card title="Application Volume" className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.weekly_trends} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#002F5D" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#002F5D" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#86868B', fontSize: 11, fontWeight: 500 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#86868B', fontSize: 11 }} 
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#002F5D', strokeWidth: 1, strokeDasharray: '4 4' }} />
                  <Area 
                    type="monotone" 
                    dataKey="applications" 
                    stroke="#002F5D" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorApps)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Hiring Funnel with Conversion Rates */}
            <Card title="Hiring Funnel">
              <div className="h-[220px] flex items-center justify-center">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={data.funnel} margin={{ top: 0, right: 40, left: 20, bottom: 0 }} barCategoryGap={12}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="step" type="category" width={70} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#1D1D1F', fontWeight: 600 }} />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                        {data.funnel.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                 </ResponsiveContainer>
              </div>
            </Card>

            {/* Status Breakdown (Donut) */}
            <Card title="Status Distribution">
              <div className="h-[220px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.status_breakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="count"
                      stroke="none"
                      cornerRadius={5}
                    >
                      {data.status_breakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                   <div className="text-2xl font-bold text-apple-text">48</div>
                   <div className="text-[10px] text-apple-subtext uppercase font-medium">Total</div>
                </div>
              </div>
            </Card>
          </div>
          
           {/* Role Efficiency Table - Full Width */}
           <Card title="Role Efficiency Breakdown" noPadding className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="text-xs text-apple-subtext bg-gray-50/80 border-b border-apple-border">
                    <tr>
                      <th className="px-6 py-4 font-medium uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 font-medium text-right uppercase tracking-wider">Applicants</th>
                      <th className="px-6 py-4 font-medium text-right uppercase tracking-wider">Hours</th>
                      <th className="px-6 py-4 font-medium text-right uppercase tracking-wider">Comms</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-apple-border">
                    {data.role_efficiency.breakdown.map((role, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/20 transition-colors group">
                        <td className="px-6 py-4 font-medium text-apple-text">{role.role}</td>
                        <td className="px-6 py-4 text-right text-apple-subtext font-mono group-hover:text-apple-text">{role.applicants}</td>
                        <td className="px-6 py-4 text-right text-apple-subtext font-mono group-hover:text-apple-text">{role.hours.toFixed(1)}h</td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-[11px] px-2 py-1 bg-gray-100 rounded-full text-apple-subtext font-medium border border-gray-200">
                             {role.emails} ✉️ &nbsp; {role.texts} 💬
                          </span>
                        </td>
                      </tr>
                    ))}
                    {/* Total Row */}
                    <tr className="bg-gray-50/50 font-semibold border-t-2 border-apple-border">
                        <td className="px-6 py-4 text-apple-text">Total</td>
                        <td className="px-6 py-4 text-right text-apple-text font-mono">{data.role_efficiency.total.applicants}</td>
                        <td className="px-6 py-4 text-right text-apple-text font-mono">{data.role_efficiency.total.hours.toFixed(1)}h</td>
                        <td className="px-6 py-4 text-right">
                           <span className="text-[11px] px-2 py-1 bg-white rounded-full text-apple-text font-bold border border-apple-border shadow-sm">
                             {data.role_efficiency.total.emails + data.role_efficiency.total.texts} Total
                          </span>
                        </td>
                    </tr>
                  </tbody>
                </table>
              </div>
           </Card>
        </div>

        {/* Right Column: AI Insights & Performance Goals */}
        <div className="space-y-6">
          <PerformanceModule goals={data.performance_goals} title="Recruitment Goals" />
          
          <Card title="Smart Insights" icon={<Sparkles className="w-4 h-4 text-amber-500" />}>
             <InsightCard insights={data.ai_insights} />
          </Card>
        </div>
      </div>
    </div>
  );
};