import React, { createContext, useContext, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const show = (message, type = 'success', duration = 3000) => {
    const id = Math.random().toString(36).slice(2)
    const toast = { id, message, type }
    setToasts((prev) => [...prev, toast])
    setTimeout(() => dismiss(id), duration)
  }
  const dismiss = (id) => setToasts((prev) => prev.filter((t) => t.id !== id))

  const value = useMemo(() => ({ show }), [])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={
                'min-w-[220px] rounded border px-4 py-2 shadow-lg backdrop-blur ' +
                (t.type === 'success'
                  ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-100'
                  : t.type === 'error'
                  ? 'bg-rose-500/20 border-rose-400/40 text-rose-100'
                  : 'bg-white/20 border-white/30 text-white')
              }
            >
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
