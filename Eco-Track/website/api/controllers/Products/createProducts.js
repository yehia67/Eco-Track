
const users = require('../authentication/initUsers')

const create = async(_seed,_seedKey,_products) =>{
    const check = await users.checkSeedKey(_seed,_seedKey)
    if (!check) {
        throw new Error('401')
    }
    const products = {}
    for (let index = 0; index < _products.length; index++) {
     products[_products[index].id] = [_products[index]]
    }

    const addr = await users.updateUser(_seed,_seedKey,products)
    return addr
 }


module.exports ={
    execute:create
}