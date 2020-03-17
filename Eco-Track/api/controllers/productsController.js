  'use strict';
const createProducts = require('./Products/createProducts')
const getProductInfo = require('./Products/getProductInfo')
const getProductHistory = require('./Products/getProductHistory')
const updateProduct = require('./Products/updateProducts')


exports.create = async (req,res) =>{
    const response = await createProducts.execute(req.body.key,req.body.products)
    res.json('Product created')
}

exports.getProductInfo = async (req,res) =>{
     const response = await getProductInfo.execute(req.body.qrCode)
     res.json(response)
}  
exports.getProductHistory = async (req,res) =>{
   const response =  await getProductHistory.execute(req.body.qrCode)
    res.json(response)
}  
exports.updateProduct = async (req,res) =>{
    await updateProduct.execute(req.body.qrCode,req.body.product)
    res.json('Product is updates ')
}  