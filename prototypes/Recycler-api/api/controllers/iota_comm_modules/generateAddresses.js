const iotaGlobal = require("./IotaGlobal")

const generateAddresses = async (index,securityLevel,numberOfAddresses) =>{
   return Promise.resolve(iotaGlobal.iota.getNewAddress(iotaGlobal.seed, { index: index, securityLevel: securityLevel, total: numberOfAddresses })
    .then(address => {
        return address
    })
    .catch(err => {
      console.log(err)
    }));
}
 //generateAddresses(2,1,1).then(function(r){
   // console.log(r)
    //})
      
module.exports ={
    execute:generateAddresses
}
 
