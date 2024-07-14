import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider/theme";
import Header from "./components/header";
import { Toaster } from "sonner";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import ProviderSession from "@/providers/session-provider";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderSession>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <Header />
            {children}
          </ThemeProvider>
        </ProviderSession>
      </body>
    </html>
  );
}
