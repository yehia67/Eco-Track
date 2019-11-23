'use strict';
const initClients = require('./iota_comm_modules/initClients')
const setProductOwner = require('./iota_comm_modules/setProductOwner')
exports.init = async (req,res) =>{
  console.log(req.body.id)
  console.log(req.body.rootAddress)
  await initClients.execute(req.body.id,req.body.rootAddress)
  res.json("200 ok")
}
exports.setProductOwner = async (req,res) =>{
  console.log(req.body.id)
  console.log(req.body.rootAddress)
  const response = await setProductOwner.execute(req.body.id,req.body.rootAddress)
  res.json(response)
}

exports.test = async (req,res) =>{
  res.json("API Connected")
 }
