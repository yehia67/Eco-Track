const FetchPublicTransaction = require('./FetchPublicTransaction.js')
const FetchMamRestricted = require('./FetchMamRestricted.js')
const fetchIt = require('./trymama.js')
const address = 'YEHIA9CB9COPCTMOIFUEJVGUNDLSSJQCORYMEAZHRAUJXH9HGNI99BMLQDQOZNCLNVOLFMSFUIVPMYXDWEZFSZQROC'
const main = async()=>{
    const root =  await FetchPublicTransaction.execute(address)
     if( new String(root) == 'DOGDHTBWAKNZEVF9RPFPMLPNUZFUNHOCVESK9HFXRCJKATXBCPXKNYHHSQW9XCWRAM9JDPFWEBDUBZHRO'){
         console.log('yes')
     }
     else{
        console.log('no') 
     }
    //await fetchIt.execute(""+root+"")
}
main()


