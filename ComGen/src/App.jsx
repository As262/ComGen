import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MenPage from './pages/MenPage';
import WomenPage from './pages/WomenPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <ProductProvider>
                <CartProvider>
                    <Router>
                        <ScrollToTop />
                        <div className="App">
                            <Navbar />
                            <CartSidebar />
                            <main style={{ minHeight: 'calc(100vh - 200px)' }}>
                                <Routes>
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="/login" element={<LoginPage />} />
                                    <Route path="/men" element={<MenPage />} />
                                    <Route path="/women" element={<WomenPage />} />
                                    <Route path="/cart" element={<CartPage />} />
                                    <Route path="/contact" element={<ContactPage />} />
                                </Routes>
                            </main>
                            <Footer
                                shopLinks={{
                                    title: 'Shop',
                                    links: [
                                        { href: '/men', text: 'Men\'s Collection' },
                                        { href: '/women', text: 'Women\'s Collection' },
                                        { href: '/#shoes', text: 'Shoes' },
                                        { href: '/#appliances', text: 'Appliances' }
                                    ]
                                }}
                                email="hello@ComGenZ.com"
                            />
                        </div>
                    </Router>
                </CartProvider>
            </ProductProvider>
        </AuthProvider>
    );
}

export default App;
