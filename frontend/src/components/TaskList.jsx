import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createTask, deleteTask, getTasks, updateTask } from '../services/tasks'

export default function TaskList({ lastCreatedTask = null }) {
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({})
  const [loading, setLoading] = useState(false)

  const fetchData = async (opts = {}) => {
    setLoading(true)
    try {
      const { items, total, page } = await getTasks({ page, ...filters, ...opts })
      setItems(items)
      setTotal(total)
      setPage(page)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [page, filters])

  // Append the newly created task to the bottom when provided
  useEffect(() => {
    if (lastCreatedTask && !items.find(i => i._id === lastCreatedTask._id)) {
      setItems(prev => [...prev, lastCreatedTask])
      setTotal(prev => prev + 1)
    }
  }, [lastCreatedTask])

  const toggleCompleted = async (task) => {
    const updated = await updateTask(task._id, { completed: !task.completed })
    setItems(items.map(i => i._id === task._id ? updated.task : i))
  }

  const remove = async (task) => {
    await deleteTask(task._id)
    setItems(items.filter(i => i._id !== task._id))
  }

  return (
    <div className="space-y-4">
      {loading && <div className="text-sm text-gray-300">Loading...</div>}
      <ul className="divide-y divide-white/10 rounded border border-white/10 bg-white/10 backdrop-blur">
        <AnimatePresence initial={false}>
        {items.map(t => (
          <motion.li layout initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} transition={{duration:0.2}} key={t._id} className="p-3 flex items-center justify-between">
            <div>
              <div className="font-medium flex items-center gap-2">
                <input type="checkbox" checked={t.completed} onChange={() => toggleCompleted(t)} />
                <span className={t.completed ? 'line-through' : ''}>{t.title}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700">{t.status}</span>
              </div>
              {t.description && <div className="text-sm text-gray-600 dark:text-gray-400">{t.description}</div>}
            </div>
            <div className="flex gap-2">
              {/* Simple inline edit: cycle status */}
              <button onClick={async () => { const next = t.status === 'todo' ? 'in-progress' : (t.status === 'in-progress' ? 'done' : 'todo'); const u = await updateTask(t._id, { status: next }); setItems(items.map(i => i._id === t._id ? u.task : i)) }} className="px-2 py-1 text-sm rounded bg-amber-500 text-white">Next Status</button>
              <button onClick={() => remove(t)} className="px-2 py-1 text-sm rounded bg-red-600 text-white">Delete</button>
            </div>
          </motion.li>
        ))}
        </AnimatePresence>
        {items.length === 0 && !loading && <li className="p-3 text-sm text-gray-500">No tasks found.</li>}
      </ul>
      <div className="flex items-center justify-between">
        <div className="text-sm">Total: {total}</div>
        <div className="flex gap-2">
          <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 rounded border">Prev</button>
          <button onClick={() => setPage(p => p + 1)} className="px-3 py-1 rounded border">Next</button>
        </div>
      </div>
    </div>
  )
}
