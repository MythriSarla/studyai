import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">S</span>
        </div>
        <span className="text-xl font-bold text-gray-900">StudyAI</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <a href="/dashboard" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">
          Dashboard
        </a>
        <a href="/upload" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">
          Upload
        </a>
        <a href="/quiz" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">
          Quizzes
        </a>
        <a href="/analytics" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">
          Analytics
        </a>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-semibold">
          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </button>
        <button
          onClick={handleLogout}
          className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar
