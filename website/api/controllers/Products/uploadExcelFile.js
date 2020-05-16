const readXlsxFile = require('read-excel-file/node');
const products = []
const product = {} 

const uploadExcelFile = async(file)=>{
    console.log('the file is',file)  
    return new Promise((resolve,reject)=>{
      readXlsxFile(file).then((rows) => {
        console.log(rows)
        for (let row = 1; row < rows.length; row++) {
            for (let col = 0;col < rows[row].length; col++) {
              product[rows[0][col]] = rows[row][col]
              console.log('outer loop '+ row +' inner loop '+col)
              console.log(product[rows[0][col]])
              console.log('-------------------------------------')
            }
          products.push(JSON.parse(JSON.stringify(product)))
        }    
        console.log('products inside the execl sheet')
        console.log(products)
        resolve(products)
    })
    }) 
}
const test = async()=>{
  const uploadExcelFileTest = await uploadExcelFile('./products.xlsx')
  console.log(uploadExcelFileTest)
}
//test()

module.exports= {
  execute:uploadExcelFile
}