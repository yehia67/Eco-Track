const FetchPublicTransaction = require('./FetchPublicTransaction.js')
const FetchMamRestricted = require('./FetchMamRestricted.js')
const address = 'YEHIA9TA9COPCTMOIFUEJVGUNDLSSJQCORYMEAZHRAUJXH9HGNI99BMLQDQOZNCLNVOLFMSFUIVPMYXDWEZFSZQROC'
   //const root = 'DOGDHTBWAKNZEVF9RPFPMLPNUZFUNHOCVESK9HFXRCJKATXBCPXKNYHHSQW9XCWRAM9JDPFWEBDUBZHRO'

const main = async()=>{
    const root = await FetchPublicTransaction.execute(address)// retrun DOGDHTBWAKNZEVF9RPFPMLPNUZFUNHOCVESK9HFXRCJKATXBCPXKNYHHSQW9XCWRAM9JDPFWEBDUBZHRO   
    await FetchMamRestricted.execute(root.substring(0,root.length-1012))
}
main()


