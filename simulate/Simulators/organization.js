const Organization = (name,OrderedProducts)=>{
    const organization = {
        'name':name,
        'products':OrderedProducts,
        'date':new Date()
    }
    return organization
}
module.exports = {
    Organization:Organization
}