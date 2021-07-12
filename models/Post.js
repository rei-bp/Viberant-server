const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    post_id: Number,
    user_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    title: String,
    tags: {
        type: Array
    },
    content: String,
    max_attendees: Number,
    event_date: String
}, {
    timestamps: true
})

module.exports = PostSchema