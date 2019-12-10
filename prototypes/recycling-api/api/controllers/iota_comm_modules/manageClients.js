const mamManage = require('./testMam')
const addIPFS = require('./add')
const catIPFS = require('./cat')
const clients_products_owner = {}
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
const addNewClient = async (clientID,products)=>{
    const currentPropretiesRoot = await initializePropreries()
    const currentPropretiesHash = await mamManage.fetch(currentPropretiesRoot)
    const lastHash = currentPropretiesHash[currentPropretiesHash.length-1]
    const currentPropretiesString = await catIPFS.execute(lastHash.substring(1,lastHash.length-1))
    const currentPropretiesJSON = JSON.parse(currentPropretiesString)
    currentPropretiesJSON[clientID] = products
    const newPropretiesHash = await addIPFS.execute(currentPropretiesJSON)
    const newPropretiesRoot = await mamManage.send(newPropretiesHash)
    return newPropretiesRoot

}
const addNewOwner = async(_root,clientID,productID,ownerID)=>{
    const proprietiesHash = await mamManage.fetch(_root)
    const lastHash = proprietiesHash[proprietiesHash.length-1]
    const currentPropretiesString = await catIPFS.execute(lastHash.substring(1,lastHash.length-1))
    const currentPropretiesJSON = JSON.parse(currentPropretiesString)
    currentPropretiesJSON[clientID].productID = ownerID
    const newPropretiesHash = await addIPFS.execute(currentPropretiesJSON)
    const root = await mamManage.send(newPropretiesHash)
    return root
}
const init = async(clientID,rootAddress)=>{
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
   const newClientProprities = await addNewClient('Client04',products)
   console.log('new Client root',newClientProprities)
   const newOwnerPropritiesRoot = await addNewOwner(newClientProprities,'Client04','product4A','Owner01')
   console.log('new owner root',newOwnerPropritiesRoot)
   const newOwnerPropritiesHash = await mamManage.fetch(newOwnerPropritiesRoot)
   const lastHash = newOwnerPropritiesHash[newOwnerPropritiesHash.length-1]
   console.log(lastHash.substring(1,lastHash.length-1))
   const newOwnerPropritiesString = await catIPFS.execute(lastHash.substring(1,lastHash.length-1))
   const newOwnerProprities = JSON.parse(newOwnerPropritiesString)
   return newOwnerProprities


}
init(1,1).then(function(r){
    console.log(r)
})
module.exports ={
    execute:init
}

