import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/lib/mui/theme';
import { FeedbackProvider } from "@/components/feedback/FeedbackContext";

export const metadata: Metadata = {
  title: "Sucudex",
  description: "Dex de Suculentas powered by Next.js & MUI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            {/* CssBaseline chuta o CSS padrão do navegador e aplica o do Material Design */}
            <CssBaseline />
            <FeedbackProvider>
              {children}
            </FeedbackProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
