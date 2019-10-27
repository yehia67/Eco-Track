const mostFrequent = require('./mostFrequent')
const cat = async (hash) => {
    mostFrequent.ipfs.cat( hash, (err, result) => {
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