
const users = require('../authentication/initUsers')

const getProductInfo = async(QrCode) =>{
    const keyAndId = QrCode.split(',,')
    const user = await users.getUserForProducts(keyAndId[0])
    return user[1][keyAndId[1]][0]
 }
 

module.exports ={
    execute:getProductInfo
}