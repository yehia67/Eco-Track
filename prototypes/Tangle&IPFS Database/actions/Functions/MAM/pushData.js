const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')
const globalState = require('./GlobalState')
const pushData = async(_secretKey,_provider,packet) =>{

    const trytes = asciiToTrytes(JSON.stringify(packet))
    const message = Mam.create(globalState.mamState, trytes)

    // Save new mamState
    globalState.mamState = message.state

    // Attach the payload
    await Mam.attach(message.payload, message.address, 3, 9)

    return message.root
}

module.exports ={
    execute:pushData
}