const addToIPFS = require('./actions/Functions/IPFS/add')
const pushMamData = require('./actions/Functions/MAM/pushData')
const fetchMamData = require('./actions/Functions/MAM/fetchData')
const provider = 'https://nodes.devnet.iota.org'
const catFromIPFS = require('./actions/Functions/IPFS/cat')
const main = async()=>{
}
const create = async(DBJSON,Password)=>{
     const ipfsHash = await addToIPFS.execute(DBJSON)
     const root = await pushMamData.execute(Password,provider,ipfsHash)
     return root 
}
const read = async(root,Password)=>{
      const fetchIPFShash = await fetchMamData.execute(Password,provider,root)
      const DB = await catFromIPFS.execute(fetchIPFShash)
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

main()