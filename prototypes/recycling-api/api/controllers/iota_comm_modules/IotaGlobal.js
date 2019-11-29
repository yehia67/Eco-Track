const iotaLibrary = require('@iota/core')
const Converter = require('@iota/converter')
const Mam = require('@iota/mam')
const seed = 'XGIVJKNUIDKDVAXGRK9SFXYFVOLEHSJOIZVROT9DUAMYUUXPPBZWYQWJNEYPVKOMKR9SNRYSZXUHDFKNB'


let clientaddress = 'RLLBHMINYARGTRIGBLXMLKOHJLGXESKVJASDRBBSMOTNBULUYQQHDRJZRUWFOXXSBPSCQGHXLGWNWCAYD' //address with index 0
const clientsProductsAddress = 'NCPBFAIUKEQVWRPOZWGXZXCSORHQGUDYTZITJAZJGY9BN9IVAOO99ZOAKGNZPNLUTNTWJPNIXUFUCMG9X' //address with index 1
// Define the depth that the node will use for tip selection
const depth = 3;
// Define the minimum weight magnitude for the Devnet
const minimumWeightMagnitude = 9;
//MAM
const providerLink = 'https://nodes.devnet.iota.org:443'
const mode = 'restricted'

//const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(providerLink)}&mode=${mode}&key=${secretKey.padEnd(81, '9')}&root=`
let mamState = Mam.init(providerLink)

const iota =iotaLibrary.composeAPI({
    provider: providerLink
})
//Modified functions
const lengthModifier = (str) =>{ return str.substring( str.lastIndexOf("{"),str.lastIndexOf("}")+1) }
const SetAddress = (_address) =>{
    clientaddress = _address;
}
const getMamState = (channel)=>{
const secretKeyForClients = 'CLIENTSVERYSECRETKEY'
const secretKeyForOwners = 'OWNERSSVERYSECRETKEY'

if(channel = 'client'){
    mamState = Mam.changeMode(mamState, mode, secretKeyForClients)
    return mamState
}
else if(channel ='owner'){
    mamState = Mam.changeMode(mamState, mode, secretKeyForOwners)
    return mamState
}
else{
  return false
}
}
module.exports = {
    iotaLibrary : iotaLibrary ,
    converter : Converter ,
    depth:depth,
    minimumWeightMagnitude:minimumWeightMagnitude,
    Mam : Mam ,
    getMamState:getMamState,
    seed : seed ,
    clientaddress : clientaddress ,
    SetAddress: SetAddress,
    clientsProductsAddress:clientsProductsAddress,
    lengthModifier:lengthModifier,
    iota : iota
}
