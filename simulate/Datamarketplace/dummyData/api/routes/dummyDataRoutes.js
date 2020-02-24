'use strict';
module.exports = function(app) {
  var dummyData = require('../controllers/dummyDataController');

  // dummyData Routes
  app.route('/data')
    .get(dummyData.generateData)


};
