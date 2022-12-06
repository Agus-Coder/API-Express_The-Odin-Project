const faker = require("faker");

class ProductsService {
  //los servicios no se van a ver afectados por el tipo de dato que usemos

  constructor() {
    this.products = []; // because of this, there will not be generated new products in every request
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      });
    }
  }

  create(data) {
    //we can only use this method because there is persistency in memory about products

    const newProduct = {
      id: faker.datatype.uuid(),
      ...data, // this spread operator let us merge the input object with the id we provide
    };
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return this.products;
  }

  findOne(id) {
    return this.products.find((item) => item.id === id);
  }


  update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }

    const product = this.products[index]

    this.products[index] = { // this allows the coed to not fully replace fot the change, but instead it only will raplace over any change
        ...product,
        ...changes
    };

    return this.products[index];
  }

  delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }
    this.products.splice(index, 1);

    return { id };
  }
}

module.exports = ProductsService;
