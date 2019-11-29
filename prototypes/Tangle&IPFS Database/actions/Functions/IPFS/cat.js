const ipfsLibrary = require('ipfs-http-client')
const ipfs = new ipfsLibrary({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
const cat = async (hash) =>{
   const content = await ipfs.cat(hash)
    return content.toString()
}
module.exports = {
    execute : cat
}