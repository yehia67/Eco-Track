'use strict';
const initComm = require('./iota_comm_modules/initComm')
const fetchMamRestricted = require('./iota_comm_modules/FetchMamRestricted')
const sendMamRestricted = require('./iota_comm_modules/SendMamRestricted')
exports.get_products = async (req,res) =>{
  const productsData = await fetchMamRestricted.execute(req.query.address)
  res.json(productsData)
 }
exports.create_products = (req, res) => {
      initComm.execute(req.body.products).then(function(tracker) {
      console.log('yaraaaaaab yaaraaaaaab',initComm.getAddresses())          
      res.json(tracker)  
    }) 
}
exports.update_product = (req, res) => {
  sendMamRestricted.execute(JSON.stringify(req.body.data)).then(function(tracker) {
  res.json(tracker)  
})   
}

