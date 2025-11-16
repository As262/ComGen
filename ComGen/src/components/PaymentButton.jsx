import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import useToast from '../hooks/useToast';
import ToastContainer from './ToastContainer';
import './PaymentButton.css';

const PaymentButton = ({ amount, orderId, onSuccess, onFailure, disabled = false }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { clearCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const { toasts, warning, hideToast } = useToast();

    // Load Razorpay script
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    // Create order on backend
    const createOrder = async (amount) => {
        try {
            const response = await fetch('http://localhost:5000/api/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount,
                    currency: 'USD',
                    receipt: orderId || `order_${Date.now()}`,
                    notes: {
                        orderId: orderId || `order_${Date.now()}`,
                        customerEmail: user?.email || 'guest@example.com'
                    }
                })
            });

            const data = await response.json();
            
            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Failed to create order');
            }

            return data;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    };

    // Verify payment on backend
    const verifyPayment = async (paymentData) => {
        try {
            const response = await fetch('http://localhost:5000/api/verify-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData)
            });

            const data = await response.json();
            
            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Payment verification failed');
            }

            return data;
        } catch (error) {
            console.error('Error verifying payment:', error);
            throw error;
        }
    };

    // Handle payment
    const handlePayment = async () => {
        // Check if user is logged in
        if (!isAuthenticated || !user) {
            warning('Please login to proceed with payment', 2000);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            return;
        }

        try {
            setLoading(true);

            // Load Razorpay script
            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                alert('Failed to load Razorpay SDK. Please check your internet connection.');
                setLoading(false);
                return;
            }

            // Create order
            const orderData = await createOrder(amount);
            
            if (!orderData.order_id) {
                throw new Error('Failed to create order');
            }

            // Razorpay payment options
            const options = {
                key: orderData.key_id,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'ComGen E-Commerce',
                description: 'Purchase from ComGen',
                image: '/logo.png', // Add your logo path
                order_id: orderData.order_id,
                handler: async function (response) {
                    try {
                        // Verify payment on backend
                        const verificationResult = await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        console.log('Payment verified:', verificationResult);

                        // Clear cart on successful payment
                        clearCart();

                        // Call success callback
                        if (onSuccess) {
                            onSuccess({
                                ...verificationResult,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id
                            });
                        }

                        alert('Payment Successful! Order ID: ' + response.razorpay_order_id);
                    } catch (error) {
                        console.error('Payment verification failed:', error);
                        if (onFailure) {
                            onFailure(error);
                        }
                        alert('Payment verification failed. Please contact support.');
                    } finally {
                        setLoading(false);
                    }
                },
                prefill: {
                    name: user?.name || 'Guest User',
                    email: user?.email || 'guest@example.com',
                    contact: user?.phone || '9999999999'
                },
                notes: {
                    orderId: orderId || `order_${Date.now()}`,
                },
                theme: {
                    color: '#744e3e'
                },
                modal: {
                    ondismiss: function() {
                        setLoading(false);
                        console.log('Payment cancelled by user');
                        if (onFailure) {
                            onFailure(new Error('Payment cancelled'));
                        }
                    }
                }
            };

            // Open Razorpay checkout
            const razorpay = new window.Razorpay(options);
            
            razorpay.on('payment.failed', function (response) {
                console.error('Payment failed:', response.error);
                setLoading(false);
                if (onFailure) {
                    onFailure(response.error);
                }
                alert(`Payment Failed: ${response.error.description}`);
            });

            razorpay.open();

        } catch (error) {
            console.error('Error in payment process:', error);
            setLoading(false);
            if (onFailure) {
                onFailure(error);
            }
            alert('Error initiating payment. Please try again.');
        }
    };

    return (
        <>
            <ToastContainer toasts={toasts} onClose={hideToast} />
            <button
                className="payment-button"
                onClick={handlePayment}
                disabled={disabled || loading || !amount || amount <= 0}
            >
                {loading ? (
                    <>
                        <span className="spinner"></span>
                        Processing...
                    </>
                ) : (
                    <>
                        Pay ${amount?.toFixed(2) || '0.00'}
                    </>
                )}
            </button>
        </>
    );
};

export default PaymentButton;
