import {readFileSync, writeFileSync, existsSync} from 'node:fs';

export default class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  readFile() {
    try {
      let data;
      if (existsSync(this.path))
    } catch(error) {
      console.log(error);
    }
  }

  addProduct = (title, description, price, img, code, stock) => {
    let message;

    if (this.products.some(p => p.code === code)) {
      return `El producto con código ${code} ya se encuentra registrado.`
    } else {
      const newProduct = {
        id: ++ProductManager.id,
        title,
        description,
        price,
        img,
        code,
        stock
      }
    }
  }
}
