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

module.exports ={
    execute:generateAddresses
}
/* generateAddresses(0,1,1).then(function(r){
console.log(r)
})
 */