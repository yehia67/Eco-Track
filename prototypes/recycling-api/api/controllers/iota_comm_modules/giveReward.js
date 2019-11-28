const sendToken = require('./sendToken')
const initClient = require('./initClients')
const getAddressTrytesContent = require('./getAddressTrytesContent')
giveRewards = async(productAddress) =>{
    const tytesOfProduct = await getAddressTrytesContent(productAddress)
    if(initClient.checkOwner(tytesOfProduct)[1] !== "o"){
      await  sendToken.execute(tytesOfProduct,1)
      return "Send 1 i. Congrats"
    }
    else{
        return "No Owner found"
    }
}
module.exports ={
    execute:giveRewards
}