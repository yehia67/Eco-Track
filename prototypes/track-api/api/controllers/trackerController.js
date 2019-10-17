'use strict';
const initComm = require('./iota_comm_modules/initComm')
const generateMainID =(_name,_noOfItems) =>{
        let mainID = ''
        const name = _name.split(' ')
        for (let index = 0; index < name.length; index++) {
            mainID += name[index].charAt(0)
        }
      return mainID.replace(/ /g,'')+ Math.floor((Math.random() * 9000) + 1000) +String(_noOfItems)
}


exports.create_products = function(req, res) {
     console.log('___________________________________________________',req.body.products)  
     initComm.execute(req.body.products).then(function(tracker) {
       console.log("***************************",tracker)
       console.log('type-------------',typeof(req.body))
      res.json(tracker)  
    }) 
}

exports.test = (req,res)=>{
    res.json({todo: 'Buy the milk yarab'})
}
