const express = require('express')
const router = express.Router()
const movieController  = require('../app/api/controllers/movies')

router.get('/', movieController.gettAll)
router.post('/', movieController.create)
router.get('/:movieName', movieController.getByName)
router.get('/:movieId', movieController.getById)
router.put('/:movieId', movieController.updateById)
router.delete('/:movieId', movieController.deleteById)

module.exports = router