///////////////////////////////
// Send Data
///////////////////////////////

const mostFrequent = require('./mostFrequent')



const SendPublicTransaction = (_seed,_address,_message) =>{
  const message = mostFrequent.converter.asciiToTrytes(_message)
  
  const transfers = [
    {
      value: 0,
      address: _address, // Where the data is being sent
      message: message // The message converted into trytes
    }
  ]
        mostFrequent.iota
          .prepareTransfers(_seed, transfers)
          .then(trytes => mostFrequent.iota.sendTrytes(trytes, 3, 14))
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