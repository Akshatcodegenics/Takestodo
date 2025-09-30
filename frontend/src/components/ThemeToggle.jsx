import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="px-2 py-1 rounded border border-white/20 hover:border-white/40 hover:bg-white/10 transition"
      title={isDark ? 'Switch to light' : 'Switch to dark'}
    >
      {isDark ? (
        <SunIcon className="w-5 h-5" />
      ) : (
        <MoonIcon className="w-5 h-5" />
      )}
    </button>
  )
}
