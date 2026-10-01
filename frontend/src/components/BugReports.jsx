import { useState } from 'react'

const initialIssues = [
  {
    id: 1,
    title: 'Search returns duplicate results',
    priority: 'High',
    status: 'Open',
  },
  {
    id: 2,
    title: 'Mobile layout overflow',
    priority: 'Medium',
    status: 'Open',
  },
  {
    id: 3,
    title: 'Email validation unclear',
    priority: 'Low',
    status: 'Resolved',
  },
]

function BugReports({ onBack }) {
  const [issues, setIssues] = useState(initialIssues)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [statusFilter, setStatusFilter] = useState('All')

  const addIssue = (event) => {
    event.preventDefault()

    if (!title.trim()) {
      return
    }

    const newIssue = {
      id: Date.now(),
      title: title.trim(),
      priority,
      status: 'Open',
    }

    setIssues([...issues, newIssue])
    setTitle('')
    setPriority('Medium')
    setShowForm(false)
  }

  const updateStatus = (id, newStatus) => {
    setIssues(
      issues.map((issue) =>
        issue.id === id
          ? { ...issue, status: newStatus }
          : issue
      )
    )
  }

  const filteredIssues = issues.filter(
    (issue) =>
      statusFilter === 'All' ||
      issue.status === statusFilter
  )

  return (
    <main>
      <button className="back-button" onClick={onBack}>
        ← Dashboard
      </button>

      <div className="page-header">
        <div>
          <h2>Bug Reports</h2>
          <p>Track and review application issues.</p>
        </div>

        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Report Issue'}
        </button>
      </div>

      {showForm && (
        <form className="onboarding-form" onSubmit={addIssue}>
          <div>
            <label htmlFor="issue-title">Issue</label>

            <input
              id="issue-title"
              type="text"
              placeholder="Describe the issue"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              required
            />
          </div>

          <div>
            <label htmlFor="priority">Priority</label>

            <select
              id="priority"
              value={priority}
              onChange={(event) =>
                setPriority(event.target.value)
              }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <button type="submit">
            Create Issue
          </button>
        </form>
      )}

      <div className="filters">
        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
        >
          <option value="All">All Issues</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      <div className="user-table">
        <div className="issue-row issue-heading">
          <span>Issue</span>
          <span>Priority</span>
          <span>Status</span>
        </div>

        {filteredIssues.map((issue) => (
          <div className="issue-row" key={issue.id}>
            <span>{issue.title}</span>

            <span>{issue.priority}</span>

            <select
              value={issue.status}
              onChange={(event) =>
                updateStatus(
                  issue.id,
                  event.target.value
                )
              }
            >
              <option value="Open">Open</option>
              <option value="In Progress">
                In Progress
              </option>
              <option value="Resolved">
                Resolved
              </option>
            </select>
          </div>
        ))}

        {filteredIssues.length === 0 && (
          <p className="empty-state">
            No issues match this filter.
          </p>
        )}
      </div>
    </main>
  )
}

export default BugReports