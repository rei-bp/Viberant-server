// require the mongoose package
const mongoose = require('mongoose')

// connection function
const connect = () => {
    const MONGODB_URI = process.env.MONGODB_URI
    
    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })

    const db = mongoose.connection

    db.once('open', () => {
        console.log(`😘 MongoDB connection at ${db.host}:${db.port}`)
    })

    db.on('error', (err) => {
        console.log('Uh oh spaghetti-ohs 🍝')
        console.log(err)
    })
}

// export the connection function and models
module.exports = {
    connect,
    User: mongoose.model('User', require('./User.js')),
    Post: mongoose.model('Post', require('./Post.js'))
}