# Farm Fresh - Setup Guide

## Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB (local or Atlas cloud)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd farm-fresh
```

2. **Install dependencies**

Backend:
```bash
cd server
npm install
```

Frontend:
```bash
cd client
npm install
```

3. **Configure environment variables**

Create `server/.env`:
```env
MONGO_URI=mongodb://localhost:27017/farm_fresh
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
```

For MongoDB Atlas (cloud):
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/farm_fresh?retryWrites=true&w=majority
```

4. **Run the application**

Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend:
```bash
cd client
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:5174
- Backend API: http://localhost:5000

## MongoDB Atlas Setup (Free)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free M0 cluster
3. Create a database user
4. Whitelist your IP (or use 0.0.0.0/0 for development)
5. Get connection string and add to `server/.env`

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Auth**: JWT with bcrypt

## Features

- Landing page with marketing content
- User authentication (phone-based)
- Role-based access (Farmer/Buyer)
- Produce listing management
- Dashboard analytics
- Responsive design

## Development

```bash
# Backend development
cd server
npm run dev

# Frontend development
cd client
npm run dev

# Build for production
cd client
npm run build
```

## Troubleshooting

### Port already in use
Change the PORT in `server/.env` or kill the existing process.

### MongoDB connection error
Ensure MongoDB is running locally or check your Atlas connection string.

### CORS errors
The Vite proxy handles API requests in development. Check `client/vite.config.js`.

## License

MIT
