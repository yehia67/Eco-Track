const iotaLibrary = require('@iota/core')
const Converter = require('@iota/converter')
const Mam = require('@iota/mam')
const seed = 'IOWPPONJTYHHVRFRGFRWRVQU9VDMQYLEVVEABJPW9PT9F9SYMGIOFDXPYSLGESFTMBSJECQEPLHGWWYRZ'
const address = 'YEHIA9TA9COPCTMOIFUEJVGUNDLSSJQCORYMEAZHRAUJXH9HGNI99BMLQDQOZNCLNVOLFMSFUIVPMYXDWEZFSZQROC'
const IPFS = require('ipfs-mini')
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
const iota =iotaLibrary.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
})

module.exports = {
    iotaLibrary : iotaLibrary ,
    converter : Converter ,
    Mam : Mam ,
    seed : seed ,
    address : address ,
    iota : iota ,
    ipfs : ipfs
}
