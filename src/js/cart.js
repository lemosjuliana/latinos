import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
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
  <button id="closeBtn"><span data-id="${item.Id}">X</span></button>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;

}

renderCartContents();

// You will also need to attach a listener
// to each X or icon.

const button = document.getElementById("closeBtn");
if (button != null)
  button.addEventListener("click", () => {

    // When the X is clicked you need to pull the id of the item to be removed,
    const ItemId = e.target.getAttribute("data-id");

    //then pull the contents of the cart from local storage,
    let cart = [];
    cart.push(getLocalStorage("so-cart"));
    cart.map((CartItem) => {
            if (CartItem.Id == ItemId) {
              const index = cart.indexOf(CartItem);
              // remove the appropriate item, and restore the cart in localStorage. 
              cart.splice(index, 1);
              //Then re-render the cart list.
              setLocalStorage("so-cart", cart);
              document.location.reload();
            }
       });
    });
      
      
    

  
 





















