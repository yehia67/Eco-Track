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
        ownerMap[productsTrytes[index]] = 2
    }
}
const setOwner = (ownerAddress,productTryte) =>{
   /*  ***********check init function********* if(ownerMap[productTryte] === 2){
        ownerMap[productTryte] = ownerAddress
        return "Set Owner Succsesfuly!!"
    }
    else{
        return "Error Owner doesn't exist"
    } */
    ownerMap[productTryte] = ownerAddress
    return "Set Owner Succsesfuly!!"
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
