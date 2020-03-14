const users = require('../authentication/initUsers')
const Model = require('../../models/index')
const updateAll = async(_key,_shipmentNO,_newData)=>{
    const producer = await users.getUser(_key)
    if(_shipmentNO === 0 || producer.length < _shipmentNO){
        throw new Error("Shipment number doesn't exist")
    }
    const products_object = producer[_shipmentNO]
    const products_array = []
    Object.keys(products_object).forEach(function(key) {
        products_array.push(products_object[key])
    });
    for (let index = 0; index < products_array.length; index++) {
        products_array[index].push(_newData)
    }
    console.log('the product array =')
    console.log(products_array)
    const new_products_object = {}
    let current_obj = {}
    for (let index = 0; index < products_array.length; index++) {
        current_obj = products_array[index]
        new_products_object[current_obj[0].id] = products_array[index]

    }
    console.log('new objects is')
    console.log(new_products_object)
    producer[_shipmentNO] = new_products_object
    console.log('producer inside function is equeal to--------------------------------------------')
    console.log(producer)
    await Model.update(users.root,_key,producer)
 }

 module.exports ={
    execute:updateAll
}