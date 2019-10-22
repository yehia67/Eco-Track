'use strict';
const initComm = require('./iota_comm_modules/initComm')
const fetchMamRestricted = require('./iota_comm_modules/FetchMamRestricted')
exports.create_products = (req, res) => {
      initComm.execute(req.body.products).then(function(tracker) {
      res.json(tracker)  
    }) 
}
exports.get_products = async (req,res) =>{
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",req.query.address)
  fetchMamRestricted.execute(req.query.address).then(function (result) {
    res.json(result)
  })
}
exports.test = (req,res)=>{
    res.json({todo: 'Buy the milk yarab'})
}
