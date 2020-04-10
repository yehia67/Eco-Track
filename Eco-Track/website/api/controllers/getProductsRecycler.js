const fetch = require('node-fetch')
let products = []
// The parameters we are gonna pass to the fetch function
const getProductsRecyler = async (seed)=>{

    fetch('http://localhost:5002/products?seed='+seed)
    .then(res => products = res.json())
    .then(json => products = console.log(json))
 return products
}
getProductsRecyler('TZZPYDNEYG99FHTVJMKQWNNL99DPEKKQZPNZWV9TZGZJELRGFQCBEEJZEPUMKPLWMWFMVNTSJCOAEREHX')
module.exports={
    execute:getProductsRecyler
}
