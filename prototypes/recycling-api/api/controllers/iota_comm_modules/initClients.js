const iotaGlobal = require('./IotaGlobal')
const getSavedData = require('./getSavedData')
const sendData = require('./sendData')
const getAddressTrytesContent = require('./getAddressTrytesContent')
const init = async (clientID,rootAddress) =>{
    await initClient(clientID,rootAddress)
    await createOwnedProducts(rootAddress)
}

const initClient =  async (clientID,rootAddress) =>{
    const currentMap = await getSavedData.execute(iotaGlobal.address)
    const jsonCurrentMap = JSON.parse(iotaGlobal.lengthModifier(currentMap))
    jsonCurrentMap[clientID] = rootAddress
    await sendData.execute(iotaGlobal.address,jsonCurrentMap) 
    
}
const createOwnedProducts = async(rootAddress) =>{
    const currentOwnerMap = await getSavedData.execute(iotaGlobal.clientsProductsAddress)
    const ownersMap = JSON.parse(iotaGlobal.lengthModifier(currentOwnerMap))
    const productsTrytes =  await getAddressTrytesContent.execute(rootAddress,1)// 1 array of trytes option
    for (let index = 0; index < productsTrytes.length; index++) {
        ownersMap[productsTrytes[index]] = 2
    }
    await sendData.execute(iotaGlobal.clientsProductsAddress,ownersMap) 

}

const addCleint = async(ClientId,rootAddress)=>{
    const currentMapString = await getSavedData.execute(iotaGlobal.clientaddress)
    console.log(currentMapString)
    const currentMapJSON = JSON.parse(iotaGlobal.lengthModifier(currentMapString))
   /*  currentMapJSON[ClientId] = rootAddress
    await sendData.execute(iotaGlobal.clientaddress,currentMapJSON) */
    return currentMapJSON
}
const test = async()=>{
    const client = await addCleint("ID1","FLNPHTCHPFTFWAFTAHHIJRLCXQETBQGHHTBVGHPDEMADSDVLPUGJMFMGXXIAIUQTSCHKETVJBUPD9RRBX")
    console.log(client)
}
const getOwners= async ()=>{
    const currentOwnerMap = await getSavedData.execute(iotaGlobal.clientsProductsAddress)
    const ownersMap = JSON.parse(iotaGlobal.lengthModifier(currentOwnerMap))
    return ownersMap
}

module.exports ={
    execute:init,
    setOwner:setOwner,
    getOwners:getOwners,
    checkOwner:checkOwner
}
//Test Cases
  const testCases = async() =>{
 /* init('Client 01','MNVWHOYPVMFWJGNEHQELOZW9OFBQUSN9LSJXJFQJLXXOBSMEIRUKDRIVTMKCEBCXFGYVGOXCXQGSMQDXW').then(function(){
       console.log("done")
       const x =  setOwner('address','CVJUQUEZPDO9RYLUHEKKTCGK9XG9MAXRCVQIVPLRGTLUEUFKIEUUTNHSWAANBTXQMFVXMBBTHZRLSUUAF')
       console.log(x)

   }) */
     /*   getAddressTrytesContent.execute('WGGBSHLUEHDS9VEQUMOEG9ZOXWSJOQ9NBIOHGXTSLNDRGXVMROJJSPYDSUEFYBPITNIZPDTRFW9MUOURF',0).then(function(r){
        console.log(ownerMap)
     }) */
 
//initClient("CLIENT02ID","NWGHLCCYCBJISRSOYTHGSKTAGZIAYLZWWPANKZXCMKRHBPYMBKOEVWRCKVSVWRT9VYDBUNQJKENXMWIOD")
/*     await createOwnedProducts('LBOAZJBRZPBRIU9QJICN9IPJPVMTIQOLUZWQTUNGLIJTFKBYXARRAZIUANWAXEHEQHGNYMMAFECETHHAN')
    const testCreateOwnerProducts =  await getOwners()
    console.log(testCreateOwnerProducts)  */
  }
  
 
  //testCases()
