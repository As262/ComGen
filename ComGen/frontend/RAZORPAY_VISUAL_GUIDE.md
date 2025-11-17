# 🎯 Razorpay Integration - Step-by-Step Visual Guide

## 📋 Overview

This guide walks you through setting up Razorpay payment gateway in your ComGen React e-commerce application with screenshots and detailed steps.

---

## Part 1: Get Razorpay Test API Keys

### Step 1.1: Sign Up / Login to Razorpay

1. Visit: **https://dashboard.razorpay.com/**
2. Click **"Sign Up"** (if new user) or **"Login"**
3. Complete registration with email and password
4. Verify your email address

### Step 1.2: Navigate to API Keys

1. Once logged in, look for **"Settings"** in the left sidebar
2. Click on **"API Keys"** under Settings
3. You'll see a page titled "API Keys"

### Step 1.3: Generate Test Keys

1. Look for **"Test Mode"** toggle (should be ON)
2. Click **"Generate Test Key"** button
3. A modal will appear with your keys

### Step 1.4: Copy Both Keys

You'll see two keys:

```
Key ID: rzp_test_1234567890abcd
Key Secret: [Click "Show" to reveal] → abcdefghijk1234567890
```

**Important:** 
- Copy BOTH keys somewhere safe
- Key Secret will only be shown once
- Don't share these keys publicly

---

## Part 2: Configure Backend

### Step 2.1: Open Backend .env File

1. Navigate to your project: `d:\COMGEN REACT\ComGen\`
2. Open folder: `backend\`
3. Find file: `.env`
4. Open with text editor (VS Code, Notepad++)

### Step 2.2: Add Your Keys

Replace the placeholder values:

**Before:**
```env
RAZORPAY_KEY_ID=rzp_test_your_key_id_here
RAZORPAY_KEY_SECRET=your_key_secret_here
```

**After:**
```env
RAZORPAY_KEY_ID=rzp_test_1234567890abcd
RAZORPAY_KEY_SECRET=abcdefghijk1234567890
```

### Step 2.3: Save the File

- Press `Ctrl + S` to save
- Close the file
- **Do NOT commit this file to Git!**

---

## Part 3: Start Backend Server

### Step 3.1: Open Terminal/Command Prompt

**Option A: VS Code Terminal**
1. In VS Code, press `` Ctrl + ` `` (backtick)
2. Terminal will open at bottom

**Option B: Windows PowerShell**
1. Press `Win + X`
2. Select "Windows PowerShell"

### Step 3.2: Navigate to Backend Directory

```powershell
cd "d:\COMGEN REACT\ComGen\backend"
```

Press Enter.

### Step 3.3: Start Development Server

```powershell
npm run dev
```

Press Enter.

### Step 3.4: Verify Server is Running

You should see:
```
🚀 Server is running on port 5000
📍 API Base URL: http://localhost:5000
💳 Razorpay Integration: Configured
```

**If you see "Configured"** → ✅ Perfect!
**If you see "NOT Configured"** → ❌ Check your `.env` file

### Step 3.5: Test Health Endpoint (Optional)

Open browser and visit:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "status": "Server is running",
  "timestamp": "2025-11-16T..."
}
```

---

## Part 4: Start Frontend Server

### Step 4.1: Open New Terminal

**In VS Code:**
1. Click the `+` icon in terminal panel
2. Or press `` Ctrl + Shift + ` ``

**Or open another PowerShell window**

### Step 4.2: Navigate to Root Directory

```powershell
cd "d:\COMGEN REACT\ComGen"
```

Press Enter.

### Step 4.3: Start Frontend Development Server

```powershell
npm run dev
```

Press Enter.

### Step 4.4: Verify Frontend is Running

