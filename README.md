# Store Rating Platform
## Frontend Setup

cd frontend
npm install
npm run dev

## Backend Setup

cd backend
npm install
npm start

## Environment Variables

Create a .env file inside backend:

PORT=5000
JWT_SECRET=your_secret
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=store_rating_platform
## Features

### Admin
- Manage Users
- Manage Stores
- Dashboard Statistics
- User Details View
- Filters & Sorting

### User
- Register/Login
- Search Stores
- Submit & Update Ratings
- Change Password

### Store Owner
- View Average Rating
- View Users Who Rated
- Change Password

## Tech Stack

Frontend:
- React.js
- Tailwind CSS
- Axios

Backend:
- Node.js
- Express.js

Database:
- MySQL

Authentication:
- JWT
- bcryptjs
