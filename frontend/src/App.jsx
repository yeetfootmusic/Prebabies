import { useState } from 'react'
import './App.css'
import UserManagement from './components/UserManagement'

function App() {
  const [page, setPage] = useState('dashboard')

  if (page === 'users') {
    return (
      <div className="app">
        <header>
          <h1>PreBabies</h1>
          <p>Production Readiness Dashboard</p>
        </header>

        <UserManagement onBack={() => setPage('dashboard')} />
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
            <p>Manage and review new user onboarding.</p>
            <button onClick={() => setPage('users')}>
              View Users
            </button>
          </div>

          <div className="card">
            <h3>Search & Usability</h3>
            <p>Test search and discovery experiences.</p>
            <button>Open Search</button>
          </div>

          <div className="card">
            <h3>Bug Reports</h3>
            <p>Track issues discovered during testing.</p>
            <button>View Issues</button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App