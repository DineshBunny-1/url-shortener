import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Admin() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [links, setLinks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  // Load login state on mount
  useEffect(() => {
    const storedCreds = sessionStorage.getItem('adminCredentials')
    if (storedCreds) {
      setLoggedIn(true)
      fetchLinks(storedCreds)
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (!username || !password) {
      setLoginError('Please enter both username and password.')
      return
    }
    const credentials = btoa(`${username}:${password}`)
    sessionStorage.setItem('adminCredentials', credentials)
    fetchLinks(credentials)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('adminCredentials')
    setLinks([])
    setLoggedIn(false)
    setUsername('')
    setPassword('')
    setLoginError('')
  }

  const fetchLinks = async (credentials) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/urls`, {
        headers: {
          'Authorization': `Basic ${credentials}`
        }
      })

      if (res.status === 401) {
        sessionStorage.removeItem('adminCredentials')
        setLoggedIn(false)
        setLoginError('Authentication failed. Invalid credentials.')
        return
      }

      if (!res.ok) throw new Error('Failed to fetch data from the server.')

      const data = await res.json()
      setLinks(data)
      setLoggedIn(true)
      setLoginError('')
    } catch (err) {
      setLoginError(err.message)
      sessionStorage.removeItem('adminCredentials')
      setLoggedIn(false)
    }
  }

  const handleRefresh = () => {
    const creds = sessionStorage.getItem('adminCredentials')
    if (creds) fetchLinks(creds)
  }

  const filteredLinks = links.filter(link =>
    link.original_url.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.short_code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-gradient-to-br from-[#0A1F44] to-[#3B82F6] text-white min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Header */}
      <header className="glass-panel fixed top-0 left-0 right-0 z-10 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wider text-white">URL Shortener - Admin Panel</h1>
          <div className="flex items-center gap-6">
            {!loggedIn && <Link to="/" className="text-[#D1D5DB] hover:text-white transition duration-300">Back</Link>}
            {loggedIn && (
              <>
                <Link to="/" className="text-[#D1D5DB] hover:text-white transition duration-300">Home</Link>
                <button onClick={handleLogout} className="text-[#D1D5DB] hover:text-white transition duration-300">Logout</button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="main-container w-full max-w-6xl text-center flex-grow flex flex-col justify-center">
        {!loggedIn ? (
          <div className="w-full max-w-md mx-auto">
            <div className="glass-panel p-8 rounded-2xl shadow-2xl">
              <h2 className="text-3xl font-bold mb-6">Admin Access</h2>
              <form onSubmit={handleLogin}>
                <div className="input-floating bg-[#0A1F44] rounded-full shadow-2xl border border-cyan-500/30 mb-4">
                  <input
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-transparent text-white placeholder-gray-500 py-4 px-6 rounded-full focus:outline-none"
                  />
                </div>
                <div className="input-floating bg-[#0A1F44] rounded-full shadow-2xl border border-cyan-500/30 mb-6">
                  <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent text-white placeholder-gray-500 py-4 px-6 rounded-full focus:outline-none"
                  />
                </div>
                <button type="submit" className="btn-3d w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-full shadow-lg border-t-2 border-blue-400 border-l-2 border-blue-400">
                  Authenticate
                </button>
                {loginError && <p className="text-red-400 mt-4">{loginError}</p>}
              </form>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bold">Link Analytics Dashboard</h2>
              <button onClick={handleRefresh} className="bg-violet-600 hover:bg-violet-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 flex items-center gap-2">
                Refresh
              </button>
            </div>

            <div className="input-floating bg-[#0A1F44] rounded-full shadow-2xl border border-cyan-500/30 mb-8 max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search by Original or Short URL..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-white placeholder-gray-500 py-4 px-6 rounded-full focus:outline-none"
              />
            </div>

            <div className="glass-panel p-4 rounded-2xl shadow-2xl overflow-x-auto">
              <table className="table-glass w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4 text-cyan-400">Original URL</th>
                    <th className="text-left py-3 px-4 text-cyan-400">Short URL</th>
                    <th className="text-center py-3 px-4 text-cyan-400">Visits</th>
                    <th className="text-left py-3 px-4 text-cyan-400">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLinks.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center text-gray-400 py-8">No links have been shortened yet.</td>
                    </tr>
                  ) : (
                    filteredLinks.map((link, i) => (
                      <tr key={i} className="transition-all hover:bg-violet-600/20 hover:scale-[1.02]">
                        <td className="truncate max-w-md px-4" title={link.original_url}>{link.original_url}</td>
                        <td className="px-4">
                          <a href={`${API_BASE_URL}/${link.short_code}`} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                            {`${API_BASE_URL}/${link.short_code}`}
                          </a>
                        </td>
                        <td className="text-center font-bold text-lg px-4">{link.visit_count}</td>
                        <td className="px-4">{new Date(link.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
