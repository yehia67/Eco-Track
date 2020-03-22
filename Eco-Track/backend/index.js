const readXlsxFile = require('read-excel-file/node');
console.log(readXlsxFile)
alert('henaa')
const products = []
const product = {} 
// File path.
readXlsxFile('./products.xlsx').then((rows) => {
    for (let row = 1; row < rows.length; row++) {
        for (let col = 0;col < rows[row].length; col++) {
          product[rows[0][col]] = rows[row][col]
        }
       products.push(JSON.parse(JSON.stringify(product)))
    }    
    console.log(products)
})
 
