import type { Metrics, UserRecord } from "./types";

const rate = (n: number, d: number) => (d ? n / d : 0);

export function calculateMetrics(users: UserRecord[]): Metrics {
  const total = users.length;
  const activatedUsers = users.filter((u) => u.course_completed >= 1);
  const engagedUsers = activatedUsers.filter((u) => u.sessions_per_week >= 2);
  const convertedUsers = engagedUsers.filter((u) => u.subscription_status === "paid");
  const retainedConvertedUsers = convertedUsers.filter((u) => u.last_active_days_ago <= 30);
  const activated = activatedUsers.length;
  const paid = users.filter((u) => u.subscription_status === "paid").length;
  const retained = users.filter((u) => u.last_active_days_ago <= 30).length;
  const renewed = retainedConvertedUsers.filter((u) => u.renewal_status === "renewed").length;
  const churned = users.filter((u) => u.churn_status === "churned").length;
  const averageCompletionRate = rate(users.reduce((sum, u) => sum + rate(u.course_completed, u.course_started), 0), total);
  const channelMap = new Map<string, UserRecord[]>();
  users.forEach((u) => channelMap.set(u.acquisition_channel, [...(channelMap.get(u.acquisition_channel) ?? []), u]));

  return {
    totalUsers: total,
    activationRate: rate(activated, total),
    paidConversionRate: rate(paid, total),
    averageCompletionRate,
    retentionRate: rate(retained, total),
    churnRate: rate(churned, total),
    arpu: rate(users.reduce((sum, u) => sum + u.payment_amount, 0), total),
    funnel: [
      { name: "Acquisition", value: 1, count: total },
      { name: "Activation", value: rate(activated, total), count: activated },
      { name: "Engagement", value: rate(engagedUsers.length, total), count: engagedUsers.length },
      { name: "Conversion", value: rate(convertedUsers.length, total), count: convertedUsers.length },
      { name: "Retained Paid Users", value: rate(retainedConvertedUsers.length, total), count: retainedConvertedUsers.length },
      { name: "Renewed Paid Users", value: rate(renewed, total), count: renewed },
    ],
    channelRetention: [...channelMap].map(([channel, rows]) => ({
      channel, users: rows.length, retention: rate(rows.filter((u) => u.last_active_days_ago <= 30).length, rows.length),
    })).sort((a, b) => a.retention - b.retention),
  };
}