You should see:
```
  VITE v7.1.12  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

## Part 5: Test Payment Flow

### Step 5.1: Open Application

1. Open browser (Chrome, Firefox, Edge)
2. Navigate to: **http://localhost:5173/**
3. ComGen homepage should load

### Step 5.2: Add Products to Cart

1. Browse any category (Men, Women, Shoes, Appliances)
2. Click **"Add to Cart"** on any product
3. Notice cart icon updates with item count
4. Add 2-3 products for testing

### Step 5.3: Go to Cart Page

1. Click the **Cart icon** (top right)
2. Cart sidebar should open
3. Click **"View Cart"** button
4. Or directly visit: **http://localhost:5173/cart**

### Step 5.4: Review Cart

You should see:
- List of added products
- Quantities
- Prices
- **Total amount**
- **"Pay ₹XXX.XX" button** (should be visible)

### Step 5.5: Click Payment Button

1. Click the **"Pay ₹XXX.XX"** button
2. Button will show "Processing..." with spinner
3. Razorpay checkout modal will open

**If modal doesn't open:**
- Check browser console (F12) for errors
- Verify backend is running
- Check internet connection

### Step 5.6: Enter Test Card Details

In the Razorpay modal:

1. **Card Number:** `4111 1111 1111 1111`
2. **Expiry Date:** `12/25` (any future date)
3. **CVV:** `123` (any 3 digits)
4. **Cardholder Name:** `Test User` (any name)

### Step 5.7: Complete Payment

1. Click **"Pay Now"** button
2. Payment will be processed (takes 2-3 seconds)
3. Modal will close automatically

### Step 5.8: Verify Success

After successful payment:

✅ Alert message: "Payment Successful! Order ID: order_xxxxx"
✅ Cart automatically cleared (empty cart message)
✅ Cart icon shows 0 items
✅ Console logs payment verification

**Check Browser Console (F12):**
```javascript
Order created successfully: order_xxxxx
Payment verified successfully: pay_xxxxx
Payment verified: { success: true, ... }
```

---

## Part 6: Understanding the Payment Flow

### What Happens Behind the Scenes:

```
1. User clicks "Pay" button
   ↓
2. Frontend sends request to: POST http://localhost:5000/api/create-order
   Body: { amount: 1000, currency: "INR", ... }
   ↓
3. Backend creates order with Razorpay API
   Returns: { order_id: "order_xxxxx", key_id: "rzp_test_xxxxx" }
   ↓
4. Frontend opens Razorpay Checkout modal with order_id
   ↓
5. User enters card details and clicks Pay
   ↓
6. Razorpay processes payment on their servers
   ↓
7. Razorpay returns: 
   - razorpay_order_id
   - razorpay_payment_id
   - razorpay_signature
   ↓
8. Frontend sends to: POST http://localhost:5000/api/verify-payment
   Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
   ↓
9. Backend verifies signature using Key Secret
   Creates: HMAC SHA256 hash
   Compares with received signature
   ↓
10. If match → Payment verified ✅
    If no match → Payment failed ❌
   ↓
11. Frontend clears cart and shows success message
```

---

## Part 7: Testing Different Scenarios

### Test 1: Successful Payment
- Use card: `4111 1111 1111 1111`
- Expected: Payment success, cart cleared

### Test 2: Failed Payment
- Use card: `4000 0000 0000 0002`
- Expected: Payment failed error message

### Test 3: User Cancels Payment
- Open Razorpay modal
- Click the X (close) button
- Expected: Modal closes, payment cancelled

### Test 4: UPI Payment (Test)
- In Razorpay modal, select "UPI"
- Enter: `success@razorpay`
- Expected: Payment success

### Test 5: Net Banking (Test)
- Select "Net Banking"
- Choose any bank
- Enter any credentials
- Expected: Payment success (test mode)

---

## Part 8: Check Backend Logs

### In Backend Terminal:

**Successful Payment:**
```
Order created successfully: order_MxYzABCD1234
Payment verified successfully: pay_MxYzABCD1234
```

**Failed Payment:**
```
Order created successfully: order_MxYzABCD1234
Payment verification failed - signature mismatch
```

**API Errors:**
```
Error creating order: [Error details]
Error verifying payment: [Error details]
```

---

## Part 9: Troubleshooting Common Issues

### Issue 1: "Failed to load Razorpay SDK"

**Cause:** No internet connection or CDN blocked

**Solution:**
1. Check internet connection
2. Disable browser ad blockers
3. Check if `https://checkout.razorpay.com/v1/checkout.js` is accessible
4. Try different browser

