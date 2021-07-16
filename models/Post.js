const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    tags: {
        type: Array
    },
    content: String,
    attendees: {
        type: Array
    },
    max_attendees: Number,
    event_date: String,
    event_time: String,
    address: String,
    img_url: String
}, {
    timestamps: true
})

module.exports = PostSchema