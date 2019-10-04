const mostFrequent = require('./mostFrequent')
const SendMamRestricted = require("./SendMamRestricted.js")
const SendPublicTransaction= require("./SendPublicTransaction.js")
const PublishAll = require('./PublishAll.js')




SendMamRestricted.execute("initialize root").then(function(result) {
    SendPublicTransaction.execute(mostFrequent.seed,mostFrequent.address,result)
    PublishAll.execute(10)
 })
