# 🧪 Quick Testing Checklist

**Dev Server:** http://localhost:5174/

---

## ✅ Essential Tests to Run

### 1. Homepage Quick Add ⏱️ 2 minutes
- [ ] Go to homepage
- [ ] Scroll to Men's Collection
- [ ] Click "Add to Cart" on any product
- [ ] Check cart sidebar opens
- [ ] Verify size and color shown (e.g., "S • Blue")
- [ ] Do the same for Women's Collection

**Expected:** Default size/color applied, toast notification appears

---

### 2. Quick View Selection ⏱️ 3 minutes
- [ ] Navigate to /men page
- [ ] Click "Quick View" on any product
- [ ] Select Size: XL
- [ ] Select a different color
- [ ] Click "Add to Cart"
- [ ] Open cart sidebar or go to /cart
- [ ] Verify shows "Size: XL, Color: [your selection]"

**Expected:** Your selections are preserved exactly

---

### 3. ⭐ VARIANT TEST (MOST IMPORTANT) ⏱️ 5 minutes
**This tests the new enhancement!**

- [ ] Go to /men page
- [ ] Quick View "Premium Cotton Dress Shirt"
- [ ] Select Size: **M**, Color: **White**
- [ ] Add to cart
- [ ] Quick View the **same shirt** again
- [ ] Select Size: **L**, Color: **Navy**
- [ ] Add to cart
- [ ] Go to cart page (/cart)
- [ ] **VERIFY:** You see **TWO separate lines**:
  - Line 1: "Premium Cotton Dress Shirt" Size: M, Color: White (qty: 1)
  - Line 2: "Premium Cotton Dress Shirt" Size: L, Color: Navy (qty: 1)

**Expected:** Two separate cart entries, not one entry with qty: 2

---

### 4. Same Variant Quantity Increase ⏱️ 2 minutes
- [ ] Add "Premium Shirt" - Size: M, Color: Blue
- [ ] Add the **exact same** shirt with Size: M, Color: Blue
- [ ] Go to cart
- [ ] **VERIFY:** One entry with quantity: 2

**Expected:** Quantity increases, not a new line

---

### 5. Cart Operations ⏱️ 3 minutes
- [ ] Add 3-4 different products
- [ ] Go to /cart page
- [ ] Click + button on one item
- [ ] Verify quantity increases
- [ ] Click - button
- [ ] Verify quantity decreases
- [ ] Click trash icon on one item
- [ ] Verify only that item removed
- [ ] Verify total price updates correctly

**Expected:** All CRUD operations work smoothly

---

### 6. Persistence Test ⏱️ 1 minute
- [ ] Add 2-3 products to cart
- [ ] Note their sizes and colors
- [ ] Press F5 to refresh page
- [ ] Check cart
- [ ] **VERIFY:** All items still there with correct size/color

**Expected:** Cart persists across page reload

---

### 7. Women's Page Test ⏱️ 2 minutes
- [ ] Go to /women page
- [ ] Quick View any dress
- [ ] Select different size and color
- [ ] Add to cart
- [ ] Verify in cart page

**Expected:** Same functionality as men's page

---

### 8. Empty Cart Test ⏱️ 1 minute
- [ ] Remove all items from cart
- [ ] **VERIFY:** Shows "Your cart is empty" message
- [ ] **VERIFY:** "Continue Shopping" button works

**Expected:** Proper empty state UI

---

### 9. Cart Sidebar Test ⏱️ 2 minutes
- [ ] Add products from homepage
- [ ] Click cart icon (top right)
- [ ] **VERIFY:** Sidebar opens from right
- [ ] **VERIFY:** Shows size • color for each item
- [ ] Try + and - buttons in sidebar
- [ ] Try remove button
- [ ] Click "Continue Shopping"

**Expected:** Full cart management in sidebar

---

### 10. Toast Notifications ⏱️ 1 minute
- [ ] Add a product to cart
- [ ] **VERIFY:** Green toast appears top-right
- [ ] **VERIFY:** Says "Product added to cart!"
- [ ] **VERIFY:** No page refresh happens
- [ ] **VERIFY:** Toast auto-dismisses after 3 seconds

**Expected:** Smooth, non-intrusive notifications

---

## 🎯 Critical Success Criteria

### ✅ Must Pass All:
1. ✅ Same product with different size/color = separate cart entries
2. ✅ Same product with same size/color = quantity increase
3. ✅ All sizes and colors display correctly in cart
4. ✅ Cart persists after page refresh
5. ✅ Quantity buttons work (+ and -)
6. ✅ Remove buttons work
7. ✅ Total price calculates correctly
8. ✅ No page refresh on add-to-cart
9. ✅ Toast notifications appear
10. ✅ No console errors

---

## 🐛 What to Look For

### Potential Issues:
- [ ] Items disappearing from cart
- [ ] Size/color showing as "undefined"
- [ ] Duplicate cart entries when they shouldn't be
- [ ] Quantity not updating
- [ ] Price calculations wrong
- [ ] Console errors (press F12 → Console tab)
- [ ] Page refreshing when adding to cart

### If You See Any Issues:
1. Open browser console (F12)
2. Screenshot the error
3. Note which product and what you were doing
4. Let me know!

---

## 📊 Quick Verification Table

Test each and check off:

| Test | Pass | Fail | Notes |
|------|------|------|-------|
| Homepage add to cart | ☐ | ☐ | |
| Quick View selection | ☐ | ☐ | |
| Variant separation | ☐ | ☐ | CRITICAL |
| Quantity increase | ☐ | ☐ | |
| Cart operations | ☐ | ☐ | |
| Persistence | ☐ | ☐ | |
| Women's page | ☐ | ☐ | |
| Empty cart | ☐ | ☐ | |
| Cart sidebar | ☐ | ☐ | |
| Toast notifications | ☐ | ☐ | |

---

## 🏆 Expected Results

**If all tests pass, you should see:**
- ✅ Products add to cart instantly
- ✅ Toast notifications appear smoothly
- ✅ Size and color displayed everywhere
- ✅ Same product with different variants = separate entries
- ✅ All cart operations work flawlessly
- ✅ No console errors
- ✅ Cart persists after refresh
- ✅ Clean, professional UX

---

## 🚀 Total Testing Time: ~20-25 minutes

**Priority Order:**
1. **Variant Test** (Test #3) - Most important!
2. Quick View Selection (Test #2)
3. Cart Operations (Test #5)
4. Everything else

---

*Ready to test? Open http://localhost:5174/ and start with Test #3!*
