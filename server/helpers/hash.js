const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

function hashPassword(password){
    console.log('masuk hash')
    return bcrypt.hashSync(password, salt)
}

function comparePassword(password, hashPassword){
    return bcrypt.compareSync(password, hashPassword)
}

module.exports = {hashPassword, comparePassword}