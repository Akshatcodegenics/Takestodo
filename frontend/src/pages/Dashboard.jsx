import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import TaskStats from '../components/TaskStats'
import BottomBar from '../components/BottomBar'
import { motion } from 'framer-motion'
import tasksIllustration from '../assets/tasks-illustration.svg'
import ProjectTitle from '../components/ProjectTitle'

export default function Dashboard() {
  const [filters, setFilters] = useState({})
  const [latestTask, setLatestTask] = useState(null)

  useEffect(() => {
    if (latestTask) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }
  }, [latestTask])

  return (
    <div className="space-y-6 pb-24">
      <ProjectTitle />
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <motion.img initial={{opacity:0, y:-8}} animate={{opacity:1, y:0}} transition={{duration:0.4}} src={tasksIllustration} alt="Tasks illustration" className="hidden md:block h-20 opacity-80"/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Create Task</h2>
          <TaskForm onCreated={(task) => setLatestTask(task)} />
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Search & Filter</h2>
          <SearchBar onSearch={setFilters} />
          <TaskStats />
        </div>
      </div>
      <div>
        <h2 className="text-xl font-medium mb-2">Your Tasks</h2>
        <TaskList key={JSON.stringify(filters)} lastCreatedTask={latestTask} />
      </div>

      <BottomBar task={latestTask} />
    </div>
  )
}
