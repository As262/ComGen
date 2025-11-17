# 🛒 ComGen - Modern E-commerce Platform

A full-stack e-commerce web application with React frontend, Node.js backend, user authentication, and Razorpay payment integration.

![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![React](https://img.shields.io/badge/React-19.x-blue)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![License](https://img.shields.io/badge/license-ISC-yellow)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Features

### Frontend
- 🎨 Modern, responsive UI with React 19
- 🛍️ Product catalog with categories (Men, Women, Shoes, Appliances)
- 🔍 Search functionality with filters
- 🛒 Shopping cart management
- 👤 User authentication (Signup/Login)
- 💳 Razorpay payment integration
- 📱 Mobile-responsive design
- 🎯 React Router for navigation

### Backend
- 🔐 JWT-based authentication
- 📊 JSON file-based database
- 💰 Razorpay payment processing
- 🔒 Password hashing with bcrypt
- ✅ Input validation
- 🌐 CORS enabled
- 📝 RESTful API

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Routing**: React Router DOM 7.9.4
- **Styling**: CSS3
- **Icons**: Lucide React
- **Email**: EmailJS
- **HTTP Server**: Express 4.21.2

### Backend
- **Runtime**: Node.js 20.x
- **Framework**: Express 4.18.2
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcryptjs
- **Validation**: Express Validator
- **Payment**: Razorpay
- **Database**: JSON file storage
- **Environment**: dotenv

---

## 📁 Project Structure

```
ComGen/
├── frontend/                    # React frontend application
│   ├── public/                 # Static assets
│   │   └── women images/       # Product images
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── CartSidebar.jsx
│   │   │   ├── PaymentButton.jsx
│   │   │   └── ...
│   │   ├── pages/              # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   └── ...
│   │   ├── context/            # React Context
│   │   │   ├── AuthContext.jsx
│   │   │   ├── CartContext.jsx
│   │   │   └── ProductContext.jsx
│   │   ├── hooks/              # Custom hooks
│   │   ├── utils/              # Utility functions
│   │   │   └── constants.js
│   │   ├── data/               # Product data
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # Entry point
│   ├── dist/                   # Build output
│   ├── package.json
│   ├── vite.config.js
│   └── render.yaml             # Render deployment config
│
├── backend/                     # Node.js backend server
│   ├── server.js               # Main server file
│   ├── auth.js                 # Authentication routes
│   ├── database.js             # JSON database handler
│   ├── users.json              # User data (auto-generated)
│   ├── .env.example            # Environment template
│   ├── .env                    # Environment variables (create this)
│   └── package.json
│
└── README.md                    # This file
```

---

## ✅ Prerequisites

Before installing, ensure you have the following installed on your machine:

### Required
- **Node.js**: Version 20.x or higher
  - Download: https://nodejs.org/
  - Verify: `node --version`
- **npm**: Version 10.x or higher (comes with Node.js)
  - Verify: `npm --version`
- **Git**: For cloning the repository
  - Download: https://git-scm.com/
  - Verify: `git --version`

### Optional (for development)
- **VS Code** or any code editor
- **Postman** or similar for API testing

---

## 📦 Installation

Follow these steps to set up the project on a new machine:

### Step 1: Clone the Repository

```bash
git clone https://github.com/As262/ComGen.git
cd ComGen/ComGen
```

### Step 2: Install Frontend Dependencies

```bash
cd frontend
npm install
```

This will install all frontend dependencies including React, Vite, and other packages.

### Step 3: Install Backend Dependencies

```bash
cd ../backend
npm install
```

This will install Express, JWT, Razorpay, and other backend dependencies.

### Step 4: Configure Environment Variables

Create a `.env` file in the `backend` folder:

```bash
# In the backend folder
cp .env.example .env
```

Edit the `.env` file with your credentials:

```env
# Razorpay API Keys (Get from https://dashboard.razorpay.com/)
RAZORPAY_KEY_ID=rzp_test_your_key_id_here
RAZORPAY_KEY_SECRET=your_secret_key_here

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret (generate a random string)
JWT_SECRET=your_random_secret_key_here
```

**To generate a JWT secret:**
```bash
# On Linux/Mac
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### Step 5: Get Razorpay API Keys

1. Sign up at https://razorpay.com/
2. Go to Dashboard → Settings → API Keys
3. Generate Test Keys
4. Copy `Key ID` and `Key Secret` to your `.env` file

---

## 🚀 Running the Application

### Option 1: Run Both Servers Separately (Development)

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:5173`

**Terminal 2 - Backend:**
```bash
cd backend
npm start
```
Backend runs on: `http://localhost:5000`

### Option 2: Run Combined Server (Production Mode)

This is how it runs on Render - backend serves both API and frontend.

**Step 1: Build Frontend**
```bash
cd frontend
npm run build
```

**Step 2: Start Backend (serves both)**
```bash
cd ../backend
node server.js
```

Access everything on: `http://localhost:5000`

---

## ⚙️ Configuration

### Frontend Configuration

The frontend uses relative API URLs (configured in `src/utils/constants.js`):

```javascript
export const API_BASE_URL = '/api';
```

This works because the backend serves the frontend in production.

### Backend Configuration

The backend serves:
- **API Routes**: `/api/*`
- **Static Files**: Frontend build from `/frontend/dist`
- **React Router**: Catch-all route for SPA

---

## 🌐 Deployment

### Deploy to Render

The project is configured for single-service deployment on Render.

**Automatic Deployment:**

1. Push your code to GitHub
2. Go to https://dashboard.render.com/
3. New → Blueprint
4. Select your repository
5. Render will use `frontend/render.yaml` configuration

**Manual Steps After Deployment:**

1. Add environment variables in Render dashboard:
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
   - `JWT_SECRET` (auto-generated)

2. Your app will be live at: `https://your-app.onrender.com`

**See detailed guides:**
- `SINGLE_SERVICE_DEPLOYMENT.md`
- `BUILD_ERROR_FIXED.md`

---

## 📡 API Documentation

### Base URL
- Development: `http://localhost:5000/api`
- Production: `https://your-app.onrender.com/api`

### Authentication Endpoints

#### Sign Up
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account created successfully!",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Verify Token
```http
GET /api/auth/verify
Authorization: Bearer {token}
```

#### Check Email
```http
POST /api/auth/check-email
Content-Type: application/json

{
  "email": "john@example.com"
}
```

### Payment Endpoints

#### Create Order
```http
POST /api/create-order
Content-Type: application/json

{
  "amount": 1000,
  "currency": "INR",
  "receipt": "order_001"
}
```

#### Verify Payment
```http
POST /api/verify-payment
Content-Type: application/json

{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "signature_xxx"
}
```

### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "Server is running",
  "timestamp": "2025-11-17T...",
  "service": "combined"
}
```

---

## 🧪 Testing

### Test Razorpay Payment

Use these test card details:

**Success:**
- Card Number: `4111 1111 1111 1111`
- CVV: `123`
- Expiry: Any future date

**Failure:**
- Card Number: `4000 0000 0000 0002`

More test cards: https://razorpay.com/docs/payments/payments/test-card-details/

### Test User Flow

1. **Sign Up**: Create a new account
2. **Login**: Login with credentials
3. **Browse**: Navigate through product categories
4. **Cart**: Add products to cart
5. **Checkout**: Complete payment with test card

---

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Error: Port 5000 already in use

# Solution (Windows):
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Solution (Linux/Mac):
lsof -ti:5000 | xargs kill
```

#### Module Not Found
```bash
# Error: Cannot find module 'xyz'

# Solution: Reinstall dependencies
cd frontend && npm install
cd ../backend && npm install
```

#### Razorpay Not Configured
```bash
# Error: Payment service not configured

# Solution: Check .env file has correct keys
# Verify RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET
```

#### Database File Missing
```bash
# Error: Cannot read users.json

# Solution: File is auto-created on first run
# Or create manually: {"users": [], "nextId": 1}
```

#### Build Fails
```bash
# Error: Build failed

# Solution 1: Clear cache
rm -rf node_modules package-lock.json
npm install

# Solution 2: Check Node version
node --version  # Should be 20.x or higher
```

### Environment Issues

If environment variables aren't loading:

1. Verify `.env` file exists in `backend/` folder
2. Check file has correct format (no quotes around values)
3. Restart the backend server
4. Check for typos in variable names

---

## 📚 Additional Resources

### Documentation
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [Razorpay API Docs](https://razorpay.com/docs/api/)
- [Render Deployment](https://render.com/docs)

### Project Guides
- `SINGLE_SERVICE_DEPLOYMENT.md` - Deployment guide
- `backend/DATABASE_MIGRATION.md` - Database information
- `frontend/RAZORPAY_SETUP_GUIDE.md` - Payment setup

---

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

ISC License

---

## 🆘 Support

For issues and questions:
- GitHub Issues: https://github.com/As262/ComGen/issues
- Email: hello@ComGenZ.com

---

## ✅ Quick Start Checklist

- [ ] Node.js 20.x installed
- [ ] Repository cloned
- [ ] Frontend dependencies installed (`cd frontend && npm install`)
- [ ] Backend dependencies installed (`cd backend && npm install`)
- [ ] `.env` file created in backend
- [ ] Razorpay keys added to `.env`
- [ ] JWT secret added to `.env`
- [ ] Frontend running (`npm run dev`)
- [ ] Backend running (`npm start`)
- [ ] Tested signup/login
- [ ] Tested payment with test card

---

**Built with ❤️ using React and Node.js**

**Last Updated**: November 17, 2025
