const iotaGlobal = require("./IotaGlobal")

const getUserBalance = async (address) =>{
     const getBalance = await iotaGlobal.iota.getBalances
     const balance = await getBalance([address],100)
     return balance['balances'][0]
}
 
getUserBalance('OTSZGTNPKFSGJLUPUNGGXFBYF9GVUEHOADZZTDEOJPWNEIVBLHOMUWPILAHTQHHVSBKTDVQIAEQOZXGFBOTPNP9MFW').then((r)=>{console.log(r)})
module.exports ={
    execute:getUserBalance
}
 
