"use client";

type UtilityIconProps = {
  type: "electricity" | "gas" | "water" | "wifi" | "calculator";
  size?: number;
};

export function UtilityIcon({ type, size = 24 }: UtilityIconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (type === "electricity") return <svg {...common}><path d="M13 2 5 14h6l-1 8 8-12h-6l1-8Z" /></svg>;
  if (type === "gas") return <svg {...common}><path d="M12 3c2 3 5 4 5 9a5 5 0 0 1-10 0c0-2 1-4 3-6 0 2 1 3 2 4 1-2 1-4 0-7Z" /></svg>;
  if (type === "water") return <svg {...common}><path d="M12 3s6 6 6 11a6 6 0 0 1-12 0c0-5 6-11 6-11Z" /><path d="M9 16c.6 1 1.5 1.5 3 1.5" /></svg>;
  if (type === "wifi") return <svg {...common}><path d="M3 9a14 14 0 0 1 18 0" /><path d="M6 12a9.5 9.5 0 0 1 12 0" /><path d="M9 15a5 5 0 0 1 6 0" /><circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" /></svg>;
  return <svg {...common}><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 7h8M8 11h2M14 11h2M8 15h2M14 15h2M8 19h8" /></svg>;
}