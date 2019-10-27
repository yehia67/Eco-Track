///////////////////////////////
// Fetch your HELLOWORLD Message
///////////////////////////////
const mostFrequent = require('./mostFrequent')
const uploadToIpfs = require('./UploadToIpfs')





const FetchPublicTransaction = async (_address) =>{
   return new Promise(function(resolve, reject) {
      mostFrequent.iota
      .findTransactionObjects({ addresses: [_address] },function(error, response) {
        if (error) {
          reject(error);
      } else {
        
         console.log('Encoded message:')
            console.log(response[0].signatureMessageFragment)
           var  encodedMessage = "Encoded message:" +JSON.stringify(response[0].signatureMessageFragment)
            //console.log("here is the new line " + encodedMessage)
           uploadToIpfs.PushData(encodedMessage)
        // Modify trytes into a consumable length
        const trytes = response[0].signatureMessageFragment.slice(0, -1)
        //Convert trytes to plan text
        //Convert trytes to plan text
        const data = mostFrequent.converter.trytesToAscii(trytes)
        console.log('Decoded message:')
        console.log(data)
            var  decodedMessage = "Decoded message: "+data.substring(0,data.length-1012)
            uploadToIpfs.PushData(decodedMessage)
        resolve(data)
      }
    }) 
   })
    }
module.exports ={
  execute:FetchPublicTransaction
}
