'use strict';
const initClients = require('./iota_comm_modules/initClients')
const setProductOwner = require('./iota_comm_modules/setProductOwner')
const giveReward = require('./iota_comm_modules/giveReward')
exports.init = async (req,res) =>{
  console.log(req.body.id)
  console.log(req.body.rootAddress)
  const response = await initClients.execute(req.body.id,req.body.rootAddress)
  res.json(response)
}
exports.setProductOwner = async (req,res) =>{
  console.log(req.body.id)
  console.log(req.body.rootAddress)
  const response = await setProductOwner.execute(req.body.id,req.body.rootAddress)
  res.json(response)
}
exports.checkOwners = async (req,res) =>{
  const owners = await initClients.getOwners()
  res.json(owners)
}
exports.giveReward = async (req,res) =>{
  const response = await giveReward(req.body.productAddress)
  res.json(response)
}
exports.test = async (req,res) =>{
  res.json("API Connected")
 }
