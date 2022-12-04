const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello there!");
});

app.get("/new-route", (req, res) => {
  res.send("Hello there! This is another route");
});

app.get("/products", (req, res) => {
  res.json([
    {
      name: "product1",
      price: 1000,
    },
    {
      name: "product2",
      price: 2000,
    },
  ]);
});

app.listen(port, () => {
  console.log(port + " is working");
});

// -------------- GET MANIPULATION -------------- //

// -------------- HOW TO COLLECT ID PARAMETERS INFO -------------- //

app.get("/products/:id", (req, res) => {
  const { id } = req.params; // of all the things inside the params object, we only want the id
  // a nice detail is that the name of the const should be equal to the params identification
  //for example, if /products/:productId then: const productId = req.params.productId
  res.json({
    id, // in this case, any id inserted will retrieve the same object
    name: "product2",
    price: 2000,
  });
});

// a more complex endpoint
app.get("/categories/:categoryId/products/:productId", (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId, // in this case, any id inserted will retrieve the same object
    productId, // in this case, any id inserted will retrieve the same object
  });
});

//The important lesson here is to understand how to capture the ID that we need to use


// -------------- HOW TO COLLECT QUERY INFO -------------- //

app.get("/users", (req, res) => {
  const { limit, offset } = req.query; // pay attention, this is another object inside req, we use query objects
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send("there are no parameters");
  }
});

// for now,  we do not need to understand what are these parameters
