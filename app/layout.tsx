import type { Metadata } from "next";
import "./globals.css";
import Layout from "../src/components/Layout";

export const metadata: Metadata = {
  title: "Lapinex Tech Blog",
  description: "Personal highly technical blog covering AIoT, embedded systems, cybersecurity, AI, and full-stack development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css" />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
