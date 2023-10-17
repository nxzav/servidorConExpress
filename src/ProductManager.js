import { readFileSync, writeFileSync, existsSync } from 'node:fs';

export default class ProductManager {

  static #id;

  constructor(path) {
    this.path = path; // Ruta del archivo
    this.format = 'utf-8'; // formato
    this.products = this.#archivoExiste(); // Consulta de archivo
    // Id se incrementa si la longitud del arreglo superior a 0
    ProductManager.#id = this.products.length > 0 ? this.products[this.products.length-1].id : 0;
  }

  #archivoExiste() {   
    try {
      let data;
      if (existsSync(this.path)) // Se consulta la existencia del archivo
        data = JSON.parse(readFileSync(this.path, this.format));
      else
        data = []; // si no existe, se crea con un arreglo vacío
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  addProduct(title, description, price, img, code, stock) {
    try {
      if (this.products.some(p => p.code === code)) { // Se comprueba que no se duplique el code
        return `El producto con código ${code} ya se encuentra registrado.`
      } else {
        const newProduct = {
          id: ++ProductManager.#id,
          title,
          description,
          price,
          img,
          code,
          stock
        }
        if (!Object.values(newProduct).includes(undefined)) {
          writeFileSync(this.path, JSON.stringify(this.products));
          this.products.push(newProduct);
          return `Producto agregado`; // Se crea un nuevo producto si todos los valores del objeto están definidos
        } else {
          return `No se han llenado todos los campos`;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  getProduct() {
    return this.products; // Se muestran todos los productos desde el método #archivoExiste
  }

  getProductById(id) { // Se comprueba si existe un id coincidente
    const productId = this.products.find(p => p.id === id);

    if (productId)
      return productId; // Si existe, se muestra el objeto, si no, se envía un mensaje
    else
      return `Producto con ID: ${id} no existe`;
  }

  updateProduct(id, props) {
    try {
      const index = this.products.findIndex(p => p.id === id); // Se ubica el archivo a modificar
      if (indice != -1) {
        const { id, ...rest } = props; // Se asigna el valor de las propiedades a actualizar
        writeFileSync(this.path, JSON.stringify(this.products));
        // Se reescribe el producto en la posición indicada en el Array
        this.products[index] = { ...this.products[index], ...rest }; 
        return `Producto ${id} actualizado`; //
      } else {
        return `Producto con id ${id} no existe`;
      }
    } catch (error) {
      console.log(error);
    }
  }

  deleteProduct(id) {
    try {
      const index = this.products.findIndex(p => p.id === id); // Se ubica el índice del producto buscado

      if (index >= 0) { // Se ubica el índice del producto buscado
        writeFileSync(this.path, JSON.stringify(this.products));
        this.products.splice(index, 1); // Se elimina el objeto en el índice indicado al no pasar más argumentos al método
        return `Producto ${id} eliminado`;
      } else {
        return `Producto ${id} no existe`;
      }
    } catch (error) {
      console.log(error);
    }
  }
}