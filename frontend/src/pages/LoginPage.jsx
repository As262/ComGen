import { useState } from 'react';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login: authLogin, signup: authSignup, checkEmail } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [signupNameError, setSignupNameError] = useState('');
  const [signupEmailError, setSignupEmailError] = useState('');
  const [signupPasswordError, setSignupPasswordError] = useState('');

  const validateEmail = (email) => {
    return email.includes('@') && email.trim() !== '';
  };

  const showPasswordStep = async () => {
    setEmailError('');
    
    if (!email) {
      setEmailError('Please enter your email');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address with @');
      return;
    }

    // Check if user exists
    const exists = await checkEmail(email);
    
    if (!exists) {
      setEmailError('Email not found. Please sign up first.');
      return;
    }

    setShowPassword(true);
  };

  const showEmailStep = () => {
    setShowPassword(false);
    setPasswordError('');
  };

  const login = async () => {
    setPasswordError('');
    
    if (!password) {
      setPasswordError('Please enter your password');
      return;
    }

    const result = await authLogin(email, password);
    
    if (result.success) {
      setTimeout(() => {
        navigate('/');
      }, 500);
    } else {
      setPasswordError(result.message);
    }
  };

  const showSignupForm = () => {
    setShowSignup(true);
    setEmailError('');
  };

  const showLoginForm = () => {
    setShowSignup(false);
    setSignupNameError('');
    setSignupEmailError('');
    setSignupPasswordError('');
  };

  const signup = async () => {
    setSignupNameError('');
    setSignupEmailError('');
    setSignupPasswordError('');
    
    if (!signupName) {
      setSignupNameError('Please enter your full name');
      return;
    }
    
    if (!signupEmail) {
      setSignupEmailError('Please enter your email');
      return;
    }

    if (!validateEmail(signupEmail)) {
      setSignupEmailError('Please enter a valid email address with @');
      return;
    }

    if (!signupPassword) {
      setSignupPasswordError('Please enter a password');
      return;
    }

    if (signupPassword.length < 6) {
      setSignupPasswordError('Password must be at least 6 characters long');
      return;
    }

    const result = await authSignup(signupName, signupEmail, signupPassword);
    
    if (result.success) {
      // Auto-login after signup
      setTimeout(() => {
        navigate('/');
      }, 500);
    } else {
      setSignupEmailError(result.message);
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
                  onKeyDown={(e) => e.key === 'Enter' && showPasswordStep()}
                />
                <button className="arrow-btn" onClick={showPasswordStep}>
                  <ArrowRight size={32} />
                </button>
              </div>
              {emailError && <p className="error-message">{emailError}</p>}
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
                  onKeyDown={(e) => e.key === 'Enter' && login()}
                />
                <button className="arrow-btn" onClick={login}>
                  <ArrowRight size={32} />
                </button>
              </div>
              {passwordError && <p className="error-message">{passwordError}</p>}
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
            {signupNameError && <p className="error-message">{signupNameError}</p>}
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
            {signupEmailError && <p className="error-message">{signupEmailError}</p>}
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
                onKeyDown={(e) => e.key === 'Enter' && signup()}
              />
              <button className="arrow-btn" onClick={signup}>
                <ArrowRight size={32} />
              </button>
            </div>
            {signupPasswordError && <p className="error-message">{signupPasswordError}</p>}
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
