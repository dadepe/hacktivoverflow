const Question = require('../models/question')
const User = require('../models/user')
const Answer = require('../models/answer')

class QuestionController{
    static allQuestions(req,res,next){
        Question.find().populate('answers')
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static selectedQuestion(req,res,next){
        const questionId = req.params.id
        Question.findOne({_id : questionId}).populate('answers')
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static pageQuestions(req,res,next){
        let perPage = 5
        let page = req.params.page -1
        Question.find()
        .sort({_id : 'desc'})
        .limit(perPage)
        .skip(perPage * page)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static searchQuestion(req,res,next){
        let filter = req.query.filter
        let filterRegex = new RegExp(filter, 'gi')
        
        Question.find({title : {$regex : filterRegex}}).populate('answers')
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static searchByTag(req,res,next){
        let tagName = req.params.tag
        Question.find({tags : tagName}).populate('answers')
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static createQuestion(req,res,next){
        let question
        let rawTag
        let finalTag = []
        let ownedBy = req.loggedUser.username
        const {title,description,tags} = req.body
        rawTag = tags.split(',')
        rawTag.forEach(element=>{
            if(element !== "" && element.trim().length){
                finalTag.push(element.trim())
            }
        })
        Question.create({title,description, ownedBy, tags : finalTag})
        .then(data=>{
            question = data
            return User.findOneAndUpdate({_id : req.loggedUser.id}, {$push : {QuestionsId : data._id}})
        })
        .then(_=>{
            res.status(201).json({msg : 'success post Question', data : question})
        })
        .catch(next)
    }

    static updateQuestion(req,res,next){
        const questionId = req.params.id
        let rawTag
        let finalTag = []
        const {title,description,tags} = req.body
        rawTag = tags.split(',')
        rawTag.forEach(element=>{
            if(element !== ""){
                finalTag.push(element.trim())
            }
        })
        Question.findOneAndUpdate({_id : questionId},{title, description, tags : finalTag, date : Date.now()},{new:true, runValidators:true, omitUndefined :true})
        .then(data=>{
            res.status(200).json({msg : 'successfully updated', data})
        })
        .catch(next)
    }

    static deleteQuestion(req,res,next){
        console.log('masuk')
        let deleted
        const questionId = req.params.id
        console.log(questionId)
        Question.findOneAndDelete({_id:questionId})
        .then(data=>{
            deleted = data
            return User.findOneAndUpdate({_id : req.loggedUser.id}, {$pull : {QuestionsId : questionId}})
        })
        .then(_=>{
            return Answer.deleteMany({_id : {$in : deleted.answers}})
        .then(_=>{
            res.status(200).json({msg: 'sucessfully delete Question', data : deleted})   
        })
    })
        .catch(next)
    }

    static upvoteQuestion(req, res, next){
        let netral = false
        const questionId = req.params.id
        Question.findOne({_id : questionId})
        .then(data=>{
            if(data.upvotes.includes(req.loggedUser.id)){
                throw({
                    status : 400,
                    message : 'already upvote'
                })
            }else{
                if(data.downvotes.includes(req.loggedUser.id)){
                    netral = true
                    return Question.findOneAndUpdate({_id : questionId}, {$pull : {downvotes : req.loggedUser.id}}, {new : true})
                }else{
                    return Question.findOneAndUpdate({_id : questionId}, {$push : {upvotes : req.loggedUser.id}}, {new : true})
                }
               
            }
        })
        .then(data=>{
            if(netral){
                res.status(200).json({msg : 'undo downvote', data})
            }else{
                res.status(200).json({msg : 'success upvote question', data})
                
            }
            
        })
        .catch(next)
    }

    static downvoteQuestion(req, res, next){
        let netral = false
        const questionId = req.params.id
        Question.findOne({_id : questionId})
        .then(data=>{
            if(data.downvotes.includes(req.loggedUser.id)){
                throw({
                    status : 400,
                    message : 'already downvote'
                })
            }else{
                if(data.upvotes.includes(req.loggedUser.id)){
                    netral = true
                    return Question.findOneAndUpdate({_id : questionId}, {$pull : {upvotes : req.loggedUser.id}}, {new : true})
                }else{
                    return Question.findOneAndUpdate({_id : questionId}, {$push : {downvotes : req.loggedUser.id}}, {new : true})
                }
               
            }
        })
        .then(data=>{
            if(netral){
                res.status(200).json({msg : 'undo upvote', data})
            }else{
                res.status(200).json({msg : 'success downvote question', data})
                
            }
        })
        .catch(next)
    }

    static randomTag(req, res, next){
        let listedTag = []
        Question.find({})
        .then(data=>{
            for(let i in data){
                for(let j in data[i].tags){
                    listedTag.push(data[i].tags[j])
                }
            }
            let num = Math.floor(Math.random()*listedTag.length - 1)
            res.status(200).json({
                random : listedTag[num]
            })
        })
        .catch(next)
    }
}

module.exports = QuestionController