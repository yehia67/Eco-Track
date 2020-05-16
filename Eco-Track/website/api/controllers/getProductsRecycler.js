const fetch = require('node-fetch')
let products = []
// The parameters we are gonna pass to the fetch function
const getProductsRecyler = async (seed)=>{

 let response = await fetch('http://localhost:5002/products?seed='+seed)
 let data = await response.json()
 return data
}
/* getProductsRecyler('TZZPYDNEYG99FHTVJMKQWNNL99DPEKKQZPNZWV9TZGZJELRGFQCBEEJZEPUMKPLWMWFMVNTSJCOAEREHX')
 */module.exports={
    execute:getProductsRecyler
}
