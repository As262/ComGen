# Razorpay Payment Gateway Integration Guide

## 📋 Overview
This guide will help you integrate Razorpay payment gateway into your ComGen e-commerce React application.

## 🚀 Quick Start

### Backend Setup

1. **Navigate to backend directory and install dependencies:**
```bash
cd backend
npm install
```

2. **Get your Razorpay API keys:**
   - Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
   - Sign up or log in
   - Go to Settings → API Keys
   - Generate Test Keys (for development)
   - Copy the `Key ID` (format: rzp_test_xxxxx) and `Key Secret`

3. **Configure environment variables:**
   - Open `backend/.env`
   - Replace the placeholder values:
   ```env
   RAZORPAY_KEY_ID=rzp_test_your_actual_key_id
   RAZORPAY_KEY_SECRET=your_actual_key_secret
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the backend server:**
```bash
npm run dev
# Or for production:
npm start
```

The server will start at `http://localhost:5000`

### Frontend Setup

1. **Navigate back to root directory:**
```bash
cd ..
```

2. **Install frontend dependencies (if not already installed):**
```bash
npm install
```

3. **Start the frontend development server:**
```bash
npm run dev
```

The app will start at `http://localhost:5173`

## 🧪 Testing Payment Flow

### Test Mode Credentials
Use these test cards provided by Razorpay:

**Successful Payment:**
- Card Number: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date
- Name: Any name

**Failed Payment:**
- Card Number: `4000 0000 0000 0002`
- CVV: Any 3 digits
- Expiry: Any future date

**Other Payment Methods:**
- UPI: Use `success@razorpay` for successful payment
- Netbanking: Select any bank, use any credentials
- Wallets: All test mode wallets work

### Testing Steps:

1. **Add items to cart:**
   - Browse products on Men/Women/Shoes/Appliances pages
   - Click "Add to Cart" on any product
   - Go to Cart page

2. **Initiate payment:**
   - Click the "Pay ₹XXX.XX" button
   - Razorpay checkout modal will open

3. **Complete payment:**
   - Enter test card details
   - Click "Pay Now"
   - Payment will be verified automatically
   - Cart will be cleared on success

4. **Check console logs:**
   - Open browser DevTools (F12)
   - Check Console tab for payment logs
   - Check Network tab for API calls

## 📁 Project Structure

```
ComGen/
├── backend/
│   ├── server.js           # Express server with Razorpay endpoints
│   ├── package.json        # Backend dependencies
│   └── .env                # Environment variables (API keys)
│
├── src/
│   ├── components/
│   │   ├── PaymentButton.jsx    # React payment component
│   │   └── PaymentButton.css    # Payment button styles
│   │
│   └── pages/
│       └── CartPage.jsx          # Updated with payment integration
```

## 🔑 API Endpoints

### 1. Create Order
```
POST http://localhost:5000/api/create-order

Request Body:
{
  "amount": 1000,           // Amount in rupees
  "currency": "INR",        // Optional, defaults to INR
  "receipt": "order_123",   // Optional
  "notes": {}               // Optional metadata
}

Response:
{
  "success": true,
  "order_id": "order_xxxxx",
  "amount": 100000,         // Amount in paise
  "currency": "INR",
  "key_id": "rzp_test_xxxxx"
}
```

### 2. Verify Payment
```
POST http://localhost:5000/api/verify-payment

Request Body:
{
  "razorpay_order_id": "order_xxxxx",
  "razorpay_payment_id": "pay_xxxxx",
  "razorpay_signature": "signature_xxxxx"
}

Response:
{
  "success": true,
  "message": "Payment verified successfully",
  "order_id": "order_xxxxx",
  "payment_id": "pay_xxxxx"
}
```

### 3. Health Check
```
GET http://localhost:5000/api/health

Response:
{
  "status": "Server is running",
  "timestamp": "2025-11-16T10:30:00.000Z"
}
```

## 🔧 Configuration Options

### PaymentButton Component Props:

```jsx
<PaymentButton 
  amount={1000}                          // Required: Amount in rupees
  orderId="ORDER_123"                    // Optional: Custom order ID
  onSuccess={(data) => console.log(data)} // Optional: Success callback
  onFailure={(error) => console.log(error)} // Optional: Failure callback
  disabled={false}                       // Optional: Disable button
/>
```

### Razorpay Checkout Options:

Customize in `PaymentButton.jsx`:

