const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/add',authController.add);

router.get('/info',authController.getUserInfo);

router.get('/get',authController.getUser);

router.put('/update',authController.updateUser);


module.exports = router ;