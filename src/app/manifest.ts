import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return { name: "SmartCalc", short_name: "SmartCalc", description: "Real calculators, utility analysis and Wi-Fi diagnostics.", start_url: "/", display: "standalone", background_color: "#f8fafc", theme_color: "#0f172a", orientation: "any", icons: [] };
}