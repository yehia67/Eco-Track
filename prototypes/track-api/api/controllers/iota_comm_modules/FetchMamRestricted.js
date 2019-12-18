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
let resp = [] 
const logData = data => { 
  resp.push(IotaGlobal.converter.trytesToAscii(data))
}
const FetchMam = async (_root) => {
  // Callback used to pass data + returns next_root
  await IotaGlobal.Mam.fetch(_root, mamType, mamSecret, logData)
  return resp
}
const test = async()=>{
  const data = await FetchMam('OTSOBGIRNVAQYLNETBLJXORCWLIMADIEAIDNTPSMYZDWSVMWWVKUGBO9HZMBPGNTGNQXBWCUCN9CCETHD')
  console.log(data)
}
//test()
module.exports ={
  execute:FetchMam
}
