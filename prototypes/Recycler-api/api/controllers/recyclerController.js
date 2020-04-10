'use strict';
const giveReward = require('./iota_comm_modules/giveReward')
const testMam = require('./iota_comm_modules/testMam')
const manageClients = require('./iota_comm_modules/manageClients')
let root = ''

  manageClients.init().then((response)=>{
    root = response
    console.log('Mobile is connected root address =',root)
  })


exports.addClient = async (req,res) =>{
  console.log('body iss')
  console.log(req.body)
  console.log(req.body.products)
 await manageClients.addNewClient(root,req.body.products)
  res.json("added new client succefuly")
}

exports.addOwner = async (req,res) =>{
  console.log(('------------------------------owner callllllllllllllllllllllllllll'))
  console.log('root =',root)
  console.log('product address =',req.body.productAddress)
  console.log('owner address =',req.body.ownerAddress)
  console.log('root =',root.length)
  console.log('product address =',req.body.productAddress.length)
  console.log('owner address =',req.body.ownerAddress.length)

  const response = await manageClients.addNewOwner(root,req.body.productAddress,req.body.ownerAddress)
  console.log(('------------------------------response is  '+response))
  res.json(response)
}
exports.getProducts = async (req,res) =>{
  console.log('body iss')
  console.log(req.query.seed)
  const response = await manageClients.geProducts(root,req.query.seed)
  res.json(response)
}
exports.giveReward = async (req,res) =>{
  const response = await giveReward.execute(root,req.body.productAddress)
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
