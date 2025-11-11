# 🚀 Deploy ComGen to Render

## ✅ Pre-Deployment Checklist

Your project is now configured for Render deployment with:
- ✅ Express.js server for production
- ✅ Build scripts configured
- ✅ React Router redirects setup
- ✅ Node version specified

## 📋 Deployment Steps

### Step 1: Push to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Ready for Render deployment"
   ```

2. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Create a new repository named "ComGen"
   - Don't initialize with README (you already have files)

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/ComGen.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy on Render

1. **Sign up/Login to Render**:
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the "ComGen" repository

3. **Configure Service**:
   - **Name**: `comgen` (or any name you prefer)
   - **Environment**: `Node`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

4. **Environment Variables** (Optional):
   Click "Advanced" and add:
   - `NODE_VERSION` = `18.17.0`

5. **Click "Create Web Service"**

### Step 3: Wait for Deployment

- Render will automatically:
  1. Clone your repository
  2. Install dependencies (`npm install`)
  3. Build your React app (`npm run build`)
  4. Start the server (`npm start`)
  
- First deploy takes 2-5 minutes
- You'll get a URL like: `https://comgen.onrender.com`

### Step 4: Configure EmailJS (Important!)

After deployment, update your EmailJS template settings:
1. Go to EmailJS dashboard
2. Update allowed origins to include your Render URL:
   - `https://comgen.onrender.com`
   - `http://localhost:5173` (for local dev)

## 🔧 Local Testing (Before Deploy)

Test the production build locally:

```bash
# Build the project
npm run build

# Start the production server
npm start

# Visit http://localhost:3000
```

## 📝 Files Created for Deployment

- `server.js` - Express server for production
- `render.yaml` - Render configuration
- `.node-version` - Node version specification
- `public/_redirects` - React Router fallback
- Updated `package.json` with Express and start script

## 🌐 After Deployment

Your app will be live at: `https://YOUR-APP-NAME.onrender.com`

### Custom Domain (Optional)
1. Go to Render Dashboard → Your Service → Settings
2. Scroll to "Custom Domains"
3. Add your domain
4. Update DNS records as instructed

## 🔄 Automatic Deployments

Render automatically redeploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push

# Render will auto-deploy in ~2 minutes
```

## ⚠️ Important Notes

1. **Free Tier Limitations**:
   - App spins down after 15 min of inactivity
   - First request after spin-down takes ~30 seconds
   - 750 hours/month free (enough for one service)

2. **Environment Variables**:
   - Don't commit sensitive data (API keys, etc.)
   - Add them in Render Dashboard → Environment

3. **Build Time**:
   - First build: 2-5 minutes
   - Subsequent builds: 1-3 minutes

## 🐛 Troubleshooting

### Build Fails
- Check Render logs for errors
- Verify `package.json` scripts
- Ensure all dependencies are in `dependencies` (not `devDependencies`)

### App Shows 404
- Check `_redirects` file is in `public/` folder
- Verify `server.js` is serving from `dist/` folder

### Blank Page
- Check browser console for errors
- Verify build completed successfully
- Check if API calls use relative URLs (not localhost)

### Email Not Sending
- Update EmailJS allowed origins
- Check EmailJS Service ID, Template ID, Public Key
- Verify CORS settings

## 📞 Support

- Render Docs: https://render.com/docs
- Render Community: https://community.render.com
- Your App Logs: Render Dashboard → Logs

---

**Ready to deploy?** Follow Step 1 above! 🚀
