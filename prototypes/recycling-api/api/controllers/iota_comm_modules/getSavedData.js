const iotaGlobal = require('./IotaGlobal')
const getSavedData = async (_address)=>{
  return Promise.resolve(
    iotaGlobal.iota.findTransactionObjects({ addresses: [_address] })
    .then(response => {
        console.log(response.length )
        const trytes = response[response.length-1].signatureMessageFragment.slice(0, -1)
        const data = iotaGlobal.converter.trytesToAscii(trytes) 
        return data
    })
    .catch(err => {
        console.error(err)
    }));
}
   

  //Test get client functions
getSavedData(iotaGlobal.clientaddress).then(function(d){
    console.log(d)
})      
   //Test get owners functions
/* getSavedData(iotaGlobal.clientsProductsAddress).then(function(d){
    console.log(d)
}) */     

module.exports ={
    execute:getSavedData
}
