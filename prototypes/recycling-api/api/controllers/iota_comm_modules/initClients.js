const iotaGlobal = require('./IotaGlobal')
const getClients = require('./getClients')
const addClient = require('./addClient')
const getAddressTrytesContent = require('./getAddressTrytesContent')
ownerMap = {}
const lengthModifier = (str) =>{ return str.substring( str.lastIndexOf("{"),str.lastIndexOf("}")+1) }

const init = async (clientID,rootAddress) =>{
    await initClient(clientID,rootAddress)
    await createOwnedProducts(rootAddress)
}
const initClient =  async (clientID,rootAddress) =>{
    const currentMap = await getClients.execute(iotaGlobal.address)
    const jsonCurrentMap = JSON.parse(lengthModifier(currentMap))
    jsonCurrentMap[clientID] = rootAddress
    await addClient.execute(iotaGlobal.address,jsonCurrentMap)  
}
const createOwnedProducts = async(rootAddress) =>{
    const productsTrytes =  await getAddressTrytesContent.execute(rootAddress,1)// 1 array of trytes option
    for (let index = 0; index < productsTrytes.length; index++) {
        ownerMap[productsTrytes[index]] = 0
    }
}
const setOwner = (ownerAddress,productTryte) =>{
    ownerMap[productTryte] = ownerAddress
}
module.exports ={
    execute:init,
    setOwner:setOwner
}
   /*  createOwnedProducts('GBVAUDTCDEHLUQZAANFBJ9ZUMFKIGAFMSGL9YEVUZYGVZCYAODHOTMLCJOLQNCOUCBRRDNXJBHLXUUQTA').then(function(r){
            console.log(r)
    }) */

//initClient("CLIENT02ID","NWGHLCCYCBJISRSOYTHGSKTAGZIAYLZWWPANKZXCMKRHBPYMBKOEVWRCKVSVWRT9VYDBUNQJKENXMWIOD")
//address map of products id to 0 own map