### Issue 2: "Failed to create order"

**Cause:** Backend not running or wrong keys

**Solution:**
1. Check backend terminal is running
2. Visit http://localhost:5000/api/health
3. Verify `.env` has correct keys
4. Check keys don't have extra spaces
5. Restart backend server

### Issue 3: "Payment verification failed"

**Cause:** Wrong Key Secret or signature mismatch

**Solution:**
1. Verify `RAZORPAY_KEY_SECRET` in `.env`
2. Make sure Key Secret matches Key ID
3. Check for typos in `.env`
4. Regenerate keys if needed

### Issue 4: CORS Error

**Cause:** Backend CORS not configured

**Solution:**
✅ Already fixed in `server.js`
- Restart backend server
- Clear browser cache
- Check backend shows "CORS enabled"

### Issue 5: Payment button not visible

**Cause:** Component not imported or cart empty

**Solution:**
1. Check browser console (F12) for errors
2. Verify `PaymentButton` imported in `CartPage.jsx`
3. Check cart has items (amount > 0)
4. Restart frontend dev server

### Issue 6: "Invalid key_id"

**Cause:** Wrong API key or using live key in test mode

**Solution:**
1. Verify key starts with `rzp_test_`
2. Copy keys again from Razorpay dashboard
3. Make sure Test Mode is ON in dashboard
4. Check for copy-paste errors

---

## Part 10: Verify Installation

### Checklist:

- [ ] Razorpay account created
- [ ] Test API keys generated
- [ ] Keys added to `backend/.env`
- [ ] Backend dependencies installed (`npm install`)
- [ ] Backend server running on port 5000
- [ ] Backend shows "Razorpay Integration: Configured"
- [ ] Frontend server running on port 5173
- [ ] Can add products to cart
- [ ] Cart page shows payment button
- [ ] Payment button shows correct amount
- [ ] Razorpay modal opens on click
- [ ] Test card payment successful
- [ ] Cart clears after payment
- [ ] Success message displayed
- [ ] Console logs show verification

---

## Part 11: Next Steps

### Immediate:
1. ✅ Test with different payment methods (UPI, Net Banking)
2. ✅ Test payment failure scenarios
3. ✅ Review console logs and API responses

### Short Term:
- [ ] Create order success page
- [ ] Add payment confirmation modal
- [ ] Save order details to database
- [ ] Send email confirmation

### Medium Term:
- [ ] Set up payment webhooks
- [ ] Add order tracking
- [ ] Create user payment history
- [ ] Generate invoices

### Production:
- [ ] Complete Razorpay KYC
- [ ] Get live API keys
- [ ] Deploy backend with HTTPS
- [ ] Update frontend API URL
- [ ] Test with real money (small amount)
- [ ] Monitor transactions

---

## 📞 Support Resources

### Documentation:
- 📖 **Complete Guide:** `RAZORPAY_SETUP_GUIDE.md`
- 🚀 **Quick Start:** `RAZORPAY_QUICKSTART.md`
- 📝 **Reference:** `PAYMENT_INTEGRATION_README.md`

### External Resources:
- 🌐 **Razorpay Docs:** https://razorpay.com/docs/
- 💳 **Checkout Guide:** https://razorpay.com/docs/payments/payment-gateway/web-integration/
- 🧪 **Test Cards:** https://razorpay.com/docs/payments/payments/test-card-upi-details/
- 🆘 **Support:** https://razorpay.com/support/

---

## 🎉 Congratulations!

You've successfully integrated Razorpay payment gateway into your React e-commerce application!

### What You've Achieved:
✅ Full payment flow implementation
✅ Secure signature verification
✅ Error handling and validation
✅ Test mode payment processing
✅ User-friendly payment interface
✅ Cart management integration

### Your Application Now Has:
💳 Professional payment gateway
🔒 Secure payment processing
✨ Smooth user experience
📱 Mobile-responsive checkout
🎯 Production-ready code

---

**Ready to accept payments! 💰**

**Next: Test with different payment methods and prepare for production! 🚀**
