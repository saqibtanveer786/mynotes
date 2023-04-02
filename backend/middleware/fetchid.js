const jwt = require('jsonwebtoken')
// let token
const fetchid = async (req, res, next)=>{
    try {
    const token = req.headers.authtoken
    if(!token){return res.status(401).send('error')} 
    const sendedjsondata = await jwt.verify(token, 'secret')
    req.user = sendedjsondata.user
    next()
} catch (errr) {
        res.status(500).send(errr)
        console.log(errr)
}
}

module.exports = fetchid