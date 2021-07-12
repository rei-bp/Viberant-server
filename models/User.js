const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    liked_post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'}],
    joined_post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'}],
    created_post: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post'}]
}, {
    timestamps: true
})

module.exports = UserSchema