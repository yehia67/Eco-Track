const randId = (Place,productNum)=>{
    const IDs = []
    for (let index = 0; index < productNum; index++) {
              IDs.push(Place+"00"+index)
    }
    return IDs
}

const randSate = (productNum)=>{
    const damagedIndex = productNum/4
    const status = ['undamaged','damaged']
    randData = []
    for (let index = 0; index < productNum; index++) {
        if( index  % damagedIndex === 0){
            randData.push(status[1])
        }else{
            randData.push(status[0])
        }        
    }
    return randData
}

const randPerecntage = () =>{
    return Math.floor(Math.random() * 100) + 1 +"%"
}

const generator = (Place,productNum) =>{
      const GeneratedData = []
      const IDs =  randId(Place,productNum)
      const status = randSate(productNum)
      const percentage = randPerecntage()
      for (let index = 0; index < productNum; index++) {
            GeneratedData[index] = {
                'ID':IDs[index],
                'status':status[index],
                'eco-percentage':percentage
            }   
      }
    return GeneratedData
}
module.exports ={
    execute:generator  
}