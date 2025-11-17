const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the frontend dist directory
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

// Import routes
const authRoutes = require('./auth');

// Initialize Razorpay instance (only if credentials are provided)
let razorpay = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'Server is running', 
        timestamp: new Date().toISOString(),
        service: 'combined'
    });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Create Razorpay Order
app.post('/api/create-order', async (req, res) => {
    try {
        if (!razorpay) {
            return res.status(503).json({
                success: false,
                message: 'Payment service not configured'
            });
        }

        const { amount, currency, receipt, notes } = req.body;

        // Validate required fields
        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid amount. Amount must be greater than 0'
            });
        }

        // Create order options
        const options = {
            amount: amount * 100, // Convert to paise (smallest currency unit)
            currency: currency || 'INR',
            receipt: receipt || `receipt_${Date.now()}`,
            notes: notes || {}
        };

        // Create order with Razorpay
        const order = await razorpay.orders.create(options);

        console.log('Order created successfully:', order.id);

        res.json({
            success: true,
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            key_id: process.env.RAZORPAY_KEY_ID
        });

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create order',
            error: error.message
        });
    }
});

// Verify Razorpay Payment Signature
app.post('/api/verify-payment', (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        // Validate required fields
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Missing required payment details'
            });
        }

        // Create signature verification string
        const sign = razorpay_order_id + '|' + razorpay_payment_id;

        // Generate expected signature
        const expectedSign = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest('hex');

        // Verify signature
        if (razorpay_signature === expectedSign) {
            console.log('Payment verified successfully:', razorpay_payment_id);
            
            // Here you can save payment details to your database
            // Example: await savePaymentToDatabase({ order_id, payment_id, status: 'success' });

            res.json({
                success: true,
                message: 'Payment verified successfully',
                order_id: razorpay_order_id,
                payment_id: razorpay_payment_id
            });
        } else {
            console.error('Payment verification failed - signature mismatch');
            res.status(400).json({
                success: false,
                message: 'Payment verification failed'
            });
        }

    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({
            success: false,
            message: 'Payment verification error',
            error: error.message
        });
    }
});

// Get payment details (optional - for checking payment status)
app.get('/api/payment/:paymentId', async (req, res) => {
    try {
        const { paymentId } = req.params;
        
        const payment = await razorpay.payments.fetch(paymentId);
        
        res.json({
            success: true,
            payment
        });
    } catch (error) {
        console.error('Error fetching payment:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch payment details',
            error: error.message
        });
    }
});

// Serve frontend - Handle React routing (must be after all API routes)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: err.message
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Combined Server is running on port ${PORT}`);
    console.log(`📍 API Base URL: http://localhost:${PORT}/api`);
    console.log(`🌐 Frontend: http://localhost:${PORT}`);
    console.log(`💳 Razorpay Integration: ${process.env.RAZORPAY_KEY_ID ? 'Configured' : 'NOT Configured'}`);
});

module.exports = app;
