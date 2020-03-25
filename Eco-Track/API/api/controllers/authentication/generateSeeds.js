const seedDigits = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","9"]
const generate = ()=>{
    let key = ""
    for (let index = 0; index < 81; index++) {
         key +=  seedDigits[Math.floor(Math.random() * seedDigits.length)]
    }
    return key
}
module.exports ={
    execute:generate
}