const FetchPublicTransaction = require('./FetchPublicTransaction.js')
const FetchMamRestricted = require('./FetchMamRestricted.js')
const IotaGlobal = require('./IotaGlobal')


const main = async()=>{
    const root = await FetchPublicTransaction.execute(IotaGlobal.address)// retrun root
    await FetchMamRestricted.execute(root.substring(0,root.length-1012))
}
main()


