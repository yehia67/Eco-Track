const mostFrequent = require('./mostFrequent')
const fetchIdCat = require("./FetchIdCat")
var data =[]
const PushData = async (newData) => {
    JSON.stringify(newData)
    data.push(newData)


}


const UploadToIpfs = async () => {
    mostFrequent.ipfs.add(JSON.stringify(data), (err, hash) => {
        if (err) {
            return console.log(err)
        }
        console.log("Fetched Data were added to this url ")
        console.log("https://ipfs.infura.io/ipfs/" + hash)
        fetchIdCat.cat(hash)

    })
}

 module.exports = {
     PushData :PushData ,
     UploadToIpfs : UploadToIpfs

}
