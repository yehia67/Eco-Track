const secretKey = 'YEHIA'
const provider = 'https://nodes.devnet.iota.org'
const pushData = require('../actions/Functions/MAM/pushData')
const fetchData = require('../actions/Functions/MAM/fetchData')
const test = async()=>{
   const mapTest = {}
   mapTest.name = "Yarab"
   mapTest.lastename = "isa el7 yarab"
   const root = await pushData.execute(secretKey,provider,mapTest)
    console.log(root) 
   const result = await fetchData.execute(secretKey,provider,root)
   console.log(result)
}
test()