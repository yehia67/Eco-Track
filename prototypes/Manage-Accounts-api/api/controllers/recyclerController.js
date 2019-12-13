'use strict';
const testMam = require('./iota_comm_modules/testMam')
const manageClients = require('./iota_comm_modules/manageClients')
exports.init = async (req,res) =>{
  const response = await manageClients.init()
  res.json(response)
}
exports.addClient = async (req,res) =>{
  console.log(req.body.root)
  console.log(req.body.clientID)
  console.log(req.body.products)
  const response = await manageClients.addNewClient(req.body.root,req.body.clientID,req.body.products)
  res.json(response)
}
exports.addOwner = async (req,res) =>{
  console.log(req.body.root)
  console.log(req.body.productAddress)
  console.log(req.body.ownerAddress)
  const response = await manageClients.addNewClient(req.body.root,req.body.productAddress,req.body.ownerAddress)
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
