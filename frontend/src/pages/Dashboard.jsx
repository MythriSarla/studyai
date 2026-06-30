import Navbar from '../components/Navbar'

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Page</h1>
        <p className="text-gray-500 mt-2">This is where your study analytics will live.</p>
      </div>
    </div>
  )
}

export default Dashboard
