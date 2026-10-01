import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, describe, expect, it } from 'vitest'
import BugReports from './BugReports'

afterEach(() => {
  cleanup()
})

describe('BugReports', () => {
  it('creates a new issue', () => {
    render(<BugReports onBack={() => {}} />)

    fireEvent.click(
      screen.getByRole('button', { name: 'Report Issue' })
    )

    fireEvent.change(
      screen.getByLabelText('Issue'),
      {
        target: { value: 'Login button is broken' },
      }
    )

    fireEvent.change(
      screen.getByLabelText('Priority'),
      {
        target: { value: 'High' },
      }
    )

    fireEvent.click(
      screen.getByRole('button', { name: 'Create Issue' })
    )

    expect(
      screen.getByText('Login button is broken')
    ).toBeInTheDocument()

    expect(
      screen.getAllByText('High')
    ).toHaveLength(2)
  })

  it('filters issues by status', () => {
    render(<BugReports onBack={() => {}} />)

    const filter = screen.getByDisplayValue('All Issues')

    fireEvent.change(filter, {
      target: { value: 'Resolved' },
    })

    expect(
      screen.getByText('Email validation unclear')
    ).toBeInTheDocument()

    expect(
      screen.queryByText('Mobile layout overflow')
    ).not.toBeInTheDocument()
  })

  it('changes an issue status', () => {
    render(<BugReports onBack={() => {}} />)

    const statusMenus = screen.getAllByDisplayValue('Open')

    fireEvent.change(statusMenus[0], {
      target: { value: 'In Progress' },
    })

    expect(
      screen.getByDisplayValue('In Progress')
    ).toBeInTheDocument()
  })
})