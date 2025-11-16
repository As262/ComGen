# Razorpay Integration Quick Start

## 🚀 Installation Commands

### Backend Setup
```powershell
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure .env file (IMPORTANT: Add your Razorpay keys)
# Edit backend/.env and add your actual API keys

# Start backend server
npm run dev
```

### Frontend Setup
```powershell
# Navigate back to root (in a new terminal)
cd ..

# Frontend dependencies already installed
# Start frontend development server
npm run dev
```

## 🔑 Get Razorpay Test Keys

1. Go to: https://dashboard.razorpay.com/
2. Sign up / Log in
3. Go to: Settings → API Keys
4. Click "Generate Test Key"
5. Copy both:
   - Key ID (starts with `rzp_test_`)
   - Key Secret

6. Paste them in `backend/.env`:
   ```
   RAZORPAY_KEY_ID=rzp_test_your_key_here
   RAZORPAY_KEY_SECRET=your_secret_here
   ```

## 🧪 Test Payment

### Test Card Details (Always Works):
- **Card Number:** `4111 1111 1111 1111`
- **CVV:** `123`
- **Expiry:** `12/25`
- **Name:** Any name

### Steps:
1. Open http://localhost:5173
2. Add products to cart
3. Go to Cart page
4. Click "Pay ₹XXX.XX"
5. Enter test card details
6. Complete payment
7. Cart will clear automatically!

## 📁 Files Created

```
ComGen/
├── backend/
│   ├── server.js              ✅ Express server
│   ├── package.json           ✅ Dependencies
│   └── .env                   ⚠️  Add your keys here!
│
└── src/
    ├── components/
    │   ├── PaymentButton.jsx  ✅ Payment component
    │   └── PaymentButton.css  ✅ Styles
    │
    └── pages/
        └── CartPage.jsx       ✅ Updated with payment

Documentation:
├── RAZORPAY_SETUP_GUIDE.md    ✅ Complete guide
└── RAZORPAY_QUICKSTART.md     ✅ This file
```

## ⚠️ IMPORTANT: Before Testing

1. **Install backend dependencies:**
   ```powershell
   cd backend
   npm install
   ```

2. **Add Razorpay keys to backend/.env:**
   ```
   RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxx
   ```

3. **Start BOTH servers:**
   - Backend: `cd backend && npm run dev` (Terminal 1)
   - Frontend: `npm run dev` (Terminal 2)

## ✅ Verification Checklist

- [ ] Backend dependencies installed (`cd backend && npm install`)
- [ ] Razorpay keys added to `.env`
- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] Can add items to cart
- [ ] Payment button visible on cart page
- [ ] Razorpay modal opens on click
- [ ] Test payment completes successfully
- [ ] Cart clears after payment

## 🆘 Quick Troubleshooting

**Problem:** Backend won't start
- Run: `cd backend && npm install`
- Check: Razorpay keys in `.env`

**Problem:** "Failed to create order"
- Check: Backend server is running
- Check: Keys are correct in `.env`
- Check: No typos in key values

**Problem:** Payment button not showing
- Check: Frontend dev server restarted
- Check: No console errors (F12)

**Problem:** CORS error
- Check: Backend has CORS enabled (already done)
- Check: Backend URL is `http://localhost:5000`

## 📞 Need Help?

See `RAZORPAY_SETUP_GUIDE.md` for detailed documentation!

---

**Ready? Start with backend installation! 🚀**
