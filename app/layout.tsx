import type { Metadata } from "next";
import "./globals.css";
import { WorkspaceProvider } from "@/components/WorkspaceProvider";
import { AppShell } from "@/components/AppShell";
import { LanguageProvider } from "@/components/LanguageProvider";

export const metadata: Metadata = {
  title: "Growth Strategy Copilot",
  description: "Rules-first business analysis and experiment-planning workspace for subscription growth teams.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider><WorkspaceProvider><AppShell>{children}</AppShell></WorkspaceProvider></LanguageProvider>
      </body>
    </html>
  );
}
