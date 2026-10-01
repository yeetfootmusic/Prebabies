import { useState } from 'react'

function AIAssistant({ onBack }) {
  const [message, setMessage] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const askAssistant = async (event) => {
    event.preventDefault()

    if (!message.trim()) {
      return
    }

    setLoading(true)
    setError('')
    setAnswer('')

    try {
      const response = await fetch(
        'http://localhost:3001/api/chat',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: message.trim(),
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            'Unable to generate a response.'
        )
      }

      setAnswer(data.answer)
    } catch (requestError) {
      console.error(
        'Assistant request failed:',
        requestError
      )

      setError(
        'Unable to reach the PreBabies assistant. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <button
        className="back-button"
        onClick={onBack}
      >
        ← Dashboard
      </button>

      <div className="page-header">
        <div>
          <h2>Ask PreBabies</h2>

          <p>
            AI-assisted pregnancy, birth, and
            postpartum guidance.
          </p>
        </div>
      </div>

      <form
        className="ai-form"
        onSubmit={askAssistant}
      >
        <label htmlFor="ai-question">
          What would you like to know?
        </label>

        <textarea
          id="ai-question"
          placeholder="Ask a question..."
          value={message}
          onChange={(event) =>
            setMessage(event.target.value)
          }
          rows="4"
        />

        <button
          type="submit"
          disabled={
            loading || !message.trim()
          }
        >
          {loading
            ? 'Thinking...'
            : 'Ask PreBabies'}
        </button>
      </form>

      {error && (
        <div className="ai-error">
          {error}
        </div>
      )}

      {answer && (
        <div className="ai-response">
          <h3>PreBabies Assistant</h3>

          <p>{answer}</p>
        </div>
      )}

      <p className="ai-disclaimer">
        AI-generated information is not a
        substitute for professional medical advice.
      </p>
    </main>
  )
}

export default AIAssistant