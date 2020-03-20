
const users = require('../authentication/initUsers')

const getAllProducts = async(_key,_shipmentNo) =>{
    const user = await users.getUserForProducts(_key)
    if(_shipmentNo === 0 || user.length < _shipmentNo){
        throw new Error("Shipment number doesn't exist")
    }
    return user[_shipmentNo]
 }
 

module.exports ={
    execute:getAllProducts
}