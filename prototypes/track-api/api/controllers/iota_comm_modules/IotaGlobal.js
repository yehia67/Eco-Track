const iotaLibrary = require('@iota/core')
const Converter = require('@iota/converter')
const Mam = require('@iota/mam')
const seed = 'IOWPPONJTYHHVRFRGFRWRVQU9VDMQYLEVVEABJPW9PT9F9SYMGIOFDXPYSLGESFTMBSJECQEPLHGWWYRZ'
let address = 'YEHIA9TA9COPCTMOIFUEJVGUNDLSSJQCORYMEAZHRAUJXH9HGNI99BMLQDQOZNCLNVOLFMSFUIVPMYXDWEZFSZQROC'
const iota =iotaLibrary.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
})
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
    iota : iota
}
