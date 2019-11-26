const iotaLibrary = require('@iota/core')
const Converter = require('@iota/converter')
const Mam = require('@iota/mam')
const seed = 'XGIVJKNUIDKDVAXGRK9SFXYFVOLEHSJOIZVROT9DUAMYUUXPPBZWYQWJNEYPVKOMKR9SNRYSZXUHDFKNB'
let address = 'TTWAFVTWJKUQKNA9KPZFZCIECTRGUFDDJSTSYQSQOCGQJCSDIAVZANJTZBLOHAD9VPAQJMZTIFIDCHJXD' //address with index 0
const iota =iotaLibrary.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
})
const lengthModifier = (str) =>{ return str.substring( str.lastIndexOf("{"),str.lastIndexOf("}")+1) }
const SetAddress = (_address) =>{
    address = _address;
}
module.exports = {
    iotaLibrary : iotaLibrary ,
    converter : Converter ,
    Mam : Mam ,
    seed : seed ,
    address : address ,
    SetAddress: SetAddress,
    lengthModifier:lengthModifier,
    iota : iota
}
