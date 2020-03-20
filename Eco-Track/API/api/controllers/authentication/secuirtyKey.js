const generate = (seed)=>{
    let key = ""
    for (let index = 0; index < 20; index++) {
         key +=  seed[Math.floor(Math.random() * seed.length)]
    }
    return key
}
module.exports ={
    execute:generate
}