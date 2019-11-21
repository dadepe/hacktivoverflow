const router = require('express').Router()
const AnswerController = require('../controllers/answerController')
const {authentication, authorizationAnswers} = require('../middlewares/auth')

router.use(authentication)
router.post('/:id', AnswerController.createAnswer)
router.patch('/upvote/:id', AnswerController.upvoteAnswer)
router.patch('/downvote/:id', AnswerController.downvoteAnswer)

router.patch('/:id', authorizationAnswers, AnswerController.updateAnswer)
router.delete('/:id', authorizationAnswers, AnswerController.deleteAnswer)

module.exports = router