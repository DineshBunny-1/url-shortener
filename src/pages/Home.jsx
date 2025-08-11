import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const API_BASE_URL = 'http://localhost:5000'
  const [originalUrl, setOriginalUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!originalUrl) {
      alert('Please enter a URL.')
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ original_url: originalUrl })
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error || 'Something went wrong')

      setShortUrl(data.short_url)
      setError('')
      setShowResult(true)
    } catch (err) {
      setError(err.message)
      setShortUrl('')
      setShowResult(true)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-gradient-to-br from-[#0A1F44] to-[#3B82F6] text-white min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Header */}
      <header className="glass-panel fixed top-0 left-0 right-0 z-10 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wider text-white">URL Shortener</h1>
          <Link to="/admin" className="text-[#D1D5DB] hover:text-white transition duration-300">Admin</Link>
        </div>
      </header>

      {/* Main */}
      <div className="main-container w-full max-w-2xl text-center flex-grow flex flex-col justify-center">
        <div id="intro-text" className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">Simplify Your Links</h2>
          <p className="text-lg text-[#D1D5DB]">Create short, memorable links in seconds.</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full input-floating bg-[#0A1F44] rounded-full shadow-2xl border border-cyan-500/30">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 icon-3d">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <input
                type="url"
                placeholder="Paste your long URL here..."
                required
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="w-full bg-transparent text-white placeholder-gray-500 py-4 pl-14 pr-6 rounded-full focus:outline-none"
              />
            </div>

            <button type="submit" className="btn-shorten w-full sm:w-auto shrink-0 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-full shadow-lg border-t-2 border-blue-400 border-l-2 border-blue-400">
              Shorten URL
            </button>
          </div>
        </form>

        {showResult && (
          <div id="result-card" className={`result-card mt-10 w-full max-w-xl mx-auto p-6 rounded-2xl shadow-2xl glass-panel ${showResult ? 'show' : ''}`}>
            <p className={`mb-2 ${error ? 'text-red-400' : 'text-gray-300'}`}>
              {error ? `Error: ${error}` : 'Your shortened link:'}
            </p>
            {!error && (
              <div className="flex items-center justify-between bg-gray-900/50 p-3 rounded-lg">
                <a href={originalUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-300 text-lg font-semibold truncate">{shortUrl}</a>
                <button onClick={handleCopy} className={`text-white font-semibold py-2 px-4 rounded-lg transition duration-300 flex items-center gap-2 ${copied ? 'bg-green-500' : 'bg-violet-600 hover:bg-violet-500'}`}>
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="glass-panel fixed bottom-0 left-0 right-0 z-10 p-2 shadow-lg">
        <div className="container mx-auto text-center text-sm text-[#D1D5DB]">
          <p>&copy; 2025 3D URL Shortener. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
