const User = require('../models/user')
const {comparePassword} = require('../helpers/hash')
const {generateToken} = require('../helpers/jwt')
const Question = require('../models/question')

class UserController{
    static login (req, res, next){
        const {email, password} = req.body
        User.findOne({email})
        .then(data=>{
            if(data && comparePassword(password, data.password)){
                let payload = {id : data._id, username : data.username}
                let token = generateToken(payload)
                res.status(200).json({token, payload})
            }else{
                next({
                    status : 401,
                    message : 'invalid email/password'
                })
            }
        })
        .catch(next)
    }
    static register (req, res, next){
        const {username, email, password} = req.body
        User.create({username, email, password})
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(next)
    }

    static profile (req, res, next){
        User.findOne({_id : req.loggedUser.id})
            .populate('AnswersId')
            .populate('QuestionsId')
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static addWatchTag (req, res, next){
        let listedTag = []
        const {tag} = req.body
        if(tag || tag !==""){
            let trimTag = tag.trim()
            Question.find()
            .then(data=>{
                for(let i in data){
                    for(let j in data[i].tags){
                        listedTag.push(data[i].tags[j])
                    }
                }
                if(listedTag.includes(trimTag)){
                    return User.findOneAndUpdate({_id:req.loggedUser.id}, {$push : {watchedTags : trimTag}}, {new:true})
                    .then(data=>{
                        res.status(200).json({msg : "success add watched tags"})
                    })
                }else{
                    throw({
                        status : 400,
                        message : 'tag does not exist in this site'
                    })
                }
            })
            .catch(next)
        }else{
            next({
                status :400,
                message : "cant input empty tag"
            })
        }
    }

    static removeWatchTag (req, res, next){
        const {tag} = req.body
        User.findOneAndUpdate({_id:req.loggedUser.id}, {$pull : {watchedTags : tag}})
        .then(data=>{
            if(data.watchedTags.includes(tag)){
                res.status(200).json({msg : "success remove watched tags"})
            }else{
                next({
                    status : 400,
                    message : 'no tag found'
                })
            }
            
        })
        .catch(next)
    }
}

module.exports = UserController