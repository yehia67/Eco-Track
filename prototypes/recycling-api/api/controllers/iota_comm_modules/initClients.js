const iotaGlobal = require('./IotaGlobal')
const fetchRoot = require('./fetchRoot')
const DB = require('./DB_module/index')
const init = async(clientID,rootAddress)=>{
    const products = fetchRoot.execute(rootAddress)
    const newclientMap = {
        clientID:products
    }
  //  const  clientMap = await DB.create(newclientMap,)
}
module.exports ={
    execute:init
}

