const router = require('express').Router()
const registerRoutes = require('./register')
const loginRoutes = require('./login')
const questionRoutes = require('./question')
const answerRoutes = require('./answer')
const userRoutes = require('./user')

router.use('/login', loginRoutes)
router.use('/register', registerRoutes)
router.use('/questions', questionRoutes)
router.use('/answers', answerRoutes)
router.use('/users', userRoutes)

module.exports = router