const SendMamRestricted = require('./SendMamRestricted.js')
const PublishAll = (noOfMessages)=>{
    const products = []
    for (let index = 0; index < noOfMessages; index++) {
        products.push({
            id: index,
            time: (new Date()).toLocaleString()
        })    
    }
    Array.prototype.forEach.call(products,product =>{
        SendMamRestricted.execute(JSON.stringify(product))//try this address DGKQSLAHOSJMAKWSMWUITXVAIBOVXEYKNPRQIPP9DKJUHCIKGVLAHBFDHMGURNQU9LQHQJ99KVINMDQNE
    })
}


module.exports ={
  execute:PublishAll
}
