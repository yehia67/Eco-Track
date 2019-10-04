///////////////////////////////
// MAM: Publish messages to Private Stream
///////////////////////////////

const mostFrequent = require('./mostFrequent')



let mamState = mostFrequent.Mam.init('https://nodes.devnet.iota.org:443')

// We are using MAM restricted mode with a shared secret in this example
const mamType = 'restricted'
const mamSecret = 'DONTSHARETHISPASSWORD'
mamState = mostFrequent.Mam.changeMode(mamState, mamType, mamSecret)

const Publish = async data => {
  // Convert the JSON to trytes and create a MAM message
  const trytes = mostFrequent.converter.asciiToTrytes(data)
  const message = mostFrequent.Mam.create(mamState, trytes)

  // Update the MAM state to the state of this latest message
  mamState = message.state

  // Attach the message
  await mostFrequent.Mam.attach(message.payload, message.address, 3, 9)
  return message.root
  
}


module.exports ={
  execute:Publish
}

