///////////////////////////////
// Send Data
///////////////////////////////
const iotaLibrary = require('@iota/core')
const Converter = require('@iota/converter')

const iota = iotaLibrary.composeAPI({
  provider: 'https://nodes.devnet.iota.org:443'
})

const SendPublicTransaction = (_seed,_address,_message) =>{
  const message = Converter.asciiToTrytes(_message)
  
  const transfers = [
    {
      value: 0,
      address: _address, // Where the data is being sent
      message: message // The message converted into trytes
    }
  ]
        iota
          .prepareTransfers(_seed, transfers)
          .then(trytes => iota.sendTrytes(trytes, 3, 14))
          .then(bundle => {
            console.log('Transfer successfully sent')
            bundle.map(tx => console.log(tx))
          })
          .catch(err => {
            console.log(err)
          })
}
module.exports ={
  execute:SendPublicTransaction
}