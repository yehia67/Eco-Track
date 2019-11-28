const iotaGlobal = require("./IotaGlobal")
const depth = 3;
const minimumWeightMagnitude = 9;
const sendData = async (_address,clientsMap) =>{
    const messageInTrytes = iotaGlobal.converter.asciiToTrytes(JSON.stringify(clientsMap));
    const transfers = [
        {
          value: 0,
          address: _address,
          message: messageInTrytes
        }
      ];
    return Promise.resolve(
  
      iotaGlobal.iota
        .prepareTransfers(iotaGlobal.seed, transfers)
        .then(trytes => {
            return iotaGlobal.iota.sendTrytes(trytes, depth, minimumWeightMagnitude);
        })
        .then(bundle => {
            console.log(`Bundle hash: ${bundle[0].bundle}`);
        })
        .catch(err => {
            console.error(err)
        }))

}

/* 
//initialize the map
 const initClient  = {}
initClient['ClientID01'] = "NWGHLCCYCBJISRSOYTHGSKTAGZIAYLZWWPANKZXCMKRHBPYMBKOEVWRCKVSVWRT9VYDBUNQJKENXMWIOD"
sendData(iotaGlobal.address,initClient)   */

/* //owner map
 const mapOwners  = {}
 mapOwners['FJKGIDJHLMJRVPDNMQCGBRUQCNEDCFHUYSKCTBHGAGDAJUKBQZDACZPFJE9YOHMDT9C9SDJSAECQVSICW'] = "2"
 mapOwners['WGOTI9JQNBL9YXZDPEBFCEWURQSITXHRCIXXYTMGIYDDKNJOSZBG99CZXFXDYHWUGOLOSBGNNQDXPFNYJ'] = "2"
 mapOwners['BMBODSDKONOWFGJMVWMLGAB9AGTPQGSLDYUODXUQPKWPILTKZNFBAKYJWZUC9XMUW9SCBQSEGTSGKBBXG'] = "2" 
sendData(iotaGlobal.clientsProductsAddress,mapOwners)   */
module.exports ={
    execute:sendData
}

