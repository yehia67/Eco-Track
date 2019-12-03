const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')

const fetchData = async(_sideKey,_provider,_root)=>{
    mamState = Mam.init(_provider)
    mamState = Mam.changeMode(mamState, 'restricted', _sideKey)
    const result = await Mam.fetch(_root, 'restricted', _sideKey)
 
     return result.messages
}
const transalate = (messages) =>{
    if(option === 1){
    const translatedMessage = []
    for (let index = 0; index < messages.length; index++) {
        translatedMessage.push(trytesToAscii(messages[index]));      
    }
    return translatedMessage
}
else{
    return trytesToAscii(messages)
}
}

module.exports ={
    execute:fetchData,
    transalate:transalate
}