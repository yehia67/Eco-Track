
const SendMamRestricted = require("./SendMamRestricted.js")
const SendPublicTransaction= require("./SendPublicTransaction.js")
SendMamRestricted.execute("initialize root").then(function(result) {
    SendPublicTransaction.execute(result)
 })
