import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [backendStatus, setBackendStatus] = useState('Checking...')

  useEffect(() => {
    api.get('/health')
      .then((res) => setBackendStatus(res.data.message))
      .catch(() => setBackendStatus('Could not connect to backend'))
  }, [])

  const stats = [
    { label: 'Files Uploaded', value: '0', icon: '📄', color: 'bg-blue-50 text-blue-600' },
    { label: 'Flashcards Created', value: '0', icon: '🃏', color: 'bg-purple-50 text-purple-600' },
    { label: 'Quizzes Taken', value: '0', icon: '📝', color: 'bg-green-50 text-green-600' },
    { label: 'Study Streak', value: '1 day', icon: '🔥', color: 'bg-orange-50 text-orange-600' },
  ]

  const quickActions = [
    { label: 'Upload Study Material', icon: '📤', desc: 'Upload PDF, DOCX or TXT', path: '/upload', color: 'bg-purple-600 hover:bg-purple-700 text-white' },
    { label: 'Take a Quiz', icon: '🎯', desc: 'Test your knowledge', path: '/upload', color: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200' },
    { label: 'Review Flashcards', icon: '🃏', desc: 'Study with flashcards', path: '/upload', color: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200' },
    { label: 'View Analytics', icon: '📊', desc: 'Track your progress', path: '/analytics', color: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto p-8">

        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name?.split(' ')[0] || 'Student'} 👋
          </h1>
          <p className="text-gray-500 mt-1">Here's your study overview for today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 ${stat.color}`}>
                {stat.icon}
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Quick Actions */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => navigate(action.path)}
                  className={`p-4 rounded-xl text-left transition-colors ${action.color}`}
                >
                  <div className="text-2xl mb-2">{action.icon}</div>
                  <p className="font-medium text-sm">{action.label}</p>
                  <p className="text-xs opacity-70 mt-0.5">{action.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* System Status + Tips */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">System Status</h2>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${backendStatus.includes('running') ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <p className="text-sm text-gray-600">{backendStatus}</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6 text-white">
              <h2 className="text-lg font-bold mb-2">💡 Study Tip</h2>
              <p className="text-sm text-purple-200 leading-relaxed">
                Upload your lecture notes or textbook chapters to get AI-generated summaries, flashcards, and quizzes instantly.
              </p>
              <button
                onClick={() => navigate('/upload')}
                className="mt-4 bg-white text-purple-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Get Started →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
