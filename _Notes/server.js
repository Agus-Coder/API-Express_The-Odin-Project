const express = require("express");
const faker = require("faker");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello there!");
});

app.get("/new-route", (req, res) => {
  res.send("Hello there! This is another route");
});

app.get("/products", (req, res) => {

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

app.get('/products/filter',(req, res)=>{
  res.send('Im a filter')
})

/* ----------------------- Everything that is specific must be placed before anything that is dinamic ----------------------- */

// if you wrote the "/products/filter" after the "/products/:id", then 'filter' will be taken as an ID.
// BUT if you place it BEFORE (as is written right now) the id route, then it will be taken as an independent route.
// that is why "Everything that is specific must be placed before anything that is dinamic"


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


app.listen(port, () => {
  console.log(port + " is working");
});