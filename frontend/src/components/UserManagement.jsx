import { useState } from 'react'

const initialUsers = [
  {
    id: 1,
    name: 'Sarah Miller',
    email: 'sarah@example.com',
    status: 'Complete',
  },
  {
    id: 2,
    name: 'Emily Carter',
    email: 'emily@example.com',
    status: 'In Progress',
  },
  {
    id: 3,
    name: 'Jessica Lee',
    email: 'jessica@example.com',
    status: 'Complete',
  },
  {
    id: 4,
    name: 'Amanda Davis',
    email: 'amanda@example.com',
    status: 'Not Started',
  },
]

function UserManagement({ onBack }) {
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')

  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())

    const matchesStatus =
      status === 'All' || user.status === status

    return matchesSearch && matchesStatus
  })

  const addUser = (event) => {
    event.preventDefault()

    if (!name.trim() || !email.trim()) {
      return
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      status: 'Not Started',
    }

    setUsers([...users, newUser])

    setName('')
    setEmail('')
    setShowForm(false)
  }

  return (
    <main>
      <button className="back-button" onClick={onBack}>
        ← Dashboard
      </button>

      <div className="page-header">
        <div>
          <h2>User Onboarding</h2>
          <p>
            Review onboarding progress and find users quickly.
          </p>
        </div>

        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add User'}
        </button>
      </div>

      {showForm && (
        <form className="onboarding-form" onSubmit={addUser}>
          <div>
            <label htmlFor="name">Name</label>

            <input
              id="name"
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <button type="submit">
            Create User
          </button>
        </form>
      )}

      <div className="filters">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="All">All</option>
          <option value="Complete">Complete</option>
          <option value="In Progress">In Progress</option>
          <option value="Not Started">Not Started</option>
        </select>
      </div>

      <div className="user-table">
        <div className="user-row user-heading">
          <span>Name</span>
          <span>Email</span>
          <span>Onboarding</span>
        </div>

        {filteredUsers.map((user) => (
          <div className="user-row" key={user.id}>
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span className="status">
              {user.status}
            </span>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <p className="empty-state">
            No users match your search.
          </p>
        )}
      </div>
    </main>
  )
}

export default UserManagement