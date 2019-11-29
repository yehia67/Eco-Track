const iotaGlobal = require("./IotaGlobal")
const sendData = async (channel,newData) =>{
    let mamState = iotaGlobal.getMamState(channel)

    const trytes = iotaGlobal.converter.asciiToTrytes(JSON.stringify(newData))
    const message = iotaGlobal.Mam.create(mamState, trytes)

    mamState = message.state
    // Attach the payload
    await iotaGlobal.Mam.attach(message.payload, message.address, 3, 9)
    
    console.log('Published', packet, '\n');
    return message.root
}

const test = async()=>{
      //initialize the map
      const initClient  = {}
      initClient['NewClientID00001'] = "NWGHLCCYCBJISRSOYTHGSKTAGZIAYLZWWPANKZXCMKRHBPYMBKOEVWRCKVSVWRT9VYDBUNQJKENXMWIOD"
      initClient['CLIENT02ID'] = "NWGHLCCYCBJISRSOYTHGSKTAGZIAYLZWWPANKZXCMKRHBPYMBKOEVWRCKVSVWRT9VYDBUNQJKENXMWIOD"
      initClient['ID1'] = "FLNPHTCHPFTFWAFTAHHIJRLCXQETBQGHHTBVGHPDEMADSDVLPUGJMFMGXXIAIUQTSCHKETVJBUPD9RRBX"
      const result = await sendData(1,initClient)   
      console.log(result)
      /* //owner map
      const mapOwners  = {}
      mapOwners['FJKGIDJHLMJRVPDNMQCGBRUQCNEDCFHUYSKCTBHGAGDAJUKBQZDACZPFJE9YOHMDT9C9SDJSAECQVSICW'] = "2"
      mapOwners['WGOTI9JQNBL9YXZDPEBFCEWURQSITXHRCIXXYTMGIYDDKNJOSZBG99CZXFXDYHWUGOLOSBGNNQDXPFNYJ'] = "2"
      mapOwners['BMBODSDKONOWFGJMVWMLGAB9AGTPQGSLDYUODXUQPKWPILTKZNFBAKYJWZUC9XMUW9SCBQSEGTSGKBBXG'] = "2" 
      sendData(iotaGlobal.clientsProductsAddress,mapOwners)   */
  }
  test()
module.exports ={
    execute:sendData
}

