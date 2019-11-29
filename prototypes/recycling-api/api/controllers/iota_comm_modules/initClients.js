const iotaGlobal = require('./IotaGlobal')
const getSavedData = require('./getSavedData')
const sendData = require('./sendData')
const getAddressTrytesContent = require('./getAddressTrytesContent')

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
test()