'use strict';
module.exports = function(app) {
  const authController = require('../controllers/authController');
  const productsController = require('../controllers/productsController')

  // user Routes
  app.route('/user/add')
    .post(authController.add);
  
  app.route('/user/info')
    .get(authController.getUserInfo);

  app.route('/user/get')
    .get(authController.getUser);

  app.route('/user/update')
    .put(authController.updateUser);
  
  // product route  
  app.route('/products/create')
      .post(productsController.create)

  app.route('/products/info')
      .get(productsController.getProductInfo)

  app.route('/products/history')
      .get(productsController.getProductHistory)

  app.route('/products/update')
      .post(productsController.updateProduct)
      
}

