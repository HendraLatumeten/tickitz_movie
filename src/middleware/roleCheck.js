const jwt = require('jsonwebtoken')


roleCheck = async (token) => {
    const userData = jwt.verify(token, process.env.JWT_KEYS, (err, decode) => {
        return decode
    })
    if (userData.role == 1) {
        return 'admin'
    }else{
        return 'user'
        
    }
}

module.exports = roleCheck