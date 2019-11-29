const secretKey = 'VERYSECRETKEY'
const provider = 'https://nodes.devnet.iota.org'
const pushData = require('../actions/Functions/MAM/pushData')
const fetchData = require('../actions/Functions/MAM/fetchData')
const test = async()=>{
    const root = await pushData.execute(secretKey,provider,"YARAB ISA isa yarab")
    await fetchData.execute(secretKey,provider,'GMRXZADQHUMMUYBRLVJEVPFZAYDWJVVDR9DHOCQPCU9FCIYFD9EKT9MWOSDFTQKPPJWXUUOFKNJHIPEXV')
}
test()