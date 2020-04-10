
const users = require('../authentication/initUsers')
const recycledUser = require('../getProductsRecycler')
const getAllProducts = async(_seed,_key,_shipmentNo) =>{
    const user = await users.getUser(_seed,_key)
    const recycledProducts = await recycledUser.execute(_seed)
    console.log('--------------------------------------------')
    console.log(recycledProducts)
    if(_shipmentNo === 0 || user.length < _shipmentNo){
        throw new Error("Shipment number doesn't exist")
    }
    if(_shipmentNo !== -1){
       return [user[_shipmentNo],recycledProducts]
    }
    else{
        user.shift()
        return user
    }

 }
 

module.exports ={
    execute:getAllProducts
}