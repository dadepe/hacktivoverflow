const router = require('express').Router()
const userController = require('../controllers/userController')

router.post('/', userController.register)

module.exports = router