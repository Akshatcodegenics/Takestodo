import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as authApi from '../services/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('accessToken'))
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken && !user) {
      authApi.getProfile(accessToken).then((u) => setUser(u)).catch(() => {})
    }
  }, [])

  useEffect(() => {
    if (accessToken) localStorage.setItem('accessToken', accessToken)
    else localStorage.removeItem('accessToken')
  }, [accessToken])

  const login = async (email, password) => {
    setLoading(true)
    try {
      const { user, accessToken } = await authApi.login(email, password)
      setUser(user)
      setAccessToken(accessToken)
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const signup = async (name, email, password) => {
    setLoading(true)
    try {
      const { user, accessToken } = await authApi.signup(name, email, password)
      setUser(user)
      setAccessToken(accessToken)
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    await authApi.logout()
    setUser(null)
    setAccessToken(null)
    navigate('/login')
  }

  const value = useMemo(() => ({ user, setUser, accessToken, setAccessToken, login, signup, logout, loading }), [user, accessToken, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
