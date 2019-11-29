const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')

const fetchData = async(_sideKey,_provider,_root)=>{
    let mamState = Mam.init(_provider)
    mamState = Mam.changeMode(mamState, 'restricted', _sideKey)
    const result = await Mam.fetch(_root, 'restricted', _sideKey)
    result.messages.forEach(message => console.log('Fetched and parsed', JSON.parse(trytesToAscii(message)), '\n'))
}

module.exports ={
    execute:fetchData
}