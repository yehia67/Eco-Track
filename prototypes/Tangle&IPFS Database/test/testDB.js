const DB = require('../index')
const testMap = {}
for (let index = 0; index < 10; index++) {
    testMap['id'] = "ID0"+index
    testMap['name'] = "Product0"+index
    testMap['SerialNo'] = 1111*index   
}
const test = async()=>{
    //initalize DB
   /*  const DBroot = await DB.create(testMap,"SECRETGDAN")
    console.log(DBroot) */
    const DB = await DBroot.read('GOXVYWWPWAQWSQS9BQKZFNUR9IYJKPTKPVIVAPYXRXRBWAHNPOAMZQRZEXWSFMGCVFMBHNYRUTDSWIFGW',"SECRETGDAN",1)
    console.log(DB)  
}
  test()