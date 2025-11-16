import type { Metadata } from "next";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "EcoGo Admin Portal",
  description: "Admin Dashboard for EcoGo — clean, sustainable mobility.",
  openGraph: {
    title: "EcoGo Admin Portal",
    siteName: "EcoGo",
    type: "website",
  },
  twitter: { card: "summary", title: "EcoGo Admin Portal" },
};

export default function Home() {
  return <AppShell />;
}
