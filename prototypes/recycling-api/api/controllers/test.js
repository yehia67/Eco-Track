const testMam = require('./iota_comm_modules/testMam')
const iotaGlobal = require('./iota_comm_modules/IotaGlobal')

const pushData = async(_secretKey,_provider,packet) =>{
  let mamState = iotaGlobal.Mam.init(_provider,iotaGlobal.seed)
  mamState = iotaGlobal.Mam.changeMode(mamState, 'restricted', _secretKey)
  const trytes = iotaGlobal.converter.asciiToTrytes(JSON.stringify(packet))
  const message = iotaGlobal.Mam.create(mamState, trytes)

  // Save new mamState
  mamState = message.state

  // Attach the payload
  await iotaGlobal.Mam.attach(message.payload, message.address, 3, 9)

  return message.root
}
test()
//"QDIYPKPDDTK9EOX9J9UDCZCSVKQRBLOMANJOFGJGNPIEMEPPUFUHTY9QVFCOQBQSGF9QWRLEG9QB9L9PW"
