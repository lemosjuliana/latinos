import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const object = document.querySelector(".product-list");
const list = new ProductList(category, dataSource, object);

list.init();

