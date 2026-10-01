import { useState } from 'react'
import './App.css'
import UserManagement from './components/UserManagement'
import BugReports from './components/BugReports'
import ResourceSearch from './components/ResourceSearch'
import AIAssistant from './components/AIAssistant'

function App() {
  const [page, setPage] = useState('dashboard')

  const goHome = () => setPage('dashboard')

  const renderHeader = () => (
    <header className="site-header">
      <button
        className="brand"
        onClick={goHome}
        aria-label="Go to PreBabies home"
      >
        <span className="brand-mark">P</span>

        <span className="brand-text">
          <strong>PreBabies</strong>
          <small>Pregnancy & parenting resources</small>
        </span>
      </button>

      <nav className="main-nav">
        <button onClick={() => setPage('search')}>
          Resources
        </button>

        <button onClick={() => setPage('assistant')}>
          Ask PreBabies
        </button>

        <button
          className="admin-link"
          onClick={() => setPage('users')}
        >
          Admin
        </button>
      </nav>
    </header>
  )

  if (page === 'users') {
    return (
      <div className="app">
        {renderHeader()}

        <div className="page-container">
          <UserManagement onBack={goHome} />
        </div>
      </div>
    )
  }

  if (page === 'search') {
    return (
      <div className="app">
        {renderHeader()}

        <div className="page-container">
          <ResourceSearch onBack={goHome} />
        </div>
      </div>
    )
  }

  if (page === 'issues') {
    return (
      <div className="app">
        {renderHeader()}

        <div className="page-container">
          <BugReports onBack={goHome} />
        </div>
      </div>
    )
  }

  if (page === 'assistant') {
    return (
      <div className="app">
        {renderHeader()}

        <div className="page-container">
          <AIAssistant onBack={goHome} />
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      {renderHeader()}

      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">
              YOUR JOURNEY, SUPPORTED
            </span>

            <h1>
              Guidance for every
              <span> step of the way.</span>
            </h1>

            <p>
              Explore helpful resources for pregnancy,
              birth, recovery, and the moments in between.
            </p>

            <div className="hero-actions">
              <button
                className="primary-button"
                onClick={() => setPage('search')}
              >
                Explore resources
                <span>→</span>
              </button>

              <button
                className="secondary-button"
                onClick={() => setPage('assistant')}
              >
                ✦ Ask PreBabies
              </button>
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-card-icon">♡</div>

            <span>Featured resource</span>

            <h3>Preparing for Your First Trimester</h3>

            <p>
              Helpful considerations for the beginning
              of your pregnancy journey.
            </p>

            <button onClick={() => setPage('search')}>
              View resource →
            </button>
          </div>
        </section>

        <section className="content-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                EXPLORE
              </span>

              <h2>Resources for where you are</h2>
            </div>

            <button
              className="text-button"
              onClick={() => setPage('search')}
            >
              View all resources →
            </button>
          </div>

          <div className="journey-grid">
            <button
              className="journey-card"
              onClick={() => setPage('search')}
            >
              <span className="journey-icon">01</span>

              <div>
                <span className="card-label">
                  PREGNANCY
                </span>

                <h3>Pregnancy</h3>

                <p>
                  Resources for nutrition, wellness,
                  and every trimester.
                </p>
              </div>

              <span className="card-arrow">→</span>
            </button>

            <button
              className="journey-card"
              onClick={() => setPage('search')}
            >
              <span className="journey-icon">02</span>

              <div>
                <span className="card-label">
                  PREPARATION
                </span>

                <h3>Birth</h3>

                <p>
                  Checklists and resources to help
                  prepare for delivery.
                </p>
              </div>

              <span className="card-arrow">→</span>
            </button>

            <button
              className="journey-card"
              onClick={() => setPage('search')}
            >
              <span className="journey-icon">03</span>

              <div>
                <span className="card-label">
                  RECOVERY
                </span>

                <h3>Postpartum</h3>

                <p>
                  Recovery and wellness resources
                  for life after birth.
                </p>
              </div>

              <span className="card-arrow">→</span>
            </button>
          </div>
        </section>

        <section className="tools-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                PREBABIES TOOLS
              </span>

              <h2>A little extra support</h2>
            </div>
          </div>

          <div className="tools-grid">
            <div className="tool-card assistant-tool">
              <div className="tool-icon">✦</div>

              <div>
                <span className="card-label">
                  AI ASSISTANT
                </span>

                <h3>Ask PreBabies</h3>

                <p>
                  Ask questions and quickly discover
                  relevant pregnancy, birth, and
                  postpartum information.
                </p>

                <button
                  onClick={() => setPage('assistant')}
                >
                  Ask a question →
                </button>
              </div>
            </div>

            <div className="tool-card">
              <div className="tool-icon">⌕</div>

              <div>
                <span className="card-label">
                  RESOURCE LIBRARY
                </span>

                <h3>Find what you need</h3>

                <p>
                  Search resources by topic and find
                  information relevant to your journey.
                </p>

                <button
                  onClick={() => setPage('search')}
                >
                  Search resources →
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="admin-section">
          <div>
            <span className="admin-label">
              INTERNAL TOOLS
            </span>

            <h3>PreBabies Administration</h3>

            <p>
              Manage onboarding and track application
              issues.
            </p>
          </div>

          <div className="admin-actions">
            <button onClick={() => setPage('users')}>
              User Onboarding
            </button>

            <button onClick={() => setPage('issues')}>
              Bug Reports
            </button>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <span className="brand-mark">P</span>
          <strong>PreBabies</strong>
        </div>

        <p>
          Resources to support pregnancy, birth,
          and postpartum journeys.
        </p>
      </footer>
    </div>
  )
}

export default App