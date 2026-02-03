import type { Metadata } from "next";
import "./globals.css";
import { SITE_IDENTITY } from "@/site-identity";
import { FormModalProvider } from "@/context/FormModalContext";
import { FormModal } from "@/components/FormModal";
import { QueryProvider } from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: SITE_IDENTITY.meta.title,
  description: SITE_IDENTITY.meta.description,
   keywords: SITE_IDENTITY.meta.keywords,
  authors: [{ name: SITE_IDENTITY.meta.author }],
  creator: SITE_IDENTITY.meta.author,
  publisher: SITE_IDENTITY.meta.author,
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: SITE_IDENTITY.meta.title,
    description: SITE_IDENTITY.meta.description,
    type: "website",
    images: [SITE_IDENTITY.meta.ogImage || SITE_IDENTITY.assets.logo.main],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_IDENTITY.meta.title,
    description: SITE_IDENTITY.meta.description,
    images: [SITE_IDENTITY.meta.ogImage || SITE_IDENTITY.assets.logo.main],
  },
  icons: {
    icon: SITE_IDENTITY.assets.logo.favicon,
    apple: SITE_IDENTITY.assets.logo.appleTouchIcon,
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryProvider>
          <FormModalProvider>
            {children}
            <FormModal />
          </FormModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
