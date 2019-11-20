'use strict';
module.exports = function(app) {
  var recycler = require('../controllers/recyclerController')

  // recycler Routes
  app.route('./initClient')
      .post(recycler.initClient);

  app.route('/test')
      .get(recycler.test);
};
