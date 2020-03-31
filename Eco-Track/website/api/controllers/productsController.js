  'use strict';
const createProducts = require('./Products/createProducts')
const getProductInfo = require('./Products/getProductInfo')
const getProductHistory = require('./Products/getProductHistory')
const updateProduct = require('./Products/updateProducts')
const getAllProducts = require('./Products/getAllProducts.js')

exports.create = async (req,res) =>{
    const products = req.body.products.split( "/")
    if (products[products.length-1] === "") {
        products.pop()
    }
    console.log('products in controller are')
    console.log(JSON.parse(JSON.stringify(products)))
    const response = await createProducts.execute(req.body.key,req.body.seedKey,JSON.parse(JSON.stringify(products)))
    console.log('response is',response)
/*     const newProducts = await  getAllProducts.execute(req.body.key,req.body.seedKey,1)
    res.json(newProducts) */
    res.json('producted created')
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