const Model = require('../../models/index')
const generatKey = require('./generateSeeds')
const secuirtyKey = require('./secuirtyKey')
let env_root = 'XJ9N9YXEGRQGHAOXEOOUOIYKUWZAVQLLWUXACEOPURZXDNAS9MTFPGQXURNGDEAATDFGYSLQJXRPBDVMV'

const init = async()=>{
    const root = await Model.create({'seed':[]})
    env_root = root
    console.log('initalize api with root =',env_root)
    return root
 }

 const addUser = async(_fname,_lname,_email,_bussines_info) =>{
   const user_json = {
       "fname":_fname,
       "lname":_lname,
       "email":_email,
       "bussines_info":_bussines_info
   }
   const new_key = generatKey.execute()
   const secuirty_key = secuirtyKey.execute(new_key)
   await Model.update(env_root,new_key,[user_json])
   return {new_key,secuirty_key}
 }

 const verify = async(_key)=>{
    const users = await Model.read(env_root)
    const users_json = JSON.parse(users)
    if (users_json[_key] ) {
        return true
    }
    else{
        return false
    }
}

const getUserInfo = async(_key)=>{
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

 const deleteUser = async(_key) =>{ 
    const address =  await Model.update(env_root,_key,false)
    return address 
}

 module.exports ={
    init:init, 
    root:env_root,
    addUser:addUser,
    verify:verify,
    getUserInfo:getUserInfo,
    getUser:getUser,
    updateUser:updateUser,
    deleteUser:deleteUser 
}