const express =  require('express')
const router = express.Router()
const ctrl = require('../controllers/movie')
const authCheck = require('../middleware/authCheck')
const upload = require('../middleware/upload')

//movie
router.get('/', ctrl.getDataMovie)
router.post('/', authCheck, upload.single('image'), ctrl.saveDataMovie)
router.put('/:id', authCheck, upload.single('image'), ctrl.updateDataMovie)
router.delete('/:id', authCheck, ctrl.deleteDataMovie)

router.get('searchDataMovie/:name', ctrl.searchDataMovie)
router.get('ascDataMovie/:filter', ctrl.ascDataMovie)


module.exports = router
