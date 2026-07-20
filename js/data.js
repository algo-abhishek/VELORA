/* ==========================================================================
   DATA.JS
   Every shoe we sell lives in this one list. Every page (home, shop,
   product page, cart...) reads from this same list, so we only ever
   have to add a new shoe in one place.

   Real photos come from Unsplash (free to use, no attribution needed).
   Brand names (Stridecore, Flexon, Runlite, Paceline, Vantix) are made
   up for this project so there is no copyright issue.
   ========================================================================== */

/* Small helper so we don't repeat the same Unsplash settings every time */
function img(photoId, width) {
  return "https://images.unsplash.com/" + photoId + "?auto=format&fit=crop&w=" + width + "&q=70";
}

/* Turns a colour name into a real hex code, used for swatches everywhere */
var colorHex = {
  Black: "#1a1a1a", White: "#f2f2f2", Grey: "#9aa0ac", Navy: "#1e3a8a",
  Red: "#e5484d", Brown: "#78350f", Blue: "#3b5cf6", Pink: "#ff6f91",
  Beige: "#d6c7a1", Purple: "#8b5cf6", Green: "#2f9e58", Orange: "#ff8a3d",
  Yellow: "#ffcb3d"
};

var products = [
  { id: 1,  name: "Air Glide Runner",       brand: "Nike",       gender: "men",   category: "Running",  price: 3499, old: 4499, rating: 4.5, reviews: 128, colors: ["Black", "White"],  sizes: [6,7,8,9,10],  img: img("photo-1580902215223-647d515e04fa", 500) },
  { id: 2,  name: "UrbanStep Classic",      brand: "Urban",      gender: "men",   category: "Casual",   price: 2799, old: 3299, rating: 4.2, reviews: 96,  colors: ["Grey", "White"],   sizes: [7,8,9,10,11], img: img("photo-1596744288358-45428ce99fc4", 500) },
  { id: 3,  name: "Trail Blaze Pro",        brand: "Nike",       gender: "men",   category: "Sports",   price: 4199, old: 5299, rating: 4.7, reviews: 214, colors: ["Grey", "White"],   sizes: [7,8,9,10],    img: img("photo-1580902215301-725c23d291f9", 500) },
  { id: 4,  name: "Formal Oxford Wing",     brand: "Sreeleathers",gender: "men",   category: "Formal",   price: 3199, old: 3799, rating: 4.3, reviews: 61,  colors: ["Brown", "Black"],  sizes: [7,8,9,10,11], img: img("photo-1533867617858-e7b97e060509", 500) },
  { id: 5,  name: "Court Snap Sneaker",     brand: "Vantix",     gender: "men",   category: "Sneakers", price: 2999, old: 3599, rating: 4.4, reviews: 143, colors: ["White", "Black"],  sizes: [6,7,8,9,10],  img: img("photo-1558121556-2a39fc528338", 500) },
  { id: 6,  name: "Featherlite Sprint",     brand: "Stridecore", gender: "women", category: "Running",  price: 3299, old: 3999, rating: 4.6, reviews: 172, colors: ["Pink", "White"],   sizes: [5,6,7,8,9],   img: img("photo-1744812441866-80ff6acfebdf", 500) },
  { id: 7,  name: "Everyday Slip Comfort",  brand: "Flexon",     gender: "women", category: "Casual",   price: 2399, old: 2899, rating: 4.1, reviews: 87,  colors: ["White", "Grey"],   sizes: [5,6,7,8],     img: img("photo-1663151862988-280c2efc38a1", 500) },
  { id: 8,  name: "PowerFlex Trainer",      brand: "Runlite",    gender: "women", category: "Sports",   price: 3599, old: 4299, rating: 4.5, reviews: 133, colors: ["Red", "White"],    sizes: [5,6,7,8,9],   img: img("photo-1650320079970-b4ee8f0dae33", 500) },
  { id: 9,  name: "Studio Ballet Flat",     brand: "Paceline",   gender: "women", category: "Formal",   price: 2199, old: 2599, rating: 4.0, reviews: 54,  colors: ["Black", "Brown"],  sizes: [5,6,7,8],     img: img("photo-1603191659812-ee978eeeef76", 500) },
  { id: 10, name: "Retro Wave Sneaker",     brand: "Vantix",     gender: "women", category: "Sneakers", price: 2899, old: 3499, rating: 4.4, reviews: 121, colors: ["Pink", "White"],   sizes: [5,6,7,8,9],   img: img("photo-1744812441887-8084826a2b04", 500) },
  { id: 11, name: "Junior Bounce Runner",   brand: "Stridecore", gender: "kids",  category: "Running",  price: 1699, old: 2099, rating: 4.6, reviews: 98,  colors: ["Blue", "White"],   sizes: [1,2,3,4,5],   img: img("photo-1605523741177-cd660595c2cf", 500) },
  { id: 12, name: "Playground Casual",      brand: "Flexon",     gender: "kids",  category: "Casual",   price: 1399, old: 1699, rating: 4.3, reviews: 76,  colors: ["Red", "White"],    sizes: [1,2,3,4],     img: img("photo-1584564515943-b54cbb61836b", 500) },
  { id: 13, name: "SchoolStep Formal",      brand: "Paceline",   gender: "kids",  category: "Formal",   price: 1599, old: 1899, rating: 4.2, reviews: 44,  colors: ["Black", "White"],  sizes: [1,2,3,4,5],   img: img("photo-1605382165091-443eff32caf5", 500) },
  { id: 14, name: "Hop & Skip Sneaker",     brand: "Vantix",     gender: "kids",  category: "Sneakers", price: 1799, old: 2199, rating: 4.5, reviews: 68,  colors: ["Pink", "Orange"],  sizes: [1,2,3,4,5],   img: img("photo-1766129486324-2d8894484750", 500) },
  { id: 15, name: "Marathon Elite X",       brand: "Runlite",    gender: "men",   category: "Running",  price: 4999, old: 6299, rating: 4.8, reviews: 256, colors: ["White", "Grey"],   sizes: [7,8,9,10,11], img: img("photo-1595805719192-b31da140a625", 500) },
  { id: 16, name: "CloudWalk Slip-on",      brand: "Flexon",     gender: "women", category: "Casual",   price: 2599, old: 2999, rating: 4.3, reviews: 91,  colors: ["Grey", "White"],   sizes: [5,6,7,8,9],   img: img("photo-1596744288321-50a4c91f2782", 500) },
  { id: 17, name: "Street Flex High-Top",   brand: "Vantix",     gender: "men",   category: "Sneakers", price: 3399, old: 3999, rating: 4.4, reviews: 105, colors: ["White", "Black"],  sizes: [7,8,9,10,11], img: img("photo-1595805737846-ab795bc2c782", 500) },
  { id: 18, name: "Court Ace Sports",       brand: "Runlite",    gender: "women", category: "Sports",   price: 3199, old: 3799, rating: 4.2, reviews: 77,  colors: ["White", "Pink"],   sizes: [5,6,7,8],     img: img("photo-1650320079970-b4ee8f0dae33", 500) },
  { id: 19, name: "TinyTrek Outdoor",       brand: "Stridecore", gender: "kids",  category: "Sports",   price: 1899, old: 2299, rating: 4.4, reviews: 52,  colors: ["Blue", "Pink"],    sizes: [1,2,3,4],     img: img("photo-1624958797025-b119e2fa2b53", 500) },
  { id: 20, name: "Boardwalk Loafer",       brand: "Sreeleathers",gender: "men",   category: "Casual",   price: 2699, old: 3199, rating: 4.1, reviews: 63,  colors: ["Brown", "Black"],  sizes: [7,8,9,10,11], img: img("photo-1616406432452-07bc5938759d", 500) },
  { id: 21, name: "Night Watch Derby",      brand: "Sreeleathers",gender: "men",   category: "Formal",   price: 3399, old: 3999, rating: 4.3, reviews: 58,  colors: ["Black"],           sizes: [7,8,9,10,11], img: img("photo-1668069226492-508742b03147", 500) },
  { id: 22, name: "Heritage Brown Brogue",  brand: "Sreeleathers",gender: "men",   category: "Formal",   price: 3599, old: 4199, rating: 4.5, reviews: 72,  colors: ["Brown"],           sizes: [7,8,9,10,11], img: img("photo-1614253429340-98120bd6d753", 500) },
  { id: 23, name: "City Walk Loafer",       brand: "Vantix",     gender: "women", category: "Formal",   price: 2499, old: 2899, rating: 4.1, reviews: 49,  colors: ["Black", "Brown"],  sizes: [5,6,7,8],     img: img("photo-1605732440685-d0654d81aa30", 500) },
  { id: 24, name: "Blaze Court Trainer",    brand: "Nike",       gender: "men",   category: "Sports",   price: 3899, old: 4599, rating: 4.6, reviews: 118, colors: ["Grey", "White"],   sizes: [7,8,9,10,11], img: img("photo-1580902215262-9b941bc6eab3", 500) },
  { id: 25, name: "Rose Trail Sneaker",     brand: "Nike",       gender: "women", category: "Running",  price: 3699, old: 4399, rating: 4.5, reviews: 102, colors: ["Pink", "Grey"],    sizes: [5,6,7,8,9],   img: img("photo-1744812441887-8084826a2b04", 500) },
  { id: 26, name: "Downtown Low-Top",       brand: "Vantix",     gender: "men",   category: "Sneakers", price: 3099, old: 3599, rating: 4.3, reviews: 88,  colors: ["White", "Black"],  sizes: [6,7,8,9,10],  img: img("photo-1596744271582-1d87e9aae223", 500) },
  { id: 27, name: "Sunny Days Sneaker",     brand: "Flexon",     gender: "kids",  category: "Sneakers", price: 1599, old: 1899, rating: 4.4, reviews: 41,  colors: ["Orange", "White"], sizes: [1,2,3,4,5],   img: img("photo-1742390671647-bc9c5399fdf3", 500) },
  { id: 28, name: "First Steps Runner",     brand: "Stridecore", gender: "kids",  category: "Running",  price: 1499, old: 1799, rating: 4.3, reviews: 36,  colors: ["Blue", "White"],   sizes: [1,2,3,4],     img: img("photo-1624958797025-b119e2fa2b53", 500) },
  { id: 29, name: "Weekend Canvas Slip-on", brand: "Flexon",     gender: "women", category: "Casual",   price: 2299, old: 2699, rating: 4.0, reviews: 65,  colors: ["White", "Grey"],   sizes: [5,6,7,8,9],   img: img("photo-1596744288321-50a4c91f2782", 500) },
  { id: 30, name: "All Court Basketball",   brand: "Nike",       gender: "men",   category: "Sports",   price: 4299, old: 4999, rating: 4.6, reviews: 140, colors: ["White", "Grey"],   sizes: [7,8,9,10,11], img: img("photo-1580902215223-647d515e04fa", 500) }
];

