import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { GoogleGenAI } from '@google/genai'
import resources from './resources.js'

dotenv.config()

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

if (!process.env.GEMINI_API_KEY) {
  console.error(
    'GEMINI_API_KEY is missing from backend/.env'
  )
  process.exit(1)
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

function findRelevantResources(message) {
  const searchTerm = message.toLowerCase()

  return resources
    .map((resource) => {
      let score = 0

      const title = resource.title.toLowerCase()
      const description =
        resource.description.toLowerCase()

      if (searchTerm.includes(title)) {
        score += 5
      }

      resource.keywords.forEach((keyword) => {
        if (searchTerm.includes(keyword)) {
          score += 2
        }
      })

      const words = searchTerm.split(/\s+/)

      words.forEach((word) => {
        if (word.length < 4) {
          return
        }

        if (title.includes(word)) {
          score += 2
        }

        if (description.includes(word)) {
          score += 1
        }
      })

      return {
        ...resource,
        score,
      }
    })
    .filter((resource) => resource.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'PreBabies API is running',
  })
})

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body

    if (
      typeof message !== 'string' ||
      !message.trim()
    ) {
      return res.status(400).json({
        error: 'A message is required.',
      })
    }

    const relevantResources =
      findRelevantResources(message)

    const resourceContext =
      relevantResources.length > 0
        ? relevantResources
            .map(
              (resource) =>
                `Title: ${resource.title}
Category: ${resource.category}
Description: ${resource.description}`
            )
            .join('\n\n')
        : 'No matching PreBabies resources were found.'

    const response =
      await ai.models.generateContent({
        model: 'gemini-3.5-flash-lite',

        contents: `
User question:
${message.trim()}

Relevant PreBabies resources:
${resourceContext}
        `,

        config: {
          systemInstruction: `
You are the PreBabies resource assistant.

Help users understand pregnancy, birth,
postpartum, and parenting resources.

You will receive the user's question and
relevant resources from the PreBabies catalog.

When relevant resources are provided:

- Use them when answering.
- Mention useful resource titles by name.
- Never invent a PreBabies resource.
- Clearly distinguish general information from
  resources available through PreBabies.

If no relevant PreBabies resource is provided,
you may give concise general information, but
do not claim that PreBabies provides a resource
that was not supplied.

Do not diagnose medical conditions.

For individualized medical advice, encourage
the user to contact a qualified healthcare
professional.

If symptoms may represent an emergency,
encourage appropriate emergency medical care.

Keep responses concise, useful, and easy to
understand.
          `,
        },
      })

    const answer = response.text

    if (!answer) {
      return res.status(502).json({
        error: 'The AI did not return a response.',
      })
    }

    res.json({
      answer,
      resources: relevantResources.map(
        ({ score, ...resource }) => resource
      ),
    })
  } catch (error) {
    console.error(
      'Gemini request failed:',
      error
    )

    res.status(500).json({
      error:
        'Unable to generate a response right now.',
    })
  }
})

app.listen(PORT, () => {
  console.log(
    `PreBabies API running at http://localhost:${PORT}`
  )
})