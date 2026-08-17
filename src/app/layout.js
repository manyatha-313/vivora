import { ThemeProvider } from '@/context/ThemeContext'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Script from 'next/script'

export const metadata = {
  title: {
    default: 'Vivora — Healthcare, a little easier',
    template: '%s | Vivora',
  },
  description: 'Find hospitals, clinics and healthcare services in one calm, simple place — with offers that make getting care a little easier.',
  openGraph: {
    title: 'Vivora — Healthcare, a little easier',
    description: 'Find hospitals, clinics and healthcare services in one calm, simple place.',
    siteName: 'Vivora',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('vivora-theme') || 'system';
                  var resolved = t === 'system'
                    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
                    : t;
                  document.documentElement.setAttribute('data-theme', resolved);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}