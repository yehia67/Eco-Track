
const initClients = require('./initClients')
const getAddressTrytesContent = require('./getAddressTrytesContent')
setProductOwner = async (ownerAddress,productAddress) =>{
    try{
    const trytes = await getAddressTrytesContent.execute(productAddress,0)
     return initClients.setOwner(ownerAddress,trytes)
    }catch(exception){
          console.log(exception)
    }
}
module.exports ={
    execute:setProductOwner
}