const addToIPFS = require('./actions/Functions/IPFS/add')
const pushMamData = require('./actions/Functions/MAM/pushData')
const fetchMamData = require('./actions/Functions/MAM/fetchData')
const provider = 'https://nodes.devnet.iota.org:443'
const catFromIPFS = require('./actions/Functions/IPFS/cat')
const main = async()=>{
}
const create = async(DBJSON,Password)=>{
     const ipfsHash = await addToIPFS.execute(DBJSON)
     const root = await pushMamData.execute(Password,provider,ipfsHash)
     return root 
}
const read = async(root,Password,option)=>{
      const fetchIPFShash = await fetchMamData.execute(Password,provider,root)
      console.log(fetchIPFShash)
      let DB
      if(option === 1){
        let result = await catFromIPFS.execute(fetchIPFShash)
        DB = fetchMamData.transalate(result,1) 
      }
      else{
         let result = await catFromIPFS.execute(fetchIPFShash)
         DB = fetchMamData.transalate(result,0)
      }
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