# ComGen E-Commerce - Setup Instructions

## 🚀 Quick Setup (3 Steps)

### Step 1: Install Frontend Dependencies
```powershell
cd "d:\COMGEN REACT\ComGen\ComGen"
npm install
```

### Step 2: Start Development Server
```powershell
npm run dev
```

### Step 3: Open Browser
Navigate to: `http://localhost:5173`

## ✅ What Works Right Now

- ✅ **Cart System**: Add products, update quantities, persistent storage
- ✅ **Product Context**: All 23 products loaded from JSON
- ✅ **Search & Filter**: Debounced search, category filtering
- ✅ **Responsive Design**: Mobile/Tablet/Desktop breakpoints
- ✅ **Reusable Components**: Button, Card, Loader, SearchBar
- ✅ **Custom Hooks**: localStorage, debounce, toast, window size
- ✅ **40+ Utility Functions**: Currency formatting, validation, sorting, etc.

## 📂 Files Created/Modified

### New Files Created:
```
✅ src/context/CartContext.jsx
✅ src/context/ProductContext.jsx
✅ src/hooks/useLocalStorage.js
✅ src/hooks/useWindowSize.js
✅ src/hooks/useDebounce.js
✅ src/hooks/useToast.js
✅ src/utils/helpers.js
✅ src/utils/constants.js
✅ src/data/products.json
✅ src/styles/globals.css
✅ src/components/common/Button.jsx
✅ src/components/common/Button.css
✅ src/components/common/Card.jsx
✅ src/components/common/Card.css
✅ src/components/common/Loader.jsx
✅ src/components/common/Loader.css
✅ src/components/common/SearchBar.jsx
✅ src/components/common/SearchBar.css
✅ README_NEW.md
✅ IMPLEMENTATION_GUIDE.md
```

### Modified Files:
```
✅ src/App.jsx (Added Context Providers)
✅ src/main.jsx (Added globals.css import)
✅ package.json (Added prop-types dependency)
```

## 🎯 How to Use Context in Your Components

### Using Cart Context:
```jsx
import { useCart } from '../context/CartContext';

function MyComponent() {
  const { 
    cartItems,           // Array of cart items
    cartTotal,           // Total price
    cartItemCount,       // Total items count
    addToCart,           // Add product to cart
    removeFromCart,      // Remove product
    updateQuantity,      // Update quantity
    toggleCart          // Open/close cart sidebar
  } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1); // product object, quantity
  };

  return (
    <div>
      <p>Cart has {cartItemCount} items</p>
      <p>Total: ${cartTotal.toFixed(2)}</p>
    </div>
  );
}
```

### Using Product Context:
```jsx
import { useProducts } from '../context/ProductContext';

function MyComponent() {
  const { 
    products,              // All products
    filteredProducts,      // Filtered/searched products
    getFeaturedProducts,   // Get featured products
    getProductsByCategory, // Get by category
    setSearchQuery,        // Set search query
    setCategoryFilter      // Filter by category
  } = useProducts();

  return (
    <div>
      <p>Found {filteredProducts.length} products</p>
    </div>
  );
}
```

## 🎨 Using Design System

All CSS variables are available in any component:

```css
.my-component {
  color: var(--color-primary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}
```

## 🔧 Useful Helper Functions

```jsx
import { 
  formatCurrency,      // formatCurrency(99.99) => "$99.99"
  calculateDiscount,   // calculateDiscount(100, 75) => 25
  truncateText,        // truncateText("Long text...", 50)
  slugify,            // slugify("Product Name") => "product-name"
  validateEmail,      // validateEmail("test@example.com") => true
  debounce           // debounce(fn, 300)
} from '../utils/helpers';
```

## 📱 Responsive Breakpoints

```css
/* Mobile: up to 768px */
@media (max-width: 768px) {
  /* Mobile styles */
}

/* Tablet: 769px to 1024px */
@media (min-width: 769px) and (max-width: 1024px) {
  /* Tablet styles */
}

/* Desktop: 1025px and up */
@media (min-width: 1025px) {
  /* Desktop styles */
}
```

## 🧩 Component Examples

### Button Component:
```jsx
import Button from './components/common/Button';

<Button variant="primary" size="large" onClick={handleClick}>
  Click Me
</Button>

<Button variant="outline" loading={isLoading}>
  Save
</Button>

<Button variant="danger" disabled>
  Delete
</Button>
```

### Card Component:
```jsx
import Card from './components/common/Card';

<Card hover clickable onClick={handleClick}>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

### Loader Component:
```jsx
import Loader from './components/common/Loader';

<Loader size="large" />
<Loader fullScreen text="Loading products..." />
```

## 🐛 Troubleshooting

### Problem: Module not found errors
```powershell
# Solution: Install dependencies
npm install
```

### Problem: Port 5173 already in use
```powershell
# Solution: Kill the process or change port in vite.config.js
```

### Problem: Styles not loading
```powershell
# Solution: Verify globals.css is imported in main.jsx
# Clear browser cache (Ctrl+Shift+R)
```

### Problem: Cart not working
```powershell
# Solution: Check browser console for errors
# Verify CartProvider wraps your components in App.jsx
```

## 📖 Next Steps

1. **Read**: `IMPLEMENTATION_GUIDE.md` for detailed implementation
2. **Read**: `README_NEW.md` for project overview
3. **Test**: Open dev server and test cart functionality
4. **Build**: Create ProductCard component (example in IMPLEMENTATION_GUIDE.md)
5. **Expand**: Add more features following established patterns

## 📞 Key Files to Reference

- **Context API**: `src/context/CartContext.jsx`, `src/context/ProductContext.jsx`
- **Utilities**: `src/utils/helpers.js`, `src/utils/constants.js`
- **Hooks**: `src/hooks/useLocalStorage.js`, etc.
- **Design System**: `src/styles/globals.css`
- **Data**: `src/data/products.json`

## 🎉 You're Ready!

The foundation is solid and professional. You have:
- ✅ Complete state management
- ✅ 23 products in JSON database
- ✅ Responsive design system
- ✅ Reusable components
- ✅ Custom hooks
- ✅ Utility functions
- ✅ TypeScript-ready structure

**Start building your product pages and enjoy coding! 🚀**
