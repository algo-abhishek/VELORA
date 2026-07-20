# Velora - Shoe Store Website

A front-end only shoe shopping website for a  project, styled to match
a reference design (blue brand colour, rounded cards, hero slideshow, category
cards with real photos, a slide-out mini cart, and light/dark mode).

## How to open it

Just double-click `index.html` - no installation needed. An internet
connection is needed for the product photos to load (they come from Unsplash).

## Files

```
index.html      -> Home page (hero slideshow, categories, featured products, offer + testimonials)
shop.html       -> All products, with gender tabs + sidebar filters (category, brand, size, colour) + sorting
product.html    -> One product's detail page (?id=1, ?id=2, ...)
cart.html       -> Full shopping cart page
checkout.html   -> Shipping address + payment method + place order
login.html      -> Login / Sign up / Forgot password / OTP / Reset password
profile.html    -> My Profile, My Orders, Wishlist, Saved Addresses, Payment Cards, Settings, Logout
wishlist.html   -> Saved/liked products
about.html, contact.html, faq.html, policies.html, 404.html -> Extra info pages

css/style.css   -> One shared stylesheet (colours are CSS variables at the top)

js/data.js      -> The shoe list + colour codes + small helper functions
js/main.js      -> Dark/light mode, mobile menu, toast pop-up, "Hi, Name" in header
js/cart.js      -> Cart + wishlist storage (localStorage)
js/drawer.js    -> The slide-out mini cart panel (appears on every page)
js/shop.js      -> Filtering, sorting and gender tabs on the shop page
js/product.js   -> Builds the product detail page
js/auth.js      -> Login / sign up form checks + OTP screen
```

## What changed this round

- **Fixed the size filter bug.** Before, sizes used a hidden checkbox inside
  a clickable label, and clicking it toggled the checkbox AND ran our own
  code at the same time - the two fought each other and the filter silently
  broke. Now each size/colour is a plain button, so there's nothing to
  fight with, and it always works correctly.
- **Hero slideshow** added to the home page (3 slides, arrows, dots, and it
  auto-advances every 5.5 seconds, pausing while you hover over it).
- **Shop by Category now shows shoe types** (Running, Casual, Sports,
  Sneakers, Formal) with real photos, instead of just Men/Women/Kids.
  Men/Women/Kids moved into tabs at the top of the Shop page instead.
- **Profile page redesigned**: cleaner sidebar menu with icons, and a new
  Payment Cards section (add/remove a card) alongside Profile, Orders,
  Addresses and Settings.
- **Mini cart drawer** - clicking the cart icon on any page now slides in a
  quick preview of your cart, with a button to go to the full cart page.

## Notes

- All brand names (Nike,Urban,Sreeleathers,Vantix,Stridecore,Flexon,Runlite,Paceline) are made up
  for this project.
- Cart, wishlist, login and saved cards are all stored in your browser'
  localStorage - there is no real backend/server behind this project.
