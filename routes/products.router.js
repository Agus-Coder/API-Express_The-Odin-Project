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
  if (id === '999') {
    res.status(404).json({
      message: "not Found",
    });
  } else {
    res.status(200).json({
      id,
      name: "product X",
      price: 2000,
    });
  }

  res.json({
    id, // in this case, any id inserted will retrieve the same object
    name: "product2",
    price: 2000,
  });
});

router.post("/", (req, res) => {
  // inside this archive we already are in LH:3000/api/v1/products !!!
  const body = req.body;
  res.status(201).json({ //this is how you send an status code
    message: "created",
    data: body,
  });
});

router.patch("/:id", (req, res) => {
  // you could use put as well in here, but the convention says us that we should use patch for partial information
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: "update",
    data: body,
    id,
  });
});

router.delete("/:id", (req, res) => {
  // you could use put as well in here, but the convention says us that we should use patch for partial information
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: "deleted",
    id,
  });
});

// we must send codes in every response

/*
coded like this:

router.post("/", (req, res) => {  
  const body = req.body;
  res.json({
    message: "created",
    data:  body,
  });
});

the body data is not delivered! We need a middleware!

*/

module.exports = router;
