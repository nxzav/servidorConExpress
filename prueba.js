// import express from "express";
import ProductManager from "./src/ProductManager.js";

const products = new ProductManager('../productos.json');

// const producto1 = products.addProduct("RAM","Kingston 16GB",700,"img1","1001",98);
// const producto2 = products.addProduct("RAM","Adata 16GB",800,"img2","1001",32);
// const producto3 = products.addProduct("SSD","WD NVMe 2TB",2700,"img3","1003",75);
// const producto4 = products.addProduct("HDD","Seagate 8TB",2000,"img4","1004",12);
// const producto5 = products.addProduct("USB","Adata 256GB",270,"img5","1005",73);

// console.log({producto1, producto2, producto3, producto4, producto5});
console.log(products.getProduct());
// console.log(products.getProductById(2));

// console.log(products.deleteProduct(1));