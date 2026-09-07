import { adsConfig } from "@/config/ads";

type AdSlotProps = {
  slot?: string;
  className?: string;
};

export function AdSlot({ slot, className = "" }: AdSlotProps) {
  if (!adsConfig.enabled || !slot) {
    return null;
  }

  return (
    <div
      className={`min-h-24 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white ${className}`}
      data-ad-provider={adsConfig.provider}
      data-ad-slot={slot}
    >
      <div className="flex min-h-24 items-center justify-center px-4 text-xs text-slate-400">
        Advertisement
      </div>
    </div>
  );
}
