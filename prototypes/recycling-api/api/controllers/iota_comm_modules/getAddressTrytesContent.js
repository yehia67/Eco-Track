///////////////////////////////
// MAM: Publish messages to Private Stream
///////////////////////////////
const IotaGlobal = require('./IotaGlobal')


// Init State
const mamType = 'restricted'
const mamSecret = 'DONTSHARETHISPASSWORD'

// Initialise MAM State
let mamState = IotaGlobal.Mam.init('https://nodes.devnet.iota.org:443')
const FetchMam = async (_root) => {
  // Output syncronously once fetch is completed
  const result = await IotaGlobal.Mam.fetchSingle(_root, mamType, mamSecret)
  return result.payload
}
/*  FetchMam("LSULKKHSLABGNQPZVAFTOYPCOSVSKQWYFCXUKNLHIESHWKFRZYXPKEBIBKRHQBJCU9KZHTFRFPPENUKAJ").then(function(r){
  console.log(r)
 }) */
module.exports ={
  execute:FetchMam
}
