import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
const port = 8080;

const products = new ProductManager('../productos.json'); // Se crea la clase especificando la ruta del archivo a consultar o crear (path)

// Responde con un titular al no recibir ruta específica
app.get('/', (req, res) => {
  res.send('<h1>Servidor con Express</h1>');
});

app.get('/products', (req, res) => {
  const {limit} = req.query;  // Se guarda y desestructura el query recibido
  const productos = products.getProduct(); // Se utiliza el método para consultar los productos
  let productsLimit;
  if (limit) {
    productsLimit = productos.slice(0, limit);
    console.log('Productos mostrados:', limit);
  }
   // Si hay query, se secciona el arreglo desde el origen al valor del índice
  else {
    productsLimit = productos; // Si no hay query, se muestran todos los productos
  }
  
  return res.json(productsLimit); 
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params; // Se almacena el valor del parámetro
  return res.json(products.getProductById(parseInt(id))); // Se devuelve el producto con el método de filtro por ID
})



app.listen(port, () => console.log(`Server running on port ${port}`));