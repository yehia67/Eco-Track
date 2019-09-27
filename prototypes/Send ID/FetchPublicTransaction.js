///////////////////////////////
// Fetch your HELLOWORLD Message
///////////////////////////////

const iotaLibrary = require('@iota/core')
const Converter = require('@iota/converter')

const iota = iotaLibrary.composeAPI({
  provider: 'https://nodes.devnet.iota.org:443'
})

const FetchPublicTransaction = async (_address) =>{
   return new Promise(function(resolve, reject) {
      iota
      .findTransactionObjects({ addresses: [_address] },function(error, response) {
        if (error) {
          reject(error);
      } else {
        
         console.log('Encoded message:')
        console.log(response[0].signatureMessageFragment)
    
        // Modify trytes into a consumable length
        const trytes = response[0].signatureMessageFragment.slice(0, -1)
        //Convert trytes to plan text
        //Convert trytes to plan text
        const data = Converter.trytesToAscii(trytes)
        console.log('Decoded message:')
        console.log(data) 
        resolve(data)
      }
    }) 
   })
    }
module.exports ={
  execute:FetchPublicTransaction
}
