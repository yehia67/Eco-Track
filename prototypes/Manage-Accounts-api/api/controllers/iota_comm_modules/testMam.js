const fetchRoot = require('./fetchRoot')
const sendData = require('./pushData')
const iotaGlobal = require('./IotaGlobal')

const send = async(data) =>{
    const root = await sendData.execute('DONTSHARETHISPASSWORD','http://localhost:14265:443',data)
    return root
}
const fetch = async(root) =>{
    const data = await fetchRoot.execute(root)
    return data
}
const test = async()=>{
   const root = await send("yarab yarab")
    console.log(root) 
    const data = await fetch(root)
    console.log(data)
}
//test()
module.exports={
    send:send,
    fetch:fetch
}