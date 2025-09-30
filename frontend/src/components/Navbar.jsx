import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import logo from '../assets/logo.svg'

export default function Navbar() {
  const { user, logout, accessToken } = useAuth()
  return (
    <motion.header initial={{opacity:0, y:-8}} animate={{opacity:1, y:0}} transition={{duration:0.3}} className="bg-white/60 dark:bg-gray-800/40 border-b border-white/20 dark:border-white/10 backdrop-blur sticky top-0 z-10">
      <nav className="container mx-auto max-w-5xl p-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-7 h-7"/>
          <span className="text-base font-semibold bg-gradient-to-r from-brand-400 to-emerald-400 bg-clip-text text-transparent tracking-wide">Taskstodo</span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {accessToken ? (
            <>
              <Link to="/dashboard" className="px-3 py-1 rounded hover:bg-white/30 dark:hover:bg-white/10">Dashboard</Link>
              <Link to="/profile" className="px-3 py-1 rounded hover:bg-white/30 dark:hover:bg-white/10">Profile</Link>
              <button onClick={logout} className="px-3 py-1 rounded bg-gradient-to-r from-rose-500 to-red-600 text-white hover:opacity-90">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 rounded hover:bg-white/30 dark:hover:bg-white/10">Login</Link>
              <Link to="/signup" className="px-3 py-1 rounded bg-gradient-to-r from-brand-500 to-emerald-500 text-white hover:opacity-90">Signup</Link>
            </>
          )}
        </div>
      </nav>
    </motion.header>
  )
}
