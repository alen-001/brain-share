import type { Metadata } from "next";
import { Geist, Geist_Mono,Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
export const metadata: Metadata = {
  title: "BrainShare",
  description: "Create and share your brain with the world!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en" suppressHydrationWarning>
      <body>
      <ClerkProvider
      appearance={{
        baseTheme:dark,
        variables:{
          fontSize: '16px',
          fontFamily: 'Inter, sans-serif',
        }
      }
      }
    >
      <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
        {children}
        </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
    
  );
}
