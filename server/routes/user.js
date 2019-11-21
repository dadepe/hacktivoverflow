const router = require('express').Router()
const userController = require('../controllers/userController')
const {authentication} = require('../middlewares/auth')

router.use(authentication)
router.get('/profile', userController.profile)
router.patch('/addWatchTags', userController.addWatchTag)
router.patch('/removeWatchTags', userController.removeWatchTag)

module.exports = router