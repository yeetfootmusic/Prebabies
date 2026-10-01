import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, describe, expect, it } from 'vitest'
import ResourceSearch from './ResourceSearch'

afterEach(() => {
  cleanup()
})

describe('ResourceSearch', () => {
  it('finds resources by title', () => {
    render(<ResourceSearch onBack={() => {}} />)

    fireEvent.change(
      screen.getByPlaceholderText('Search resources...'),
      {
        target: { value: 'hospital' },
      }
    )

    expect(
      screen.getByText('Hospital Bag Checklist')
    ).toBeInTheDocument()
  })

  it('finds resources by related keyword', () => {
    render(<ResourceSearch onBack={() => {}} />)

    fireEvent.change(
      screen.getByPlaceholderText('Search resources...'),
      {
        target: { value: 'food' },
      }
    )

    expect(
      screen.getByText('Prenatal Nutrition Guide')
    ).toBeInTheDocument()
  })

  it('filters resources by category', () => {
    render(<ResourceSearch onBack={() => {}} />)

    fireEvent.change(
      screen.getByDisplayValue('All Categories'),
      {
        target: { value: 'Postpartum' },
      }
    )

    expect(
      screen.getByText('Postpartum Recovery')
    ).toBeInTheDocument()

    expect(
      screen.queryByText('Hospital Bag Checklist')
    ).not.toBeInTheDocument()
  })

  it('shows an empty state when nothing matches', () => {
    render(<ResourceSearch onBack={() => {}} />)

    fireEvent.change(
      screen.getByPlaceholderText('Search resources...'),
      {
        target: { value: 'spaceship' },
      }
    )

    expect(
      screen.getByText('No resources found')
    ).toBeInTheDocument()
  })

  it('ranks stronger search matches first', () => {
    render(<ResourceSearch onBack={() => {}} />)

    fireEvent.change(
      screen.getByPlaceholderText('Search resources...'),
      {
        target: { value: 'birth' },
      }
    )

    const headings = screen.getAllByRole('heading', {
      level: 3,
    })

    expect(headings[0]).toHaveTextContent(
      'Birth Preparation Checklist'
    )
  })
})