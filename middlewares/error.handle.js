// los middlewares de tipo error se deben hacer despues de definir el routing

function logErrors(err, req, res, next) {
  console.log("logErrors");
  console.error(err);
  next(err); // al enviar el error como parametro se convierte entonces en un mw de error
}

function errorHandler(err, req, res, next) {
    console.log("ErrorHandler");
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

module.exports = { logErrors, errorHandler };
