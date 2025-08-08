import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeScript from "@/components/theme-script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="weather-theme"
            disableTransitionOnChange
          >
            <ThemeScript />
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
