'use strict';
const manageUser = require('./authentication/initUsers')
const initPasswords = require('./authentication/managePasswords')
manageUser.init().then((root)=>{
    manageUser.root = root
})
initPasswords.initRoot().then((root)=>{
    initPasswords.root = root
})

exports.add = async (req,res) =>{
    const response = await manageUser.addUser(req.body.fname,req.body.lname,req.body.email,req.body.bussines_info)
    res.json({"seed":response.new_key, "key":response.secuirty_key} )
}

exports.getUserInfo = async (req,res) =>{
    console.log('the key is',req.body.key)
    console.log('the sec key is',req.body.secuirty_key)
    const response = await manageUser.getUserInfo(req.body.key,req.body.secuirty_key)
    res.json(response)
}

exports.getUser = async (req,res) =>{
    const response = await manageUser.getUser(req.body.seed,req.body.seedKey)
    res.json(response)
}

exports.updateUser = async (req,res) =>{
    console.log(typeof req.body.newData)
    const response = await manageUser.updateUser(req.body.key,req.body.newData)
    res.json(response)
}