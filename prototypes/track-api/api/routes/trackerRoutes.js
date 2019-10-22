'use strict';
module.exports = function(app) {
  var tracker = require('../controllers/trackerController')

  // tracker Routes
  app.route('/getproducts')
      .get(tracker.get_products);

  app.route('/createproducts')
     .post(tracker.create_products)

  app.route('/updateproduct')
      .post(tracker.update_product)  

  app.route('/tasks')
      .get(tracker.test); 
};
