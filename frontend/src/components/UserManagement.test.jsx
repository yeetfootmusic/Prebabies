import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, describe, expect, it, vi } from 'vitest'
import UserManagement from './UserManagement'

afterEach(() => {
  cleanup()
})

describe('UserManagement', () => {
  it('filters users by search', () => {
    render(<UserManagement onBack={() => {}} />)

    const search = screen.getByPlaceholderText(
      'Search by name or email...'
    )

    fireEvent.change(search, {
      target: { value: 'Sarah' },
    })

    expect(screen.getByText('Sarah Miller')).toBeInTheDocument()
    expect(screen.queryByText('Emily Carter')).not.toBeInTheDocument()
  })

  it('adds a new user', () => {
    render(<UserManagement onBack={() => {}} />)

    fireEvent.click(
      screen.getByRole('button', { name: 'Add User' })
    )

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Test User' },
    })

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@prebabies.com' },
    })

    fireEvent.click(
      screen.getByRole('button', { name: 'Create User' })
    )

    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(
      screen.getByText('test@prebabies.com')
    ).toBeInTheDocument()
  })

  it('prevents duplicate email addresses', () => {
    const alertMock = vi
      .spyOn(window, 'alert')
      .mockImplementation(() => {})

    render(<UserManagement onBack={() => {}} />)

    fireEvent.click(
      screen.getByRole('button', { name: 'Add User' })
    )

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Duplicate User' },
    })

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'sarah@example.com' },
    })

    fireEvent.click(
      screen.getByRole('button', { name: 'Create User' })
    )

    expect(alertMock).toHaveBeenCalledWith(
      'A user with this email already exists.'
    )

    expect(
      screen.queryByText('Duplicate User')
    ).not.toBeInTheDocument()

    alertMock.mockRestore()
  })
})