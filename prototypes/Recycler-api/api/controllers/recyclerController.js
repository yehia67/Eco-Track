'use strict';
const giveReward = require('./iota_comm_modules/giveReward')
const testMam = require('./iota_comm_modules/testMam')
const manageClients = require('./iota_comm_modules/manageClients')
const root = []
exports.init = async (req,res) =>{
  const response = await manageClients.init()
  console.log('Mobile is connected root address =',response)
  res.json(response)
}
exports.addClient = async (req,res) =>{
  console.log(req.body.root)
  console.log(req.body.products)
 await manageClients.addNewClient(req.body.root,req.body.products)
  res.json("added new client succefuly")
}
exports.addOwner = async (req,res) =>{
  console.log('root =',req.body.root)
  console.log('product address =',req.body.productAddress)
  console.log('owner address =',req.body.ownerAddress)
  const response = await manageClients.addNewOwner(req.body.root,req.body.productAddress,req.body.ownerAddress)
  res.json("added Owenr new root ")
}
exports.giveReward = async (req,res) =>{
  const response = await giveReward.execute(req.body.root,req.body.productAddress)
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

exports.test = async (req,res) =>{
  res.json("API Connected")
 }
