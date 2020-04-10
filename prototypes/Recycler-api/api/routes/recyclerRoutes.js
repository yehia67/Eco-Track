'use strict';
module.exports = function(app) {
  var recycler = require('../controllers/recyclerController')

  // recycler Routes
  app.route('/addClient')
     .post(recycler.addClient);

  app.route('/addOwner')
     .post(recycler.addOwner); 
  
  app.route('/products')
     .get(recycler.getProducts); 
   
  app.route('/giveReward')
     .post(recycler.giveReward);

     app.route('/send')
     .post(recycler.send);

  app.route('/fetch')
     .post(recycler.fetch);

  app.route('/test')
     .get(recycler.test);
};
