const initComm = require('./iota_comm_modules/initComm')
const products = [{
    id: '15p6013',
    time: (new Date()).toLocaleString()
  },
  {
    id:'229219',
    location:'home'
  }
  ]

initComm.execute(products).then(function(tracker) {
    console.log(typeof(products))
    console.log(tracker)
}) 