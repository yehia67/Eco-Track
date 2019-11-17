///////////////////////////////
// mam: Publish messages to Private Stream
///////////////////////////////
const iotaGlobal = require('./IotaGlobal')
const uploadToIpfs = require('./UploadToIpfs')
var values = []


// Init State
const mamType = 'restricted'
const mamSecret = 'DONTSHARETHISPASSWORD'

// Initialise mam State
let mamState = iotaGlobal.mam.init('https://nodes.devnet.iota.org:443')

// Callback used to pass data out of the fetch
const logData = data => {
    //JSON.stringify(iotaGlobal.converter.trytesToAscii(data))
    values.push(iotaGlobal.converter.trytesToAscii(data))
     console.log(iotaGlobal.converter.trytesToAscii(data))
}

const Fetchmam = async (_root) => {
    // Callback used to pass data + returns next_root
    console.log("inside FetchmamRestricted function root is",_root) // outptu 'somthing'
    const resp = await iotaGlobal.mam.fetch(_root, mamType, mamSecret, logData)
    console.log(resp)
    await values.push(JSON.stringify(resp))
    await JSON.stringify(values)
    uploadToIpfs.PushData(values)
}
module.exports ={
    execute:Fetchmam
}
