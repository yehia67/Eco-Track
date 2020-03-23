  'use strict';
const createProducts = require('./Products/createProducts')
const getProductInfo = require('./Products/getProductInfo')
const getProductHistory = require('./Products/getProductHistory')
const updateProduct = require('./Products/updateProducts')
const uploadExcelFile = require('./Products/uploadExcelFile')


exports.create = async (req,res) =>{
    console.log('body is')
    console.log(req.body)
    console.log(req.body.key)
    console.log(req.body.seedKey)
    console.log(req.body.products)
    const response = await createProducts.execute(req.body.key,req.body.seedKey,req.body.products)
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