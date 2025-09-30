import React from 'react'
import watermark from '../assets/watermark.svg'
import tasksIllustration from '../assets/tasks-illustration.svg'

export default function BackgroundDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base subtle watermark pattern */}
      <img src={watermark} alt="watermark" className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-overlay" />

      {/* Task-related illustration watermarks */}
      <img
        src={tasksIllustration}
        alt="tasks watermark"
        className="absolute -right-20 -top-10 w-[40rem] rotate-6 opacity-[0.07] select-none"
      />
      <img
        src={tasksIllustration}
        alt="tasks watermark"
        className="absolute -left-24 bottom-0 w-[36rem] -rotate-6 opacity-[0.06] select-none"
      />

      {/* Animated gradient orbs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-brand-500/40 decor-orb animate-float"></div>
      <div className="absolute top-1/2 -right-20 w-80 h-80 rounded-full bg-emerald-400/30 decor-orb animate-pulseSlow"></div>
      <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-fuchsia-400/20 decor-orb animate-float"></div>
    </div>
  )
}
