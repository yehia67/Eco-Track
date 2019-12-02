const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')
let fullState
const initMam = async(_sideKey,_provider,_seed,_firstMessage)=>{
    let mamState = Mam.init(_provider,_seed)
    Mam.changeMode(mamState, 'restricted',asciiToTrytes( _sideKey))
    fullState = Mam.create(mamState,asciiToTrytes((JSON.stringify(_firstMessage))))
    return fullState
}
const test = async()=>{
    const root = await initMam("SSSSECRETT9",'https://nodes.devnet.iota.org','XGIVJKNUIDKDVAXGRK9SFXYFVOLEHSJOIZVROT9DUAMYUUXPPBZWYQWJNEYPVKOMKR9SNRYSZXUHDFKNB',"message")
    console.log(root)
}
//test()
module.exports ={
    execute:initMam,
    state:fullState
}