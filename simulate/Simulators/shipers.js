const shiper= (timeFlag,statusFlag,value)=>{
    const result = ""
    if(timeFlag){
        result += "Recived at time"
    }
    else{
        result += "Late product"
    }
    if(statusFlag){
        result += "Recived identical with the description "+ value +"% of eco-Freindly materials"
    }
    else{
        result += "Different from  the description with missing"+ value +"% of eco-Freindly materials"
    }
}

module.exports={
    shiper:shiper
 }