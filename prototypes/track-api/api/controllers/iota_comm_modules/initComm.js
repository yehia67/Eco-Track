const IotaGlobal = require('./IotaGlobal')
const SendMamRestricted = require("./SendMamRestricted.js")
const SendPublicTransaction= require("./SendPublicTransaction.js")
const PublishAll = require('./PublishAll.js')



const initComm = (numOfProducts)=>{
    SendMamRestricted.execute("initialize root").then(function(result) {
        SendPublicTransaction.execute(IotaGlobal.seed,IotaGlobal.address,result)
        PublishAll.execute(numOfProducts)
     })
}

 module.exports ={
    execute:initComm
  }