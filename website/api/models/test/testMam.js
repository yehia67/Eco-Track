const secretKey = 'DONTSHARETHISPASSWORD'
const provider = 'http://localhost:14265'
const pushData = require('../actions/Functions/MAM/pushData')
const fetchData = require('../actions/Functions/MAM/fetchData')
const test = async()=>{
  const mapTest = {}
   mapTest.name = "Yarab"
   mapTest.lastename = "yarab isa"
   const root = await pushData.execute(secretKey,provider,mapTest)
    console.log(root)     
   const result = await fetchData.execute(root,secretKey)
   console.log(result) 
}
//test()