const fetchPublicTransaction = require('./FetchPublicTransaction.js')
const fetchMamRestricted = require('./FetchMamRestricted.js')
const iotaGlobal = require('./IotaGlobal')
const uploadToIpfs = require('./UploadToIpfs')

const main = async()=>{
    const root = await fetchPublicTransaction.execute(iotaGlobal.address)// retrun root
    await fetchMamRestricted.execute(root.substring(0,root.length-1012))
    await uploadToIpfs.UploadToIpfs()
}
main()


