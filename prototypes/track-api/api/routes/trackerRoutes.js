'use strict';
module.exports = function(app) {
  var tracker = require('../controllers/trackerController')

  // tracker Routes

    
  app.route('/tasks')
      .get(tracker.test);

  app.route('/createproducts')
     .post(tracker.create_products)
    
  app.route('/tasks/:taskId')
    
};
