const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

router.post('/create',productsController.create);


router.get('/info',productsController.getProductInfo);

router.get('/history',productsController.getProductHistory);

router.get('/all',productsController.getProductHistory);

router.put('/update',productsController.updateProduct);

module.exports = router ;