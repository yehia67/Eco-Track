
const users = require('../authentication/initUsers')

const create = async(_key,_products) =>{
    const products = {}
    for (let index = 0; index < _products.length; index++) {
     products[_products[index].id] = [_products[index]]
    }
    const addr = await users.updateUser(_key,products)
    return addr
 }


module.exports ={
    execute:create
}