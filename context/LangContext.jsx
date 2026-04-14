'use client'

import { createContext, useContext, useState } from 'react'

const LangContext = createContext()

export const textos = {
  es: {
    nav: {
      inicio: 'Inicio',
      proyectos: 'Proyectos',
      contacto: 'Contacto',
    },
    hero: {
      badge: '👋 Disponible para trabajar',
      titulo1: 'Hola, soy',
      subtitulo: 'Desarrollador de Software · Soporte TI · Apasionado por Linux',
      descripcion: 'Estudiante de Ingeniería en Sistemas en Piedecuesta, Colombia. Construyo herramientas reales con Linux, Java, y tecnologías web modernas. Cada día aprendo algo nuevo.',
      btnProyectos: 'Ver mis proyectos',
      btnContacto: 'Contáctame',
    },
    sobre: {
      badge: '👨‍💻 Sobre mí',
      titulo1: 'Más que código,',
      titulo2: 'soluciones reales',
      p1: 'Soy Frank David Gualdron, estudiante de Ingeniería en Sistemas con 3 años formándome en desarrollo de software y soporte técnico de hardware y software.',
      p2: 'Me apasiona Linux, la automatización y construir herramientas que resuelvan problemas reales. Actualmente aprendiendo Docker, MongoDB y Node.js.',
      p3: 'Busco oportunidades donde pueda aportar, aprender y evolucionar como desarrollador y como profesional.',
      btnProyectos: 'Ver proyectos',
      btnContacto: 'Contáctame',
      stats: [
        { numero: '3+', texto: 'Años estudiando', emoji: '📚' },
        { numero: '3', texto: 'Proyectos reales', emoji: '🚀' },
        { numero: '8+', texto: 'Tecnologías', emoji: '⚡' },
        { numero: '100%', texto: 'Ganas de aprender', emoji: '🔥' },
      ],
    },
    cta: {
      titulo: '¿Tienes un proyecto en mente?',
      descripcion: 'Estoy disponible para prácticas, trabajo remoto y colaboraciones. Hablemos.',
      btn: 'Escribirme ahora →',
    },
    proyectos: {
      badge: '🚀 Mis proyectos',
      titulo1: 'Lo que he',
      titulo2: 'construido',
      descripcion: 'Proyectos reales que demuestran mis habilidades en Linux, backend y desarrollo web.',
      habilidades: 'Mis habilidades',
      verGithub: 'Ver en GitHub →',
      nivel: 'Intermedio',
    },
    contacto: {
      badge: '📬 Contacto',
      titulo1: 'Hablemos',
      titulo2: 'juntos',
      descripcion: '¿Tienes un proyecto, una oportunidad o quieres conectar? Escríbeme, respondo rápido.',
      ubicacion: 'Piedecuesta, Colombia',
      remoto: 'Disponible para trabajo remoto',
      nombre: 'Nombre',
      email: 'Email',
      mensaje: 'Mensaje',
      placeholder: {
        nombre: 'Tu nombre',
        email: 'tu@email.com',
        mensaje: 'Cuéntame sobre tu proyecto...',
      },
      btn: 'Enviar mensaje →',
      enviando: '⏳ Enviando...',
      enviado: '¡Mensaje enviado!',
      exitoDesc: 'Te responderé lo antes posible.',
      otroMensaje: 'Enviar otro mensaje',
      error: 'Hubo un error. Intenta de nuevo.',
    },
    footer: {
      subtitulo: 'Estudiante de Ingeniería en Sistemas · Piedecuesta, Colombia',
      derechos: 'Todos los derechos reservados.',
    },
  },

  en: {
    nav: {
      inicio: 'Home',
      proyectos: 'Projects',
      contacto: 'Contact',
    },
    hero: {
      badge: '👋 Available for work',
      titulo1: "Hi, I'm",
      subtitulo: 'Software Developer · IT Support · Linux Enthusiast',
      descripcion: 'Systems Engineering student in Piedecuesta, Colombia. I build real tools with Linux, Java, and modern web technologies. Learning something new every day.',
      btnProyectos: 'View my projects',
      btnContacto: 'Contact me',
    },
    sobre: {
      badge: '👨‍💻 About me',
      titulo1: 'More than code,',
      titulo2: 'real solutions',
      p1: "I'm Frank David Gualdron, a Systems Engineering student with 3 years of experience in software development and hardware/software technical support.",
      p2: 'I love Linux, automation and building tools that solve real problems. Currently learning Docker, MongoDB and Node.js.',
      p3: 'I look for opportunities where I can contribute, learn and grow as a developer and as a professional.',
      btnProyectos: 'View projects',
      btnContacto: 'Contact me',
      stats: [
        { numero: '3+', texto: 'Years studying', emoji: '📚' },
        { numero: '3', texto: 'Real projects', emoji: '🚀' },
        { numero: '8+', texto: 'Technologies', emoji: '⚡' },
        { numero: '100%', texto: 'Will to learn', emoji: '🔥' },
      ],
    },
    cta: {
      titulo: 'Got a project in mind?',
      descripcion: "I'm available for internships, remote work and collaborations. Let's talk.",
      btn: 'Write to me →',
    },
    proyectos: {
      badge: '🚀 My projects',
      titulo1: "What I've",
      titulo2: 'built',
      descripcion: 'Real projects that demonstrate my skills in Linux, backend and web development.',
      habilidades: 'My skills',
      verGithub: 'View on GitHub →',
      nivel: 'Intermediate',
    },
    contacto: {
      badge: '📬 Contact',
      titulo1: "Let's",
      titulo2: 'talk',
      descripcion: 'Got a project, an opportunity or just want to connect? Write to me, I reply fast.',
      ubicacion: 'Piedecuesta, Colombia',
      remoto: 'Available for remote work',
      nombre: 'Name',
      email: 'Email',
      mensaje: 'Message',
      placeholder: {
        nombre: 'Your name',
        email: 'you@email.com',
        mensaje: 'Tell me about your project...',
      },
      btn: 'Send message →',
      enviando: '⏳ Sending...',
      enviado: 'Message sent!',
      exitoDesc: "I'll get back to you as soon as possible.",
      otroMensaje: 'Send another message',
      error: 'Something went wrong. Please try again.',
    },
    footer: {
      subtitulo: 'Systems Engineering Student · Piedecuesta, Colombia',
      derechos: 'All rights reserved.',
    },
  },
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState('es')
  const toggleLang = () => setLang((prev) => (prev === 'es' ? 'en' : 'es'))
  return (
    <LangContext.Provider value={{ lang, toggleLang, t: textos[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}