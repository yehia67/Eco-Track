const SendMamRestricted = require('./SendMamRestricted.js')

const PublishAll = (_products)=>{
    const addresses = [] // Important to initialize addresses constant inside the fuction not gloable
    Array.prototype.forEach.call(_products,product =>{
       /*  SendMamRestricted.execute(JSON.stringify(product)).then(function(result){
         //try this address DGKQSLAHOSJMAKWSMWUITXVAIBOVXEYKNPRQIPP9DKJUHCIKGVLAHBFDHMGURNQU9LQHQJ99KVINMDQNE
         }) */
         addresses.push(SendMamRestricted.execute(JSON.stringify(product)))
     })
    return Promise.all(addresses)
      
}

module.exports ={
  execute:PublishAll
}

