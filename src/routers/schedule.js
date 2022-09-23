const express =  require('express')
const router = express.Router()
const ctrl = require('../controllers/schedule')
const authCheck = require('../middleware/authCheck')
//Schedule
router.get('/', authCheck, ctrl.getDataSchedule)
router.post('/', authCheck, ctrl.saveDataSchedule)
router.patch('/:id', authCheck, ctrl.updateDataSchedule)
router.delete('/:id', authCheck, ctrl.deleteDataSchedule)



module.exports = router