import React, { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')
  const [completed, setCompleted] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onSearch({ q, status: status || undefined, completed: completed === '' ? undefined : completed === 'true' })
  }

  const clear = () => {
    setQ(''); setStatus(''); setCompleted(''); onSearch({})
  }

  return (
    <form onSubmit={submit} className="flex flex-wrap items-end gap-3">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium">Search</label>
        <input value={q} onChange={(e) => setQ(e.target.value)} className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" placeholder="Title or description"/>
      </div>
      <div>
        <label className="block text-sm font-medium">Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
          <option value="">Any</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Completed</label>
        <select value={completed} onChange={(e) => setCompleted(e.target.value)} className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
          <option value="">Any</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Apply</button>
        <button type="button" onClick={clear} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700">Clear</button>
      </div>
    </form>
  )
}
