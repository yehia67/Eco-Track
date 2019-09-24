
const SendMamRestricted = require("./SendMamRestricted.js")
const SendPublicTransaction= require("./SendPublicTransaction.js")

const seed = 'IOWPPONJTYHHVRFRGFRWRVQU9VDMQYLEVVEABJPW9PT9F9SYMGIOFDXPYSLGESFTMBSJECQEPLHGWWYRZ'
const address = 'YEHIAJCB9COPCTMOIFUEJVGUNDLSSJQCORYMEAZHRAUJXH9HGNI99BMLQDQOZNCLNVOLFMSFUIVPMYXDWEZFSZQROC'


SendMamRestricted.execute("initialize root").then(function(result) {
    SendPublicTransaction.execute(seed,address,result)
   /*  for (let index = 0; index < 5; index++) {
        SendMamRestricted.execute("message no "+ index)    
    } */
 })
