# 🏗️ User Session Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         React App                            │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    AuthProvider                         │ │
│  │  • User authentication state                           │ │
│  │  • Login/Signup/Logout methods                         │ │
│  │  • Session management                                  │ │
│  │                                                         │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │              ProductProvider                      │  │ │
│  │  │  • Product data management                        │  │ │
│  │  │                                                    │  │ │
│  │  │  ┌────────────────────────────────────────────┐   │  │ │
│  │  │  │          CartProvider                      │   │  │ │
│  │  │  │  • User-specific cart state                │   │  │ │
│  │  │  │  • Uses useAuth() to get user ID          │   │  │ │
│  │  │  │  • Loads cart per user                     │   │  │ │
│  │  │  │                                            │   │  │ │
│  │  │  │  ┌──────────────────────────────────────┐ │   │  │ │
│  │  │  │  │      Router & Components            │ │   │  │ │
│  │  │  │  │  • Navbar (shows user info)         │ │   │  │ │
│  │  │  │  │  • LoginPage (auth forms)           │ │   │  │ │
│  │  │  │  │  • HomePage                          │ │   │  │ │
│  │  │  │  │  • CartPage                          │ │   │  │ │
│  │  │  │  │  • Other pages                       │ │   │  │ │
│  │  │  │  └──────────────────────────────────────┘ │   │  │ │
│  │  │  └────────────────────────────────────────────┘   │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                           ↕
                   localStorage API
                           ↕
