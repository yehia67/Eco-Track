///////////////////////////////
// Fetch your HELLOWORLD Message
///////////////////////////////
const IotaGlobal = require('./IotaGlobal')





const FetchPublicTransaction = async (_address) =>{
   return new Promise(function(resolve, reject) {
      IotaGlobal.iota
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
        const data = IotaGlobal.converter.trytesToAscii(trytes)
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
