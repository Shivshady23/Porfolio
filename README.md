# Shivang Portfolio (Full Stack)

A full stack developer portfolio built with React + Parcel on the frontend and Express + MongoDB on the backend.  
It includes animated UI sections, dynamic GitHub project loading, and a persistent contact form API.

## Suggested GitHub Description

Full stack portfolio using React, Parcel, Express, and MongoDB with dynamic GitHub projects, animations, and a contact API.

## Tech Stack

- Frontend: React 19, Parcel 2, Framer Motion
- Backend: Node.js, Express 5, MongoDB, Mongoose
- API/Integrations: GitHub REST API
- Linting: ESLint (frontend)

## Core Features

- Animated single-page portfolio layout (Hero, About, Skills, Projects, Experience, Education, Resume, Contact)
- Dark/light theme toggle with local storage persistence
- Responsive navigation with desktop and mobile menu behavior
- Loading screen and motion-based reveal/hover interactions
- Live GitHub repositories section (sorted by latest updates, excludes forks and selected repos)
- Resume view/download section
- Contact form with client-side validation, backend validation, and MongoDB persistence
- CORS origin allow-list support through environment variables
- Health endpoint for backend monitoring

## Project Structure

```text
Porfolio/
|-- client/
|   |-- components/
|   |-- data/
|   |-- pages/
|   |-- services/
|   |-- App.jsx
|   |-- main.jsx
|   `-- package.json
|-- server/
|   |-- models/
|   |-- routes/
|   |-- server.js
|   `-- package.json
|-- Shivang.pdf
`-- README.md
```

## Local Development Setup

### Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm 9+
- MongoDB Atlas or local MongoDB instance

### 1) Clone and install

```bash
git clone <your-repo-url>
cd Porfolio

cd client
npm install

cd ../server
npm install
```

### 2) Configure environment variables

Create `server/.env`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<db-name>?retryWrites=true&w=majority
PORT=5000
CLIENT_URLS=http://localhost:5173
NODE_ENV=development

# Email delivery (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
NOTIFY_EMAIL_TO=your-email@gmail.com

# WhatsApp Cloud API delivery
WHATSAPP_TOKEN=your-meta-permanent-token
WHATSAPP_PHONE_NUMBER_ID=your-phone-number-id
WHATSAPP_TO_NUMBER=91xxxxxxxxxx
```

Create `client/.env`:

```env
API_BASE_URL=http://localhost:5000
```

Notes:

- `CLIENT_URLS` supports multiple comma-separated origins (for example: `http://localhost:5173,https://yourdomain.com`).
- Do not commit real credentials to GitHub.
- Configure at least one delivery channel: email (SMTP) or WhatsApp Cloud API.

### 3) Run the app

Start backend (Terminal 1):

```bash
cd server
npm start
```

Start frontend (Terminal 2):

```bash
cd client
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- Health check: `http://localhost:5000/api/health`

## Available Scripts

### Frontend (`client/package.json`)

- `npm run dev`: Start Parcel dev server on port 5173
- `npm run build`: Create production build
- `npm run preview`: Serve built app on port 4173
- `npm run lint`: Run ESLint

### Backend (`server/package.json`)

- `npm start`: Start Express server

## API Reference

### `GET /api/health`

Checks backend status.

Example response:

```json
{
  "success": true,
  "message": "API is running."
}
```

### `POST /api/contact`

Stores a portfolio contact message in MongoDB and attempts delivery to email/WhatsApp.

Request body:

```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "message": "Your message here (minimum 10 characters)."
}
```

Success response (`201`):

```json
{
  "success": true,
  "message": "Message sent successfully.",
  "id": "65f...",
  "createdAt": "2026-02-20T10:30:00.000Z",
  "notifications": {
    "email": { "sent": true },
    "whatsapp": { "sent": false, "skipped": true, "reason": "WhatsApp is not configured." }
  }
}
```

Validation error response (`400`):

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": {
    "name": "Name must contain at least 2 characters.",
    "email": "Email is not valid.",
    "message": "Message must contain at least 10 characters."
  }
}
```

## Data and Customization

- Portfolio content (skills, education, contact info) is defined in `client/data/content.js`.
- GitHub username for project fetch is set in `client/components/ProjectsSection.jsx`.
- Excluded repositories are managed in `client/services/api.js`.
- Resume file can be replaced at `Shivang.pdf` and `client/Shivang.pdf`.

## Deployment Notes

- Set production values for `MONGO_URI`, `PORT`, `CLIENT_URLS`, and `API_BASE_URL`
- Keep backend and frontend domains in sync for CORS.
- Add `.env` files to secret managers on your hosting platform (do not hardcode secrets).

## Security Notes

- Never expose MongoDB credentials in public repositories.
- Restrict `CLIENT_URLS` to trusted origins in production.
- Consider rate limiting and bot protection on `/api/contact` for public deployments.
