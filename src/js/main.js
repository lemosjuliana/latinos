import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");
const object = document.querySelector(".product-list");
const list = new ProductList("Tents", dataSource, object);

list.init();

loadHeaderFooter();