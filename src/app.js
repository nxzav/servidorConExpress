import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
const port = 8080;

const products = new ProductManager('../productos.json');

app.get('/', (req, res) => {
  res.send('<h1>Servidor con Express</h1>');
});

app.get('/products', (req, res) => {
  const {limit} = req.query;
  const productos = products.getProduct();
  let proQty;
  if (limit)
    proQty = productos.slice(0, limit);
  else
    proQty = productos;
  console.log('Productos mostrados:', limit);
  return res.json(proQty);
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  return res.json(products.getProductById(parseInt(id)));
})



app.listen(port, () => console.log(`Server running on port ${port}`));