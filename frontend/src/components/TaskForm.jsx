import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { createTask } from '../services/tasks'
import { useToast } from '../context/ToastContext'

export default function TaskForm({ onCreated }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { show } = useToast()

  const submit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    setSubmitting(true)
    try {
      const { task } = await createTask({ title, description })
      onCreated?.(task)
      setTitle(''); setDescription('')
      show('Task created successfully!', 'success')
    } catch (e) {
      show('Failed to create task', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" placeholder="Task title"/>
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" rows={3} placeholder="Task description"/>
      </div>
      <motion.button whileTap={{ scale: 0.97 }} disabled={submitting} type="submit" className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-60">
        {submitting ? 'Adding...' : 'Add Task'}
      </motion.button>
    </form>
  )
}
