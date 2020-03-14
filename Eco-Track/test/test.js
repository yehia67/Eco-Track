const assert = require('assert')

const userTest = require('../api/controllers/authentication/initUsers')

const createProductsTest = require('../api/controllers/Products/createProducts')
const getProductsInfoTest  = require('../api/controllers/Products/getProductInfo')
const getProductsHistoryTest  = require('../api/controllers/Products/getProductHistory')

const updateProductsTest = require('../api/controllers/Products/updateProducts')



describe('Test initializing root', ()=> {
    it('should return string with length 81',async ()=>{
       const root = await userTest.init()
       assert.equal(root.length,81)
    })
})

describe('Users authentiactions', ()=> {
    it('should add new user with the initialized root',async ()=>{
       await userTest.init()
       const userKey = await userTest.addUser('yehia','belo','yehia@belo.com','money money money')
       const checkUser = await userTest.verify(userKey)
       assert.equal(checkUser,true)
  
    })

    it('get user personal info',async ()=>{
        await userTest.init()
        const userKey = await userTest.addUser('yehia','belo','yehia@belo.com','money money money')
        const info = await userTest.getUserInfo(userKey)
        const user_json = {
            "fname":'yehia',
            "lname":'belo',
            "email":'yehia@belo.com',
            "bussines_info":'money money money'
        }
        assert.equal(info.fname,user_json.fname)
        assert.equal(info.lname,user_json.lname)
        assert.equal(info.email,user_json.email)
        assert.equal(info.bussines_info,user_json.bussines_info)
     })
     it('get/update user',async ()=>{
        await userTest.init()
        const userKey = await userTest.addUser('yehia','belo','yehia@belo.com','money money money')
        await userTest.updateUser(userKey,[{"001":[{"id":"001"}]},{"002":[{"id":"002"}]}])
        const user_from_key = await userTest.getUser(userKey)
        assert.equal(user_from_key[1][0]["001"][0].id ,"001") 
        assert.equal(user_from_key[1][1]["002"][0].id,"002")     
     })
     it('user should be deleted',async ()=>{
      await userTest.init()
      const userKey = await userTest.addUser('yehia','belo','yehia@belo.com','money money money')
      await userTest.deleteUser(userKey)
      const checkUser = await userTest.verify(userKey)
      assert.equal(checkUser,false)   
   })
})

describe('Products Managements', ()=> {
    it('products should been created',async ()=>{
       await userTest.init()
       const userKey = await userTest.addUser('yehia','belo','yehia@belo.com','money money money')
       const user_from_old_key = await userTest.getUser(userKey)
       const products = [
        {'id':'001','eco-friendly':'5%','date':Date()},
        {'id':'002','eco-friendly':'5%','date':Date()}
        ]
       await createProductsTest.execute(userKey,products)
       const user_from_new_key = await userTest.getUser(userKey)
       console.log('user before adding products')
       console.log(user_from_old_key)
       console.log('user after adding products')
       console.log(user_from_new_key)
       assert.notEqual(user_from_old_key,user_from_new_key)

    })
    it('Test Get the product info',async ()=>{
      await userTest.init()
      const userKey = await userTest.addUser('yehia','belo','yehia@belo.com','money money money')
      const products = [
       {'id':'001','eco-friendly':'5%','date':Date()},
       {'id':'002','eco-friendly':'5%','date':Date()}
       ]
      await createProductsTest.execute(userKey,products)
      const productInfo = await getProductsInfoTest.execute(userKey+',,'+'001')
      assert.equal(productInfo.id,products[0].id)
   })
  
    it('products should been updated',async ()=>{
        await userTest.init()
        const userKey = await userTest.addUser('yehia','belo','yehia@belo.com','money money money')
        const products = [
         {'id':'001','eco-friendly':'5%','date':Date()},
         {'id':'002','eco-friendly':'5%','date':Date()}
         ]
        await createProductsTest.execute(userKey,products)
        const user_from_old_key = await userTest.getUser(userKey)
        await updateProductsTest.execute(userKey+',,'+'001',{'shipper':'the product is broken'})
        const user_from_new_key = await userTest.getUser(userKey)
        assert.notEqual(user_from_old_key,user_from_new_key)
     })

     it('Test Get the product history',async ()=>{
      await userTest.init()
      const userKey = await userTest.addUser('yehia','belo','yehia@belo.com','money money money')
      const products = [
       {'id':'001','eco-friendly':'5%','date':Date()},
       {'id':'002','eco-friendly':'5%','date':Date()}
       ]
      await createProductsTest.execute(userKey,products)
      await updateProductsTest.execute(userKey+',,'+'001',{'shipper':'the product is broken'})
      const productHistory = await getProductsHistoryTest.execute(userKey+',,'+'001')
      assert.equal(productHistory[0].id,products[0].id)
      assert.equal(productHistory[1].shipper,'the product is broken')

   })
})