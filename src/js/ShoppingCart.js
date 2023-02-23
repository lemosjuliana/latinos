import { getLocalStorage } from "./utils.mjs";

const productList = document.querySelector(".product-list")
productList.addEventListener("click", (event => {
  if (event.target.matches(".remove-item")) {
    const itemId = event.target.dataset.id;
    const cartItems = getLocalStorage("so-cart");
    const updateCart = cartItems.filter((item) => item.Id !== itemId);
    localStorage.setItem("so-cart", JSON.stringify(updateCart));
    renderCartContents();
  }
}));

function shoppingCartTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <span class="remove-item" data-id="${item.Id}">X</span>
  </li>`;

  return newItem;
  }

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.total = 0;
  }
  async init() {
    const list = getLocalStorage(this.key);
    this.calculateListTotal(list);
    this.renderCartContents(list);
  }
  calculateListTotal(list) {
    const amounts = list.map((item) => item.FinalPrice);
    this.total = amounts.reduce((sum, item) => sum + item);
  }
    renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    if (cartItems != null) {
      const htmlItems = cartItems.map((item) => shoppingCartTemplate(item));
      document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
    } 
    else {
      let div = document.createElement("div");
      let p = document.createElement("p");
      p.innerText = "Your cart is empty."
      div.appendChild(p);
      document.querySelector(".products").insertBefore(div, document.querySelector(this.parentSelector));
  
    }
  }
}

 function calculateInCart() {
   const cartItems = getLocalStorage("so-cart");
   let total = 0;
   if (cartItems) {
     total = total + cartItems.FinalPrice;
   }
   return total;
 }
 function displayTotal() {
   const showTotal = `<p class="cart-total">$${total}</p>`
   return showTotal;
 
 let total = calculateInCart();
 displayTotal();
 }