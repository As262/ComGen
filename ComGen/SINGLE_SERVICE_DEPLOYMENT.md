# 🚀 Single Service Deployment - Quick Guide

## ✅ Combined Frontend + Backend Setup

Your app is now configured to run as **ONE service** on Render - both frontend and backend together!

---

## 📋 What Changed

### ✅ Before: 2 Separate Services
- ❌ `comgen-backend` (separate)
- ❌ `comgen-frontend` (separate)
- ❌ Required CORS configuration
- ❌ Complex environment variable setup

### ✅ After: 1 Combined Service
- ✅ `comgen` (single service)
- ✅ Backend serves frontend static files
- ✅ Same domain = no CORS issues
- ✅ Simple deployment

---

## 🎯 How It Works

```
Single Render Service (comgen)
│
├── Backend (Node.js Express)
│   ├── /api/health
│   ├── /api/auth/*
│   ├── /api/create-order
│   ├── /api/verify-payment
│   └── Serves frontend static files
│
└── Frontend (React SPA)
    └── Served as static files from /frontend/dist
```

**One URL** does everything: `https://comgen.onrender.com`

---

## 🚀 Deploy in 3 Steps

### Step 1: Push to GitHub (2 min)

```bash
cd "C:\Users\avina\Desktop\congen\ComGen\ComGen"
git add .
git commit -m "Configure single service deployment - frontend + backend combined"
git push origin main
```

### Step 2: Deploy on Render (5 min)

1. Go to: https://dashboard.render.com/
2. Click: **New** → **Blueprint**
3. Connect: Your GitHub repository
4. Select: `ComGen` repo
5. Click: **Apply**

Render creates **ONE service**: `comgen`

### Step 3: Add Environment Variables (2 min)

1. Go to `comgen` service in Render
2. Click **Environment** tab
3. Add your Razorpay keys:

```
RAZORPAY_KEY_ID = rzp_test_YOUR_KEY_ID
RAZORPAY_KEY_SECRET = YOUR_SECRET_KEY
```

4. Save (auto-redeploys)

---

## 🌐 Your Live URLs

After deployment, you'll have **ONE URL** for everything:

| Resource | URL |
|----------|-----|
| **Frontend** | `https://comgen.onrender.com` |
| **API** | `https://comgen.onrender.com/api` |
| **Health Check** | `https://comgen.onrender.com/api/health` |
| **Auth** | `https://comgen.onrender.com/api/auth` |

---

## ⚙️ Build Process

Render will run:

```bash
# 1. Build Frontend
cd frontend && npm ci && npm run build

# 2. Install Backend Dependencies
cd ../backend && npm ci

# 3. Start Server (serves both)
node server.js
```

Result:
- Frontend built to `/frontend/dist`
- Backend serves API routes + frontend static files
- Everything on port 10000

---

## 🧪 Test After Deployment

### 1. Health Check
```bash
curl https://comgen.onrender.com/api/health
```

Expected:
```json
{
  "status": "Server is running",
  "timestamp": "2025-11-17T...",
  "service": "combined"
}
```

### 2. Frontend
Visit: `https://comgen.onrender.com`
- Should load your React app
- No CORS errors!

### 3. Full Test
1. Sign up for account
2. Login
3. Browse products
4. Add to cart
5. Checkout (test Razorpay)

---

## 🗄️ Database

- **Location**: `backend/users.json`
- **Type**: JSON file storage
- **Note**: Data resets on redeploy (free tier)

For persistence: Upgrade to paid plan with disk storage

---

## ✅ Benefits of Combined Service

| Benefit | Description |
|---------|-------------|
| **Simpler** | One service to manage |
| **Cheaper** | Free tier for one service |
| **No CORS** | Same domain = no CORS issues |
| **Faster** | No network calls between services |
| **Easier** | Fewer environment variables |

---

## 📊 Environment Variables

### Required (Add Manually)
```env
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
```

### Auto-Generated
```env
JWT_SECRET=xxxxx              # Auto
NODE_ENV=production           # Auto
PORT=10000                    # Auto
```

---

## 🔄 File Changes Made

### Backend (`backend/server.js`)
- ✅ Added static file serving for frontend
- ✅ Serves `frontend/dist` folder
- ✅ Handles React routing (catch-all route)

### Frontend
- ✅ Changed API URLs from `http://localhost:5000` to `/api`
- ✅ Relative URLs work on same domain
- ✅ Files updated:
  - `src/utils/constants.js`
  - `src/context/AuthContext.jsx`
  - `src/components/PaymentButton.jsx`

### Deployment (`frontend/render.yaml`)
- ✅ Build command: Builds frontend + installs backend deps
- ✅ Start command: Starts backend (which serves everything)

---

## 🆘 Troubleshooting

### Build Fails
✅ Check build logs in Render
✅ Verify both `frontend/package.json` and `backend/package.json` exist

### Frontend Shows 404
✅ Ensure frontend built to `dist/`
✅ Check backend serves static files correctly

### API Not Working
✅ Check environment variables set
✅ View logs for startup messages
✅ Test `/api/health` endpoint

---

## 💡 Local Testing

Test the combined setup locally:

```bash
# 1. Build frontend
cd frontend
npm install
npm run build

# 2. Start backend (serves frontend too)
cd ../backend
npm install
node server.js

# 3. Open browser
http://localhost:5000
```

Backend serves both API and frontend!

---

## 📈 Next Steps

### Testing
1. Deploy and test all features
2. Try signup/login
3. Test payments

### Production
1. Add persistent database (MongoDB/PostgreSQL)
2. Switch to Razorpay live keys
3. Upgrade to paid plan ($7/mo)
4. Add monitoring

---

## 💰 Cost

**Current Setup**: FREE
- One web service (free tier)
- Sleeps after 15 min
- Perfect for testing

**Production**: $7/month
- Always on
- Better performance
- Add disk storage (+$1/GB)

---

## ✨ Summary

✅ **One service** instead of two  
✅ **Simpler** deployment  
✅ **No CORS** issues  
✅ **Same domain** for everything  
✅ **Ready to deploy** in ~10 minutes  

**👉 Follow the 3 steps above to deploy now! 🚀**

---

**Last Updated**: November 17, 2025  
**Configuration**: Single Combined Service  
**Services**: 1 (Frontend + Backend)  
**Status**: Ready to Deploy ✅
