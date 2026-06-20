import type { SegmentSummary, UserRecord } from "./types";

export const segmentMeta: Record<string, Omit<SegmentSummary, "segment_name" | "user_count">> = {
  "New Users": { key_behavior: "Recent sign-up with limited course completion", main_problem: "Unclear starting point and weak early habit", recommended_direction: "7-day beginner training path", targeted_by_setup: false },
  "Light Users": { key_behavior: "Two or fewer sessions per week", main_problem: "Low habit strength and inconsistent value", recommended_direction: "Lightweight weekly habit loop", targeted_by_setup: false },
  "High-potential Users": { key_behavior: "Three or more sessions weekly, not paid", main_problem: "Strong intent without conversion trigger", recommended_direction: "Premium trial with personalized value", targeted_by_setup: false },
  "High-value Users": { key_behavior: "Paid with four or more weekly sessions", main_problem: "Protect loyalty and deepen advocacy", recommended_direction: "Recognition and referral benefits", targeted_by_setup: false },
  "Churn-risk Users": { key_behavior: "Inactive 14+ days or marked at risk", main_problem: "Motivation and usage momentum declining", recommended_direction: "Personalized win-back campaign", targeted_by_setup: false },
  "Price-sensitive Users": { key_behavior: "Coupon usage or repeated campaign exposure", main_problem: "Price-value tradeoff remains unclear", recommended_direction: "Value-led membership communication", targeted_by_setup: false },
};

const setupTargetsBySegment: Record<string, string[]> = {
  "New Users": ["New users"],
  "Light Users": ["Light users"],
  "High-potential Users": ["High-potential users"],
  "High-value Users": ["High-value users", "Paid users"],
  "Churn-risk Users": ["Churn-risk users"],
  "Price-sensitive Users": ["Price-sensitive users"],
};

export function isSegmentTargeted(segmentName: string, targetUsers: string[]) {
  return (setupTargetsBySegment[segmentName] ?? []).some((target) => targetUsers.includes(target));
}

export function assignSegment(user: UserRecord): string {
  if (user.churn_status === "risk" || user.last_active_days_ago >= 14) return "Churn-risk Users";
  if (user.subscription_status === "paid" && user.sessions_per_week >= 4) return "High-value Users";
  if (user.subscription_status === "free" && user.sessions_per_week >= 3) return "High-potential Users";
  if (user.coupon_used || (user.campaign_exposure >= 4 && user.subscription_status === "free")) return "Price-sensitive Users";
  const daysSinceSignup = (Date.parse("2026-06-18") - Date.parse(user.signup_date)) / 86400000;
  if (daysSinceSignup <= 30 || user.course_completed === 0) return "New Users";
  return "Light Users";
}

export function segmentUsers(users: UserRecord[], targetUsers: string[] = []): SegmentSummary[] {
  const counts = users.reduce<Record<string, number>>((acc, user) => {
    const name = assignSegment(user); acc[name] = (acc[name] ?? 0) + 1; return acc;
  }, {});
  return Object.entries(segmentMeta)
    .map(([segment_name, meta]) => ({ ...meta, segment_name, user_count: counts[segment_name] ?? 0, targeted_by_setup: isSegmentTargeted(segment_name, targetUsers) }))
    .sort((a, b) => Number(b.targeted_by_setup) - Number(a.targeted_by_setup) || b.user_count - a.user_count);
}
