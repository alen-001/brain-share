import type { Metadata } from "next";
import { Geist, Geist_Mono,Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { DocumentProvider } from "@/context/document-context";
export const metadata: Metadata = {
  title: "BrainShare",
  description: "Create and share your brain with the world!",
};
const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en" suppressHydrationWarning>
      <body>
      {/* <QueryClientProvider client={queryClient}> */}
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
      <DocumentProvider>
      <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
        {children}
        </ThemeProvider>
        </DocumentProvider>
        </ClerkProvider>
        <Toaster />
        {/* </QueryClientProvider> */}
      </body>
    </html>
    
  );
}
