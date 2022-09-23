const model = require('../models/movie')
const response = require('../helpers/response')
const upload = require('../middleware/upload')
const roleCheck = require('../middleware/roleCheck')
const multer = require('multer')
const jwt = require('jsonwebtoken')

const ctrl = {}


ctrl.getDataMovie = async (req, res) => {
    try {
        const data = await model.getData()
        return response(res, 200, data)
    } catch (error) {
        return response(res, 500, 'There is an error', true)
    }
}
ctrl.saveDataMovie = async (req, res) => {
    try {
        const token = req.headers.authtoken
        const ruleUser = await roleCheck(token)
        console.log(ruleUser)
        if (ruleUser == 'user') {
            return response(res, 500, 'Your Not Admin', true)
        }

        const image = req.file.filename
        const {
            name,
            category,
            release_date,
            duration,
            casts,
            synopsis,
        } = req.body
        const data = await model.saveData({
            name,
            category,
            release_date,
            duration,
            casts,
            synopsis
        }, image)
        return response(res, 200, data)
    } catch (error) {
        console.log(error)
        return response(res, 500, 'There is an error', true)
    }
}

ctrl.updateDataMovie = async (req, res) => {
    try {
        const token = req.headers.authtoken
        const ruleUser = await roleCheck(token)
        console.log(ruleUser)
        if (ruleUser == 'user') {
            return response(res, 500, 'Your Not Admin', true)
        }
        const id = parseInt(req.params.id)
        const {
            name,
            category,
            release_date,
            duration,
            casts,
            synopsis
        } = req.body
        const data = await model.updateData({
            name,
            category,
            release_date,
            duration,
            casts,
            synopsis
        }, id)

        return response(res, 200, data)
    } catch (error) {
        console.log(error)
        return response(res, 500, 'There is an error', true)
    }
}
ctrl.deleteDataMovie = async (req, res) => {
    try {
        const token = req.headers.authtoken
        const ruleUser = await roleCheck(token)
        if (ruleUser == 'user') {
            return response(res, 500, 'Your Not Admin', true)
        }
        const id = parseInt(req.params.id)
        const data = await model.deleteData(id)

        return response(res, 200, data)
    } catch (error) {
        console.log(error)
        return response(res, 500, 'There is an error', true)
    }
}

ctrl.searchDataMovie = async (req, res) => {
    try {
        const name = req.params.name
        const data = await model.searchData(name)

        return response(res, 200, data)
    } catch (error) {
        console.log(error)
        return response(res, 500, 'There is an error', true)
    }

}


ctrl.ascDataMovie = async (req, res) => {
    try {
        const filter = req.params.filter
        const data = await model.ascData(filter)
        return response(res, 200, data)
    } catch (error) {

        return response(res, 500, 'There is an error', true)
    }

}




module.exports = ctrl