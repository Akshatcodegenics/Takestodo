import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user, setUser, accessToken } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [status, setStatus] = useState('')

  useEffect(() => { setName(user?.name || '') }, [user])

  const submit = async (e) => {
    e.preventDefault()
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({ name })
    })
    if (res.ok) {
      const data = await res.json()
      setUser(data.user)
      setStatus('Saved!')
      setTimeout(() => setStatus(''), 1500)
    }
  }

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input value={user?.email || ''} disabled className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/50" />
        </div>
        <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Save</button>
        {status && <span className="ml-2 text-sm text-green-600">{status}</span>}
      </form>
    </div>
  )
}
