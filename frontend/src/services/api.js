import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
})

// Automatically attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('studyai_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 errors globally - redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('studyai_token')
      localStorage.removeItem('studyai_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
