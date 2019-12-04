const DB = require('../index')
const testMap = {}
for (let index = 0; index < 10; index++) {
   const arr ={
    'id':"ID0"+index,
    'name':"Product0"+index,
    'SerialNo': 1111*index 
   }
   testMap[index] = arr 
}
const test = async()=>{
    //initalize DB
     const DBroot = await DB.create(testMap,"SECRETGDAN")
    console.log("root of created DB",DBroot)  
    const readDB = await DB.read(DBroot,"SECRETGDAN")
    console.log(readDB)  
    const updateDB = await DB.update(DBroot,"SECRETGDAN","Yarab","ISA")
    console.log(updateDB)
    const readNewDB = await DB.read(updateDB,"SECRETGDAN")
    console.log(readNewDB)
    const deleteDB = await DB.deleteRaw(updateDB,"SECRETGDAN","Yarab")
    console.log(deleteDB)
    const readNewDelDB = await DB.read(deleteDB,"SECRETGDAN")
    console.log(readNewDelDB)  
}
  test()