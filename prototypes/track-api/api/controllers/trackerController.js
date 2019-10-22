'use strict';
const initComm = require('./iota_comm_modules/initComm')



exports.create_products = (req, res) => {
     initComm.execute(req.body.products).then(function(tracker) {
      res.json(tracker)  
    }) 
}

exports.test = (req,res)=>{
    res.json({todo: 'Buy the milk yarab'})
}
