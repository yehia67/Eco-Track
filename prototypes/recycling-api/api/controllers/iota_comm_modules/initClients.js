const iotaGlobal = require('./IotaGlobal')
const getClients = require('./getClients')
const addClient = require('./addClient')
const newClientMap = [] //map client id to address saving all products --- save map on index 0
let addressIndex = 1
const lengthModifier = (str) =>{ return str.substring( str.lastIndexOf("{"),str.lastIndexOf("}")+1) }
const initClient =  async (clientID,rootAddress) =>{
     const currentMap = await getClients.execute(iotaGlobal.address)
   
     //modify length to parse object

     const jsonCurrentMap = JSON.parse(lengthModifier(currentMap))
     console.log(jsonCurrentMap)

}
initClient("CLIENT02ID","NWGHLCCYCBJISRSOYTHGSKTAGZIAYLZWWPANKZXCMKRHBPYMBKOEVWRCKVSVWRT9VYDBUNQJKENXMWIOD")
//address map of products id to 0 own map
