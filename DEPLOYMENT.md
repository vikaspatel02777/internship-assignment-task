# 🚀 Deployment Guide

## 📦 Production Deployment Options

### Option 1: Vercel (Frontend) + MongoDB Atlas (Database) + Render (Backend)

#### 1. Frontend Deployment (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd frontend
vercel --prod
```

**Environment Variables (Vercel):**
```
VITE_API_URL=https://your-backend-url.onrender.com
```

#### 2. Backend Deployment (Render)
```bash
# Create render.yaml in backend root
services:
  - type: web
    name: task-manager-api
    env: node
    buildCommand: npm install
    startCommand: node server.js
    envVars:
      - key: MONGO_URI
        value: mongodb+srv://username:password@cluster.mongodb.net/taskmanager
      - key: JWT_SECRET
        value: your-super-secret-jwt-key
      - key: PORT
        value: 5000
```

#### 3. Database Setup (MongoDB Atlas)
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create free cluster
3. Get connection string
4. Add to backend environment variables

---

### Option 2: Railway (Full Stack)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up
```

**Environment Variables:**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
```

---

### Option 3: DigitalOcean App Platform

1. Create `app.yaml`:
```yaml
name: task-manager
services:
- name: api
  source_dir: backend
  github:
    repo: your-username/task-manager
    branch: main
  run_command: node server.js
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: MONGO_URI
    value: ${DATABASE_URL}
  - key: JWT_SECRET
    value: ${JWT_SECRET}
  - key: PORT
    value: 5000

- name: frontend
  source_dir: frontend
  github:
    repo: your-username/task-manager
    branch: main
  build_command: npm run build
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: VITE_API_URL
    value: ${_self.URL}/api
```

---

## 🔧 Production Configuration

### Frontend Production Build
```bash
cd frontend
npm run build
```

### Backend Production Setup
```bash
cd backend
npm install --production
```

### Environment Variables (.env)
```env
# Production
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
```

---

## 🛡️ Security Considerations

### 1. CORS Configuration
```javascript
// backend/server.js
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'https://yourdomain.com'],
  credentials: true
}));
```

### 2. Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 3. Helmet Security Headers
```javascript
const helmet = require('helmet');
app.use(helmet());
```

---

## 📊 Monitoring & Logging

### 1. Error Logging
```javascript
// backend/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
};

app.use(errorHandler);
```

### 2. Health Check Endpoint
```javascript
// backend/server.js
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});
```

---

## 🚀 Quick Deploy Script

Create `deploy.sh`:
```bash
#!/bin/bash

echo "🚀 Deploying Task Manager..."

# Frontend
echo "📦 Building frontend..."
cd frontend
npm run build
vercel --prod

# Backend
echo "🔧 Deploying backend..."
cd ../backend
git add .
git commit -m "Deploy to production"
git push origin main

echo "✅ Deployment complete!"
```

Make executable:
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 🎯 Production Checklist

- [ ] Environment variables configured
- [ ] Database connection tested
- [ ] CORS properly configured
- [ ] HTTPS enabled
- [ ] Error handling implemented
- [ ] Rate limiting configured
- [ ] Security headers added
- [ ] Health check endpoint
- [ ] Monitoring/logging setup
- [ ] Domain configured
- [ ] SSL certificate active

---

## 📞 Support

**Deployment Issues?**
1. Check environment variables
2. Verify database connection
3. Check CORS configuration
4. Review error logs
5. Test API endpoints

**Performance Optimization:**
1. Enable database indexing
2. Implement caching
3. Use CDN for static assets
4. Optimize bundle size
5. Monitor performance metrics

---

**🎉 Your application is now production-ready!** 🚀
