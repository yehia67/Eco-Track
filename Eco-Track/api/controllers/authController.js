'use strict';
const manageUser = require('./authentication/initUsers')
manageUser.init().then((root)=>{
    manageUser.root = root
})

exports.add = async (req,res) =>{
    const response = await manageUser.addUser(req.body.fname,req.body.lname,req.body.email,req.body.bussines_info)
    res.json({"seed":response.new_key, "key":response.secuirty_key} )
}

exports.getUserInfo = async (req,res) =>{
    const response = await manageUser.getUserInfo(req.body.key,req.body.secuirty_key)
    res.json(response)
}

exports.getUser = async (req,res) =>{
    const response = await manageUser.getUser(req.body.key)
    res.json(response)
}

exports.updateUser = async (req,res) =>{
    console.log(typeof req.body.newData)
    const response = await manageUser.updateUser(req.body.key,req.body.newData)
    res.json(response)
}