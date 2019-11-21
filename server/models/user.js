const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator');
const {hashPassword} = require('../helpers/hash')

const UserSchema = new Schema({
    username : {type : String, required : [true, 'username is required'], unique : true},
    email : {type : String, required : [true, 'email is required'], unique : true},
    password : {type : String, required : [true, 'password is required'], minlength : [6, "password less than 6 characters"]},
    QuestionsId : [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    AnswersId : [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
    watchedTags : [{type : String}]
},{versionKey : false})

UserSchema.pre('save', function(next){
    this.password = hashPassword(this.password)
    next()
})

UserSchema.plugin(uniqueValidator);

UserSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email)
 }, 'Format Email wrong')


const User = mongoose.model('User', UserSchema)

module.exports = User