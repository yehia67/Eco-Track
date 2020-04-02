
const users = require('../authentication/initUsers')

const getAllProducts = async(_seed,_key,_shipmentNo) =>{
    console.log('enter get all products function')
    const user = await users.getUser(_seed,_key)
    console.log('user for products is')
    console.log(user)
    if(_shipmentNo === 0 || user.length < _shipmentNo){
        throw new Error("Shipment number doesn't exist")
    }
    console.log('user for products shippment number  is')
    console.log(user)
    return user[_shipmentNo]
 }
 

module.exports ={
    execute:getAllProducts
}