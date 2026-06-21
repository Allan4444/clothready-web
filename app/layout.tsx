import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageThemeSync from '@/components/layout/PageThemeSync'
import { Providers } from '@/components/Providers'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.clothready.com'),
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  title: {
    default: 'ClothReady — B2B Fitness & Streetwear Manufacturer China · MOQ 50pcs',
    template: '%s | ClothReady',
  },
  description:
    'ClothReady: Direct B2B apparel manufacturer in China specialising in fitness wear, activewear & streetwear for European and American brands. 50 pcs MOQ, 20+ years experience, free samples.',
  keywords: [
    'B2B clothing manufacturer China',
    'fitness wear manufacturer',
    'activewear manufacturer',
    'streetwear manufacturer',
    'OEM apparel China',
    'custom clothing manufacturer',
    'gym wear manufacturer',
    'private label clothing',
    'low MOQ manufacturer',
  ],
  authors: [{ name: 'ClothReady Manufacturing' }],
  openGraph: {
    type: 'website',
    siteName: 'ClothReady',
    title: 'ClothReady — B2B Fitness & Streetwear Manufacturer',
    description: 'Direct factory in China. 50 pcs MOQ. Trusted by EU & USA brands.',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClothReady — B2B Fitness & Streetwear Manufacturer',
    description: 'Direct factory in China. 50 pcs MOQ.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'ClothReady',
              url: 'https://www.clothready.com',
              logo: 'https://www.clothready.com/logo.png',
              description: 'B2B apparel manufacturer specialising in fitness wear and streetwear.',
              address: { '@type': 'PostalAddress', addressCountry: 'CN', addressLocality: 'Dongguan' },
              contactPoint: { '@type': 'ContactPoint', email: 'info@clothready.com', contactType: 'sales' },
            }),
          }}
        />
      </head>
      <body>
        <Providers>
          <PageThemeSync />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster position="top-center" theme="dark" />
        </Providers>
      </body>
    </html>
  )
}
