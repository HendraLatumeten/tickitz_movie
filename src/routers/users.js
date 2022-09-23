const express =  require('express')
const router = express.Router()
const ctrl = require('../controllers/users')
const authCheck = require('../middleware/authCheck')
const upload = require('../middleware/upload')

router.get('/', authCheck, ctrl.getDataUsers)
router.post('/', upload.single('image'), ctrl.saveDataUsers)





module.exports = router