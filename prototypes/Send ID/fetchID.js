const FetchPublicTransaction = require('./FetchPublicTransaction.js')
const FetchMamRestricted = require('./FetchMamRestricted.js')
const fetchIt = require('./trymama.js')
const address = 'YEHIA9TB9COPCTMOIFUEJVGUNDLSSJQCORYMEAZHRAUJXH9HGNI99BMLQDQOZNCLNVOLFMSFUIVPMYXDWEZFSZQROC'
   //const root = 'DOGDHTBWAKNZEVF9RPFPMLPNUZFUNHOCVESK9HFXRCJKATXBCPXKNYHHSQW9XCWRAM9JDPFWEBDUBZHRO'

const main = async()=>{
     const root = await FetchPublicTransaction.execute(address)
    console.log(root) 
    await FetchMamRestricted.execute(root)
}
main()


