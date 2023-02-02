//Your class should read the contents of the alerts.js file,
//and if it finds anything it should create a
//<section class="alert-list> element then
//loop through the results and build a <p>
//for each alert and apply the background and
//foreground colors to it specified in the alert.

export default class Alert {
    constructor(category) {
        this.category = category;
        this.path = `../json/${this.category}.json`;
        }
        getAlert() {
        return fetch(this.path)
            .then(convertToJson)
            .then((data) => data);
        }
    //     async findProductById(id) {
    //     const products = await this.getAlert();
    //     return products.find((item) => item.Id === id);
    //   }

    async displayAlert(element) {
        const alerts = await this.getAlert();
        if (alerts) {
            const alertContents = document.getElementById(element);
            const alertSection = document.createElement("section");
            alertContents.classList.add("alert-list");
    
            alerts.map((alert) => {
                const alertParagraph = document.createElement("p");
                alertParagraph.innerHTML = alert.message;
                alertParagraph.style.backgroundColor = alert.background;
                alertParagraph.style.color = alert.color;
    
                alertSection.append(alertParagraph);
            });

            alertContents.append(alertSection);
        }
    }
}

