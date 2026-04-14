import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LangProvider } from '@/context/LangContext'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import Particles from '@/components/Particles'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Frank Gualdron | Desarrollador de Software',
  description: 'Portafolio profesional de Frank David Gualdron.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <LangProvider>
          <ScrollProgress />
          <Particles />
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
        </LangProvider>
      </body>
    </html>
  )
}