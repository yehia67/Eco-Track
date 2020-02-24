'use strict';
const generator = require('./fakeDataGenerator')


exports.generateData = function(req, res) {
    console.log(req.query.scannerPlace)
    console.log(req.query.numberOfProducts)
    res.json(generator.execute(req.query.scannerPlace,req.query.numberOfProducts))
};


