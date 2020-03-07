const users = require('../authentication/initUsers')
const Model = require('../../models/index')
const update = async(_key,_id,_newData)=>{
    const producer = await users.getUser(_key)
    const products = producer[1]
    products[_id].push(_newData)
    producer[1] = products
    console.log('producer el gowaa')
    console.log(producer)
    await Model.update(users.root,_key,producer)
 }

 module.exports ={
    execute:update
}