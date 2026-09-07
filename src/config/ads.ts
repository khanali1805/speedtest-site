export type AdProvider = "none" | "adsense" | "custom";

export const adsConfig = {
  enabled: process.env.NEXT_PUBLIC_ADS_ENABLED === "true",
  provider: (process.env.NEXT_PUBLIC_ADS_PROVIDER ?? "none") as AdProvider,
  publisherId: process.env.NEXT_PUBLIC_ADS_PUBLISHER_ID ?? "",

  slots: {
    homepageTop: process.env.NEXT_PUBLIC_AD_SLOT_HOME_TOP ?? "",
    homepageMiddle: process.env.NEXT_PUBLIC_AD_SLOT_HOME_MIDDLE ?? "",
    utilityTop: process.env.NEXT_PUBLIC_AD_SLOT_UTILITY_TOP ?? "",
    utilityResult: process.env.NEXT_PUBLIC_AD_SLOT_UTILITY_RESULT ?? "",
  },
} as const;
