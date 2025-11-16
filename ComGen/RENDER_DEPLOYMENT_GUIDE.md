# Deploy ComGen to Render - Complete Guide

## 🚀 Overview
This guide will help you deploy both the **frontend** (React + Vite) and **backend** (Express + SQLite) to Render.

---

## 📋 Prerequisites
- GitHub account with your code pushed
- Render account (free tier available at https://render.com)
- Your repository: `https://github.com/As262/ComGen`

---

## 🔧 Part 1: Deploy Backend (Express API + SQLite)

### Step 1: Create Backend Web Service

1. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Click **"New +"** → Select **"Web Service"**

2. **Connect GitHub Repository**
   - Click **"Connect account"** if not already connected
   - Select your repository: **As262/ComGen**
   - Click **"Connect"**

3. **Configure Web Service**
   - **Name**: `comgen-backend` (or any name you prefer)
   - **Region**: Choose closest to your users (e.g., Oregon, Frankfurt)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free` (or paid if needed)

4. **Add Environment Variables**
   Click **"Advanced"** → **"Add Environment Variable"**
   
   Add these variables:
   ```
   NODE_ENV = production
   PORT = 5000
   JWT_SECRET = your-super-secret-jwt-key-change-this-in-production
   RAZORPAY_KEY_ID = rzp_test_your_key_id_here
   RAZORPAY_KEY_SECRET = your_key_secret_here
   ```
   
   **Important**: 
   - Generate a strong `JWT_SECRET` (use a password generator)
   - Add your Razorpay keys if you have them (optional for now)

5. **Click "Create Web Service"**
   - Render will start building and deploying your backend
   - Wait for deployment to complete (usually 2-5 minutes)
   - Note your backend URL: `https://comgen-backend.onrender.com`

---

## 🎨 Part 2: Deploy Frontend (React + Vite)

### Step 2: Update Frontend API URL

Before deploying frontend, update the API URL to point to your deployed backend.

1. **Create Production Environment File**
   
   In your local project, update `src/context/AuthContext.jsx`:
   
   ```javascript
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/auth';
   ```

2. **Commit and push this change**:
   ```bash
   git add .
   git commit -m "Update API URL for production"
   git push
   ```

### Step 3: Create Frontend Static Site

1. **Go to Render Dashboard**
   - Click **"New +"** → Select **"Static Site"**

2. **Connect Repository Again**
   - Select your repository: **As262/ComGen**

3. **Configure Static Site**
   - **Name**: `comgen-frontend` (or any name)
   - **Branch**: `main`
   - **Root Directory**: Leave empty (root of repo)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **Add Environment Variable**
   Click **"Advanced"** → **"Add Environment Variable"**
   
   ```
   VITE_API_URL = https://comgen-backend.onrender.com/api/auth
   ```
   
   (Replace with your actual backend URL from Step 1.5)

5. **Click "Create Static Site"**
   - Render will build your frontend
   - Wait for deployment (usually 2-5 minutes)
   - Your site will be live at: `https://comgen-frontend.onrender.com`

---

## 🔐 Part 3: Configure CORS

Your backend needs to accept requests from your frontend domain.

1. **Update `backend/server.js`**
   
   Find the CORS configuration and update it:
   
   ```javascript
   app.use(cors({
     origin: [
       'http://localhost:5173',
       'https://comgen-frontend.onrender.com'
     ],
     credentials: true
   }));
   ```

2. **Commit and push**:
   ```bash
   git add backend/server.js
   git commit -m "Add production CORS origin"
   git push
   ```

3. **Render will auto-redeploy** your backend with the new CORS settings

---

## ✅ Part 4: Testing

1. **Visit your frontend**: `https://comgen-frontend.onrender.com`
2. **Test signup**: Create a new account
3. **Test login**: Login with your credentials
4. **Check persistence**: Refresh page - you should stay logged in
5. **Test logout**: Click logout button

---

## 🗄️ Part 5: Database Persistence (Important!)

**Issue**: SQLite database on Render's free tier is ephemeral (gets deleted on restart)

**Solutions**:

### Option A: Use Render Disk (Paid - $1/month per GB)
1. In backend service settings → **"Disks"**
2. Add disk: `/opt/render/project/src/backend` (mount path)
3. Update `backend/database.js` to use disk path

### Option B: Upgrade to PostgreSQL (Recommended for Production)
1. Create PostgreSQL database on Render (free tier available)
2. Update your code to use PostgreSQL instead of SQLite
3. Migration needed - we can help with this later

### Option C: Keep SQLite (Development Only)
- Accept that data will be lost on backend restarts
- Fine for testing/demo purposes

---

## 🔄 Part 6: Auto-Deploy on Git Push

Both services auto-deploy when you push to `main` branch!

```bash
git add .
git commit -m "Your changes"
git push
```

Render will automatically rebuild and deploy both frontend and backend.

---

## 🐛 Troubleshooting

### Backend won't start
- Check Render logs: Dashboard → Your Service → "Logs"
- Verify all environment variables are set
- Check build command succeeded

### Frontend can't connect to backend
- Verify `VITE_API_URL` points to correct backend URL
- Check CORS settings in backend
- Open browser console (F12) for error messages

### Database data disappearing
- This is normal with SQLite on free tier
- See Part 5 for persistence solutions

### 502 Bad Gateway
- Backend is starting (wait 1-2 minutes on free tier)
- Free tier services sleep after 15 min inactivity

---

## 📝 Important Notes

1. **Free Tier Limitations**:
   - Services sleep after 15 minutes of inactivity
   - First request after sleep takes 30-50 seconds
   - SQLite data is ephemeral

2. **Custom Domain** (Optional):
   - Render Settings → "Custom Domain"
   - Add your domain and follow DNS instructions

3. **Environment Variables**:
   - Never commit `.env` files to GitHub
   - Always set them in Render dashboard

4. **Monitoring**:
   - Check Render dashboard for deployment status
   - View logs for debugging

---

## 🎉 You're Done!

Your ComGen e-commerce site is now live on the internet!

- **Frontend**: https://comgen-frontend.onrender.com
- **Backend API**: https://comgen-backend.onrender.com
- **Database**: SQLite (upgrade to PostgreSQL for persistence)

---

## 📞 Need Help?

Common issues:
- `Cannot connect to server` → Check backend URL in frontend env variable
- `CORS error` → Update CORS origins in backend/server.js
- `Database not persisting` → See Part 5 for solutions
- `500 errors` → Check Render logs for backend errors
