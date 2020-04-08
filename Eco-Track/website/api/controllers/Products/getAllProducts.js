
const users = require('../authentication/initUsers')

const getAllProducts = async(_seed,_key,_shipmentNo) =>{
    const user = await users.getUser(_seed,_key)
    if(_shipmentNo === 0 || user.length < _shipmentNo){
        throw new Error("Shipment number doesn't exist")
    }
    if(_shipmentNo !== -1){
       return user[_shipmentNo]
    }
    else{
        user.shift()
        return user
    }

 }
 

module.exports ={
    execute:getAllProducts
}