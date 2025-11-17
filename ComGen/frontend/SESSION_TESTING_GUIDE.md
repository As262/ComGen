# Quick Test Guide - User Session & Cart Management

## Test Scenarios

### Scenario 1: Create Multiple Users
1. **Navigate to Login Page**
   - Click "Login" in navbar or go to `/login`

2. **Create First User**
   - Click "Sign up" link
   - Enter:
     - Name: `Alice Johnson`
     - Email: `alice@test.com`
     - Password: `test123`
   - Click arrow or press Enter
   - Should see: "Account created successfully!"

3. **Login as First User**
   - Enter email: `alice@test.com`
   - Click arrow, enter password: `test123`
   - Should redirect to home page
   - Should see "Alice Johnson" in navbar

4. **Add Items to Alice's Cart**
   - Browse products
   - Add 2-3 items to cart
   - Open cart sidebar to verify items

5. **Logout**
   - Click on "Alice Johnson" in navbar
   - Click "Logout"
   - Should return to home page
   - Cart icon should show 0 items

6. **Create Second User**
   - Go to `/login`
   - Sign up with:
     - Name: `Bob Smith`
     - Email: `bob@test.com`
     - Password: `test456`

7. **Login as Second User**
   - Login with Bob's credentials
   - Should see "Bob Smith" in navbar
   - **Cart should be empty** (different user!)

8. **Add Different Items to Bob's Cart**
   - Add different products
   - Verify they're in cart

9. **Switch Between Users**
   - Logout from Bob
   - Login as Alice (`alice@test.com`)
   - **Alice's original items should still be in cart!**
   - Logout and login as Bob
   - **Bob's items should be preserved!**

### Scenario 2: Guest vs. Logged-in User

1. **Use Without Login (Guest)**
   - Don't login
   - Add items to cart
   - Items stored in guest cart

2. **Login**
   - Cart switches to user-specific cart
   - Guest cart items remain separate

3. **Logout**
   - Returns to guest cart
   - Previous guest items may still be there

### Scenario 3: Session Persistence

1. **Login and Add Items**
   - Login as any user
   - Add items to cart

2. **Refresh Browser**
   - Press F5 or refresh page
   - Should still be logged in
   - Cart items should persist

3. **Close and Reopen Browser**
   - Close browser completely
   - Reopen and navigate to site
   - Should still be logged in (for 7 days)
   - Cart items should persist

### Scenario 4: Mobile Experience

1. **Open on Mobile or Resize Browser**
   - Make window narrow (< 768px)

2. **Test Mobile Menu**
   - Click hamburger menu
   - Should see navigation links

3. **Test User Menu on Mobile**
   - When logged in, should see user name
   - Logout button visible in mobile menu

## Expected Results

✅ **Each user has separate cart**
✅ **Cart persists across sessions**
✅ **Guest users have different cart than logged-in users**
✅ **User name appears in navbar when logged in**
✅ **Logout clears session and shows login button**
✅ **Session persists across page refreshes**
✅ **Cart count updates in real-time**

## Common Issues & Solutions

### Issue: "User not found" on login
- **Cause**: User account not created
- **Solution**: Sign up first before trying to login

### Issue: Cart is empty after login
- **Cause**: First time logging in as that user
- **Solution**: This is expected - add items to build the cart

### Issue: Can't logout
- **Cause**: User menu not appearing
- **Solution**: Click on your name in navbar to open dropdown

### Issue: Session expires immediately
- **Cause**: System time/date incorrect
- **Solution**: Check system clock settings

## Developer Testing

### Check LocalStorage Data
Open browser DevTools (F12) → Application → Local Storage:

```javascript
// View all storage keys
Object.keys(localStorage)

// View current user session
JSON.parse(localStorage.getItem('comgen_user_session'))

// View all registered users
JSON.parse(localStorage.getItem('comgen_registered_users'))

// View current user's cart (replace {userId} with actual ID)
JSON.parse(localStorage.getItem('comgen_user_carts_user_1234567890'))

// View guest cart
JSON.parse(localStorage.getItem('comgen_cart'))
```

### Clear All Data (Start Fresh)
```javascript
// Open Console (F12) and run:
localStorage.clear()
location.reload()
```

### Create Test Users Programmatically
```javascript
// Open Console and run:
const users = [
  { name: "Alice Johnson", email: "alice@test.com", password: "test123" },
  { name: "Bob Smith", email: "bob@test.com", password: "test456" },
  { name: "Carol White", email: "carol@test.com", password: "test789" }
];

const registered = users.map((u, i) => ({
  id: `user_${Date.now() + i}`,
  ...u,
  createdAt: new Date().toISOString()
}));

localStorage.setItem('comgen_registered_users', JSON.stringify(registered));
console.log('Test users created!');
```

## Success Criteria

The implementation is successful if:
- [x] Multiple users can sign up independently
- [x] Each user has their own cart that persists
- [x] Users can login and logout smoothly
- [x] User name displays in navbar when authenticated
- [x] Cart items are preserved per user across sessions
- [x] Guest cart is separate from user carts
- [x] No errors in browser console
- [x] Mobile view works correctly
