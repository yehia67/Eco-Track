const fetch = require('node-fetch')
const url = 'http://localhost:5002/addClient'



// The data we are going to send in our request
 /* let data = {
    products:[
        {
            "address":'GBWOKDFLITNEXFBRHMVHJVRNCBWXAKCOVCKMOQZDQJCTGNG9NQQCDI9VJYWMZBXDQIKBVMKCWRAEKJGGR',
            "name":'newproduct01',
            "owner":'false',
            "producer":"newclient01"
        },
        {
            "address":'HDWTUITQLQ9ANIU99KTHCHBNXXJECLNAEBOTWAGRRVVUPTUAAELITGHAKQTHI9QCQBWVXGROQSVKAQPXS',
            "name":'newproduct02',
            "owner":'false',
            "producer":"newclient02"

        },
        {
            "address":'NNE9EOQNTNHWKGPYGLKPGUHLSJHQPQNYDZPXLQDREEXUCGIHEKGGZZCBQPKAZSVIJRRTNVOIXTHJQXGFY',
            "name":'newproduct03',
            "owner":'false',
            "producer":"newclient03"
        },
    ]
}  */
// The parameters we are gonna pass to the fetch function
const addProductsToRecycler = async (_data)=>{
    const products = []
    for (let index = 0; index < _data.length; index++) {
        products.push({'address':_data[index],'owner':false})        
    }
    Data = {products}
    let fetchData = { 
        method: 'POST', 
        body: JSON.stringify(Data),
        headers: { 'Content-Type': 'application/json' }
    }
    fetch(url, fetchData)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(function(error) {
        console.log(error)
    }) 
}
//addProductsToRecycler(data)
module.exports={
    execute:addProductsToRecycler
}
