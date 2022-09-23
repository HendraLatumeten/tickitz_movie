const model = require('../models/users')
const hashing = require('../helpers/hash')
const response = require('../helpers/response')
const jwt = require('jsonwebtoken')
const roleCheck = require('../middleware/roleCheck')
const ctrl = {}



ctrl.getDataUsers = async (req, res) => {
    try {
        
        const token = req.headers.authtoken
        const ruleUser = await roleCheck(token)
       // console.log(ruleUser)
        if (ruleUser == 'user') {
            return response(res, 500, 'Your Not Admin', true)
        }

        const data = await model.getData()
        return response(res, 200, data)
    } catch (error) {
        return response(res, 500, 'There is an error', true)
    }
}
ctrl.saveDataUsers = async (req, res) => {
    try {
        const image = req.file.filename
        const {
            username,
            password,
            role
        } = req.body
        const hashPassword = await hashing(password)
        const data = await model.saveData({
            username,
            hashPassword,
            role
        }, image)
        return response(res, 200, data)
    } catch (error) {
        console.log(error)
        return response(res, 500, 'There is an error', true)
    }
}


//userID
ctrl.GetId = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body
        const id = await model.getByID(id)
        //console.log(passDb)
        if (id) {
            const check = await bcr.compare(password, id[0].password)
        } else {
            return response(res, 401, 'user not found', true)

        }


        const result = await genToken(id)
        return response(res, 200, result)
    } catch (error) {
        console.log(error)
        return response(res, 500, 'error', true)
    }
}
ctrl.deleteDataUsers = async (req, res) => {
    try {
        const users_id =  req.params.id
      //  console.log(users_id)
        const data = await model.deleteData(users_id)

        res.status(200).send(data)
    } catch (error) {
        console.log(error)
        res.status(500).send(data)
    }
}



module.exports = ctrl