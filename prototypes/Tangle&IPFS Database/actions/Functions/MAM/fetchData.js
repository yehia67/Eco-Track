const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')

const fetchData = async(_sideKey,_provider,_root)=>{
    mamState = Mam.init(_provider)
    mamState = Mam.changeMode(mamState, 'restricted', _sideKey)
    const result = await Mam.fetch(_root, 'restricted', _sideKey)
 
     return JSON.parse(trytesToAscii(result.messages[0]))
}

module.exports ={
    execute:fetchData
}