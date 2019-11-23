
const initClients = require(initClients)
const getAddressTrytesContent = require('./getAddressTrytesContent')
setProductOwner = (ownerAddress,productAddress) =>{
    const trytes = getAddressTrytesContent.execute(productAddress,0)
    initClients.setProductOwner(ownerAddress,trytes)
    return "200 ok"
}