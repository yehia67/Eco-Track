
const users = require('../authentication/initUsers')
const generateNFCTags = require('./generateNFCTags')
const makeAllJson = async(arr)=>{
    const arrJSON = []
    arr.forEach(function(element) {
        arrJSON.push(JSON.parse(element))
    });
    return arrJSON
}
const create = async(_seed,_seedKey,_products) =>{
    const productsJson = await makeAllJson(_products)
    const check = await users.checkSeedKey(_seed,_seedKey)
    if (!check) {
        throw new Error('401')
    }
    const products = {}
    for (let index = 0; index < productsJson.length; index++) {
     products[productsJson[index].id] = [productsJson[index]]
    }

    const nfcTags = await generateNFCTags.execute(_seed,productsJson)
    const addr = await users.updateUser(_seed,_seedKey,products)
    return nfcTags
 }



module.exports ={
    execute:create
}