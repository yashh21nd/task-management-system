# Deploy to Render - Step by Step Guide

## 🚀 Deploying Your Task Management System to Render

### Prerequisites
1. Create a Render account at [render.com](https://render.com)
2. Install Git and push your code to GitHub/GitLab
3. Have your repository ready

---

## Option 1: Deploy using render.yaml (Recommended)

### Step 1: Create Repository
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit - Task Management System"

# Create GitHub repository and push
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy on Render
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will automatically detect the `render.yaml` file
5. Click **"Apply"** to deploy all services

---

## Option 2: Manual Deployment (Alternative)

### Deploy Backend (Web Service)
1. Go to Render Dashboard
2. Click **"New"** → **"Web Service"**
3. Connect your repository
4. Configure:
   - **Name**: `task-management-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `cd backend && pip install -r requirements.txt`
   - **Start Command**: `cd backend && gunicorn --bind 0.0.0.0:$PORT run:app`
   - **Instance Type**: `Free` (or paid for better performance)

#### Environment Variables:
- `FLASK_ENV`: `production`
- `DATABASE_URL`: (Connect a PostgreSQL database)
- `SECRET_KEY`: (Generate a secure secret key)

### Deploy Frontend (Static Site)
1. Click **"New"** → **"Static Site"**
2. Connect your repository
3. Configure:
   - **Name**: `task-management-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/build`

#### Environment Variables:
- `REACT_APP_API_URL`: `https://YOUR_BACKEND_URL.onrender.com/api`

### Create Database
1. Click **"New"** → **"PostgreSQL"**
2. Name: `task-management-db`
3. Copy the DATABASE_URL to your backend service

---

## 🔧 Configuration Details

### Backend Configuration
- **Port**: Render automatically sets `$PORT`
- **Database**: PostgreSQL (free 100MB limit)
- **CORS**: Configured for your frontend domain

### Frontend Configuration  
- **Build**: Optimized React production build
- **Routing**: SPA routing configured
- **API**: Environment-based API URL

---

## 🧪 Testing Your Deployment

1. **Backend Health Check**: 
   ```
   https://YOUR_BACKEND.onrender.com/api/health
   ```

2. **Frontend**: 
   ```
   https://YOUR_FRONTEND.onrender.com
   ```

3. **Full Flow Test**:
   - Create a task
   - Edit a task  
   - Add comments
   - Delete tasks

---

## 📝 Important Notes

- **Free Tier Limitations**:
  - Services sleep after 15 minutes of inactivity
  - 750 hours/month build time limit
  - PostgreSQL: 100MB storage, 1 month retention

- **Custom Domain**: Available on paid plans

- **Logs**: Available in Render dashboard for debugging

---

## 🚨 Troubleshooting

### Common Issues:
1. **Database Connection**: Ensure DATABASE_URL is set correctly
2. **CORS Errors**: Check frontend URL in backend CORS settings
3. **Build Failures**: Check build logs in Render dashboard

### Support:
- Render Documentation: [render.com/docs](https://render.com/docs)
- Community: [community.render.com](https://community.render.com)

---

## 🎉 Success!

Your Task Management System is now live on Render with:
- ✅ Scalable backend API
- ✅ Optimized frontend 
- ✅ PostgreSQL database
- ✅ HTTPS/SSL certificates
- ✅ Automatic deployments from Git