┌─────────────────────────────────────────────────────────────┐
│                   Browser localStorage                       │
│                                                              │
│  • comgen_user_session           (current session)          │
│  • comgen_registered_users       (all users)                │
│  • comgen_user_carts_user_123    (User 1's cart)           │
│  • comgen_user_carts_user_456    (User 2's cart)           │
│  • comgen_cart                   (guest cart)               │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow Diagrams

### User Authentication Flow

```
┌─────────────┐
│   Sign Up   │
└──────┬──────┘
       │
       ↓
┌─────────────────────────────────┐
│  Validate Input                 │
│  • Check email format           │
│  • Check password length (6+)   │
│  • Check email uniqueness       │
└──────┬──────────────────────────┘
       │
       ↓
┌─────────────────────────────────┐
│  Create User Object             │
│  {                              │
│    id: "user_timestamp",        │
│    email, password, name,       │
│    createdAt: ISO date          │
│  }                              │
└──────┬──────────────────────────┘
       │
       ↓
┌─────────────────────────────────┐
│  Save to                        │
│  comgen_registered_users        │
└──────┬──────────────────────────┘
       │
       ↓
┌─────────────┐
│  Success!   │
└─────────────┘
```

### Login Flow

```
┌─────────────┐
│    Login    │
└──────┬──────┘
       │
       ↓
┌─────────────────────────────────┐
│  Validate Credentials           │
│  • Find user by email           │
│  • Check password match         │
└──────┬──────────────────────────┘
       │
       ↓
┌─────────────────────────────────┐
│  Create Session                 │
│  {                              │
│    id, email, name,             │
│    sessionExpiry: +7 days,      │
│    loginTime: now               │
│  }                              │
└──────┬──────────────────────────┘
       │
       ↓
┌─────────────────────────────────┐
│  Save to                        │
│  comgen_user_session            │
└──────┬──────────────────────────┘
       │
       ↓
┌─────────────────────────────────┐
│  Load User Cart                 │
│  comgen_user_carts_{userId}     │
└──────┬──────────────────────────┘
       │
       ↓
┌─────────────┐
│  Success!   │
└─────────────┘
```

### Cart Management Flow

```
User Logs In
      ↓
┌─────────────────────────────────┐
│  CartContext checks auth        │
│  const { user } = useAuth()     │
└──────┬──────────────────────────┘
       │
       ↓
┌─────────────────────────────────┐
│  Determine Cart Key             │
│  If user:                       │
│    key = user_carts_{user.id}   │
│  Else:                          │
│    key = comgen_cart (guest)    │
└──────┬──────────────────────────┘
       │
       ↓
┌─────────────────────────────────┐
│  Load Cart from localStorage    │
│  const cart = getItem(key)      │
└──────┬──────────────────────────┘
       │
       ↓
┌─────────────────────────────────┐
│  Set cartItems state            │
│  setCartItems(cart)             │
└──────┬──────────────────────────┘
       │
       ↓
┌─────────────┐
│ Cart Ready  │
└─────────────┘

User Adds Item
      ↓
┌─────────────────────────────────┐
│  Update cartItems state         │
│  setCartItems([...items, new])  │
└──────┬──────────────────────────┘
       │
       ↓
┌─────────────────────────────────┐
│  Save to localStorage           │
│  saveItem(key, cartItems)       │
└──────┬──────────────────────────┘
       │
       ↓
┌─────────────┐
│  Complete   │
└─────────────┘
```

## Component Hierarchy

```
App
├── AuthProvider ──────┐
│   ├── ProductProvider │ (provides auth state)
│   │   └── CartProvider ─┘ (uses auth state)
│   │       └── Router
│   │           ├── Navbar ─────┐
│   │           │   • Uses useAuth()
│   │           │   • Uses useCart()
│   │           │   • Shows user menu
│   │           │
│   │           ├── CartSidebar ─┐
│   │           │   • Uses useCart()
│   │           │   • Shows cart items
│   │           │
│   │           └── Routes
│   │               ├── HomePage
│   │               ├── LoginPage ─┐
│   │               │   • Uses useAuth()
│   │               │   • Handles login/signup
│   │               │
│   │               ├── MenPage
│   │               ├── WomenPage
│   │               └── CartPage ───┐
│   │                   • Uses useCart()
│   │                   • Uses useAuth()
│   │
│   └── Footer
```

## State Management

### AuthContext State
```javascript
{
  user: {
    id: "user_1234567890",
    email: "user@example.com",
    name: "User Name",
    sessionExpiry: timestamp,
    loginTime: ISO date
  },
  isAuthenticated: true/false,
  loading: true/false
}
```

### CartContext State (Per User)
```javascript
{
  cartItems: [
    {
      id: "product_1",
      name: "Product",
      price: 99.99,
      quantity: 2,
      addedAt: ISO date
    }
  ],
  isCartOpen: true/false,
  cartTotal: number,
  cartItemCount: number
}
```

## Security Layers

```
┌─────────────────────────────────────┐
│          User Interface              │
│  • Input validation (email, password)│
│  • Client-side checks                │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│       AuthContext Logic              │
│  • Email format validation           │
│  • Password length check (6+)        │
│  • Duplicate email prevention        │
│  • Session expiry validation         │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│         localStorage                 │
│  • Browser-level storage             │
│  • Domain-isolated                   │
│  • Persistent across sessions        │
└─────────────────────────────────────┘

⚠️ For Production: Add Backend Layer
   • Server-side validation
   • Password hashing
   • JWT tokens
   • HTTPS encryption
```

## Interaction Flow

```
User Opens App
    ↓
AuthProvider loads
    ↓
Check localStorage for session
    ↓
Session exists? ──Yes→ Validate expiry ──Valid→ Set user state
    │                                       │
    No                                 Expired
    ↓                                       ↓
Set isAuthenticated = false           Clear session
    ↓                                       ↓
CartProvider loads                    Set isAuthenticated = false
    ↓
Check auth state ──Authenticated→ Load user cart
    │
Not authenticated
    ↓
Load guest cart
    ↓
Render app with appropriate state
```

## Key Design Decisions

### 1. Provider Order
```
AuthProvider (outermost)
  ↓
ProductProvider
  ↓
CartProvider (needs auth)
  ↓
Router & Components
```
**Why**: CartProvider needs access to auth state to determine which cart to load.

### 2. Cart Storage Strategy
```
Guest:     comgen_cart
User 1:    comgen_user_carts_user_123
User 2:    comgen_user_carts_user_456
```
**Why**: Complete isolation between users, no data leakage.

### 3. Session Expiry
```
Default: 7 days
Extendable: Yes
Validation: On app load
```
**Why**: Balance between convenience and security.

## Benefits of This Architecture

✅ **Separation of Concerns**: Auth, products, and cart are separate
✅ **Reusability**: Contexts can be used anywhere via hooks
✅ **Type Safety**: PropTypes validation
✅ **Performance**: Only re-renders when necessary
✅ **Scalability**: Easy to add features or migrate to backend
✅ **Testability**: Each context can be tested independently
✅ **User Experience**: Seamless authentication flow
