# Divine Pooja Booking

A full-stack Hindu pooja and priest booking platform connecting devotees with verified priests for religious services.

## Technology Stack

- **Frontend**: React, Vite, JavaScript, React Router, Tailwind CSS, Axios
- **Backend**: Node.js, Express, JavaScript, MongoDB, Mongoose, CORS, dotenv
- **Planned Integrations**: Razorpay, Cloudinary, JWT Authentication

## Project Structure

```text
Divine-Pooja/
├── frontend/    # React + Vite application
├── backend/     # Node.js + Express API server
├── .gitignore
├── .env.example
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm (v9+)

### Installation & Running Locally

1. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend development server will run at `http://localhost:5173`.

2. **Backend**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   The backend API server will run at `http://localhost:5000`.

### Health Endpoint Check

Verify the backend API is working by visiting:
`GET http://localhost:5000/api/health`