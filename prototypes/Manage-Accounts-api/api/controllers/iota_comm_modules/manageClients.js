const mamManage = require('./testMam')
const addIPFS = require('./add')
const catIPFS = require('./cat')
const clients_products_owner = {}
const getLastHash = (AsciiArray) =>{
    const lastHash = AsciiArray[AsciiArray.length-1]
    return lastHash.substring(1,lastHash.length-1)
}
const initializePropreries = async()=>{
    clients_products_owner['client01'] = {
        'product1A':false,
        'product1B':false,
        'product1C':false,
        'product1D':false,
        'product1E':false,
        'product1F':false,
        'product1G':false,
        'product1H':false,
        'product1I':false,
        'product1J':false,
    }
    clients_products_owner['client02'] = {
        'product2A':false,
        'product2B':false,
        'product2C':false,
        'product2D':false,
        'product2E':false,
        'product2F':false,
        'product2G':false,
        'product2H':false,
        'product2I':false,
        'product2J':false,
    }
    clients_products_owner['client03'] = {
        'product3A':false,
        'product3B':false,
        'product3C':false,
        'product3D':false,
        'product3E':false,
        'product3F':false,
        'product3G':false,
        'product3H':false,
        'product3I':false,
        'product3J':false,
    }
    const ipfsHash = await addIPFS.execute(clients_products_owner)
    const root = await mamManage.send(ipfsHash)
    return root
}
const addNewClient = async (_root,clientID,products)=>{
    const currentPropretiesRoot = _root
    const currentPropretiesHash = await mamManage.fetch(currentPropretiesRoot)
    const currentPropretiesString = await catIPFS.execute(getLastHash(currentPropretiesHash))
    const currentPropretiesJSON = JSON.parse(currentPropretiesString)
    currentPropretiesJSON[clientID] = JSON.parse(JSON.stringify(products))
    const newPropretiesHash = await addIPFS.execute(currentPropretiesJSON)
    const newPropretiesRoot = await mamManage.send(newPropretiesHash)
    return newPropretiesRoot

}

const addNewOwner = async(_root,productAddress,ownerAddress)=>{
    const proprietiesHash = await mamManage.fetch(_root)
    const currentPropretiesString = await catIPFS.execute(getLastHash(proprietiesHash))
    const currentPropretiesJSON = JSON.parse(currentPropretiesString)
   /* const productData = await mamManage.fetch(productAddress) //for now I will not fetch the address of products as I entered them on JSON Object
    const productDataJSON = JSON.parse(productData)
    const clientID = productDataJSON['Client04'] //for now I choose client number 4 to set a product owner*/
    currentPropretiesJSON['client03'].productID = ownerAddress
    const newPropretiesHash = await addIPFS.execute(currentPropretiesJSON)
    const root = await mamManage.send(newPropretiesHash)
    return root
}
const init = async()=>{
   products={
    'product4A':false,
    'product4B':false,
    'product4C':false,
    'product4D':false,
    'product4E':false,
    'product4F':false,
    'product4G':false,
    'product4H':false,
    'product4I':false,
    'product4J':false,
   }
   const initRoot = await initializePropreries()
   console.log('initialize root',initRoot)
   const newClientProprities = await addNewClient(initRoot,'Client04',JSON.stringify(products))
   console.log('new Client root',newClientProprities)
   const newOwnerPropritiesRoot = await addNewOwner(initRoot,newClientProprities,'product4A','Owner01')
   console.log('new owner root',newOwnerPropritiesRoot)
   const newOwnerPropritiesHash = await mamManage.fetch(newOwnerPropritiesRoot)
   const newOwnerPropritiesString = await catIPFS.execute(getLastHash(newOwnerPropritiesHash))
   const newOwnerProprities = JSON.parse(newOwnerPropritiesString)
   return newOwnerProprities


}
/*  init(1,1).then(function(r){
    console.log(r)
})  */
module.exports ={
    init:initializePropreries,
    addNewClient:addNewClient,
    addNewOwner:addNewOwner
}

