const users = require('../authentication/initUsers')
const Model = require('../../models/index')
const update = async(qrCode,_newData)=>{
    const keyAndId = qrCode.split(',,')
    const producer = await users.getUserForProducts(keyAndId[0])
    const products = producer[1]
    products[keyAndId[1]].push(_newData)
    producer[1] = products
    await Model.update(users.root,keyAndId[0],producer)
 }

 module.exports ={
    execute:update
}