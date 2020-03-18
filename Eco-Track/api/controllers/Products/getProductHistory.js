
const users = require('../authentication/initUsers')

const getProductHistory = async(QrCode) =>{
    const keyAndId = QrCode.split(',,')
    const user = await users.getUserForProducts(keyAndId[0])
    return user[1][keyAndId[1]]
 }
 

module.exports ={
    execute:getProductHistory
}