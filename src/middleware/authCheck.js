const jwt = require('jsonwebtoken')
const response = require('../helpers/response')



const auth_validate = (req, res, next) => {
    const { authtoken } = req.headers
   
    if(!authtoken){
        return response(res, 401, 'Silahkan Login')
    }

    jwt.verify(authtoken, process.env.JWT_KEYS, (err, decode)  => {

        if (err) {
            return response(res, 401, err, true)
        }else{
            next()
        }
     
    })
}




module.exports = auth_validate
