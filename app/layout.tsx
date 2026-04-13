import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Frank Gualdron | Desarrollador de Software',
  description: 'Portafolio profesional de Frank David Gualdron, estudiante de Ingeniería en Sistemas apasionado por Linux y el desarrollo web.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
