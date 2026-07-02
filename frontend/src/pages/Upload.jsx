import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import api from '../services/api'

function Upload() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [activeTab, setActiveTab] = useState('summary')
  const [flippedCards, setFlippedCards] = useState({})
  const navigate = useNavigate()

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setError('')
    if (rejectedFiles.length > 0) {
      setError('Only PDF, DOCX, and TXT files are allowed (max 16MB)')
      return
    }
    setFile(acceptedFiles[0])
    setResult(null)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxSize: 16 * 1024 * 1024,
    multiple: false
  })

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    setError('')

    const token = localStorage.getItem('studyai_token')
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      })
      setResult(res.data)
      setActiveTab('summary')
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const toggleFlip = (id) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Upload Study Material</h1>
          <p className="text-gray-500 mt-1">Upload a PDF, DOCX, or TXT file and let AI do the rest.</p>
        </div>

        {!result && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
              }`}
            >
              <input {...getInputProps()} />
              <div className="text-5xl mb-4">📄</div>
              {isDragActive ? (
                <p className="text-purple-600 font-medium text-lg">Drop your file here...</p>
              ) : (
                <>
                  <p className="text-gray-700 font-medium text-lg mb-1">
                    Drag & drop your file here
                  </p>
                  <p className="text-gray-400 text-sm mb-4">or click to browse</p>
                  <p className="text-gray-400 text-xs">Supports PDF, DOCX, TXT • Max 16MB</p>
                </>
              )}
            </div>

            {file && (
              <div className="mt-6 p-4 bg-purple-50 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {file.name.endsWith('.pdf') ? '📕' : file.name.endsWith('.docx') ? '📘' : '📝'}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="text-gray-400 hover:text-red-500 transition-colors text-xl"
                >
                  ✕
                </button>
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                {error}
              </div>
            )}

            {file && !loading && (
              <button
                onClick={handleUpload}
                className="mt-6 w-full bg-purple-600 text-white font-medium py-3 rounded-xl hover:bg-purple-700 transition-colors"
              >
                ✨ Generate AI Study Materials
              </button>
            )}

            {loading && (
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-3 bg-purple-50 px-6 py-4 rounded-xl">
                  <div className="w-6 h-6 border-3 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  <div>
                    <p className="font-medium text-purple-700">AI is analyzing your material...</p>
                    <p className="text-sm text-purple-500">Generating summary, flashcards & quiz (10-20 seconds)</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {result && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">✅ {result.filename}</h2>
                <p className="text-sm text-gray-500 mt-1">AI study materials generated successfully</p>
              </div>
              <button
                onClick={() => { setResult(null); setFile(null) }}
                className="text-sm text-purple-600 hover:underline font-medium"
              >
                Upload another
              </button>
            </div>

            <div className="flex border-b border-gray-200">
              {['summary', 'flashcards', 'quiz'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? 'border-b-2 border-purple-600 text-purple-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'summary' ? '📋 Summary' : tab === 'flashcards' ? '🃏 Flashcards' : '📝 Quiz'}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'summary' && (
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed text-sm">
                    {result.summary}
                  </pre>
                </div>
              )}

              {activeTab === 'flashcards' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.flashcards.map((card) => (
                    <div
                      key={card.id}
                      onClick={() => toggleFlip(card.id)}
                      className="cursor-pointer h-40 relative"
                      style={{ perspective: '1000px' }}
                    >
                      <div
                        className="w-full h-full transition-transform duration-500 relative"
                        style={{
                          transformStyle: 'preserve-3d',
                          transform: flippedCards[card.id] ? 'rotateY(180deg)' : 'rotateY(0deg)'
                        }}
                      >
                        <div
                          className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 flex flex-col justify-between"
                          style={{ backfaceVisibility: 'hidden' }}
                        >
                          <span className="text-xs text-purple-400 font-medium">QUESTION • Card {card.id}</span>
                          <p className="text-gray-800 font-medium text-center">{card.front}</p>
                          <span className="text-xs text-purple-400 text-center">Click to reveal answer</span>
                        </div>
                        <div
                          className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4 flex flex-col justify-between"
                          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                        >
                          <span className="text-xs text-green-400 font-medium">ANSWER • Card {card.id}</span>
                          <p className="text-gray-800 text-center text-sm">{card.back}</p>
                          <span className="text-xs text-green-400 text-center">Click to flip back</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'quiz' && (
                <div className="space-y-6">
                  <h3 className="font-bold text-gray-900 text-lg">Multiple Choice Questions</h3>
                  {result.quiz.mcq.map((q) => (
                    <div key={q.id} className="bg-gray-50 rounded-xl p-5">
                      <p className="font-medium text-gray-900 mb-3">{q.id}. {q.question}</p>
                      <div className="space-y-2">
                        {q.options.map((opt, i) => (
                          <div
                            key={i}
                            className={`p-3 rounded-lg text-sm ${
                              opt === q.correct_answer
                                ? 'bg-green-100 border border-green-300 text-green-800'
                                : 'bg-white border border-gray-200 text-gray-700'
                            }`}
                          >
                            {opt} {opt === q.correct_answer && '✓'}
                          </div>
                        ))}
                      </div>
                      <p className="mt-3 text-xs text-gray-500 italic">{q.explanation}</p>
                    </div>
                  ))}

                  <h3 className="font-bold text-gray-900 text-lg mt-8">True / False</h3>
                  {result.quiz.true_false.map((q) => (
                    <div key={q.id} className="bg-gray-50 rounded-xl p-5">
                      <p className="font-medium text-gray-900 mb-2">{q.question}</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        q.correct_answer ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {q.correct_answer ? 'True' : 'False'}
                      </span>
                      <p className="mt-2 text-xs text-gray-500 italic">{q.explanation}</p>
                    </div>
                  ))}

                  <h3 className="font-bold text-gray-900 text-lg mt-8">Short Answer</h3>
                  {result.quiz.short_answer.map((q) => (
                    <div key={q.id} className="bg-gray-50 rounded-xl p-5">
                      <p className="font-medium text-gray-900 mb-2">{q.question}</p>
                      <p className="text-sm text-gray-600"><span className="font-medium">Sample answer:</span> {q.sample_answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Upload
