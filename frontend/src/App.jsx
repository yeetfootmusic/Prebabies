import { useState } from 'react'
import './App.css'
import UserManagement from './components/UserManagement'
import BugReports from './components/BugReports'
import ResourceSearch from './components/ResourceSearch'
import AIAssistant from './components/AIAssistant'

function App() {
  const [page, setPage] = useState('dashboard')

  if (page === 'users') {
    return (
      <div className="app">
        <header>
          <h1>PreBabies</h1>
          <p>Production Readiness Dashboard</p>
        </header>

        <UserManagement
          onBack={() => setPage('dashboard')}
        />
      </div>
    )
  }

  if (page === 'search') {
    return (
      <div className="app">
        <header>
          <h1>PreBabies</h1>
          <p>Production Readiness Dashboard</p>
        </header>

        <ResourceSearch
          onBack={() => setPage('dashboard')}
        />
      </div>
    )
  }

  if (page === 'issues') {
    return (
      <div className="app">
        <header>
          <h1>PreBabies</h1>
          <p>Production Readiness Dashboard</p>
        </header>

        <BugReports
          onBack={() => setPage('dashboard')}
        />
      </div>
    )
  }

  if (page === 'assistant') {
    return (
      <div className="app">
        <header>
          <h1>PreBabies</h1>
          <p>Production Readiness Dashboard</p>
        </header>

        <AIAssistant
          onBack={() => setPage('dashboard')}
        />
      </div>
    )
  }

  return (
    <div className="app">
      <header>
        <h1>PreBabies</h1>
        <p>Production Readiness Dashboard</p>
      </header>

      <main>
        <h2>Application Overview</h2>

        <div className="dashboard">
          <div className="card">
            <h3>User Onboarding</h3>

            <p>
              Manage and review new user onboarding.
            </p>

            <button onClick={() => setPage('users')}>
              View Users
            </button>
          </div>

          <div className="card">
            <h3>Search & Usability</h3>

            <p>
              Test search and discovery experiences.
            </p>

            <button onClick={() => setPage('search')}>
              Open Search
            </button>
          </div>

          <div className="card">
            <h3>Bug Reports</h3>

            <p>
              Track issues discovered during testing.
            </p>

            <button onClick={() => setPage('issues')}>
              View Issues
            </button>
          </div>

          <div className="card">
            <h3>Ask PreBabies</h3>

            <p>
              AI-assisted resource guidance powered by Gemini.
            </p>

            <button onClick={() => setPage('assistant')}>
              Open Assistant
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App