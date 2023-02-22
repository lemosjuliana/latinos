import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

// takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
      convertedJSON = {};
  
    formData.forEach(function (value, key) {
      convertedJSON[key] = value;
    });
  
    return convertedJSON;
}

function packageItems(items) {
    // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
    const simplifiedItems = items.map((item) => {
        console.log(item);
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item,Name,
            quantity: 1,
        };
    });
    return simplifiedItems;
    }
    
export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }
    init() {
      this.list = getLocalStorage(this.key);
      this.calculateItemSummary();
    }
    calculateItemSummary() {
      // calculate and display the total amount of the items in the cart, and the number of items.
      const summaryElement = document.querySelector(
        this.outputSelector + "#cart-total"
      );
      const itemElement = document.querySelector(
        this.outputSelector + "#items-Subtotal"
      );
      itemElement.innerText = this.list.length;
      const amountItems = this.list.map((item) => item.FinalPrice);
      this.orderTotal = amountItems((sum, item) => sum + item);
      summaryElement.innerText =  "$" + this.orderTotal;
    }
    calculateOrdertotal() {
      // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
      this.shipping = 10 + (this.list.length -1) *2;
      this.tax = (this.items-Subtotal * 0.06).toFixed(2);
      this.orderTotal = (
        parseFloat(this.itemTotal) +
        parseFloat(this.shipping) +
        parseFloat(this.tax)
      ).toFixed(2);
      // display the totals.
      this.displayOrderTotals();
    }
    displayOrderTotals() {
      // once the totals are all calculated display them in the order summary page
      const shipping = document.querySelector(this.outputSelector + "#estimate");
      const tax = document.querySelector(this.outputSelector + "#tax-total");
      const orderTotal = document.querySelector(this.outputSelector + "order-total");

      shipping.innerText = "$" + this.shipping;
      tax.innerText = "$" + this.tax;
      orderTotal.innerText = "$" + this.orderTotal;
    }
    async checkout(form) {
        // build the data object from the calculated fields, the items in the cart, and the information entered into the form
        const formElement = document.forms["checkout"];

        const json = formDataToJSON(formElement);
        // call the checkout method in our ExternalServices module and send it our data object.
        json.orderTotal = this.orderTotal;
        json.shipping = this.shipping;
        json.tax = this.tax;
        json.items = packageItems(this.list);
        json.date = new Date();
    }
  }