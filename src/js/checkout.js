import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

const element = document.querySelector("#zip");
if(element){
  element.addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));
}
// document
//   .querySelector()
//   .addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));
// listening for click on the button
document.querySelector("#checkoutSubmit")
  .addEventListener("click", (e) => {
    e.preventDefault();

    myCheckout.checkout();
  });

