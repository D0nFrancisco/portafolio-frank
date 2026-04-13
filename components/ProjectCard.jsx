import Link from 'next/link'

export default function ProjectCard({ proyecto }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 hover:bg-white/8 transition-all hover:-translate-y-1 group">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <span className="text-3xl">{proyecto.emoji}</span>
        <span className={`text-xs font-medium px-3 py-1 rounded-full border ${proyecto.nivelColor}`}>
          {proyecto.nivel}
        </span>
      </div>

      {/* Título */}
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
        {proyecto.nombre}
      </h3>

      {/* Descripción */}
      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        {proyecto.descripcion}
      </p>

      {/* Tags de tecnologías */}
      <div className="flex flex-wrap gap-2 mb-6">
        {proyecto.tecnologias.map((tech) => (
          <span
            key={tech}
            className="bg-purple-500/10 text-purple-300 text-xs px-3 py-1 rounded-full border border-purple-500/20"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Botón GitHub */}
      
        {/* Botón GitHub */}
<a
  href={proyecto.github}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition-colors font-medium"
>
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
  Ver en GitHub {"→"}
</a>
    </div>
  )
}