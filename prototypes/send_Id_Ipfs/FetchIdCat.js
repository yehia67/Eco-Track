const iotaGlobal = require('./IotaGlobal')
const cat = async (hash) => {
    iotaGlobal.ipfs.cat( hash, (err, result) => {
        if(err){
            console.log(err)
        }
        else{
            console.log(result)
        }
    });
}
module.exports = {
    cat : cat
}