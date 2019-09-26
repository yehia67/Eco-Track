///////////////////////////////
// MAM: Publish messages to Private Stream
///////////////////////////////
const execute =  (_root) => {
    const Mam = require('@iota/mam')
    const { trytesToAscii } = require('@iota/converter')

    // Init State
    let root = _root
    
    const mamType = 'restricted'
    const mamSecret = 'DONTSHARETHISPASSWORD'

    // Initialise MAM State
    let mamState = Mam.init('https://nodes.devnet.iota.org:443')

    // Callback used to pass data out of the fetch
    const logData = data => console.log(trytesToAscii(data))
    const main = async() =>{
            // Callback used to pass data + returns next_root
    const resp = await Mam.fetch(root, mamType, mamSecret, logData)
    console.log(resp)

    }
    main()


}
module.exports ={
    execute:execute
  }
  
