# Full Stack Portfolio Website

A production-structured full stack portfolio with a modern liquid-glass UI, Framer Motion animations, dynamic GitHub projects, and a MongoDB-backed contact form.

## Tech Stack

- Frontend: React, Parcel, Framer Motion
- Backend: Node.js, Express.js, MongoDB (Mongoose)
- Data Source for Projects: GitHub API (`Shivshady23` repositories)

## Project Structure

```text
/client
├── components
├── pages
├── App.jsx
├── main.jsx

/server
├── models
├── routes
├── server.js
```

## Setup

### Frontend

```bash
cd client
npm install
npm run dev
npm run build
```

### Backend

```bash
cd server
npm install
node server.js
```

## Environment Variables

Create `server/.env`:

```env
MONGO_URI=mongodb+srv://Shivang:Shiv1234@cluster0.cjkhjmn.mongodb.net/?appName=Cluster0
PORT=5000
CLIENT_URLS=http://localhost:5173
```

Create `client/.env`:

```env
API_BASE_URL=http://localhost:5000
```

## Features Delivered

- Glassmorphism liquid theme with glow, blur, soft borders, and gradient blobs.
- Sticky blurred navbar with smooth-scroll anchor navigation.
- Mobile-first responsive layout and hamburger menu.
- Dark mode toggle with persistent preference.
- Hero section with typing animation and floating card motion.
- Experience timeline with scroll-reveal animations.
- Projects fetched dynamically from GitHub API:
  - Fork repositories filtered out.
  - Sorted by most recently updated.
  - Displays name, description, language, stars, and repo link.
- Skills grid with glow hover effects.
- Contact form with frontend validation and backend MongoDB persistence.
- Success notification animation on message submit.
- Loading screen animation on app startup.

## API

- `POST /api/contact`
  - Body: `{ "name": "...", "email": "...", "message": "..." }`
  - Saves record in MongoDB collection via Mongoose `Contact` model.

## Notes

- Projects are fetched from GitHub API only and are not stored in MongoDB.
- Replace credentials in your own deployment environment before production use.
