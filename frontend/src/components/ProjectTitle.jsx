import React from 'react'
import { motion } from 'framer-motion'
import logo from '../assets/logo.svg'
import underline from '../assets/title-underline.svg'
import tasksIllustration from '../assets/tasks-illustration.svg'

export default function ProjectTitle() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/10 backdrop-blur p-5">
      <div className="flex items-center gap-4">
        <motion.img initial={{rotate:-8, opacity:0}} animate={{rotate:0, opacity:1}} transition={{duration:0.4}} src={logo} alt="Taskstodo logo" className="w-12 h-12"/>
        <div className="relative">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-brand-400 to-emerald-400 bg-clip-text text-transparent">Taskstodo</span>
          </h1>
          <img src={underline} alt="underline" className="absolute left-0 -bottom-2 w-56 opacity-80 pointer-events-none select-none"/>
          <p className="text-sm text-white/80 mt-4">Your tasks, visualized — secure auth, protected dashboard, and real-time status insights.</p>
        </div>
        <div className="ml-auto hidden md:block">
          <motion.img initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{duration:0.5, delay:0.1}} src={tasksIllustration} alt="Tasks graphic" className="h-16 opacity-80"/>
        </div>
      </div>
    </div>
  )
}
