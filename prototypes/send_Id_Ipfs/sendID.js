const iotaGlobal = require('./IotaGlobal')
const sendMamRestricted = require("./SendMamRestricted")
const sendPublicTransaction= require("./SendPublicTransaction")
const publishAll = require('./PublishAll.js')




sendMamRestricted.execute("initialize root").then(function(result) {
    sendPublicTransaction.execute(iotaGlobal.seed,iotaGlobal.address,result)
    publishAll.execute(10)
})
