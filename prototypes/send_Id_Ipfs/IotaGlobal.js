const iotaLibrary = require('@iota/core')
const converter = require('@iota/converter')
const mam = require('@iota/mam')
const seed = 'IOWPPONJTYHHVRFRGFRWRVQU9VDMQYLEVVEABJPW9PT9F9SYMGIOFDXPYSLGESFTMBSJECQEPLHGWWYRZ'
const address = 'YEHIA9TA9COPCTMOIFUEJVGUNDLSSJQCORYMEAZHRAUJXH9HGNI99BMLQDQOZNCLNVOLFMSFUIVPMYXDWEZFSZQROC'
const ipfsLibrary = require('ipfs-mini')
const ipfs = new ipfsLibrary({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
const iota =iotaLibrary.composeAPI({
    provider: 'http://localhost:14265:443'
})

module.exports = {
    iotaLibrary : iotaLibrary ,
    converter : converter ,
    mam : mam ,
    seed : seed ,
    address : address ,
    iota : iota ,
    ipfs : ipfs
}
