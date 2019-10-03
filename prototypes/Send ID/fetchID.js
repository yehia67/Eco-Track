const FetchPublicTransaction = require('./FetchPublicTransaction.js')
const FetchMamRestricted = require('./FetchMamRestricted.js')
const address = 'YEHIA9TA9COPCTMOIFUEJVGUNDLSSJQCORYMEAZHRAUJXH9HGNI99BMLQDQOZNCLNVOLFMSFUIVPMYXDWEZFSZQROC'

const main = async()=>{
    const root = await FetchPublicTransaction.execute(address)// retrun root   
    await FetchMamRestricted.execute(root.substring(0,root.length-1012))
}
main()


