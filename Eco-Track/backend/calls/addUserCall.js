const fetch = require('node-fetch')

const addUser = (user) =>{
   return new Promise((resolve, reject)=>{
        fetch('http://localhost:4000/user/add', {
                  method: 'post',
                  body:    JSON.stringify(user),
                  headers: { 'Content-Type': 'application/json' },
              })
              .then(res => res.json())
              .then(json => resolve(json))
      })
}

const test = async()=>{
 const response = await addUser({"fname":"yehia","lname":"belal","email":"ebny@belo.com","bussines_info":"yarab isa isa"})
 console.log(response)
}
//test()

module.exports = {
  execute:addUser
}