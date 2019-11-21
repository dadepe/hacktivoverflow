const Answer = require('../models/answer')
const Question = require('../models/question')
const User = require('../models/user')

class AnswerController{
    static createAnswer(req,res,next){
        let questId = req.params.id
        let answer
        let ownedBy = req.loggedUser.username
        const{description} = req.body
        Answer.create({description, ownedBy})
        .then(data=>{
            answer = data
            return User.findOneAndUpdate({_id : req.loggedUser.id}, {$push : {AnswersId : data._id}})
        })
        .then(_=>{
            return Question.findOneAndUpdate({_id : questId}, {$push : {answers : answer._id}})
            
        })
        .then(_=>{
            res.status(201).json({msg : 'success post answer', data : answer})
        })
        .catch(next)
    }

    static updateAnswer(req,res,next){
        const answerId = req.params.id
        const{description} = req.body
        Answer.findOneAndUpdate({_id : answerId},{description, date : Date.now()},{new:true, runValidators:true, omitUndefined :true})
        .then(data=>{
            res.status(200).json({msg : 'successfully updated', data})
        })
        .catch(next)
    }

    static deleteAnswer(req,res,next){
        let deleted
        const answerId = req.params.id
        Answer.findOneAndDelete({_id:answerId})
        .then(data=>{
            deleted = data
            return User.findOneAndUpdate({_id : req.loggedUser.id}, {$pull : {AnswersId : answerId}})
        })
        .then(_=>{
            return Question.findOneAndUpdate({answers : answerId}, {$pull : {answers : answerId}})
            
        })
        .then(_=>{
            res.status(201).json({msg : 'success delete Answer', data : deleted})
        })
        .catch(next)
    }

    static upvoteAnswer(req, res, next){
        let netral = false
        const answerId = req.params.id
        Answer.findOne({_id : answerId})
        .then(data=>{
            if(data.upvotes.includes(req.loggedUser.id)){
                throw({
                    status : 400,
                    message : 'already upvote'
                })
            }else{
                if(data.downvotes.includes(req.loggedUser.id)){
                    netral = true
                    return Answer.findOneAndUpdate({_id : answerId}, {$pull : {downvotes : req.loggedUser.id}}, {new : true})
                }else{
                    return Answer.findOneAndUpdate({_id : answerId}, {$push : {upvotes : req.loggedUser.id}}, {new : true})
                }
               
            }
        })
        .then(data=>{
            if(netral){
                res.status(200).json({msg : 'undo downvote', data})
            }else{
                res.status(200).json({msg : 'success upvote Answer', data})
                
            }
            
        })
        .catch(next)
    }

    static downvoteAnswer(req, res, next){
        let netral = false
        const answerId = req.params.id
        Answer.findOne({_id : answerId})
        .then(data=>{
            if(data.downvotes.includes(req.loggedUser.id)){
                throw({
                    status : 400,
                    message : 'already downvote'
                })
            }else{
                if(data.upvotes.includes(req.loggedUser.id)){
                    netral = true
                    return Answer.findOneAndUpdate({_id : answerId}, {$pull : {upvotes : req.loggedUser.id}}, {new : true})
                }else{
                    return Answer.findOneAndUpdate({_id : answerId}, {$push : {downvotes : req.loggedUser.id}}, {new : true})
                }
               
            }
        })
        .then(data=>{
            if(netral){
                res.status(200).json({msg : 'undo upvote', data})
            }else{
                res.status(200).json({msg : 'success downvote Answer', data})
                
            }
        })
        .catch(next)
    }
}

module.exports = AnswerController