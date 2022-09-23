const model = require('../models/users')
const response = require('../helpers/response')
const jwt = require('jsonwebtoken')
const bcr = require('bcrypt')
const ctrl = {}



const genToken = async (username, passDb) => {
    try {
        const payload = {
            id: passDb[0].users_id,
            user : username,
            role : passDb[0].role
        }
        const token = jwt.sign(payload, process.env.JWT_KEYS,{ expiresIn: '3m' })
        const result = {
            msg: 'token created',
            token: token
        }
        return result
    } catch (error) {
        throw error
    }
}


ctrl.Login = async (req, res) => {
    try {
        const {username, password} = req.body
        const passDb = await model.getByuser(username)
        console.log(passDb)
        if (passDb.length <= 0) {
          
            return response(res, 401, 'user not found', true)
        }
        const check = await bcr.compare(password, passDb[0].password)

        if (!check) {
            return response(res, 401, 'Password its Wrong', true)
        }

        const result = await genToken(username,passDb)
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, 'an error occurred', true)
    }
}






module.exports = ctrl