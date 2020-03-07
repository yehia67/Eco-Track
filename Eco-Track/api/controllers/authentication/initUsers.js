const Model = require('../../models/index')
const generatKey = require('./generateSeeds')
let env_root = 'XJ9N9YXEGRQGHAOXEOOUOIYKUWZAVQLLWUXACEOPURZXDNAS9MTFPGQXURNGDEAATDFGYSLQJXRPBDVMV'

const init = async()=>{
    const root = await Model.create({'seed':[]})
    env_root = root
    return root
 }

 const addUser = async(_fname,_lname,_email,_bussines_info) =>{
   const user_json = {
       "fname":_fname,
       "lname":_lname,
       "_email":_email,
       "_bussines_info":_bussines_info
   }
   const new_key = generatKey.execute()
   await Model.update(env_root,new_key,[user_json])
   return new_key
 }

 const verify = async(_key)=>{
    const users = await Model.read(env_root)
    const users_json = JSON.parse(users)
    if (users_json[_key]) {
        return true
    }
    else{
        return false
    }
}

const getuserInfo = async(_key)=>{
    const check = await verify(_key)
    if (!check) {
        throw new Error('User not registrated')
    }
    const get_users = await Model.read(env_root)
    const get_users_json = JSON.parse(get_users)
    return get_users_json[_key][0]
}

const getUser = async(_key)=>{
    const check = await verify(_key)
     if (!check) {
         throw new Error('User not registrated')
     }
    const users = await Model.read(env_root)
    const users_json = JSON.parse(users)
    return users_json[_key]
} 

 const updateUser = async(_key,newData)=>{
    const user = await getUser(_key)
    user.push(newData)
    const address =  await Model.update(env_root,_key,user)
    return address
 }




/**
 * Tests
 */
const create = async(_key,_products) =>{
    const products = {}
    for (let index = 0; index < _products.length; index++) {
     products[_products[index].id] = [_products[index]]
    }
    const addr = await updateUser(_key,products)
    return addr
 }
 const update = async(_key,_id,_newData)=>{
    const producer = await getUser(_key)
    const products = producer[1]
    products[_id].push(_newData)
    producer[1] = products
    //console.log(producer[1])
    console.log('producer el gowaa')
    console.log(producer)
    const address =  await Model.update(env_root,_key,producer)
 }
const test = async()=>{
    const rootTest = await init()
    env_root = rootTest
    console.log("env root = ",env_root)
    console.log('-------------------------------------------------------------------------')
    const addUserTest = await addUser('yehia','belo','yehia@belo.com','money money money')
    const addUserTest_1 = await addUser('yehia_ebny','belo_ebny','yehia@belo.com','money money money $$$$$$$$$$')
    console.log('add new user test',addUserTest)
    console.log('-------------------------------------------------------------------------')
    const readUsersTest = await  Model.read(env_root)
    console.log('updated users')
    console.log(readUsersTest)
    console.log('-------------------------------------------------------------------------')
    console.log('expected true')
    console.log(await verify(addUserTest))
    console.log('-------------------------------------------------------------------------')
    console.log('expected false')
    console.log(await verify(generatKey.execute()))
    console.log('-------------------------------------------------------------------------')
    console.log('personal info is')
    console.log(await getuserInfo(addUserTest))
    console.log('-------------------------------------------------------------------------')
    console.log('updated users')
    await updateUser(addUserTest,[{"001":[{"id":"001"}]},{"002":[{"id":"002"}]}])
    const readUpdatedUsersTest = await  getUser(addUserTest)
    console.log(readUpdatedUsersTest)
    console.log('-------------------------------------------------------------------------')
    console.log('add products')
    const products = [
        {'id':'001','eco-friendly':'5%','date':Date()},
        {'id':'002','eco-friendly':'5%','date':Date()}
        ]
     const newAddr = await create(addUserTest_1,products)
    console.log('the new addre',newAddr) 
    const uers = await getUser(addUserTest_1)
    console.log(uers)
    console.log('-------------------------------------------------------------------------')
    console.log('update product')
    await update(addUserTest_1,'001',{'el bawab':'el 3lbaa maskoora'})
    const uers_1 = await getUser(addUserTest_1)
    console.log(uers_1)
}
//test()
 module.exports ={
    init:init, 
    root:env_root,
    addUser:addUser,
    updateUser:updateUser,
    verify:verify,
    getUser:getUser,
    getuserInfo:getuserInfo
}