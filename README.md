# Task Manager Web App

A full-stack task management application built with React (Next.js), Tailwind CSS, Node.js (Express), and PostgreSQL (Prisma ORM).

## Features

- **User Authentication**: Secure JWT-based authentication for user signup and login
- **Task Management**: Create, edit, delete, and mark tasks as complete
- **RESTful API**: Well-structured API with proper validation
- **Responsive Design**: Works on desktop and mobile devices
- **Database**: PostgreSQL with Prisma ORM for data management

## Tech Stack

### Frontend
- **React**: UI library
- **Next.js**: React framework
- **Tailwind CSS**: Utility-first CSS framework
- **React Query**: Data fetching and caching
- **Zustand**: State management
- **React Hook Form**: Form handling and validation

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **Prisma**: ORM for database access
- **PostgreSQL**: Relational database
- **JWT**: Authentication mechanism
- **bcrypt**: Password hashing

## Project Structure

```
task-manager-app/
├── backend/                # Backend API
│   ├── prisma/             # Prisma schema and migrations
│   ├── src/                # Source code
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions
│   │   └── server.js       # Express app
│   ├── .env                # Environment variables
│   ├── Dockerfile          # Docker configuration
│   └── package.json        # Dependencies
│
├── frontend/               # Next.js frontend
│   ├── src/                # Source code
│   │   ├── app/            # Next.js app router
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   ├── store/          # Zustand stores
│   │   └── types/          # TypeScript types
│   ├── Dockerfile          # Docker configuration
│   └── package.json        # Dependencies
│
├── docker-compose.yml      # Docker Compose configuration
└── README.md               # Project documentation
```

## Setup and Installation

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- PostgreSQL
- Docker and Docker Compose (for containerized deployment)

### Local Development Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/task-manager-app.git
cd task-manager-app
```

2. **Run the setup script** (Optional)

We've included a setup script that automates the installation process:

```bash
# Make the script executable if needed
chmod +x setup.sh

# Run the setup script
./setup.sh
```

This script will:
- Check if Node.js is installed
- Install dependencies for both backend and frontend
- Create .env files from examples
- Guide you through the next steps

3. **Database Setup**

Before running the backend, you need a PostgreSQL database. See [SETUP_DATABASE.md](./SETUP_DATABASE.md) for detailed instructions on:
- Installing PostgreSQL locally
- Using Docker for PostgreSQL
- Using SQLite for development
- Using Docker Compose for the entire stack

3. **Backend Setup**

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables (the .env file is already created)
# Make sure DATABASE_URL in .env points to your database

# Create database and run migrations (after database is running)
npx prisma migrate dev

# Start development server
npm run dev
```

3. **Frontend Setup**

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

4. **Access the application**

- Backend API: http://localhost:5000
- Frontend: http://localhost:3000

## Deployment

### Using Docker Compose (Recommended)

1. **Build and start the containers**

```bash
# From the project root
docker-compose up -d
```

2. **Access the application**

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Using Vercel and Railway

#### Deploy Frontend to Vercel

1. Create a Vercel account at https://vercel.com
2. Install Vercel CLI: `npm i -g vercel`
3. Navigate to the frontend directory: `cd frontend`
4. Run: `vercel`
5. Follow the prompts to deploy
6. Set the environment variable `NEXT_PUBLIC_API_URL` to your backend URL

#### Deploy Backend to Railway

1. Create a Railway account at https://railway.app
2. Install Railway CLI: `npm i -g @railway/cli`
3. Login to Railway: `railway login`
4. Navigate to the backend directory: `cd backend`
5. Initialize a Railway project: `railway init`
6. Deploy to Railway: `railway up`
7. Set up environment variables in the Railway dashboard:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `JWT_SECRET`: Your JWT secret key
   - `JWT_EXPIRES_IN`: JWT expiration time (e.g., "7d")

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### User Endpoints

- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile

### Task Endpoints

- `GET /api/tasks` - Get all tasks for current user
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## GitHub Repository Setup

To create a GitHub repository for this project, follow the instructions in [GITHUB_SETUP.md](./GITHUB_SETUP.md).

## Environment Variables

Both the backend and frontend require environment variables to be set up:

- Backend: Copy `.env.example` to `.env` in the backend directory and update the values
- Frontend: Copy `.env.example` to `.env` in the frontend directory and update the values

## License

MIT
