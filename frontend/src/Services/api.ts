
import { authService } from './auth.service'

const API_URL = import.meta.env.VITE_API_URL

export async function authFetch(endpoint: string, options: RequestInit = {}) {
  const token = authService.getToken()
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })
  
  // Если токен невалидный (401) - удаляем его и перенаправляем на логин
  if (response.status === 401) {
    authService.clearToken()
    window.location.href = '/login'
  }
  
  return response
}