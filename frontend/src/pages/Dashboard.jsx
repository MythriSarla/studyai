import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import api from '../services/api'

function Dashboard() {
  const [backendStatus, setBackendStatus] = useState('Checking...')

  useEffect(() => {
    api.get('/health')
      .then((res) => {
        setBackendStatus(res.data.message)
      })
      .catch(() => {
        setBackendStatus('Could not connect to backend')
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Page</h1>
        <p className="text-gray-500 mt-2">This is where your study analytics will live.</p>

        <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200 inline-block">
          <p className="text-sm text-gray-500">Backend connection status:</p>
          <p className="font-medium text-purple-600">{backendStatus}</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
