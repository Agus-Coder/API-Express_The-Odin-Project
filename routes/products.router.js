const express = require("express");
const router = express.Router();
const faker = require("faker");

router.get("/", (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;

  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }

  res.json(products);
});

// there is an important case to analize:

router.get("/filter", (req, res) => {
  res.send("Im a filter");
});

router.get("/:id", (req, res) => {
  const { id } = req.params; // of all the things inside the params object, we only want the id
  // a nice detail is that the name of the const should be equal to the params identification
  //for example, if /products/:productId then: const productId = req.params.productId
  res.json({
    id, // in this case, any id inserted will retrieve the same object
    name: "product2",
    price: 2000,
  });
});

module.exports = router;
