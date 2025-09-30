import api from './api'

export async function getTasks({ q, status, completed, page = 1, limit = 10 } = {}) {
  const params = new URLSearchParams()
  if (q) params.append('q', q)
  if (status) params.append('status', status)
  if (typeof completed !== 'undefined') params.append('completed', completed.toString())
  params.append('page', page.toString())
  params.append('limit', limit.toString())
  
  const { data } = await api.get(`/tasks?${params}`)
  return data
}

export async function createTask(task) {
  const { data } = await api.post('/tasks', task)
  return data
}

export async function updateTask(id, task) {
  const { data } = await api.put(`/tasks/${id}`, task)
  return data
}

export async function deleteTask(id) {
  const { data } = await api.delete(`/tasks/${id}`)
  return data
}

export async function getTask(id) {
  const { data } = await api.get(`/tasks/${id}`)
  return data
}

export async function getTaskStats() {
  const { data } = await api.get('/tasks/stats')
  return data
}
