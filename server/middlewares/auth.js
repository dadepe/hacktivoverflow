const {verifyToken} = require('../helpers/jwt')
const User = require('../models/user')

authentication = function(req, res, next){
    try{
        req.loggedUser = verifyToken(req.headers.token)
        next()
    }catch(err){
        next({
            status : 401,
            message : 'Not Login'
        })
    }
}

authorizationQuestions = function(req, res, next){
    const questId = req.params.id
    User.findOne({QuestionsId : questId})
    .then(data=>{
        if(data._id == req.loggedUser.id){
            next()
        }else{
            next({
                status : 403,
                message : 'Not Authorized'
            })
        }
    })
}

authorizationAnswers = function(req, res, next){
    const answerId = req.params.id
    User.findOne({AnswersId : answerId})
    .then(data=>{
        console.log(data)
        if(data._id == req.loggedUser.id){
            next()
        }else{
            next({
                status : 403,
                message : 'Not Authorized'
            })
        }
    })
}

module.exports = {authentication, authorizationQuestions, authorizationAnswers}