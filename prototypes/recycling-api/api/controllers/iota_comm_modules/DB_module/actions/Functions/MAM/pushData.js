const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')
const iotaGlobal = require('../../../../IotaGlobal')
const pushData = async(_secretKey,_provider,packet) =>{
    let mamState = Mam.init(_provider,iotaGlobal.seed)
    mamState = Mam.changeMode(mamState, 'restricted', _secretKey)
    const trytes = asciiToTrytes(JSON.stringify(packet))
    const message = Mam.create(mamState, trytes)

    // Save new mamState
    mamState = message.state

    // Attach the payload
    await Mam.attach(message.payload, message.address, 3, 9)

    return message.root
}

module.exports ={
    execute:pushData
}