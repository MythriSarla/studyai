import { useState } from 'react'
import Navbar from '../components/Navbar'
import { Bar, Line, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale, LinearScale, BarElement,
  LineElement, PointElement, ArcElement,
  Title, Tooltip, Legend
)

function Analytics() {
  const quizScores = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [{
      label: 'Quiz Score (%)',
      data: [65, 72, 68, 80, 85, 92],
      backgroundColor: 'rgba(147, 51, 234, 0.2)',
      borderColor: 'rgba(147, 51, 234, 1)',
      borderWidth: 2,
      tension: 0.4,
      fill: true,
    }]
  }

  const topicPerformance = {
    labels: ['Photosynthesis', 'Cell Biology', 'Genetics', 'Evolution', 'Ecology'],
    datasets: [{
      label: 'Score (%)',
      data: [85, 72, 90, 65, 78],
      backgroundColor: [
        'rgba(147, 51, 234, 0.8)',
        'rgba(99, 102, 241, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(249, 115, 22, 0.8)',
        'rgba(59, 130, 246, 0.8)',
      ],
      borderRadius: 8,
    }]
  }

  const studyHours = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      data: [2, 3, 1.5, 4, 2.5, 5, 1],
      backgroundColor: [
        'rgba(147, 51, 234, 0.8)',
        'rgba(99, 102, 241, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(249, 115, 22, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(20, 184, 166, 0.8)',
      ],
    }]
  }

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: 'bottom' } },
    scales: { y: { beginAtZero: true } }
  }

  const stats = [
    { label: 'Average Score', value: '77%', change: '+12%', up: true },
    { label: 'Total Study Hours', value: '19h', change: '+3h', up: true },
    { label: 'Quizzes Completed', value: '6', change: '+2', up: true },
    { label: 'Files Processed', value: '4', change: '+1', up: true },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Learning Analytics</h1>
          <p className="text-gray-500 mt-1">Track your study performance and progress over time.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className={`text-sm mt-1 font-medium ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} this week
              </p>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quiz Score Trend</h2>
            <Line data={quizScores} options={chartOptions} />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Topic Performance</h2>
            <Bar data={topicPerformance} options={chartOptions} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Study Hours This Week</h2>
            <Pie data={studyHours} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Weak Topics to Improve</h2>
            <div className="space-y-3">
              {[
                { topic: 'Evolution', score: 65, color: 'bg-red-500' },
                { topic: 'Cell Biology', score: 72, color: 'bg-orange-500' },
                { topic: 'Ecology', score: 78, color: 'bg-yellow-500' },
                { topic: 'Photosynthesis', score: 85, color: 'bg-green-500' },
                { topic: 'Genetics', score: 90, color: 'bg-purple-500' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{item.topic}</span>
                    <span className="text-gray-500">{item.score}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
