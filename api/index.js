const apiRouter = require('express').Router();

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

apiRouter.use('/cart', require('./cartRouter'))
// apiRouter.use('/categories', require('./categoriesRouter'))
// apiRouter.use('/orderHistory', require('./orderHistoryRouter'))
// apiRouter.use('/orderItems', require('./orderItemsRouter'))
apiRouter.use('/products', require('./productsRouter'))
apiRouter.use('/users', require('./usersRouter'))

apiRouter.use((error, req, res, next) => {
  res.send({
    message: error.message,
    name: error.name,
    error: error.message
  })
})
// place your routers here

module.exports = apiRouter;
