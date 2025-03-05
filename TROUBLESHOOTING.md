# Troubleshooting Guide for Task Manager App

If you're experiencing issues with the Task Manager App, particularly with login functionality, follow this guide to diagnose and fix the problems.

## Login Issues

### 1. Verify Backend Server is Running

The backend server must be running for authentication to work:

```bash
# Navigate to the backend directory
cd /Users/bengur/src/task-manager-app/backend

# Start the backend server
npm run dev
```

You should see output indicating the server is running on port 5000. If you see any errors, they will provide clues about what's wrong.

### 2. Check API Connection

Ensure the frontend can connect to the backend API:

1. Open your browser's developer tools (F12 or right-click > Inspect)
2. Go to the Network tab
3. Try to log in and observe the network requests
4. Look for a POST request to `/api/auth/login`
5. Check if the request is successful (status 200) or if there's an error

If you don't see any request to the login endpoint, there might be an issue with the frontend configuration.

### 3. Verify Environment Variables

Make sure your environment variables are correctly set:

**Backend (.env)**:
```
JWT_SECRET=task_manager_secret_key_2025
DATABASE_URL="postgresql://bengur:postgres@localhost:5432/taskmanager?schema=public"
```

**Frontend (.env)**:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Test API Directly

You can test the backend API directly using curl:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"bengur99@gmail.com","password":"password123"}'
```

If this returns a token, the backend is working correctly.

### 5. Check Database Connection

Verify that the database is properly connected:

```bash
# Navigate to the backend directory
cd /Users/bengur/src/task-manager-app/backend

# Run Prisma Studio to check the database
npx prisma studio
```

This will open Prisma Studio in your browser (usually at http://localhost:5555). Check if:
- The User table exists
- Your user record exists
- The password field contains a long hashed string (not plaintext)

### 6. Recreate User with Proper Password Hash

If all else fails, you can recreate the user with a properly hashed password:

```bash
# Navigate to the backend directory
cd /Users/bengur/src/task-manager-app/backend

# Run the hash-password.js script
node hash-password.js
```

This will update the user's password with a properly hashed version.

## Common Issues and Solutions

### CORS Errors

If you see CORS errors in the console, make sure:
- The backend server is running
- The frontend is connecting to the correct URL
- The backend has CORS properly configured

### JWT Token Issues

If authentication fails with JWT-related errors:
- Make sure the JWT_SECRET is properly set in the backend .env file
- Restart the backend server after changing environment variables

### Database Connection Issues

If the backend can't connect to the database:
- Make sure PostgreSQL is running
- Verify the DATABASE_URL in the backend .env file
- Check if the database and user exist

## Getting More Help

If you're still experiencing issues:
1. Check the terminal output for both the backend and frontend servers
2. Look for error messages in the browser console
3. Try using the SQLite database option as described in SETUP_DATABASE.md
