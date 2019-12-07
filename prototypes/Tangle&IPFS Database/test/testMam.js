const secretKey = 'DONTSHARETHISPASSWORD'
const provider = 'https://nodes.devnet.iota.org:443'
const pushData = require('../actions/Functions/MAM/pushData')
const fetchData = require('../actions/Functions/MAM/fetchData')
const test = async()=>{
  /*   const mapTest = {}
   mapTest.name = "Yarab4"
   mapTest.lastename = "2"
   const root = await pushData.execute(secretKey,provider,mapTest)
    console.log(root)  */  //XVYYMDPBBVAAVKXEG9ESLVMAOETFMGQOBIUIKCONCJCCERTPSKGENHXEFYSWHCHULTDVRKTXPBPAGTMRM
   const result = await fetchData.execute(secretKey,provider,'XVYYMDPBBVAAVKXEG9ESLVMAOETFMGQOBIUIKCONCJCCERTPSKGENHXEFYSWHCHULTDVRKTXPBPAGTMRM')
   console.log(fetchData.transalate(result,1)) 
}
test()