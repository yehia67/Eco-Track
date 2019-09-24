const FetchPublicTransaction = require('./FetchPublicTransaction.js')
const FetchMamRestricted = require('./FetchMamRestricted.js')

const address = 'YEHIA9CB9COPCTMOIFUEJVGUNDLSSJQCORYMEAZHRAUJXH9HGNI99BMLQDQOZNCLNVOLFMSFUIVPMYXDWEZFSZQROC'

const root =  FetchPublicTransaction.execute(address).then(function(result){  
        FetchMamRestricted.execute(result)
    })
