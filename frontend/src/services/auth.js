let _accessToken = localStorage.getItem('accessToken')

export function setAccessToken(token) {
  _accessToken = token
  if (token) localStorage.setItem('accessToken', token)
  else localStorage.removeItem('accessToken')
}

export function getAccessToken() {
  return _accessToken
}

export async function login(email, password) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  })
  if (!res.ok) throw new Error('Login failed')
  return res.json()
}

export async function signup(name, email, password) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name, email, password })
  })
  if (!res.ok) throw new Error('Signup failed')
  return res.json()
}

export async function logout() {
  await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include'
  })
}

export async function getProfile(accessToken) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: 'include'
  })
  if (!res.ok) throw new Error('Failed to fetch profile')
  const data = await res.json()
  return data.user
}
