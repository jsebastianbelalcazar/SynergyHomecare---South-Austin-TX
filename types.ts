

export interface KPI {
  value: string; // Changed to string to support '%' explicitly
  subValue: string;
  target?: string; // e.g. "90%"
  trend?: 'up' | 'down' | 'neutral';
}

export interface Insight {
  type: 'success' | 'warning' | 'info' | 'danger';
  text: string;
}

export interface Goal {
  label: string;
  current: number; // raw number
  target: number;  // raw number
  unit: string;    // '%', 'h', 'x'
  status: 'on-track' | 'at-risk' | 'behind';
  reverse?: boolean; // true if lower is better (e.g. missed clocks)
}

export interface FunnelStep {
  step: string;
  value: number;
  conversion?: string; // e.g. "56%"
}

export interface WeeklyTrend {
  date: string;
  applications: number;
}

export interface StatusItem {
  status: string;
  count: number;
}

export interface RoleData {
  role: string;
  hours: number;
  applicants: number;
  emails: number;
  texts: number;
}

export interface ActivityLog {
  date: string;
  action: string;
  detail: string;
}

export interface OriginalStatsRecruitment {
  unreviewed_applicants: KPI;
  interviews_scheduled: KPI;
  pending_onboarding: KPI;
  avg_response_time: KPI;
}

export interface OriginalStatsScheduling {
  total_shifts: KPI;
  schedule_modifications: KPI;
  billable_hours: KPI;
  compliance_alerts: KPI;
  avg_hours_per_shift?: string; // Derived
}

export interface RecruitmentData {
  summary_kpis: {
    review_rate: KPI;
    interview_pass_rate: KPI;
    offer_acceptance_rate: KPI;
  };
  original_stats: OriginalStatsRecruitment;
  performance_goals: Goal[];
  ai_insights: Insight[];
  funnel: FunnelStep[];
  weekly_trends: WeeklyTrend[];
  status_breakdown: StatusItem[];
  role_efficiency: {
    breakdown: RoleData[];
    total: RoleData;
  };
}

export interface SchedulingData {
  summary_kpis: {
    clock_compliance: KPI;
    modification_rate: KPI;
    service_distribution: KPI; // Replaced client_satisfaction
  };
  original_stats: OriginalStatsScheduling;
  performance_goals: Goal[];
  ai_insights: Insight[];
  service_mix: StatusItem[];
  clock_compliance_breakdown: StatusItem[];
  activity_log: ActivityLog[];
}

export interface DashboardData {
  recruitment: RecruitmentData;
  scheduling: SchedulingData;
}