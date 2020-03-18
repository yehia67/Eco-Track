  'use strict';
const createProducts = require('./Products/createProducts')
const getProductInfo = require('./Products/getProductInfo')
const getProductHistory = require('./Products/getProductHistory')
const updateProduct = require('./Products/updateProducts')
const updateAllProducts = require('./Products/updateAllProducts')
const getAllProducts = require('./Products/getAllProducts')


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
exports.updateAllProducts = async (req ,res) =>{
    await updateAllProducts.execute(req.body.key,req.body.shipmentNo,req.body.product)
    res.json('All products are updated')
}
exports.getAllProducts = async (req,res) =>{
    const response = await getAllProducts.execute(req.body.key,req.body.shipmentNo)
    res.json(response)
}
