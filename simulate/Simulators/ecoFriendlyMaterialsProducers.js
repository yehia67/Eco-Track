const producer_A = ()=>{
    const products = []
    for(let i = 0; i < 10;i++){
        products[i] ={
           'id':i,
            'date':new Date(),
           'eco-percent': 12.5*i +"%"
        }
     }
     return products
}
const producer_B = ()=>{
    const products = []
    for(let i = 0; i < 10;i++){
        products[i] ={
           'id':i,
            'date':new Date(),
           'eco-percent': 22.5*i +"%"
        }
     }
     return products
}
const producer_C = ()=>{
    const products = []
    for(let i = 0; i < 10;i++){
        products[i] ={
           'id':i,
            'date':new Date(),
           'eco-percent': 2.5*i +"%"
        }
     }
     return products
}
module.exports={
    producer_A:producer_A,
    producer_B:producer_B,
    producer_C:producer_C
 }