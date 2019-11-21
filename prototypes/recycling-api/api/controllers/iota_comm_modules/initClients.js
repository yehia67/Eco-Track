const iotaGlobal = require('./IotaGlobal')
const getClients = require('./getClients')
const addClient = require('./addClient')
let addressIndex = 1
const lengthModifier = (str) =>{ return str.substring( str.lastIndexOf("{"),str.lastIndexOf("}")+1) }
const initClient =  async (clientID,rootAddress) =>{
    const currentMap = await getClients.execute(iotaGlobal.address)
    const jsonCurrentMap = JSON.parse(lengthModifier(currentMap))
    jsonCurrentMap[clientID] = rootAddress
    await addClient.execute(iotaGlobal.address,jsonCurrentMap)  
}
initClient("CLIENT02ID","NWGHLCCYCBJISRSOYTHGSKTAGZIAYLZWWPANKZXCMKRHBPYMBKOEVWRCKVSVWRT9VYDBUNQJKENXMWIOD")
//address map of products id to 0 own map
