const express = require('express')
require('dotenv').config()
const server = express()
const main = require('./src/main')
const db = require('./src/config/db')

db.connect().then(r => {
    server.use(express.urlencoded({
        extended: true
    }))
    server.use(express.json())
    server.use('/api/v1', main)

    server.listen(process.env.APP_PORT, () => {
        console.log('server ready')
    })

}).catch((err) => {
    console.log(err)

})