import axios from 'axios'
import { getAccessToken, setAccessToken } from './auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // allow cookies for refresh token
})

api.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let isRefreshing = false
let pendingRequests = []

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      if (!isRefreshing) {
        isRefreshing = true
        try {
          const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {}, { withCredentials: true })
          setAccessToken(data.accessToken)
          pendingRequests.forEach((cb) => cb(data.accessToken))
          pendingRequests = []
          return api(original)
        } catch (e) {
          pendingRequests = []
          throw e
        } finally {
          isRefreshing = false
        }
      }
      return new Promise((resolve, reject) => {
        pendingRequests.push((token) => {
          original.headers.Authorization = `Bearer ${token}`
          resolve(api(original))
        })
      })
    }
    return Promise.reject(error)
  }
)

export default api
