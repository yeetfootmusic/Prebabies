import './App.css'

function App() {
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
            <button>View Users</button>
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