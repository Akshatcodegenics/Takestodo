import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BottomBar({ task }) {
  return (
    <AnimatePresence>
      {task && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 20 }}
          className="fixed bottom-3 left-0 right-0 z-40"
        >
          <div className="mx-auto max-w-5xl px-4">
            <div className="rounded-lg border border-white/15 bg-white/15 backdrop-blur px-4 py-3 shadow-lg">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm text-white/90 truncate">
                    New task added: <span className="font-medium">{task.title}</span>
                  </div>
                  {task.description && (
                    <div className="text-xs text-white/70 truncate">{task.description}</div>
                  )}
                </div>
                <span className="text-xs px-2 py-1 rounded bg-emerald-500/30 text-emerald-50 border border-emerald-300/30">
                  {task.status || 'todo'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
