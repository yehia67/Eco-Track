const FetchPublicTransaction = require('./FetchPublicTransaction.js')
const FetchMamRestricted = require('./FetchMamRestricted.js')
const mostFrequent = require('./mostFrequent')


const main = async()=>{
    const root = await FetchPublicTransaction.execute(mostFrequent.address)// retrun root
    await FetchMamRestricted.execute(root.substring(0,root.length-1012))
}
main()


