const productsRouter = require('./products.router')

function routerApi(app){
    app.use('/products', productsRouter)
}

module.exports = routerApi;