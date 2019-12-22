const addToIPFS = require('./actions/Functions/IPFS/add')
const manageMAM = require('./actions/Functions/MAM/manageMAM')
const catFromIPFS = require('./actions/Functions/IPFS/cat')
const getLastHash = (AsciiArray) =>{
   const lastHash = AsciiArray[AsciiArray.length-1]
   return lastHash.substring(1,lastHash.length-1)
}
const deployProducts = async (DBJSON)=>{
   const products = JSON.parse(JSON.stringify(DBJSON))
   const root = await manageMAM.send('initialized root')
   const addresses = []
   Array.prototype.forEach.call(products,async(product) =>{
      let productIPFShash =  await addToIPFS.execute(JSON.parse(JSON.stringify(product)))
      let address = await manageMAM.send(productIPFShash)
      addresses.push(address)
    })
   const productDetails = {
      'root':root,
      'addresses':addresses
   }
   return productDetails
}
const create = async(DBJSON,option)=>{
   if(option === 0){
     const ipfsHash = await addToIPFS.execute(JSON.parse(JSON.stringify(DBJSON)))
     const root = await manageMAM.send(ipfsHash)
     return root
   }else{
      const products = await deployProducts(DBJSON)
      return products
}  
}
const read = async(root)=>{
      const fetchIPFShash = await manageMAM.fetch(root)
      console.log(getLastHash(fetchIPFShash))
      const fetchedIPFS = catFromIPFS.execute(getLastHash(fetchIPFShash))
      return fetchedIPFS 
}
const update = async(root,key,value,option)=>{
      const DB = await read(root)
      const DBjson = JSON.parse(DB)
      if(option === 0){
         DBjson[key] = value
      }
      else{
         DBjson.push(value)
      }
      const newRoot = await create(DBjson,0)
      return newRoot
}
const deleteRaw = async(root,key)=>{
   const DB = await read(root)
   const DBjson = JSON.parse(DB)
   delete DBjson[key];
   const newRoot = await create(DBjson,0)
   return newRoot
}
const senario_1 = async()=>{
    const yarab = {}
    yarab['isa'] = "yarab yarab"
    yarab['bsmlah'] = "yarab yarab"
    const firstRoot = await create(yarab,0)
    console.log('root',firstRoot)
    const readFirstDB = await read(firstRoot)
    console.log(readFirstDB)
    const updateRoot = await update(firstRoot,'isa isa','yarab yarab bsmlah',0)
    console.log(updateRoot)
    const readUpdatedDB = await read(updateRoot)
    console.log(readUpdatedDB)
    const rootDeletedDB = await deleteRaw(updateRoot,'bsmlah')
    console.log(rootDeletedDB)
    const readThirdDB = await read(rootDeletedDB)
    console.log(readThirdDB)
}
//senario_1()


const senario_2 = async()=>{
   const products = []
   for(let i = 0; i < 10;i++){
      products[i] ={
         'id':i,
         'eco-percent': 2.5*i +"%"
      }
   }

   const firstRoot = await create(products,0)
   console.log('root',firstRoot)
   const readFirstDB = await read(firstRoot)
   console.log(readFirstDB)
   const newProduct = {
      'id':'newID-0',
      'eco-percent':'99%'
   }
   const updateRoot = await update(firstRoot,'',newProduct,1)
   console.log(updateRoot)
   console.log('-----------------------')
   const readUpdatedDB = await read(updateRoot)
   console.log(readUpdatedDB)
   console.log('-----------------------')
   const rootDeletedDB = await deleteRaw(updateRoot,'key')
   console.log(rootDeletedDB)
   const readThirdDB = await read(rootDeletedDB)
   console.log(readThirdDB)
}
//senario_2()

const senario_3 = async()=>{
   const products = {}
   for(let i = 0; i < 10;i++){
      products['id-'+i] ={
         'id':'id-'+i,
         'eco-percent': 2.5*i +"%"
      }
   }

   const firstRoot = await create(products,0)
   console.log('root',firstRoot)
   const readFirstDB = await read(firstRoot)
   console.log(readFirstDB)
   const newProduct = {
      'id':'newID-0',
      'eco-percent':'99%'
   }
   const updateRoot = await update(firstRoot,'newProduct',newProduct,0)
   console.log(updateRoot)
   console.log('-----------------------')
   const readUpdatedDB = await read(updateRoot)
   console.log(readUpdatedDB)
   console.log('-----------------------')
   const rootDeletedDB = await deleteRaw(updateRoot,'id-0')
   console.log(rootDeletedDB)
   const readThirdDB = await read(rootDeletedDB)
   console.log(readThirdDB)
}
//senario_3()

module.exports={
   create:create,
   read:read,
   update:update,
   deleteRaw:deleteRaw
}