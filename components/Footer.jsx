export default function Footer() {
  const anio = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Logo */}
        <div className="text-center md:text-left">
          <p className="text-white font-bold text-lg">
            Frank<span className="text-purple-500">.</span>dev
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Estudiante de Ingeniería en Sistemas · Piedecuesta, Colombia
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-6">
          <a
            href="https://github.com/D0nFrancisco"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
          >
            GitHub
          </a>
          <a
            href="https://www.instagram.com/frank17_g/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
          >
            Instagram
          </a>
          <a
            href="mailto:fdavid1704@gmail.com"
            className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
          >
            Email
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-600 text-sm">
          © {anio} Frank Gualdron. Todos los derechos reservados.
        </p>

      </div>
    </footer>
  )
}