const testMam = require('./testMam')
const clients_products_owner = {}
const initializePropreries = ()=>{
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
    return clients_products_owner
}
const addNewClient = (clientID,products)=>{
    const currentPropreties = initializePropreries()
    currentPropreties[clientID] = products
    return currentPropreties

}
const addNewOwner = (proprieties,clientID,productID,ownerID)=>{
    proprieties[clientID].productID = ownerID
    return proprieties
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
   const newClientProprities = addNewClient('Client04',products)
   console.log(newClientProprities)
   const newOwnerProprities = addNewOwner(newClientProprities,'Client04','product4A','Owner01')
   console.log(newOwnerProprities)

}
init(1,1)
module.exports ={
    execute:init
}

