
const SendMamRestricted = require("./SendMamRestricted.js")
const SendPublicTransaction= require("./SendPublicTransaction.js")
const PublishAll = require('./PublishAll.js')
const seed = 'IOWPPONJTYHHVRFRGFRWRVQU9VDMQYLEVVEABJPW9PT9F9SYMGIOFDXPYSLGESFTMBSJECQEPLHGWWYRZ'
const address = 'YEHIA9TA9COPCTMOIFUEJVGUNDLSSJQCORYMEAZHRAUJXH9HGNI99BMLQDQOZNCLNVOLFMSFUIVPMYXDWEZFSZQROC'//badl el T C


SendMamRestricted.execute("initialize root").then(function(result) {
    SendPublicTransaction.execute(seed,address,result)
    PublishAll.execute(10)
 })
