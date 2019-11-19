///////////////////////////////
// MAM: Publish messages to Private Stream
///////////////////////////////

const IotaGlobal = require('./IotaGlobal')



let mamState = IotaGlobal.Mam.init('https://nodes.devnet.iota.org:443')

// We are using MAM restricted mode with a shared secret in this example
const mamType = 'restricted'
const mamSecret = 'DONTSHARETHISPASSWORD'
mamState = IotaGlobal.Mam.changeMode(mamState, mamType, mamSecret)

const Publish = async data => {
  // Convert the JSON to trytes and create a MAM message
  const trytes = IotaGlobal.converter.asciiToTrytes(data)
  const message = IotaGlobal.Mam.create(mamState, trytes)

  // Update the MAM state to the state of this latest message
  mamState = message.state

  // Attach the message
  await IotaGlobal.Mam.attach(message.payload, message.address, 3, 9)
  return message.root
  
}

/* Publish("Data data").then(function(r){
console.log(r)
}) */
module.exports ={
  execute:Publish
}

