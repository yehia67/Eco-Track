const FetchPublicTransaction = require('./FetchPublicTransaction.js')
const FetchMamRestricted = require('./FetchMamRestricted.js')

const address = 'YEHIAJCB9COPCTMOIFUEJVGUNDLSSJQCORYMEAZHRAUJXH9HGNI99BMLQDQOZNCLNVOLFMSFUIVPMYXDWEZFSZQROC'

const main = async() => {
    const root = await FetchPublicTransaction.execute(address)
    console.log("your root is ", root)
    //FetchMamRestricted.execute(root)
}
main()