const express =  require('express')
const Routers = express.Router()
const movie = require('./routers/movie')
const schedule = require('./routers/schedule')
const booking = require('./routers/booking')
const users = require('./routers/users')
const auth = require('./routers/auth')
// const searchMovie = require('./routers/movie')
const ascDataMovie = require('./routers/movie')


//user

Routers.use('/schedule', schedule)
Routers.use('/booking', booking)

//admin
Routers.use('/movie', movie)
Routers.use('/users', users)
Routers.use('/auth', auth)

module.exports = Routers