const fetch = require("node-fetch");
const postCall = (url,data)=>{
  const param ={
    headers:{
      "content-type":"application/json;charset=UTF-8"
    },
    body:data,
    method:"POST"
  }
  fetch(url,param)
  .then(data =>{return data.json})
  .then(res=>{
    console.log("-----------------------------------------------")
    console.log(res)})
  .catch(error=>console.log(error))
}
//postCall("http://localhost:3002/initClient","{data:'dataaa yaraaaab'}")
module.exports ={
   post:postCall
}
