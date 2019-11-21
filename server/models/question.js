const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
    title : {type : String, required : [true, 'title is required']},
    description : {type : String, required : [true, 'question is required']},
    upvotes : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvotes : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    answers : [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
    date : {type : Date, default : Date.now()},
    ownedBy : {type : String, required : [true, 'ownedBy is required']},
    tags : [{type : String}]
},{versionKey : false})

const Question = mongoose.model('Question', QuestionSchema)

module.exports = Question