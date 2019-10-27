const FetchPublicTransaction = require('./FetchPublicTransaction.js')
const FetchMamRestricted = require('./FetchMamRestricted.js')
const mostFrequent = require('./mostFrequent')
const uploadToIpfs = require('./UploadToIpfs')

const main = async()=>{
    const root = await FetchPublicTransaction.execute(mostFrequent.address)// retrun root
    await FetchMamRestricted.execute(root.substring(0,root.length-1012))
    await uploadToIpfs.UploadToIpfs()
}
main()


