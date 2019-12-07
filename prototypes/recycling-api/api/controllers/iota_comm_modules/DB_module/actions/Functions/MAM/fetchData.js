const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')
const iotaGlobal = require('../../../../IotaGlobal')
const fetchData = async(_sideKey,_provider,_root)=>{
    let mamState = Mam.init(_provider)
    mamState = Mam.changeMode(mamState, 'restricted', _sideKey)
    const result = await Mam.fetch(_root, 'restricted', _sideKey)
 
     return result.messages
}
const transalate = (messages,option) =>{
    if(option === 1){
    const translatedMessage = []
    for (let index = 0; index < messages.length; index++) {
        
        translatedMessage.push(trytesToAscii(messages[index]));      
    }
    return translatedMessage
}
else{
      const result =  trytesToAscii(messages)
      return result
}
}
fetchData(iotaGlobal.sideKey,iotaGlobal.provider,"QDIYPKPDDTK9EOX9J9UDCZCSVKQRBLOMANJOFGJGNPIEMEPPUFUHTY9QVFCOQBQSGF9QWRLEG9QB9L9PW").then(function(x){console.log(x)})
module.exports ={
    execute:fetchData,
    transalate:transalate
}
