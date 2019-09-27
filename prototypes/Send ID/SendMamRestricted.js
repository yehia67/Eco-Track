///////////////////////////////
// MAM: Publish messages to Private Stream
///////////////////////////////

const Mam = require('@iota/mam')
const { asciiToTrytes } = require('@iota/converter')

let mamState = Mam.init('https://nodes.devnet.iota.org:443')

// We are using MAM restricted mode with a shared secret in this example
const mamType = 'restricted'
const mamSecret = 'DONTSHARETHISPASSWORD'
mamState = Mam.changeMode(mamState, mamType, mamSecret)

const Publish = async data => {
  // Convert the JSON to trytes and create a MAM message
  const trytes = asciiToTrytes(data)
  const message = Mam.create(mamState, trytes)

  // Update the MAM state to the state of this latest message
  mamState = message.state

  // Attach the message
  await Mam.attach(message.payload, message.address, 3, 9)
  return message.root
  
}
const PublishAll = ()=>{
    const products = []
    for (let index = 0; index < 10; index++) {
        products.push({
            id: index,
            time: (new Date()).toLocaleString()
        })    
    }
    Array.prototype.forEach.call(products,product =>{
        Publish(JSON.stringify(product))//try this address DGKQSLAHOSJMAKWSMWUITXVAIBOVXEYKNPRQIPP9DKJUHCIKGVLAHBFDHMGURNQU9LQHQJ99KVINMDQNE
    })
}


module.exports ={
  execute:Publish
}

