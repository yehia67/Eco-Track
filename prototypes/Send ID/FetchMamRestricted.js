///////////////////////////////
// MAM: Publish messages to Private Stream
///////////////////////////////
/*
WELQVFIP9SLXNPYCRLQHPNJOFNRMXLYGTNZHFOUFSIOAKBPYZXQ9JDHCNTBSMZNN9SZP9IWRSM9BH9VZK v1
FMKA9OGZM9REZJIY9OABBSJMQHVNNLUWQBZDEKZIFZYSDYWBWAHVMNQWYZLSLCDNJVTLNTWTN9DKLZGQS
STFBWWQEPBKZJDCPWONJOEXICGAKGFE9KGHNFERQECZMPZSUGHGIGFJNXKPJ9KCWARJXSOKRTETNZIDAA
*/
const IotaGlobal = require('./IotaGlobal')


// Init State
const mamType = 'restricted'
const mamSecret = 'DONTSHARETHISPASSWORD'

// Initialise MAM State
let mamState = IotaGlobal.Mam.init('http://localhost:14265:443')

// Callback used to pass data out of the fetch
const logData = data => console.log(IotaGlobal.converter.trytesToAscii(data))

const FetchMam = async (_root) => {
  // Callback used to pass data + returns next_root
  console.log("inside FetchMamRestricted function root is",_root) // outptu 'somthing'
  const resp = await IotaGlobal.Mam.fetch(_root, mamType, mamSecret, logData)
  console.log(resp)
}
module.exports ={
  execute:FetchMam
}
