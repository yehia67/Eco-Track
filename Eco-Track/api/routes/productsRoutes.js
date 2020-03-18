const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

router.post('/create',productsController.create);

router.get('/info',productsController.getProductInfo);

router.get('/history',productsController.getProductHistory);

router.post('/update',productsController.updateProduct);

router.post('/updateAll',productsController.updateAllProducts)

router.get('/allProducts',productsController.getAllProducts)


module.exports = router ;