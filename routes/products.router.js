const express = require("express");
const router = express.Router();

const ProductsService = require("../services/products.service");

const service = new ProductsService();

router.get("/", (req, res) => {
  const products = service.find();
  res.json(products);
});

/* before we used services:

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
*/

// there is an important case to analize:

router.get("/filter", (req, res) => {
  res.send("Im a filter");
});

router.get(
  "/:id",
  async (req, res, next) => { // NO OLVIDAR AGREGAR NEXT ACAA!!!
    try {
      const { id } = req.params; // of all the things inside the params object, we only want the id
      // a nice detail is that the name of the const should be equal to the params identification
      //for example, if /products/:productId then: const productId = req.params.productId
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  /*Before we used services:

router.get("/:id", (req, res) => {
  const { id } = req.params; // of all the things inside the params object, we only want the id
  // a nice detail is that the name of the const should be equal to the params identification
  //for example, if /products/:productId then: const productId = req.params.productId
  if (id === "999") {
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

*/
);

router.post("/", (req, res) => {
  // inside this archive we already are in LH:3000/api/v1/products !!!
  const body = req.body;
  const newProduct = service.create(body);
  res.status(201).json(newProduct);
});

/* before the service was implemented:

router.post("/", (req, res) => {
  // inside this archive we already are in LH:3000/api/v1/products !!!
  const body = req.body;
  res.status(201).json({
    //this is how you send an status code
    message: "created",
    data: body,
  });
});


*/

router.patch("/:id", (req, res) => {
  // you could use put as well in here, but the convention says us that we should use patch for partial information
  const { id } = req.params;
  const body = req.body;
  const product = service.update(id, body);
  res.json(product);
});

/* before services are implemented:

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

*/

router.delete("/:id", (req, res) => {
  // you could use put as well in here, but the convention says us that we should use patch for partial information
  const { id } = req.params;
  const body = req.body;
  const rta = service.delete(id);
  res.json(rta);
});

/* Before changes to services are implemented:

router.delete("/:id", (req, res) => {
  // you could use put as well in here, but the convention says us that we should use patch for partial information
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: "deleted",
    id,
  });
});

*/

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
