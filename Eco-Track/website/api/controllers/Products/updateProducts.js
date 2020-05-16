const users = require('../authentication/initUsers')
const Model = require('../../models/index')
const update = async(qrCode,_newData)=>{
    console.log(qrCode)
    console.log(_newData)
    const keyAndId = qrCode.split(',,')
    console.log(keyAndId)
    const producer = await users.getUserForProducts(keyAndId[0])
    console.log(producer)
    const products = producer[1]
    console.log(products)
    products[keyAndId[1]].push(_newData)
    producer[1] = products
    console.log(producer)
    await Model.update(users.root,keyAndId[0],producer)
    console.log('done')
 }

 module.exports ={
    execute:update
}