/* If someone has added/edited products using admin.html, use that saved
   list instead of the default one above. This way every page (home, shop,
   product page...) automatically shows the latest products without us
   having to change any other file. */
var savedProducts = localStorage.getItem("productsData");
if (savedProducts !== null) {
  products = JSON.parse(savedProducts);
}

/* Called by admin.html after adding, editing, or deleting a product */
function saveProducts() {
  localStorage.setItem("productsData", JSON.stringify(products));
}

/* Photos used for the 5 "Shop by Category" cards on the home page */
var categoryPhotos = {
  Running:  img("photo-1595805719192-b31da140a625", 400),
  Casual:   img("photo-1596744288358-45428ce99fc4", 400),
  Sports:   img("photo-1580902215301-725c23d291f9", 400),
  Sneakers: img("photo-1558121556-2a39fc528338", 400),
  Formal:   img("photo-1533867617858-e7b97e060509", 400)
};

/* Turn a number into Rupee text, example: 3499 becomes "₹3,499" */
function formatPrice(number) {
  return "₹" + number.toLocaleString("en-IN");
}

/* Turn a rating number into stars text, example: 4.5 becomes "★★★★★" (rounded) */
function starsText(rating) {
  var fullStars = Math.round(rating);
  var text = "";
  for (var i = 0; i < 5; i++) {
    if (i < fullStars) {
      text += "★";
    } else {
      text += "☆";
    }
  }
  return text;
}

/* Find one product using its id number */
function findProduct(id) {
  for (var i = 0; i < products.length; i++) {
    if (products[i].id === Number(id)) {
      return products[i];
    }
  }
  return null;
}
