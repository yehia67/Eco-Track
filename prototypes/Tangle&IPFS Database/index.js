const addToIPFS = require('./actions/Functions/IPFS/add')
const pushMamData = require('./actions/Functions/MAM/pushData')
const fetchMamData = require('./actions/Functions/MAM/fetchData')
const provider = 'https://nodes.devnet.iota.org:443'
const catFromIPFS = require('./actions/Functions/IPFS/cat')
const create = async(DBJSON,Password)=>{
     const ipfsHash = await addToIPFS.execute(DBJSON)
     console.log("the ipfs hash",ipfsHash)
     const root = await pushMamData.execute(Password,provider,ipfsHash)
     return root 
}
const read = async(root,Password)=>{
      console.log('root',root.length)
      console.log('Password',Password.length)
      const fetchIPFShash = await fetchMamData.execute(root,Password)
      console.log(fetchIPFShash)
      /* let ipfsHash =  fetchIPFShash[fetchIPFShash.length-1]
      const result = await catFromIPFS.execute(ipfsHash.substring(1,ipfsHash.length-1))
      const DB = JSON.parse(result)   */
      return fetchIPFShash 
}
const update = async(root,Password,key,value)=>{
      const DB = await read(root,Password)
      DB[key] = value
      const newRoot = await create(DB,Password)
      return newRoot
}
const deleteRaw = async(root,Password,key)=>{
   const DB = await read(root,Password)
   delete DB[key];
   const newRoot = await create(DB,Password)
   return newRoot
}
const main = async()=>{
   const root = await pushMamData.execute('YARABYARAB',provider,"isa isa yarab")
   console.log(root)
   const fetchIPFShash = await fetchMamData.execute(root,'YARABYARAB')
   console.log(fetchIPFShash)
}
main()
module.exports={
   create:create,
   read:read,
   update:update,
   deleteRaw:deleteRaw
}