```javascript
const options = {
  key: orderData.key_id,
  amount: orderData.amount,
  currency: orderData.currency,
  name: 'ComGen E-Commerce',           // Your business name
  description: 'Purchase from ComGen', // Description
  image: '/logo.png',                  // Your logo URL
  order_id: orderData.order_id,
  theme: {
    color: '#744e3e'                   // Brand color
  },
  prefill: {
    name: 'Customer Name',
    email: 'customer@example.com',
    contact: '9999999999'
  }
};
```

## 🔒 Security Best Practices

1. **Never expose Key Secret on frontend**
   - Key Secret should ONLY be in backend `.env`
   - Only Key ID is sent to frontend

2. **Always verify payment signature on backend**
   - Never trust frontend payment status alone
   - Always use `/verify-payment` endpoint

3. **Use HTTPS in production**
   - Razorpay requires HTTPS for live mode
   - Use SSL certificates for your domain

4. **Store payment logs**
   - Log all transactions in database
   - Keep order_id and payment_id for reconciliation

5. **Handle webhooks (optional but recommended)**
   - Set up Razorpay webhooks for automatic updates
   - Verify webhook signatures

## 🐛 Troubleshooting

### Issue: "Failed to load Razorpay SDK"
**Solution:** Check internet connection. The Razorpay script loads from CDN.

### Issue: "Failed to create order"
**Solutions:**
- Check if backend server is running
- Verify `.env` has correct API keys
- Check console for error messages
- Ensure amount is greater than 0

### Issue: "Payment verification failed"
**Solutions:**
- Check if Key Secret in `.env` is correct
- Verify signature generation logic
- Check backend logs for errors

### Issue: CORS errors
**Solution:** Backend already has CORS enabled. If still facing issues:
```javascript
// In backend/server.js
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));
```

### Issue: "Invalid key_id"
**Solution:** 
- Ensure you're using test keys in development
- Key ID should start with `rzp_test_`
- Generate new keys from Razorpay dashboard

## 📦 Dependencies

### Backend:
```json
{
  "express": "^4.18.2",      // Web server
  "razorpay": "^2.9.2",      // Razorpay SDK
  "cors": "^2.8.5",          // CORS middleware
  "dotenv": "^16.3.1",       // Environment variables
  "nodemon": "^3.0.1"        // Dev dependency
}
```

### Frontend:
- React 19.1.1 (already installed)
- Razorpay Checkout script (loaded via CDN)

## 🚀 Going to Production

1. **Get Live API Keys:**
   - Go to Razorpay Dashboard
   - Complete KYC verification
   - Generate Live Keys (format: rzp_live_xxxxx)

2. **Update environment variables:**
   ```env
   RAZORPAY_KEY_ID=rzp_live_your_live_key
   RAZORPAY_KEY_SECRET=your_live_secret
   NODE_ENV=production
   ```

3. **Update frontend API URL:**
   - Replace `http://localhost:5000` with your production backend URL
   - Use environment variables for API URLs

4. **Deploy backend:**
   - Deploy to Heroku, AWS, DigitalOcean, etc.
   - Ensure HTTPS is enabled
   - Set environment variables on hosting platform

5. **Set up webhooks:**
   - Go to Razorpay Dashboard → Webhooks
   - Add your webhook URL: `https://your-domain.com/api/webhook`
   - Select events to listen to
   - Save webhook secret

6. **Test thoroughly:**
   - Test all payment scenarios
   - Test with real small amounts first
   - Verify payment settlement

## 📞 Support

- **Razorpay Documentation:** https://razorpay.com/docs/
- **API Reference:** https://razorpay.com/docs/api/
- **Support:** https://razorpay.com/support/

## ✅ Checklist

- [ ] Backend server installed and running
- [ ] Razorpay test API keys added to `.env`
- [ ] Frontend can connect to backend
- [ ] Test payment successful with test card
- [ ] Payment verification working
- [ ] Cart clears after successful payment
- [ ] Error handling tested
- [ ] Console logs reviewed
- [ ] Ready for production deployment

## 💡 Next Steps

1. **Add Order Success Page:**
   - Create `/order-success` route
   - Show order details and payment info
   - Add download invoice option

2. **Save Orders to Database:**
   - Add database (MongoDB, PostgreSQL)
   - Store order details after payment
   - Link orders to user accounts

3. **Add Payment History:**
   - Create user dashboard
   - Show payment history
   - Add order tracking

4. **Email Notifications:**
   - Send order confirmation emails
   - Add payment receipts
   - Use services like SendGrid or AWS SES

5. **Webhook Integration:**
   - Handle payment status updates
   - Process refunds
   - Manage failed payments

---

**Happy Coding! 🎉**
