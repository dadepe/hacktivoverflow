const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
    description : {type : String, required : [true, 'answer is required']},
    upvotes : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvotes : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    date : {type : Date, default : Date.now()},
    ownedBy : {type : String, required : [true, 'ownedBy is required']},
},{versionKey : false})

const Answer = mongoose.model('Answer', AnswerSchema)

module.exports = Answer