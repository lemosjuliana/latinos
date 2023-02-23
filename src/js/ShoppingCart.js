import { getLocalStorage } from "./utils.mjs";

function shoppingCartTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

// export default class ShoppingCart {
//   constructor(shoppingCartItems, shoppingHtmlItems) {
//     this.shoppingCartItems = shoppingCartItems;
//     this.shoppingHtmlItems = shoppingHtmlItems;
//   }
//   renderCartContents() {
//     const cartItems = getLocalStorage(this.shoppingCartItems);
//     if (cartItems) {
//       const htmlItems = cartItems.map((item) => shoppingCartTemplate(item));
//       document.querySelector(this.shoppingHtmlItems).innerHTML =
//         htmlItems.join("");
//     }
//   }
// }

// function calculateInCart() {
//   const cartItems = getLocalStorage("so-cart");
//   let total = 0;
//   if (cartItems) {
//     total = total + cartItems.FinalPrice;
//   }
//   return total;
// }
// function displayTotal() {
//   const showTotal = `<p class="cart-total">$${total}</p>`;

//   return showTotal;
// }

// let total = calculateInCart();
// displayTotal();
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
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
    document.querySelector(".list-total").innerText += ` $${this.total}`;
  }
}