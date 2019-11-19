///////////////////////////////
// Send Data
///////////////////////////////

const IotaGlobal = require('./IotaGlobal')



const SendPublicTransaction = (_seed,_address,_message) =>{
  const message = IotaGlobal.converter.asciiToTrytes(_message)
  
  const transfers = [
    {
      value: 0,
      address: _address, // Where the data is being sent
      message: message // The message converted into trytes
    }
  ]
        IotaGlobal.iota
          .prepareTransfers(_seed, transfers)
          .then(trytes => IotaGlobal.iota.sendTrytes(trytes, 3, 14))
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