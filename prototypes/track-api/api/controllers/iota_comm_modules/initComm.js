const IotaGlobal = require('./IotaGlobal')
const SendMamRestricted = require("./SendMamRestricted")
const SendPublicTransaction= require("./SendPublicTransaction")
const postCall = require("../../../calls/post")
const PublishAll = require('./PublishAll')
const trackedProducts = {
  rootAddress: ''
} 

//For Testing
/* const products = [{
  id: '15p6013',
  time: (new Date()).toLocaleString()
},
{
  id:'229219',
  location:'home'
}
]
initComm(products).then(function (params) {
  console.log(params)
}) 
 */
const init = (_products)=>{
    SendMamRestricted.execute("initialize root").then(function(result) {
      trackedProducts['rootAddress'] = result
        SendPublicTransaction.execute(IotaGlobal.seed,IotaGlobal.address,result)
     })
     return PublishAll.execute(_products)
}

const initComm = async(_products) =>{
  trackedProducts['addresses'] =  await init(_products)
  return trackedProducts
}

const initRecycling = () =>{
  const addressAndId = trackedProducts['addresses']
  addressAndId.push('clientID')
  postCall.post("http://localhost:3002/initClient",addressAndId)
}

 module.exports ={
    execute:initComm
  }