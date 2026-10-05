export { cn } from "cn";

export function formatTimeAgo(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();

  const secondsDelta = Math.round((date.getTime() - now.getTime()) / 1000);

  const intervals: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
    { unit: "year", seconds: 31536000 },
    { unit: "month", seconds: 2592000 },
    { unit: "day", seconds: 86400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
    { unit: "second", seconds: 1 },
  ];

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  for (const interval of intervals) {
    if (
      Math.abs(secondsDelta) >= interval.seconds ||
      interval.unit === "second"
    ) {
      const value = Math.round(secondsDelta / interval.seconds);
      return rtf.format(value, interval.unit);
    }
  }

  return "just now";
}
