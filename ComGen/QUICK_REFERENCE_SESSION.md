# 🎯 Quick Reference - User Session System

## 🚀 Quick Start

### Test Users (Create These First)
```
User 1:
- Email: alice@test.com
- Password: test123
- Name: Alice Johnson

User 2:
- Email: bob@test.com
- Password: test456
- Name: Bob Smith
```

## 📋 Common Actions

### Create Account
1. Go to `/login`
2. Click "Sign up"
3. Fill name, email, password (min 6 chars)
4. Submit

### Login
1. Enter email → Click arrow
2. Enter password → Click arrow
3. Redirects to home

### Logout
1. Click your name in navbar
2. Click "Logout"

## 🔍 Testing Checklist

- [ ] Create User 1
- [ ] Login as User 1
- [ ] Add products to cart
- [ ] Logout
- [ ] Create User 2
- [ ] Login as User 2
- [ ] Verify empty cart
- [ ] Add different products
- [ ] Logout
- [ ] Login as User 1 again
- [ ] Verify original cart items preserved

## 💾 localStorage Keys

```
comgen_user_session          Current session
comgen_registered_users      All users
comgen_user_carts_{userId}   User carts
comgen_cart                  Guest cart
```

## 🛠️ Dev Tools Commands

```javascript
// View current session
JSON.parse(localStorage.getItem('comgen_user_session'))

// View all users
JSON.parse(localStorage.getItem('comgen_registered_users'))

// Clear everything
localStorage.clear(); location.reload()
```

## 🎨 Features

✅ User signup/login/logout
✅ 7-day session persistence
✅ Per-user cart isolation
✅ Guest cart support
✅ User profile in navbar
✅ Mobile responsive
✅ Session validation

## 📱 Server Info

**Development Server**: http://localhost:5174/
**Environment**: Development
**Framework**: React + Vite

## 📚 Full Documentation

- `USER_SESSION_GUIDE.md` - Complete system docs
- `SESSION_TESTING_GUIDE.md` - Testing scenarios
- `SESSION_IMPLEMENTATION_SUMMARY.md` - Implementation details

## ⚡ Key Points

1. Each user has **separate cart**
2. Carts **persist across sessions**
3. Session lasts **7 days**
4. **Guest** vs **logged-in** carts are different
5. **Passwords** should be 6+ characters
6. **Email** must contain @

## 🐛 Quick Fixes

**Problem**: Can't login
→ **Solution**: Create account first with signup

**Problem**: Cart empty after login
→ **Solution**: Expected for new user, add items

**Problem**: User menu not showing
→ **Solution**: Make sure you're logged in

**Problem**: Changes not saving
→ **Solution**: Check localStorage is enabled

## 🎉 Success Indicators

✅ User name shows in navbar when logged in
✅ Different users see different carts
✅ Cart items persist after logout/login
✅ No console errors
✅ Smooth UI transitions
