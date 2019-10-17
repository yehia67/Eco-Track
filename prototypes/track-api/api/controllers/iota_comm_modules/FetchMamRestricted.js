///////////////////////////////
// MAM: Publish messages to Private Stream
///////////////////////////////
const IotaGlobal = require('./IotaGlobal')


// Init State
const mamType = 'restricted'
const mamSecret = 'DONTSHARETHISPASSWORD'

// Initialise MAM State
let mamState = IotaGlobal.Mam.init('https://nodes.devnet.iota.org:443')

// Callback used to pass data out of the fetch
const logData = data => console.log(IotaGlobal.converter.trytesToAscii(data))
const productAddresses = []
const FetchMam = async (_root) => {
  // Callback used to pass data + returns next_root
  console.log("inside FetchMamRestricted function root is",_root) // outptu 'somthing'
  const resp = await IotaGlobal.Mam.fetch(_root, mamType, mamSecret, logData)
  console.log(resp)
  productAddresses.push(resp)
  console.log("array bt3ty",productAddresses)
}
module.exports ={
  execute:FetchMam
}
