import ExternalServices from "./ExternalServices.mjs";
import { alertMessage } from "./utils.mjs";

export default class Admin{
    constructor(outputSelector){
        this.mainElement = document.querySelector(outputSelector);
        this.token = null;
        this.services = new ExternalServices();
        
    }
    async login(creds, next){
     // I built the login method with a callback: next. 
    // This makes it much more flexible...
    // there could be many different things the user wants to do after logging in...
    // this allows us that flexibility without having to write a bunch of login methods
        try {
            this.token = await this.services.loginRequest(creds);
            next();
        } 
        catch(err) {
        // remember this from before?
           alertMessage(err.message.message);
        }
}

    
    showLogin(){
        this.mainElement.innerHTML = loginTemplate();
        document.querySelector("#loginSubmit").addEventListener("click", (e) =>{
            const email = document.querySelector("#email").value;
            const password = document.querySelector("#password").value;
            this.login({email, password}, this.showOrders.bind(this));
        });
    }
    async showOrders(){
        const orders = await this.services.getOrders(this.token);
        this.mainElement.innerHTML = orderTemplate();
        const table = document.querySelector("#orders tbody");
        table.innerHTML = orders.map((order)=> 
        `<tr><td>${order.id}</td><td>${new Date(order.orderDate)
            .toLocaleDateString("en-US")}</td>
            <td>${order.items.length}</td>
            <td>${order.orderTotal}</td></tr>`).join("");
    }
}
function loginTemplate() {
    return `<fieldset class="login-form">
    <legend>Login</legend>
    <label for="email">Card Number</label>
    <input type="text" placeholder="email" id="email" value="user1@email.com" required>
    <label for="password">Password</label>
    <input type="password" placeholder="password" id="password" required>
    <button type="submit" id="loginSubmit">Login</button>
  </fieldset>`;
}
function orderTemplate() {
    return `<h2>Order Summary</h2>
    <table id="orders">
    <thead>
    <tr><th>Id</th><th>Date</th><th>Items</th><th>Total</th>
    </thead>
    <tbody class="order-body"></tbody>
    </table>`;
}