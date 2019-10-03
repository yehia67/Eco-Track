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


module.exports ={
  execute:Publish
}

