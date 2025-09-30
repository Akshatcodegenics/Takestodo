import React from 'react'
import { motion } from 'framer-motion'

const defaultImages = [
  {
    url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop',
    alt: 'Laptop and code editor - Unsplash',
    source: 'unsplash.com'
  },
  {
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop',
    alt: 'Team collaborating over code - Unsplash',
    source: 'unsplash.com'
  },
  {
    url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop',
    alt: 'Planning board with sticky notes - Unsplash',
    source: 'unsplash.com'
  },
  {
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop',
    alt: 'Teamwork discussion - Unsplash',
    source: 'unsplash.com'
  }
]

export default function RemoteGallery({ images = defaultImages }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium">From the web</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <motion.a
            key={idx}
            href={img.url}
            target="_blank"
            rel="noreferrer noopener"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            className="group relative block overflow-hidden rounded-xl border border-white/10 bg-white/10 backdrop-blur"
          >
            <img
              src={img.url}
              alt={img.alt || 'External image'}
              loading="lazy"
              className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 right-0 p-2 text-xs text-white/90 flex items-center justify-between">
              <span className="truncate">{img.alt || 'Image'}</span>
              <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10">{img.source || 'web'}</span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  )
}
