import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login: authLogin, signup: authSignup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const validateEmail = (email) => {
    return email.includes('@') && email.trim() !== '';
  };

  const showPasswordStep = () => {
    if (!email) {
      alert('Please enter your email');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address with @');
      return;
    }

    setShowPassword(true);
  };

  const showEmailStep = () => {
    setShowPassword(false);
  };

  const login = () => {
    if (!password) {
      alert('Please enter your password');
      return;
    }

    const result = authLogin(email, password);
    
    if (result.success) {
      alert(result.message);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      alert(result.message);
    }
  };

  const showSignupForm = () => {
    setShowSignup(true);
  };

  const showLoginForm = () => {
    setShowSignup(false);
  };

  const signup = () => {
    if (!signupName || !signupEmail || !signupPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (!validateEmail(signupEmail)) {
      alert('Please enter a valid email address with @');
      return;
    }

    if (signupPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    const result = authSignup(signupName, signupEmail, signupPassword);
    
    if (result.success) {
      alert(result.message);
      // Clear signup form
      setSignupName('');
      setSignupEmail('');
      setSignupPassword('');
      showLoginForm();
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="login-body">
      <div className="container-wrapper">
        <div className={`login-container ${showSignup ? 'hide' : ''}`}>
          <div className="glass-overlay"></div>
          <div className="glass-reflection"></div>
          <div className="glass-shine"></div>
          <div className="glass-edge-light"></div>

          <div id="emailStep" className="form-step" style={{ display: showPassword ? 'none' : 'block' }}>
            <h1>Welcome back</h1>
            <p className="subtitle">Sign in to your account</p>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-container">
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="arrow-btn" onClick={showPasswordStep}>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="divider">
              <span>OR</span>
            </div>

            <button className="social-btn">
              <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', marginRight: '10px', flexShrink: 0 }}>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <button className="social-btn">
              <svg viewBox="0 0 24 24" fill="white" style={{ width: '18px', height: '18px', marginRight: '10px', flexShrink: 0 }}>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Continue with X
            </button>
          </div>

          <div id="passwordStep" className={`form-step password-step ${showPassword ? 'active' : 'hidden'}`}>
            <button className="back-btn" onClick={showEmailStep}>
              <ChevronLeft size={16} />
              Back
            </button>

            <h1>Enter password</h1>
            <p className="subtitle">Enter your password for {email}</p>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-container">
                <input 
                  type="password" 
                  id="password" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="arrow-btn" onClick={login}>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="signup-text">
            Don't have an account? <span className="signup-link" onClick={showSignupForm}>Sign up</span>
          </div>
        </div>

        <div className={`signup-container ${showSignup ? 'show' : ''}`}>
          <div className="glass-overlay"></div>
          <div className="glass-reflection"></div>
          <div className="glass-shine"></div>
          <div className="glass-edge-light"></div>

          <h1>Create account</h1>
          <p className="subtitle">Sign up to get started</p>

          <div className="form-group">
            <label htmlFor="signupName">Full Name</label>
            <div className="input-container">
              <input 
                type="text" 
                id="signupName" 
                placeholder="Enter your full name"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="signupEmail">Email</label>
            <div className="input-container">
              <input 
                type="email" 
                id="signupEmail" 
                placeholder="Enter your email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required 
                pattern=".*@.*"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="signupPassword">Password</label>
            <div className="input-container">
              <input 
                type="password" 
                id="signupPassword" 
                placeholder="Create a password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
              <button className="arrow-btn" onClick={signup}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="signup-text">
            Already have an account? <span className="signup-link" onClick={showLoginForm}>Sign in</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
