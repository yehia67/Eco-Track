///////////////////////////////
// MAM: Publish messages to Private Stream
///////////////////////////////

const iotaGlobal = require('./IotaGlobal')



//return state object that tracks the progress of your channel and channels you are following
let mamState = iotaGlobal.mam.init('https://nodes.devnet.iota.org:443')

// We are using MAM restricted mode with a shared secret in this example
const mamType = 'restricted'
const mamSecret = 'DONTSHARETHISPASSWORD'
mamState = iotaGlobal.mam.changeMode(mamState, mamType, mamSecret) //This takes the state object
// and changes the default channel mode from public to the specified mode and sidekey.
// Returns object => Initialised state object to be used in future actions

const Publish = async data => {
    // Convert the JSON to trytes and create a MAM message
    const trytes = iotaGlobal.converter.asciiToTrytes(data)
    const message = iotaGlobal.mam.create(mamState, trytes) // return State ,payload,root ,address (all of them are tryte encoded except state )

    // Update the MAM state to the state of this latest message
    mamState = message.state

    // Attach the message
    await iotaGlobal.mam.attach(message.payload, message.address, 3, 9)
    return message.root

}


module.exports ={
    execute:Publish
}

