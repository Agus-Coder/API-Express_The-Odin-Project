const express = require("express");
const app = express();
const port = 3000;
const routerApi = require("./routes");

const { logErrors, errorHandler } = require("./middlewares/error.handle");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello there!");
});

routerApi(app);

//Los errors handlers siempre deben estar despues del el router

app.use(logErrors);
app.use(errorHandler); // el orden de estos middlewares es importante, pues asi es como esta escrito sera ejecutado

/*
  Por ejemplo, si primero escribiera errorHandle y luego logErrors, resulta que este segundo middleware no se
  ejecutaria, debido a que errorHandler no posee un next(), distinto a logErros que si lo hace.
  errorHandler mataria la ejecucion del siguiente middleware
*/

app.listen(port, () => {
  console.log(port + " is working");
});
