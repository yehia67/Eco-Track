'use strict';
module.exports = function(app) {
  var recycler = require('../controllers/recyclerController')

  // recycler Routes
  app.route('./setProductOwner')
      .post(recycler.setProductOwner);

  app.route('/test')
      .get(recycler.test);
};
