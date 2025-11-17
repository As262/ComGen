# 🚀 QUICK START REFERENCE CARD

## ⚡ 3-STEP SETUP

```powershell
# 1. Install dependencies
cd "d:\COMGEN REACT\ComGen\ComGen"
npm install

# 2. Start dev server
npm run dev

# 3. Open browser
# Navigate to: http://localhost:5173
```

---

## 📦 WHAT YOU HAVE

✅ **Cart System** - Add/remove products, persistent storage  
✅ **Product Management** - 23 products, filtering, search  
✅ **4 Components** - Button, Card, Loader, SearchBar  
✅ **4 Hooks** - localStorage, windowSize, debounce, toast  
✅ **40+ Utilities** - Formatting, validation, calculations  
✅ **Design System** - Complete CSS variables & utilities  
✅ **Documentation** - 3 comprehensive guides  

---

## 🎯 CONTEXT API USAGE

### Cart Context
```jsx
import { useCart } from './context/CartContext';

const { cartItems, cartTotal, cartItemCount, 
        addToCart, removeFromCart } = useCart();

// Add product to cart
addToCart(product, 1);
```

### Product Context
```jsx
import { useProducts } from './context/ProductContext';

const { products, filteredProducts, 
        getFeaturedProducts, setSearchQuery } = useProducts();

// Search products
setSearchQuery('shirt');
```

---

## 🎨 DESIGN SYSTEM

### CSS Variables
```css
/* Colors */
var(--color-primary)      /* #2563eb */
var(--color-secondary)    /* #f59e0b */
var(--color-surface)      /* #ffffff */

/* Spacing */
var(--spacing-xs)         /* 4px */
var(--spacing-sm)         /* 8px */
var(--spacing-md)         /* 16px */
var(--spacing-lg)         /* 24px */
var(--spacing-xl)         /* 32px */

/* Radius & Shadows */
var(--radius-md)          /* 8px */
var(--shadow-lg)          /* Large shadow */
var(--transition-base)    /* 300ms */
```

### Utility Classes
```jsx
<div className="container d-flex justify-between align-center gap-lg">
  <div className="card card-hover">
    <h2 className="text-primary mb-2">Title</h2>
    <p className="text-secondary">Content</p>
  </div>
</div>
```

---

## 🧩 COMPONENT EXAMPLES

### Button
```jsx
import Button from './components/common/Button';

<Button variant="primary" size="large" onClick={handler}>
  Click Me
</Button>
```

**Variants**: primary, secondary, outline, ghost, danger  
**Sizes**: small, medium, large

### Card
```jsx
import Card from './components/common/Card';

<Card hover clickable onClick={handler}>
  <h3>Card Content</h3>
</Card>
```

### Loader
```jsx
import Loader from './components/common/Loader';

<Loader size="large" />
<Loader fullScreen text="Loading..." />
```

---

## 🛠️ UTILITY FUNCTIONS

```jsx
import { 
  formatCurrency,      // $99.99
  calculateDiscount,   // 25%
  validateEmail,       // true/false
  truncateText,        // Shorten text
  slugify             // "product-name"
} from './utils/helpers';

// Examples
formatCurrency(99.99)           // "$99.99"
calculateDiscount(100, 75)      // 25
validateEmail('test@email.com') // true
truncateText('Long text...', 50) // "Long text..."
slugify('Product Name')         // "product-name"
```

---

## 📱 RESPONSIVE BREAKPOINTS

```css
/* Mobile */
@media (max-width: 768px) { }

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) { }

/* Desktop */
@media (min-width: 1025px) { }
```

---

## 📂 KEY FILES

| File | Purpose |
|------|---------|
| `src/context/CartContext.jsx` | Cart state management |
| `src/context/ProductContext.jsx` | Product state management |
| `src/utils/helpers.js` | 40+ utility functions |
| `src/utils/constants.js` | App-wide constants |
| `src/data/products.json` | 23 products database |
| `src/styles/globals.css` | Complete design system |
| `SETUP.md` | Quick setup guide |
| `IMPLEMENTATION_GUIDE.md` | Detailed implementation |

---

## 🎯 NEXT STEPS

1. **Read**: SETUP.md (5 min)
2. **Run**: `npm install && npm run dev`
3. **Test**: Open http://localhost:5173
4. **Build**: Follow IMPLEMENTATION_GUIDE.md
5. **Create**: ProductCard component (example provided)

---

## 🐛 QUICK FIXES

**Dependencies Error?**
```powershell
npm install
```

**Styles Not Loading?**
- Check `src/main.jsx` imports `globals.css`
- Clear browser cache (Ctrl+Shift+R)

**Context Not Working?**
- Verify providers in `App.jsx`
- Check hook usage in component

**Port In Use?**
- Change port in `vite.config.js`
- Or kill existing process

---

## 💡 PRO TIPS

1. **Use React DevTools** - Inspect component state
2. **Check Console** - Look for errors
3. **Test Responsive** - Use DevTools device mode
4. **Follow Examples** - See IMPLEMENTATION_GUIDE.md
5. **Read Comments** - Code is well-documented

---

## 📚 DOCUMENTATION FILES

📖 **SETUP.md** - Quick start (400 lines)  
📖 **IMPLEMENTATION_GUIDE.md** - Step-by-step (700 lines)  
📖 **README_NEW.md** - Project overview (500 lines)  
📖 **COMPLETE_BUILD_SUMMARY.md** - What was built (800 lines)  
📖 **This Card** - Quick reference  

---

## ✅ CHECKLIST

- [ ] Run `npm install`
- [ ] Start dev server
- [ ] See homepage load
- [ ] Test cart (add product)
- [ ] Check localStorage
- [ ] Read SETUP.md
- [ ] Read IMPLEMENTATION_GUIDE.md
- [ ] Build ProductCard
- [ ] Create product pages

---

## 🎉 YOU'RE READY!

**Everything is built, documented, and ready to use!**

Start with SETUP.md → Follow IMPLEMENTATION_GUIDE.md → Build amazing features!

---

**Questions? Check the docs! Everything is explained in detail.**

🚀 Happy Coding!
