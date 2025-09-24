# Deploy to Vercel (Frontend) + Render (Backend)

## 🚀 Complete Deployment Guide: Vercel + Render

This guide will help you deploy your Task Management System with:
- **Frontend**: Vercel (React optimized)
- **Backend**: Render (Flask API with PostgreSQL)

---

## Part 1: Deploy Backend to Render

### Step 1: Create Render Account
1. Go to [render.com](https://render.com) and sign up
2. Connect your GitHub account

### Step 2: Deploy Backend Web Service
1. Click **"New"** → **"Web Service"**
2. Connect your GitHub repository: `yashh21nd/task-management-system`
3. Configure the service:

   **Basic Settings:**
   - **Name**: `task-management-backend`
   - **Environment**: `Python 3`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`

   **Build & Deploy:**
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn --bind 0.0.0.0:$PORT run:app`

4. **Environment Variables** (Add these):
   ```
   FLASK_ENV=production
   SECRET_KEY=your-super-secret-key-generate-random-string
   DATABASE_URL=(will be auto-set when you add database)
   FRONTEND_URL=https://task-management-system.vercel.app
   ```

### Step 3: Add PostgreSQL Database
1. In Render dashboard, click **"New"** → **"PostgreSQL"**
2. **Name**: `task-management-db`
3. **Database**: `taskmanagement`  
4. **User**: `taskuser`
5. Click **"Create Database"**

### Step 4: Connect Database to Backend
1. Go to your backend service settings
2. In Environment Variables, add:
   ```
   DATABASE_URL=<copy-from-database-internal-url>
   ```
3. Save and redeploy

**Your backend will be available at**: `https://task-management-backend.onrender.com`

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Install Vercel CLI (Optional)
```bash
npm i -g vercel
```

### Step 2: Deploy via Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click **"New Project"**
3. Import your GitHub repository: `yashh21nd/task-management-system`
4. Configure:

   **Project Settings:**
   - **Project Name**: `task-management-system`
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

5. **Environment Variables**:
   ```
   REACT_APP_API_URL=https://task-management-backend.onrender.com/api
   ```

6. Click **"Deploy"**

### Step 3: Alternative - Deploy via CLI
```bash
cd frontend
vercel --prod
```

**Your frontend will be available at**: `https://task-management-system.vercel.app`

---

## Part 3: Final Configuration

### Update CORS in Backend
After frontend deployment, update your backend CORS settings:

1. Go to Render backend service
2. Add environment variable:
   ```
   FRONTEND_URL=https://task-management-system.vercel.app
   ```

### Test the Application
1. Visit your frontend URL: `https://task-management-system.vercel.app`
2. Test all functionality:
   - ✅ Create tasks
   - ✅ Edit tasks
   - ✅ Delete tasks
   - ✅ Add comments
   - ✅ View about page

---

## 🔧 Configuration Summary

### Render Backend Service:
- **URL**: `https://task-management-backend.onrender.com`
- **Database**: PostgreSQL (100MB free)
- **Environment**: Python 3 with Flask + Gunicorn

### Vercel Frontend:
- **URL**: `https://task-management-system.vercel.app`
- **Framework**: React (optimized build)
- **CDN**: Global edge network

### Environment Variables:

**Render (Backend):**
```
FLASK_ENV=production
SECRET_KEY=your-generated-secret-key
DATABASE_URL=postgresql://user:pass@host:port/db
FRONTEND_URL=https://task-management-system.vercel.app
```

**Vercel (Frontend):**
```
REACT_APP_API_URL=https://task-management-backend.onrender.com/api
```

---

## 🚀 Benefits of This Setup

✅ **Vercel for Frontend:**
- Lightning-fast React deployments
- Global CDN
- Automatic HTTPS
- Easy custom domains
- Instant deployments on git push

✅ **Render for Backend:**
- Free PostgreSQL database
- Automatic SSL certificates  
- Easy scaling options
- Built-in monitoring
- Zero-config deployments

---

## 🔍 Troubleshooting

### Common Issues:

1. **CORS Errors**: 
   - Ensure `FRONTEND_URL` is set correctly in backend
   - Check that `REACT_APP_API_URL` points to correct backend

2. **Database Connection**: 
   - Verify `DATABASE_URL` is set in backend service
   - Check database service is running

3. **Build Failures**:
   - **Frontend**: Check build logs in Vercel dashboard
   - **Backend**: Check deploy logs in Render dashboard

### Getting Help:
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Render Docs**: [render.com/docs](https://render.com/docs)

---

## 🎉 Success!

Your Task Management System is now live with:
- ⚡ **Fast frontend** on Vercel's global CDN
- 🔒 **Secure backend** API on Render with PostgreSQL
- 🌍 **HTTPS everywhere** with automatic SSL
- 🚀 **Auto-deployments** on every git push

**Frontend**: https://task-management-system.vercel.app
**Backend**: https://task-management-backend.onrender.com/api