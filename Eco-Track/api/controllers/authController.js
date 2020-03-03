'use strict';
const Model = require('../models/index')
const generatKey = require('./authentication/generateSeeds')
let env_root = ''
/**
 * add and initialize users
 */
const users = async()=>{
   const root = await Model.create({'seed':[]})
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
/**
 * Gets
 */
const getuserInfo = async(_key)=>{
    const check = await verify(_key)
    if (!check) {
        throw new Error('User not registrated')
    }
    const get_users = await Model.read(env_root)
    const get_users_json = JSON.parse(get_users)
    return get_users_json[_key][0]
}
/**
 * Tests
 */
const test = async()=>{
    const rootTest = await users()
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
    
}
test()