const iotaGlobal = require('./IotaGlobal')
const getClients = require('./getClients')
const addClient = require('./addClient')
const getAddressTrytesContent = require('./getAddressTrytesContent')
const generateAddresses = require('./generateAddresses')
ownerMap = {}
const init = async (clientID,rootAddress) =>{
    await initClient(clientID,rootAddress)
    await createOwnedProducts(rootAddress)
}
const initClient =  async (clientID,rootAddress) =>{
    const currentMap = await getClients.execute(iotaGlobal.address)
    const jsonCurrentMap = JSON.parse(iotaGlobal.lengthModifier(currentMap))
    jsonCurrentMap[clientID] = rootAddress
    await addClient.execute(iotaGlobal.address,jsonCurrentMap) 
    
}
const createOwnedProducts = async(rootAddress) =>{
    const productsTrytes =  await getAddressTrytesContent.execute(rootAddress,1)// 1 array of trytes option
    for (let index = 0; index < productsTrytes.length; index++) {
        ownerMap[productsTrytes[index]] = 2
    }
    console.log(ownerMap)
    //await addClient.execute(generateAddresses(1,1,1),ownerMap)
}
const setOwner = (ownerAddress,productTryte) =>{
   if(ownerMap[productTryte] === 2){
        ownerMap[productTryte] = ownerAddress
        return "Set Owner Succsesfuly!!"
    }
    else{
        return "Error Product doesn't registarted in our service "+ productTryte + " = "+ ownerMap[productTryte]
    }
  
}
module.exports ={
    execute:init,
    setOwner:setOwner
}
//Test Cases
   /* init('Client 01','MNVWHOYPVMFWJGNEHQELOZW9OFBQUSN9LSJXJFQJLXXOBSMEIRUKDRIVTMKCEBCXFGYVGOXCXQGSMQDXW').then(function(){
       console.log("done")
       const x =  setOwner('address','CVJUQUEZPDO9RYLUHEKKTCGK9XG9MAXRCVQIVPLRGTLUEUFKIEUUTNHSWAANBTXQMFVXMBBTHZRLSUUAF')
       console.log(x)

   }) */
/*  createOwnedProducts('GBVAUDTCDEHLUQZAANFBJ9ZUMFKIGAFMSGL9YEVUZYGVZCYAODHOTMLCJOLQNCOUCBRRDNXJBHLXUUQTA').then(function(r){
            console.log(r)
    }) */

//initClient("CLIENT02ID","NWGHLCCYCBJISRSOYTHGSKTAGZIAYLZWWPANKZXCMKRHBPYMBKOEVWRCKVSVWRT9VYDBUNQJKENXMWIOD")
