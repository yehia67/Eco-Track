const iotaGlobal = require("./IotaGlobal")
const depth = 3;
const minimumWeightMagnitude = 9;
const addClient = (_address,clientsMap) =>{
    const messageInTrytes = iotaGlobal.converter.asciiToTrytes(JSON.stringify(clientsMap));
    const transfers = [
        {
          value: 0,
          address: _address,
          message: messageInTrytes
        }
      ];
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
        });

}

/* 
//initialize the map
 const initClient  = {}
initClient['ClientID01'] = "NWGHLCCYCBJISRSOYTHGSKTAGZIAYLZWWPANKZXCMKRHBPYMBKOEVWRCKVSVWRT9VYDBUNQJKENXMWIOD"
addClient(iotaGlobal.address,initClient)   */
module.exports ={
    execute:addClient
}