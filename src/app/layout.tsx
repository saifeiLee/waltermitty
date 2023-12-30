'use client'
import "../styles/index.css";

import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  <html lang="zh-Hans" suppressHydrationWarning>
    <head />
    <body>
      <Providers>{children}</Providers>
    </body>
  </html>;
}
