import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";

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

      <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
          <ClerkProvider
      appearance={{
        baseTheme: dark,
        // variables:{
        //   colorPrimary: 'hsl(263.4, 70%, 50.4%)'
          
        // }
      }
      }
    >
        {children}
        </ClerkProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
    
  );
}
