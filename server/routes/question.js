const router = require('express').Router()
const QuestionController = require('../controllers/questionController')
const {authentication, authorizationQuestions} = require('../middlewares/auth')


router.get('/randomTag', QuestionController.randomTag)

router.get('/', QuestionController.allQuestions)
router.get('/search?', QuestionController.searchQuestion)
router.get('/:id', QuestionController.selectedQuestion)
router.get('/page/:page', QuestionController.pageQuestions)


router.use(authentication)

router.get('/tagged/:tag', QuestionController.searchByTag)
router.post('/', QuestionController.createQuestion)
router.patch('/upvote/:id', QuestionController.upvoteQuestion)
router.patch('/downvote/:id', QuestionController.downvoteQuestion)
router.patch('/:id', authorizationQuestions, QuestionController.updateQuestion)
router.delete('/:id', authorizationQuestions, QuestionController.deleteQuestion)

module.exports = router