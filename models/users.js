const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
    titre: String,
    image: String,
    description: String
})

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    token: String,
    article: [articleSchema]
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel