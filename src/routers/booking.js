const express =  require('express')
const router = express.Router()
const authCheck = require('../middleware/authCheck')
const ctrl = require('../controllers/booking')

//Booking
router.get('/', authCheck, ctrl.getDataBooking)
router.post('/',authCheck, ctrl.saveDataBooking)
router.patch('/:id',authCheck, ctrl.updateDataBooking)
router.delete('/:id', authCheck, ctrl.deleteDataBooking)



module.exports = router