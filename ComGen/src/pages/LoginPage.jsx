import { useState } from 'react';
import { ArrowRight, ChevronLeft } from 'lucide-react';
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
                  <ArrowRight size={32} />
                </button>
              </div>
            </div>

            {/* Social login buttons removed per request */}
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
                  <ArrowRight size={32} />
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
                <ArrowRight size={32} />
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
