const model = require('../models/booking')
const response = require('../helpers/response')
const jwt = require('jsonwebtoken')

const ctrl = {}



ctrl.getDataBooking = async (req, res) => {
    try {
        const token = req.headers.authtoken
        const userData = jwt.verify(token, process.env.JWT_KEYS, (err, decode) => {
            return decode
        })
        const id = userData.id
        const data = await model.getData(id)
        return response(res, 200, data)
    } catch (error) {
        console.log(error)
        return response(res, 500, 'There is an error', true)
    }
}


ctrl.saveDataBooking = async (req, res) => {
    try {
        const {
            premiere,
            movie_name,
            date,
            time,
            price,
            seat,
            total_payment,
            users_id
        } = req.body
        const data = await model.saveData({
            premiere,
            movie_name,
            date,
            time,
            price,
            seat,
            total_payment,
            users_id
        })
        return response(res, 200, data)
    } catch (error) {
        return response(res, 500, 'There is an error', true)
    }
}

ctrl.updateDataBooking = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const {
            premiere,
            movie_name,
            date,
            time,
            price,
            seat,
            total_payment
        } = req.body
        const data = await model.updateData({
            premiere,
            movie_name,
            date,
            time,
            price,
            seat,
            total_payment
        }, id)

        return response(res, 200, data)
    } catch (error) {
        return response(res, 500, 'There is an error', true)
    }
}
ctrl.deleteDataBooking = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const data = await model.deleteData(id)

        return response(res, 200, data)
    } catch (error) {
        return response(res, 500, 'There is an error', true)
    }
}



module.exports = ctrl