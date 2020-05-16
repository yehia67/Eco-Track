const generateNFCTags = async(_seed,_products) =>{
       const NFCTags = []
       for (let index = 0; index < _products.length; index++) {
            NFCTags.push(_seed+',,'+_products[index].id) 
       }
       return NFCTags
}
module.exports ={
    execute:generateNFCTags
}