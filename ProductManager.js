export default class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct = (objeto) => {
    const { title, description, code } = objeto;

    if (!title || !description)
      return 'Rellena todos los parámetros';
    if (this.products.some(product => product.code === code))
      return `El código ${code} ya está registrado`;

      this.products.push({
        title,
        description,
        code
      })
  }
}
