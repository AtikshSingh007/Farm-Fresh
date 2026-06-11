# Deployment Guide

This guide covers deploying Farm Fresh to production environments.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
- [Backend Deployment (Railway/Render)](#backend-deployment-railway-render)
- [Database Setup (MongoDB Atlas)](#database-setup-mongodb-atlas)
- [Environment Variables](#environment-variables)
- [Post-Deployment](#post-deployment)

---

## Prerequisites

✅ GitHub repository with latest code  
✅ MongoDB Atlas account (free tier available)  
✅ Vercel account (for frontend)  
✅ Railway or Render account (for backend)  

---

## Database Setup (MongoDB Atlas)

### 1. Create MongoDB Atlas Cluster (FREE)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free M0 cluster (512 MB storage)
3. Choose a cloud provider and region closest to your users
4. Wait 1-3 minutes for provisioning

### 2. Configure Database Access

1. **Create Database User:**
   - Database Access → Add New Database User
   - Authentication Method: Password
   - Username: `farmfresh-prod`
   - Password: Generate a strong password (save it!)
   - Database User Privileges: Read and write to any database

2. **Whitelist IP Addresses:**
   - Network Access → Add IP Address
   - For production: Add your backend server IPs
   - For development: Use `0.0.0.0/0` (allow from anywhere)
   - ⚠️ Note: `0.0.0.0/0` is convenient but less secure

### 3. Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Select Driver: Node.js, Version: 5.5 or later
4. Copy the connection string:
   ```
   mongodb+srv://farmfresh-prod:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Add database name: `/farm_fresh` after `.mongodb.net`
   ```
   mongodb+srv://farmfresh-prod:YourPassword@cluster0.xxxxx.mongodb.net/farm_fresh?retryWrites=true&w=majority
   ```

---

## Backend Deployment

### Option A: Railway (Recommended)

**Why Railway?**
- ✅ Free tier: $5/month credit
- ✅ Auto-deploys from GitHub
- ✅ Built-in environment variables
- ✅ Automatic HTTPS

**Steps:**

1. **Sign up**: https://railway.app (use GitHub login)

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `Farm-Fresh` repository
   - Select `server` as the root directory

3. **Configure Build Settings**:
   - Root Directory: `/server`
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Add Environment Variables**:
   Go to Variables tab and add:
   ```env
   NODE_ENV=production
   PORT=5000
   MONGO_URI=mongodb+srv://farmfresh-prod:YourPassword@cluster0.xxxxx.mongodb.net/farm_fresh?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_production_jwt_key_here
   JWT_EXPIRE=30d
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   ```

5. **Deploy**:
   - Click "Deploy"
   - Wait for build (2-3 minutes)
   - Copy your Railway app URL: `https://your-app.railway.app`

### Option B: Render

**Why Render?**
- ✅ Generous free tier
- ✅ Auto-deploys from GitHub
- ✅ Easy to use

**Steps:**

1. **Sign up**: https://render.com (use GitHub login)

2. **Create Web Service**:
   - Dashboard → New → Web Service
   - Connect your GitHub repository
   - Configure:
     - Name: `farm-fresh-api`
     - Root Directory: `server`
     - Environment: Node
     - Build Command: `npm install`
     - Start Command: `npm start`

3. **Add Environment Variables**:
   ```env
   NODE_ENV=production
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=your_secret_key
   JWT_EXPIRE=30d
   CORS_ORIGIN=https://your-frontend.vercel.app
   ```

4. **Deploy**: Click "Create Web Service"

---

## Frontend Deployment (Vercel)

**Why Vercel?**
- ✅ Optimized for React/Vite
- ✅ Free tier with generous limits
- ✅ Automatic HTTPS and CDN
- ✅ Zero configuration for Vite apps

### Steps:

1. **Sign up**: https://vercel.com (use GitHub login)

2. **Import Project**:
   - Click "Add New..." → Project
   - Import your `Farm-Fresh` repository
   - Configure:
     - Framework Preset: Vite
     - Root Directory: `client`
     - Build Command: `npm run build` (auto-detected)
     - Output Directory: `dist` (auto-detected)

3. **Add Environment Variables**:
   - Go to Settings → Environment Variables
   - Add:
     ```
     VITE_API_URL=https://your-backend.railway.app/api
     ```
   - Replace with your Railway/Render backend URL

4. **Deploy**:
   - Click "Deploy"
   - Wait 1-2 minutes
   - Your site will be live at: `https://your-app.vercel.app`

5. **Custom Domain (Optional)**:
   - Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

---

## Environment Variables

### Backend (.env)

```env
# Server
NODE_ENV=production
PORT=5000

# Database
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/farm_fresh?retryWrites=true&w=majority

# Security
JWT_SECRET=your_super_long_random_secret_key_minimum_32_characters
JWT_EXPIRE=30d

# CORS (Frontend URL)
CORS_ORIGIN=https://your-frontend.vercel.app
```

### Frontend (.env)

```env
# API Endpoint
VITE_API_URL=https://your-backend.railway.app/api
```

⚠️ **Security Tips:**
- Never commit `.env` files to Git
- Use strong, random JWT secrets (32+ characters)
- Rotate secrets regularly
- Use different secrets for dev/staging/production

---

## Post-Deployment Checklist

### 1. Test Your Deployment

✅ **Frontend Tests:**
- [ ] Landing page loads
- [ ] Images and assets load
- [ ] Navigation works
- [ ] Responsive design on mobile

✅ **Backend Tests:**
- [ ] Health endpoint: `https://your-api.com/api/health`
- [ ] CORS headers are correct
- [ ] Registration works
- [ ] Login works
- [ ] Protected routes require authentication

### 2. Update Backend CORS

Update `server/server.js` to use environment variable:

```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

### 3. Update Frontend API Calls

Ensure `client/src/utils/api.js` uses environment variable:

```javascript
const API_URL = import.meta.env.VITE_API_URL || '/api';
```

### 4. Enable Auto-Deploy

Both Vercel and Railway auto-deploy when you push to `main` branch!

```bash
git add .
git commit -m "fix: update production configuration"
git push origin main
```

Your apps will automatically rebuild and redeploy! 🚀

---

## Monitoring & Maintenance

### Monitor Your Apps:

**Railway/Render:**
- Check logs for errors
- Monitor resource usage
- Set up alerts

**Vercel:**
- View deployment logs
- Monitor function execution
- Check analytics

### Database Monitoring:

**MongoDB Atlas:**
- Monitor connection count
- Check storage usage
- Review slow queries
- Set up alerts (free tier: email alerts)

---

## Troubleshooting

### Frontend Issues:

**"Failed to fetch" errors:**
- Check VITE_API_URL is correct
- Verify backend is running
- Check browser console for CORS errors

**Build fails:**
- Check Node version (18+)
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for TypeScript errors

### Backend Issues:

**"Port already in use":**
- Railway/Render handle ports automatically
- Don't hardcode PORT, use `process.env.PORT`

**MongoDB connection fails:**
- Verify connection string is correct
- Check IP whitelist in Atlas
- Test connection locally first

**CORS errors:**
- Update CORS_ORIGIN to match frontend URL
- Check for trailing slashes
- Verify protocol (http vs https)

---

## Cost Estimates

### Free Tier Limits:

**MongoDB Atlas (M0):**
- ✅ 512 MB storage
- ✅ Shared CPU
- ✅ Suitable for 10,000+ users

**Vercel:**
- ✅ 100 GB bandwidth/month
- ✅ Unlimited requests
- ✅ Automatic SSL

**Railway:**
- ✅ $5 credit/month
- ✅ ~500 hours runtime
- ✅ Suitable for low-medium traffic

**Render:**
- ✅ 750 hours/month free
- ✅ Automatic sleep after 15min inactivity
- ✅ Suitable for demos/MVP

### Scaling:

When you outgrow free tiers:
- MongoDB Atlas: $9/month (M10 cluster)
- Railway: Pay-as-you-go ($0.000231/GB-hour)
- Render: $7/month (always-on instances)
- Vercel: $20/month (Pro tier)

---

## Security Best Practices

1. **Environment Variables:**
   - Never hardcode secrets
   - Use different values for dev/prod
   - Rotate secrets regularly

2. **CORS:**
   - Specify exact frontend URL
   - Don't use '*' in production

3. **MongoDB:**
   - Use strong database passwords
   - Enable IP whitelisting
   - Use connection string with SSL

4. **Rate Limiting:**
   - Add rate limiting middleware (express-rate-limit)
   - Limit login attempts
   - Protect API endpoints

5. **HTTPS:**
   - Railway, Render, and Vercel provide automatic HTTPS
   - Never send credentials over HTTP

---

## Support

If you encounter issues:

1. Check deployment logs (Railway/Render/Vercel dashboards)
2. Verify environment variables are set correctly
3. Test API endpoints with Postman/Thunder Client
4. Check MongoDB Atlas connection
5. Review CORS configuration

---

## Summary

Your Farm Fresh application is now production-ready! 🎉

**Deployment Stack:**
- Frontend: Vercel (Auto-deploy from GitHub)
- Backend: Railway/Render (Auto-deploy from GitHub)
- Database: MongoDB Atlas (Cloud)
- Domain: Custom domain via Vercel (optional)

**Next Steps:**
1. Deploy backend to Railway/Render
2. Deploy frontend to Vercel
3. Test all features
4. Set up monitoring
5. Share your live app! 🚀
