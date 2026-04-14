import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LangProvider } from '@/context/LangContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Frank Gualdron | Desarrollador de Software',
  description: 'Portafolio profesional de Frank David Gualdron.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <LangProvider>
          <Navbar />
          {children}
          <Footer />
        </LangProvider>
      </body>
    </html>
  )
}