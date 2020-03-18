var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../server");
let should = chai.should();
chai.use(chaiHttp);

let user_key = ""


describe ("User Management", function(){

    const user = {
        "fname":"yehia",
        "lname":"belo",
        "email":"ebny@belo.com",
        "bussines_info":"yarab isa isa"
    }
    const updated_data ={
        "shippper":"broken product",
        "date": Date()
    }
    it("Should add Producer in our IPFS/Tangle Database", (done) => {
       chai.request(server)
         .post("/user/add")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200)
                    user_key = res.body.seed
                    console.log("Response Body:", res.body)  
                    done()   
                })
    })

    it("Should get Producer personal Info", (done) => {
        chai.request(server)
          .get("/user/info")
                 .send({"key":user_key})
                 .end((err, res) => {
                     res.should.have.status(200)
                     console.log("Response Body:", res.body) 
                     done()    
                 })
     })

     it("Should get the Producer Object", (done) => {
        chai.request(server)
          .get("/user/get")
                 .send({"key":user_key})
                 .end((err, res) => {
                     res.should.have.status(200)
                     console.log("Response Body:", res.body)
                     done()     
                 })
     })
     it("Should update the Producer Data", (done) => {
        updated_data['key'] = 

        chai.request(server)
          .put("/user/update")
                 .send({"key":user_key,updated_data})
                 .end((err, res) => {
                     res.should.have.status(200)
                     console.log("Response Body:", res.body)
                     done()     
                 })
     })
     
})



describe ("Products Management", function(){
   
    const products = [
        {'id':'001','eco-friendly':'5%','date':Date()},
        {'id':'002','eco-friendly':'5%','date':Date()},
        {'id':'003','eco-friendly':'5%','date':Date()}
    ]
    const updated_data ={
        "shippper":"broken product",
        "date": Date()
    }
    it("Should Create Products for a Producer", (done) => {
       chai.request(server)
         .post("products/create")
                .send({'key':user_key,products})
                .end((err, res) => {
                    res.should.have.status(200)
                    console.log("Response Body:", res.body)  
                    done()   
                })
    })

     
})