'use strict';
const initClients = require('./iota_comm_modules/initClients')
const setProductOwner = require('./iota_comm_modules/setProductOwner')
const giveReward = require('./iota_comm_modules/giveReward')
const testMam = require('./iota_comm_modules/testMam')
exports.init = async (req,res) =>{
  console.log(req.body.clientID)
  console.log(req.body.rootAddress)
  const response = await initClients.execute(req.body.clientID,req.body.rootAddress)
  res.json(response)
}

exports.send = async (req,res) =>{
  console.log(req.body.data)
  const root = await testMam.send(req.body.data)
  res.json(root)
}

exports.fetch = async (req,res) =>{
  console.log(req.body.root)
  const result = await testMam.fetch(req.body.root)
  res.json(result)
}

exports.setProductOwner = async (req,res) =>{
  console.log(req.body.recivingAddress)
  console.log(req.body.productAddress)
  const response = await setProductOwner.execute(req.body.recivingAddress,req.body.productAddress)
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
