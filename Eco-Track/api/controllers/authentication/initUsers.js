const Model = require('../../models/index')
const managePassword = require('./managePasswords')
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
    const new_key = generatKey.execute()
    const secuirty_key = secuirtyKey.execute(new_key)
    const user_json = {
       "fname":_fname,
       "lname":_lname,
       "email":_email,
       "bussines_info":_bussines_info,
       "seedKey":secuirty_key
   }
<<<<<<< HEAD
=======
   const new_key = generatKey.execute()
   const secuirty_key = secuirtyKey.execute(new_key)
   managePassword.addPassword(secuirty_key,new_key)
>>>>>>> f227b4658df517b228b61b202739255d85b8a521
   await Model.update(env_root,new_key,[user_json])
   return {new_key,secuirty_key}
 }

 const verify = async(_key)=>{
    const users = await Model.read(env_root)
    const users_json = JSON.parse(users)
    console.log('the users json aree----------------------------------')
    console.log(users_json)
    if (users_json[_key] ) {
        return true
    }
    else{
        return false
    }
}
 const checkPassword = async (_secuirty_key)=>{
     const flag = await managePassword.verifyPassword(_secuirty_key)
     if (flag) {
         return true
     }
     else{
         return false
     }
 }

const getUserInfo = async(_seed,_secuirtyKey)=>{
    const check = await verify(_seed)
    const password = await checkPassword(_secuirtyKey)
    if (!check || password){
        throw new Error('User not registrated')
    }
    const get_users = await Model.read(env_root)
    const get_users_json = JSON.parse(get_users)
<<<<<<< HEAD
    delete get_users_json[_key][0].seedKey
    return get_users_json[_key][0]
=======
    return get_users_json[_seed][0]
>>>>>>> f227b4658df517b228b61b202739255d85b8a521
}
const checkSeedKey = async(_seed,_seedKey) =>{
    const check = await verify(_seed)
    if (!check) {
        throw new Error('User not registrated')
    }
    const get_users = await Model.read(env_root)
    const get_users_json = JSON.parse(get_users)
    const seedKey = get_users_json[_seed][0].seedKey
    if (seedKey === _seedKey) {
        return true
    } 
    return false
}
const getUser = async(_seed,_seedKey)=>{
    const check = await checkSeedKey(_seed,_seedKey)
     if (!check) {
         throw new Error('401')
     }
    const users = await Model.read(env_root)
    const users_json = JSON.parse(users)
    return users_json[_seed]
} 

 const updateUser = async(_seed,_seedKey,newData)=>{
    const user = await getUser(_seed,_seedKey)
    user.push(newData)
    const address =  await Model.update(env_root,_seed,user)
    return address
 }

 const deleteUser = async(_seed) =>{ 
    const address =  await Model.update(env_root,_seed,false) 
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
    deleteUser:deleteUser,
    checkSeedKey:checkSeedKey 
}