# Eco-Track
Next Generation Blockchain for supply chain and recycling systems

#### Quick demo
```
npm start

```


## Test initializing root

#### It should return string with length 81

```javascript
    const root = await userTest.init()
assert.equal(root.length,81)
```

## Users authentiactions

#### It should add new user with the initialized root

```javascript
    await userTest.init()
const userKey = await userTest.addUser('yehia','belo','yehia@belo.com','money money money')
const checkUser = await userTest.verify(userKey.new_key)
assert.equal(checkUser,true)
```

#### It get user personal info

```javascript
    await userTest.init()
const userKey = await userTest.addUser('yehia','belo','yehia@belo.com','money money money')
const info = await userTest.getUserInfo(userKey.new_key)
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
```

#### It get/update user

```javascript
    await userTest.init()
const userKey = await userTest.addUser('yehia','belo','yehia@belo.com','money money money')
await userTest.updateUser(userKey.new_key,[{"001":[{"id":"001"}]},{"002":[{"id":"002"}]}])
const user_from_key = await userTest.getUser(userKey.new_key)
assert.equal(user_from_key[1][0]["001"][0].id ,"001") 
assert.equal(user_from_key[1][1]["002"][0].id,"002")     
```

#### It user should be deleted

```javascript
    await userTest.init()
const userKey = await userTest.addUser('yehia','belo','yehia@belo.com','money money money')
await userTest.deleteUser(userKey.new_key)
const checkUser = await userTest.verify(userKey.new_key)
assert.equal(checkUser,false)   
```

## Products Managements

#### It products should been created

```javascript
    await userTest.init()
const userKey = await userTest.addUser('yehia','belo','yehia@belo.com','money money money')
const user_from_old_key = await userTest.getUser(userKey.new_key)
const products = [
 {'id':'001','eco-friendly':'5%','date':Date()},
 {'id':'002','eco-friendly':'5%','date':Date()}
 ]
await createProductsTest.execute(userKey.new_key,products)
const user_from_new_key = await userTest.getUser(userKey.new_key)
console.log('user before adding products')
console.log(user_from_old_key)
console.log('user after adding products')
console.log(user_from_new_key)
assert.notEqual(user_from_old_key,user_from_new_key)
```

#### It Test Get all products

```javascript
    await userTest.init()
const userKey = await userTest.addUser('yehia','belo','yehia@belo.com','money money money')
const products = [
 {'id':'001','eco-friendly':'5%','date':Date()},
 {'id':'002','eco-friendly':'5%','date':Date()},
 {'id':'003','eco-friendly':'5%','date':Date()}
 ]
await createProductsTest.execute(userKey.new_key,products)
const allProducts = await getAllProductsTest.execute(userKey.new_key,1)
console.log("all products areeeeeeeeeeeeee")
console.log(allProducts)
assert.equal(allProducts['001'][0].id,products[0].id)
assert.equal(allProducts['002'][0].id,products[1].id)
assert.equal(allProducts['003'][0].id,products[2].id)
```

#### It Test Get the product info

```javascript
    await userTest.init()
const userKey = await userTest.addUser('yehia','belo','yehia@belo.com','money money money')
const products = [
 {'id':'001','eco-friendly':'5%','date':Date()},
 {'id':'002','eco-friendly':'5%','date':Date()}
 ]
await createProductsTest.execute(userKey.new_key,products)
const productInfo = await getProductsInfoTest.execute(userKey.new_key+',,'+'001')
assert.equal(productInfo.id,products[0].id)
```

#### It Test Get the product history

```javascript
    await userTest.init()
const userKey = await userTest.addUser('yehia','belo','yehia@belo.com','money money money')
const products = [
 {'id':'001','eco-friendly':'5%','date':Date()},
 {'id':'002','eco-friendly':'5%','date':Date()}
 ]
await createProductsTest.execute(userKey.new_key,products)
await updateProductsTest.execute(userKey.new_key+',,'+'001',{'shipper':'the product is broken'})
const productHistory = await getProductsHistoryTest.execute(userKey.new_key+',,'+'001')
assert.equal(productHistory[0].id,products[0].id)
assert.equal(productHistory[1].shipper,'the product is broken')
```

#### It product should been updated

```javascript
    await userTest.init()
const userKey = await userTest.addUser('yehia','belo','yehia@belo.com','money money money')
const products = [
 {'id':'001','eco-friendly':'5%','date':Date()},
 {'id':'002','eco-friendly':'5%','date':Date()}
 ]
await createProductsTest.execute(userKey.new_key,products)
const user_from_old_key = await userTest.getUser(userKey.new_key)
await updateProductsTest.execute(userKey.new_key+',,'+'001',{'shipper':'the product is broken'})
const user_from_new_key = await userTest.getUser(userKey.new_key)
assert.notEqual(user_from_old_key,user_from_new_key)
```

#### It It should update All products

```javascript
    await userTest.init()
const userKey = await userTest.addUser('yehia','belo','yehia@belo.com','money money money')
const products = [
 {'id':'001','eco-friendly':'5%','date':Date()},
 {'id':'002','eco-friendly':'5%','date':Date()},
 {'id':'003','eco-friendly':'5%','date':Date()}
 ]
await createProductsTest.execute(userKey.new_key,products)
await updateAllProductsTest.execute(userKey.new_key,1,{'shipper':'the product is broken'})
const user_from_json = await userTest.getUser(userKey.new_key)
const user_products =user_from_json[1] 
console.log('------------------------------------------------')
console.log(user_products)
assert.equal(user_products["001"][1].shipper,'the product is broken')
```

