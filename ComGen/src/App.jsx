import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MenPage from './pages/MenPage';
import WomenPage from './pages/WomenPage';
import './App.css';

function App() {
    const [cartCount, setCartCount] = useState(0);
    const [cartSidebarActive, setCartSidebarActive] = useState(false);

    const handleCartToggle = () => {
        setCartSidebarActive(!cartSidebarActive);
    };

    const handleSearch = (searchTerm) => {
        console.log('Searching for:', searchTerm);
    };

    return (
        <Router>
            <div className="App">
                <Navbar
                    cartCount={cartCount}
                    onCartToggle={handleCartToggle}
                    onSearch={handleSearch}
                />
                <main style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/men" element={<MenPage />} />
                        <Route path="/women" element={<WomenPage />} />
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
    );
}

export default App;
