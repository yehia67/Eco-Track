'use strict';
const Model = require('../../models/index')
let root = ''

const initRoot = async()=>{
    root = await Model.create({'password':'root password'})
    console.log('the root of passwords manager is',root)
}
initRoot()
const addPassword = async (_secuirtyKey,_seed)=>{
    await Model.update(root,_secuirtyKey,_seed)
    return true
}

const verifyPassword = async(_secuirtyKey)=>{
    const getPasswords = await Model.read(root)
    const getJsonPasswords = JSON.parse(getPasswords)
    if(getJsonPasswords[_secuirtyKey]){
        return true
    }
    return false
}
const test = async()=>{
    await initRoot()
    const addPasswordTest = await addPassword('PASSWHJOAJSAOJASOJSA','YTZRHFICXKLLJYQYFTCSDOCNTLYJHFQYJYCRMAACETAWHKACOCUISRLBQNX9BRIWVBDRQRENI9LTCZSOX')
    if (addPasswordTest) {
        const verifyPasswordTest = await verifyPassword('PASSWHJOAJSAOJASOJSA')
        console.log(verifyPasswordTest)
    }
    else{
        console.log('A problem on addPasswordTest')
    }
    
}
//test()
module.exports={
    addPassword:addPassword,
    verifyPassword:verifyPassword
}