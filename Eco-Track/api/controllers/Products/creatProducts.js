
const users = require('../authentication/initUsers')
const env_root = 'ZNKKBNB9FASOBUCYAYDUCOQPXAW9VJDAERPNHIEYPZLPDRKSZNQEYUPCGOAEGGCPG9PSGZNYCZFLNPZYN'
const key_test = 'RKOHGTH9KCZ9PEXELKDCIPOFIKOXSMPGVBBI9AIIQSBITYKKCUQZMEAJHBFWWHWAH9BMHOLLMRGEAAZZ9'
const create = async(_key,_products) =>{
   const products = {}
   for (let index = 0; index < _products.length; index++) {
    products[_products[index].id] = [_products[index]]
   }
   const addr = await users.updateUser(_key,products)
   return addr
}
const test = async()=>{
    const products = [
    {'id':'001','eco-friendly':'5%','date':Date()},
    {'id':'002','eco-friendly':'5%','date':Date()}
    ]
   await create(key_test,products)
   const user = await users.getUser(key_test) 
   console.log(user)
}

//test()
module.exports ={
    execute:create
}