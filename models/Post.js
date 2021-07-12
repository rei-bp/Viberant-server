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
    attendees: Number,
    max_attendees: Number,
    event_date: String,
    address: String
}, {
    timestamps: true
})

module.exports = PostSchema