const fetchRoot = require('./fetchRoot')
const catIPFS = require('./cat')
const check = async(_root)=>{
	const IPFSHash = await fetchRoot.execute(_root)
	const productString = await catIPFS.execute(IPFSHash)
	const productJSON = JSON.parse(productString)
	return 	productJSON	
}
check('SCQLOKWEBAVOKNBPISFSYIQFLGVRUMGQ9DPKFRYIFNQLJOMSRYAZUFOFVPFGIZAYBCNENTFCAAFTPDDKR').then(function(r){
    console.log(r)
})
module.exports = {
    execute : check
}