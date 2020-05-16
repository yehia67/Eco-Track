const iotaLibrary = require('@iota/core')
const Converter = require('@iota/converter')
const Mam = require('@iota/mam')
const seed = 'IOWPPONJTYHHVRFRGFRWRVQU9VDMQYLEVVEABJPW9PT9F9SYMGIOFDXPYSLGESFTMBSJECQEPLHGWWYRZ'
const address = 'YEHIA9TA9COPCTMOIFUEJVGUNDLSSJQCORYMEAZHRAUJXH9HGNI99BMLQDQOZNCLNVOLFMSFUIVPMYXDWEZFSZQROC'
const iota =iotaLibrary.composeAPI({
    provider: 'http://localhost:14265:443'
})

module.exports = {
    iotaLibrary : iotaLibrary ,
    converter : Converter ,
    Mam : Mam ,
    seed : seed ,
    address : address ,
    iota : iota
}
