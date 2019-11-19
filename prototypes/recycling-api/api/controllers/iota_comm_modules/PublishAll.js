const SendMamRestricted = require('./SendMamRestricted.js')
const addresses = []

const PublishAll = (_products)=>{
    Array.prototype.forEach.call(_products,product =>{
       /*  SendMamRestricted.execute(JSON.stringify(product)).then(function(result){
         //try this address DGKQSLAHOSJMAKWSMWUITXVAIBOVXEYKNPRQIPP9DKJUHCIKGVLAHBFDHMGURNQU9LQHQJ99KVINMDQNE
         }) */
         addresses.push(SendMamRestricted.execute(JSON.stringify(product)))
     })
    console.log('addressatt',addresses)
    return Promise.all(addresses)
      
}

module.exports ={
  execute:PublishAll
}
