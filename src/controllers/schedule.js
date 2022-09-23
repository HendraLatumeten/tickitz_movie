const model = require('../models/schedule')
const response = require('../helpers/response')
const roleCheck = require('../middleware/roleCheck')
const jwt = require('jsonwebtoken')
const ctrl = {}



ctrl.getDataSchedule = async (req, res) => {
    try {
        const token = req.headers.authtoken
        const userData = jwt.verify(token, process.env.JWT_KEYS, (err, decode) => {
            return decode
        })
        const ruleUser = await roleCheck(token)
        if (ruleUser == 'user') {
            return response(res, 500, 'Your Not Admin', true)
        }

        const id = userData.id
        const data = await model.getData(id)
       return response(res, 200, data)
    } catch (error) {
        console.log(error)
        return response(res, 500, 'There is an error', true)
    }
}

ctrl.saveDataSchedule = async (req, res) => {
    try {
        const token = req.headers.authtoken
        const ruleUser = await roleCheck(token)
        if (ruleUser == 'admin') {
            return response(res, 500, 'Your Not Admin', true)
        }
        
        const data = await model.saveData(req.body)
       return response(res, 200, data)
    } catch (error) {
        console.log(error)
        return response(res, 500, 'There is an error', true)
    }
}

ctrl.updateDataSchedule = async (req, res) => {
    try {

        const token = req.headers.authtoken
        const ruleUser = await roleCheck(token)
        if (ruleUser == 'user') {
            return response(res, 500, 'Your Not Admin', true)
        }

        const id = parseInt(req.params.id)
        const {
            movie_name,
            price,
            premiere,
            location,
            date_start,
            date_end,
            time,
            users_id
        } = req.body
        const data = await model.updateData({
            movie_name,
            price,
            premiere,
            location,
            date_start,
            date_end,
            time,
            users_id 
        }, id)

       return response(res, 200, data)
    } catch (error) {
        console.log(error)
        return response(res, 500, 'There is an error', true)
    }
}
ctrl.deleteDataSchedule = async (req, res) => {
    try {
        const ruleUser = await roleCheck(token)
        if (ruleUser == 'user') {
            return response(res, 500, 'Your Not Admin', true)
        }
        const id = parseInt(req.params.id)
        const data = await model.deleteData(id)

       return response(res, 200, data)
    } catch (error) {
        return response(res, 500, 'There is an error', true)
    }
}



module.exports = ctrl