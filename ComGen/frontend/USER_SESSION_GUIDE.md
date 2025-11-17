# User Session & Cart Management System

## Overview
This implementation provides a complete user authentication and session management system with personalized cart functionality for each user.

## Features Implemented

### 1. **User Authentication System**
- **Signup**: New users can create accounts with name, email, and password
- **Login**: Existing users can log in with email and password
- **Session Management**: User sessions persist for 7 days
- **Logout**: Users can logout and clear their session

### 2. **User-Specific Cart Management**
- **Personalized Carts**: Each user has their own separate cart
- **Guest Cart**: Non-logged-in users have a guest cart
- **Cart Persistence**: Carts are saved to localStorage per user
- **Cart Isolation**: Users can't see each other's carts

### 3. **User Interface Updates**
- **Navbar**: Shows user name and profile menu when logged in
- **User Menu**: Dropdown with user info and logout option
- **Mobile Support**: Responsive user menu for mobile devices

## How It Works

### Storage Structure
```javascript
localStorage:
  - comgen_user_session: Current logged-in user session
  - comgen_registered_users: Array of all registered users
  - comgen_user_carts_{userId}: Cart specific to each user
  - comgen_cart: Guest cart (for non-logged-in users)
```

### Authentication Flow
1. User creates account (Signup)
2. User credentials stored in `comgen_registered_users`
3. User logs in with email and password
4. Session created with 7-day expiry
5. Session stored in `comgen_user_session`
6. User can logout to clear session

### Cart Management Flow
1. When user logs in:
   - Cart is loaded from `comgen_user_carts_{userId}`
   - User sees their personalized cart
2. When user adds/removes items:
   - Changes saved to user-specific cart key
3. When user logs out:
   - Cart remains saved for next login
4. Guest users:
   - Use shared `comgen_cart` key

## Usage Examples

### Testing the System

#### 1. Create Multiple Users
```
User 1:
- Name: John Doe
- Email: john@example.com
- Password: password123

User 2:
- Name: Jane Smith
- Email: jane@example.com
- Password: password456
```

#### 2. Test User-Specific Carts
1. Login as John
2. Add products to cart
3. Logout
4. Login as Jane
5. Cart is empty (different user)
6. Add different products
7. Logout
8. Login as John again
9. Original cart items are still there!

### For Developers

#### Using AuthContext
```jsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (isAuthenticated) {
    return <div>Welcome, {user.name}!</div>;
  }
  
  return <div>Please log in</div>;
}
```

#### Using CartContext with Auth
```jsx
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function MyCart() {
  const { cartItems, addToCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  
  // Cart automatically loads user-specific items
  // when isAuthenticated changes
}
```

#### Protected Routes
```jsx
import ProtectedRoute from './components/ProtectedRoute';

<Route 
  path="/checkout" 
  element={
    <ProtectedRoute>
      <CheckoutPage />
    </ProtectedRoute>
  } 
/>
```

## Security Notes

⚠️ **Important**: This is a frontend-only implementation suitable for:
- Development/learning purposes
- Prototypes and demos
- Local applications

For production applications, you should:
- Implement a backend API for authentication
- Use secure password hashing (bcrypt, argon2)
- Implement JWT or session tokens
- Use HTTPS for all communications
- Add rate limiting and brute-force protection
- Implement OAuth2 or other secure auth methods

## Data Stored in LocalStorage

### User Session Object
```json
{
  "id": "user_1234567890",
  "email": "user@example.com",
  "name": "User Name",
  "sessionExpiry": 1234567890000,
  "loginTime": "2025-10-26T10:30:00.000Z"
}
```

### Registered User Object
```json
{
  "id": "user_1234567890",
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name",
  "createdAt": "2025-10-26T10:30:00.000Z"
}
```

### User Cart Object
```json
[
  {
    "id": "product_1",
    "name": "Product Name",
    "price": 99.99,
    "quantity": 2,
    "addedAt": "2025-10-26T10:30:00.000Z"
  }
]
```

## API Reference

### AuthContext Methods

#### `login(email, password)`
- Authenticates user and creates session
- Returns: `{ success: boolean, message: string }`

#### `signup(name, email, password)`
- Creates new user account
- Returns: `{ success: boolean, message: string }`

#### `logout()`
- Clears user session and logs out

#### `updateProfile(updates)`
- Updates user profile information
- Returns: `{ success: boolean, message: string }`

#### `isSessionValid()`
- Checks if current session is still valid
- Returns: `boolean`

#### `extendSession()`
- Extends session by 7 more days

### AuthContext State

- `user`: Current logged-in user object or null
- `isAuthenticated`: Boolean indicating login status
- `loading`: Boolean indicating if auth is being initialized

## Future Enhancements

Consider adding:
- Email verification
- Password reset functionality
- Two-factor authentication
- Social login (Google, Facebook)
- User profile page
- Order history per user
- Wishlist per user
- User preferences and settings
- Address book management
- Backend API integration

## Troubleshooting

### Cart not loading after login
- Check browser console for errors
- Clear localStorage and try again
- Ensure AuthProvider wraps CartProvider in App.jsx

### Session expires too quickly
- Adjust `sessionExpiry` in AuthContext.jsx
- Default is 7 days (7 * 24 * 60 * 60 * 1000)

### Users can't signup
- Check that email includes '@' symbol
- Password must be at least 6 characters
- Email must be unique
