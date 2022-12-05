const express = require("express");
const app = express();
const port = 3000;
const routerApi = require("./routes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello there!");
});

app.listen(port, () => {
  console.log(port + " is working");
});

routerApi(app);
