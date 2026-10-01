# PreBabies

A modern pregnancy, birth, and postpartum resource application built with React and Node.js.

PreBabies is a production-readiness project focused on turning an early-stage web application into a cleaner, tested, and more usable product. The project demonstrates practical full-stack development, product thinking, search and discovery, user onboarding, issue tracking, automated testing, CI, and experimentation with AI-assisted resource guidance.

---

## Overview

PreBabies provides a simple interface for discovering resources throughout pregnancy, birth preparation, and postpartum recovery.

The application includes both user-facing experiences and internal tools used to support the application.

### User Experience

- Pregnancy, birth, and postpartum resource discovery
- Keyword and category-based search
- Relevance-ranked search results
- Responsive modern interface
- AI-assisted resource guidance interface
- Mobile-friendly layouts

### Internal Tools

- User onboarding management
- Onboarding status tracking
- Duplicate email prevention
- Bug and issue reporting
- Issue priority and status management

---

## Screenshots

> Screenshots coming soon.

The application includes a redesigned responsive homepage, searchable resource library, onboarding workflow, bug reporting tools, and an AI assistant interface.

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- CSS
- Vitest
- React Testing Library

### Backend

- Node.js
- Express
- Gemini API integration
- Environment-based API configuration

### Development

- Git
- GitHub
- GitHub Actions
- ESLint
- Automated frontend testing
- Production builds through Vite

---

## Key Features

### Resource Search

Users can search a curated collection of pregnancy, birth, and postpartum resources.

Search supports:

- Title matching
- Description matching
- Keyword matching
- Category filtering
- Relevance ranking
- Empty search states
- Result counts

Search results are ranked using stronger weighting for title matches, followed by keyword and description matches.

---

### User Onboarding

The onboarding workflow provides a lightweight internal interface for managing new users.

Features include:

- Add new users
- Search by name or email
- Filter by onboarding status
- Duplicate email prevention
- Email normalization
- Default onboarding states

---

### Bug Reporting

The internal issue workflow allows application problems to be captured during testing and review.

Issues include:

- Description
- Priority
- Status
- Status filtering

This provides a simple way to track problems discovered while preparing the application for production.

---

### Ask PreBabies

The project includes an experimental AI assistant interface designed to provide resource-oriented pregnancy, birth, and postpartum guidance.

The backend architecture separates the AI provider from the browser:

```text
React Frontend
      |
      v
Node / Express API
      |
      v
Gemini API
```

API credentials are stored server-side using environment variables rather than exposed in frontend code.

The assistant also includes user-facing medical information disclaimers and backend prompt guardrails.

> The AI integration is experimental and depends on external API availability and valid provider credentials. It is not intended to provide medical diagnosis or replace professional medical advice.

---

## Testing

The frontend includes automated tests covering core application behavior, including:

- User onboarding
- Duplicate email handling
- Bug reporting
- Resource search
- Keyword matching
- Category filtering
- Empty search states
- Search relevance ranking

Run the test suite with:

```bash
cd frontend
npm test -- --run
```

---

## Continuous Integration

GitHub Actions is configured to validate pull requests.

The CI workflow:

1. Checks out the repository
2. Configures Node.js
3. Installs dependencies
4. Runs automated tests
5. Runs ESLint
6. Builds the production application

This helps catch test failures, lint problems, build failures, and platform-specific issues before changes are merged.

---

## Running Locally

### Requirements

Install:

- Node.js
- npm
- Git

Clone the repository:

```bash
git clone https://github.com/yeetfootmusic/Prebabies.git
cd Prebabies
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Vite will display the local development URL in the terminal.

### Backend

Open another terminal:

```bash
cd backend
npm install
npm run dev
```

The backend runs locally at:

```text
http://localhost:3001
```

The health endpoint is available at:

```text
GET /api/health
```

---

## Environment Variables

AI functionality requires a Gemini API credential.

Create:

```text
backend/.env
```

Add:

```env
GEMINI_API_KEY=your_api_key_here
```

Do not commit `.env` or API credentials to GitHub.

---

## Project Structure

```text
Prebabies/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AIAssistant.jsx
│   │   │   ├── BugReports.jsx
│   │   │   ├── ResourceSearch.jsx
│   │   │   └── UserManagement.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── App.css
│   │
│   └── package.json
│
├── backend/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Development Approach

This project was developed incrementally rather than as one large implementation.

Features were separated into focused development work including:

- User onboarding
- Bug reporting
- Search and usability
- AI assistant integration
- UI modernization

Pull requests and automated CI checks were used during development to validate changes before integration.

This approach reflects a production-oriented workflow where features can be developed, tested, reviewed, and improved independently.

---

## Current Status

PreBabies is a working portfolio and production-readiness demonstration rather than a production medical platform.

Core frontend workflows, search, responsive design, automated testing, and CI are implemented.

The AI assistant architecture and interface are implemented, while external Gemini API authentication is currently being worked through and should be considered experimental.

---

## Future Improvements

Potential next steps include:

- Ground AI responses directly in the resource catalog
- Consolidate frontend and backend resource data
- Add backend API tests
- Add persistent database storage
- Add authentication and authorization
- Expand the resource catalog
- Add resource detail pages
- Add conversation history
- Add production deployment configuration
- Improve accessibility testing

---

## Purpose

PreBabies demonstrates the process of taking an early-stage application and improving its readiness through a combination of:

**Product thinking + full-stack development + testing + automation + usability improvements.**

The emphasis is not simply adding features, but making the application easier to use, easier to maintain, and safer to change.
