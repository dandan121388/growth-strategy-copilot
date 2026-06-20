import type { UserRecord } from "./types";

const channels = ["Organic Search", "Paid Social", "Influencer", "App Store", "Referral"];
const isoDate = (daysAgo: number) => {
  const d = new Date("2026-06-18T00:00:00Z");
  d.setUTCDate(d.getUTCDate() - daysAgo);
  return d.toISOString().slice(0, 10);
};

/** Deterministic 160-row fitness dataset with intentional activation, conversion and channel-quality signals. */
export function generateSampleData(): UserRecord[] {
  return Array.from({ length: 160 }, (_, i) => {
    const channel = channels[i % channels.length];
    const recentSignup = i < 62;
    const lowQuality = channel === "Paid Social" || channel === "Influencer";
    const paid = i % 17 === 3;
    const highPotential = !paid && i % 8 === 0;
    const sessions = highPotential ? 4 + (i % 3) : paid ? 3 + (i % 4) : i % 4;
    const started = i % 5 === 0 ? 0 : 1 + (i % 4);
    const completionBias = started > 0 && i % 3 === 0 ? 1 : 0;
    const completed = Math.min(started, highPotential ? Math.max(1, completionBias) : paid ? Math.max(1, completionBias) : completionBias);
    const retained = lowQuality ? i % 6 === 0 : i % 9 < 4;
    const churned = !retained && (lowQuality ? i % 3 !== 0 : i % 4 === 0);
    const risk = !retained && !churned;
    const inactiveDays = churned ? 35 + (i % 55) : risk ? 31 + (i % 24) : i % 13;
    return {
      user_id: `FIT-${String(i + 1).padStart(4, "0")}`,
      signup_date: isoDate(recentSignup ? i % 28 : 30 + (i % 150)),
      user_segment: recentSignup ? "New" : paid ? "Paid" : "Existing",
      acquisition_channel: channel,
      subscription_status: paid ? "paid" : "free",
      plan_type: paid ? (i % 2 ? "Monthly Pro" : "Annual Pro") : "Free",
      sessions_per_week: sessions,
      course_started: started,
      course_completed: completed,
      completion_rate: started ? Number((completed / started).toFixed(2)) : 0,
      last_active_days_ago: inactiveDays,
      payment_amount: paid ? (i % 2 ? 29 : 199) : 0,
      renewal_status: paid ? (churned ? "not_renewed" : risk ? "due" : "renewed") : "not_applicable",
      churn_status: churned ? "churned" : risk ? "risk" : "active",
      campaign_exposure: i % 7,
      coupon_used: i % 11 === 0 || (!paid && i % 13 === 0),
    };
  });
}

export const sampleFields: (keyof UserRecord)[] = [
  "user_id", "signup_date", "user_segment", "acquisition_channel", "subscription_status", "plan_type",
  "sessions_per_week", "course_started", "course_completed", "completion_rate", "last_active_days_ago",
  "payment_amount", "renewal_status", "churn_status", "campaign_exposure", "coupon_used",
];
