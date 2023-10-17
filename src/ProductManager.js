import { readFileSync, writeFileSync, existsSync } from 'node:fs';

export default class ProductManager {

  static #id;

  constructor(path) {
    this.path = path;
    this.format = 'utf-8';
    this.products = this.#archivoExiste();
    ProductManager.#id = this.products.length > 0 ? this.products[this.products.length-1].id : 0;
  }

  #archivoExiste() {
    try {
      let data;
      if (existsSync(this.path))
        data = JSON.parse(readFileSync(this.path, this.format));
      else
        data = [];
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  addProduct(title, description, price, img, code, stock) {
    try {
      if (this.products.some(p => p.code === code)) {
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
          return `Producto agregado`;
        } else {
          return `No se han llenado todos los campos`;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  getProduct() {
    return this.products;
  }

  getProductById(id) {
    const productId = this.products.find(p => p.id === id);

    if (productId)
      return productId;
    else
      return `Producto con ID: ${id} no existe`;
  }

  updateProduct(id, props) {
    try {
      const index = this.products.findIndex(p => p.id === id);
      if (indice != -1) {
        const { id, ...rest } = props;
        writeFileSync(this.path, JSON.stringify(this.products));
        this.products[index] = { ...this.products[index], ...rest };
        return `Producto ${id} actualizado`;
      } else {
        return `Producto con id ${id} no existe`;
      }
    } catch (error) {
      console.log(error);
    }
  }

  deleteProduct(id) {
    try {
      const index = this.products.findIndex(p => p.id === id);

      if (index >= 0) {
        writeFileSync(this.path, JSON.stringify(this.products));
        this.products.splice(index, 1);
        return `Producto ${id} eliminado`;
      } else {
        return `Producto ${id} eliminado`;
      }
    } catch (error) {
      console.log(error);
    }
  }
}