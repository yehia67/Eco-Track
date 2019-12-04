const addToIPFS = require('./actions/Functions/IPFS/add')
const pushMamData = require('./actions/Functions/MAM/pushData')
const fetchMamData = require('./actions/Functions/MAM/fetchData')
const provider = 'https://nodes.devnet.iota.org:443'
const catFromIPFS = require('./actions/Functions/IPFS/cat')
const main = async()=>{
}
const create = async(DBJSON,Password)=>{
     const ipfsHash = await addToIPFS.execute(DBJSON)
     console.log("the ipfs hash",ipfsHash)
     const root = await pushMamData.execute(Password,provider,ipfsHash)
     return root 
}
const read = async(root,Password,option)=>{
      const fetchIPFShashInTrytes = await fetchMamData.execute(Password,provider,root)
      let ipfsHash =  fetchMamData.transalate(fetchIPFShashInTrytes[0],0)
      const result = await catFromIPFS.execute(ipfsHash.substring(1,ipfsHash.length-1))
      const DB = JSON.parse(result)  
      return DB 
}
const update = async(root,Password,newData)=>{
      const DB = await read(root,Password)
      DB.push(newData)
      const newRoot = await create(DB,Password)
      return newRoot
}
const deleteRaw = async(root,Password,key)=>{
   const DB = await read(root,Password)
   delete DB[key];
   const newRoot = await create(DB,Password)
   return newRoot
}

module.exports={
   create:create,
   read:read,
   update:update,
   deleteRaw:deleteRaw
}