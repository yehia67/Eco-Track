
const users = require('../authentication/initUsers')
const makeAllJson = async(arr)=>{
    const arrJSON = []
    arr.forEach(function(element) {
        arrJSON.push(JSON.parse(element))
    });
    return arrJSON
}
const create = async(_seed,_seedKey,_products) =>{
    const productsJson = await makeAllJson(_products)
    console.log('________________________________________________________________________________________')
    console.log(productsJson)
    const check = await users.checkSeedKey(_seed,_seedKey)
    if (!check) {
        throw new Error('401')
    }
    const products = {}
    for (let index = 0; index < productsJson.length; index++) {
     products[productsJson[index].id] = [productsJson[index]]
    }
console.log('-------------------------------------------------------------------------------------------------------------')
console.log(products)
console.log('-------------------------------------------------------------------------------------------------------------')

    const addr = await users.updateUser(_seed,_seedKey,products)
    return addr
 }

/*  console.log(makeAllJson([ '{"ID":"001","Eco-friendly":0.07,"Date":"now one","Description":"lorem one"}',
 '{"ID":"002","Eco-friendly":0.05,"Date":"now","Description":"lorem"}',
 '{"ID":"003","Eco-friendly":0.05,"Date":"now","Description":"lorem"}',
 '{"ID":"004","Eco-friendly":0.06,"Date":"now four","Description":"lorem four"}',
 '{"ID":"005","Eco-friendly":0.05,"Date":"now","Description":"lorem"}' ]
) )  
const test = makeAllJson([ '{"ID":"001","Eco-friendly":0.07,"Date":"now one","Description":"lorem one"}',
'{"ID":"002","Eco-friendly":0.05,"Date":"now","Description":"lorem"}',
'{"ID":"003","Eco-friendly":0.05,"Date":"now","Description":"lorem"}',
'{"ID":"004","Eco-friendly":0.06,"Date":"now four","Description":"lorem four"}',
'{"ID":"005","Eco-friendly":0.05,"Date":"now","Description":"lorem"}' ]
) */

module.exports ={
    execute:create
}