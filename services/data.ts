

import { DashboardData } from '../types';

export const dashboardData: DashboardData = {
  "recruitment": {
    "summary_kpis": {
      "review_rate": {
        "value": "92%",
        "subValue": "Applicants Processed",
        "target": "90%",
        "trend": "up"
      },
      "interview_pass_rate": {
        "value": "96%",
        "subValue": "Offer / Interview",
        "target": "75%",
        "trend": "up"
      },
      "offer_acceptance_rate": {
        "value": "35%",
        "subValue": "Signed / Offered",
        "target": "50%",
        "trend": "neutral"
      }
    },
    "original_stats": {
      "unreviewed_applicants": {
        "value": "31",
        "subValue": "Action Required"
      },
      "interviews_scheduled": {
        "value": "8",
        "subValue": "By Mariana Arévalo",
        "target": "15"
      },
      "pending_onboarding": {
        "value": "9",
        "subValue": "Documents Signed",
        "target": "5",
        "trend": "up"
      },
      "avg_response_time": {
        "value": "24h",
        "subValue": "Caregiver Role",
        "trend": "up"
      }
    },
    "performance_goals": [
      {
        "label": "Interviews",
        "current": 8,
        "target": 15,
        "unit": "",
        "status": "behind"
      },
      {
        "label": "Onboarding",
        "current": 9,
        "target": 5,
        "unit": "",
        "status": "on-track"
      },
      {
        "label": "Response Time",
        "current": 24,
        "target": 12,
        "unit": "h",
        "status": "behind",
        "reverse": true
      }
    ],
    "ai_insights": [
      {
        "type": "success",
        "text": "Interview Pass Rate is exceptional (96%). Candidate quality is currently high."
      },
      {
        "type": "warning",
        "text": "Offer Acceptance (35%) is below target. Review competitive compensation analysis."
      },
      {
        "type": "info",
        "text": "Caregiver role has the highest volume but slowest response time (24h)."
      }
    ],
    "funnel": [
      { "step": "Applicants", "value": 48, "conversion": "100%" },
      { "step": "Interviews", "value": 27, "conversion": "56%" }, // 27/48
      { "step": "Offers", "value": 26, "conversion": "96%" }, // 26/27
      { "step": "Hires", "value": 0, "conversion": "0%" }
    ],
    "weekly_trends": [
      { "date": "09/28", "applications": 2 },
      { "date": "10/05", "applications": 10 },
      { "date": "10/12", "applications": 5 },
      { "date": "10/19", "applications": 7 },
      { "date": "10/26", "applications": 10 },
      { "date": "11/02", "applications": 6 },
      { "date": "11/09", "applications": 3 },
      { "date": "11/16", "applications": 1 },
      { "date": "11/23", "applications": 2 },
      { "date": "11/30", "applications": 1 }
    ],
    "status_breakdown": [
      { "status": "Sent Documents", "count": 12 },
      { "status": "Docs Signed", "count": 9 },
      { "status": "Contact Attempted", "count": 7 },
      { "status": "In Communication", "count": 7 },
      { "status": "New", "count": 4 },
      { "status": "Interview Set", "count": 2 },
      { "status": "3rd Contact", "count": 2 },
      { "status": "Other", "count": 4 }
    ],
    "role_efficiency": {
      "breakdown": [
        { "role": "Caregiver", "hours": 24.0, "applicants": 24, "emails": 59, "texts": 53 },
        { "role": "Backup Childcare Provider", "hours": 617.4, "applicants": 46, "emails": 10, "texts": 60 }
      ],
      "total": { "role": "Total", "hours": 419.6, "applicants": 70, "emails": 69, "texts": 113 }
    }
  },
  "scheduling": {
    "summary_kpis": {
      "clock_compliance": {
        "value": "66%",
        "subValue": "Verified Events",
        "target": "95%",
        "trend": "down" // Derived: 320 verified / 486 total
      },
      "modification_rate": {
        "value": "29%",
        "subValue": "Schedule Changes",
        "target": "15%",
        "trend": "up" // Derived: 142 modifications / 486 total
      },
      "service_distribution": {
        "value": "70%",
        "subValue": "Personal Care Mix",
        "trend": "neutral" // Derived: 340 personal care / 486 total
      }
    },
    "original_stats": {
      "total_shifts": {
        "value": "486",
        "subValue": "Q4 2025",
        "trend": "up"
      },
      "schedule_modifications": {
        "value": "142",
        "subValue": "Shift Updates",
        "trend": "up"
      },
      "billable_hours": {
        "value": "3,240",
        "subValue": "Hours Verified",
        "trend": "up"
      },
      "compliance_alerts": {
        "value": "124",
        "subValue": "Missed Clocks",
        "trend": "down"
      },
      "avg_hours_per_shift": "6.7h" // Derived: 3240 / 486
    },
    "performance_goals": [
      {
        "label": "Billable Hours",
        "current": 3240,
        "target": 3000,
        "unit": "h",
        "status": "on-track"
      },
      {
        "label": "Total Shifts",
        "current": 486,
        "target": 450,
        "unit": "",
        "status": "on-track"
      },
      {
        "label": "Missed Clocks",
        "current": 166, // 110 (Both) + 32 (Out) + 24 (In)
        "target": 50,
        "unit": "",
        "status": "behind",
        "reverse": true
      }
    ],
    "ai_insights": [
      {
        "type": "danger",
        "text": "Critical: 110 'Missed Both' clock events detected. Compliance risk is elevated."
      },
      {
        "type": "success",
        "text": "Billable hours are trending up (+12% vs last month). Growth is steady."
      },
      {
        "type": "info",
        "text": "Personal Care accounts for 70% of all scheduled shifts this quarter."
      }
    ],
    "service_mix": [
      { "status": "Personal Care", "count": 340 },
      { "status": "Backup Care", "count": 95 },
      { "status": "Transportation", "count": 35 },
      { "status": "Training", "count": 16 }
    ],
    "clock_compliance_breakdown": [
      { "status": "Verified / On Time", "count": 320 },
      { "status": "Missed Both", "count": 110 },
      { "status": "Missed Clock Out", "count": 32 },
      { "status": "Missed Clock In", "count": 24 }
    ],
    "activity_log": [
      { "date": "11/28", "action": "Create profile", "detail": "MOERSCHELL, ADAM" },
      { "date": "11/26", "action": "Create profile", "detail": "De Leon, Brenda" },
      { "date": "11/24", "action": "Update profile", "detail": "Transport, Marlon" },
      { "date": "11/21", "action": "Create profile", "detail": "Salvo, Patrick" },
      { "date": "11/20", "action": "Create profile", "detail": "Transport, Marlon" },
      { "date": "11/11", "action": "Create profile", "detail": "Iacampo, Angela" }
    ]
  }
};