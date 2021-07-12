require('dotenv').config()
const db = require('./models')

db.connect()

const dbTest = async () => {
    try {
        const foundUser = await db.User.findOne({ name: 'Rei' })
        const foundPost = await db.Post.findOne({ title: 'Pool Party' })

        foundUser.created_post.push(foundPost._id)
        foundPost.user_id.push(foundUser._id)
        foundUser.save()
        foundPost.save()
        console.log(foundUser)
        console.log(foundPost)
    } catch (err) {
        console.log(err)
    }
}

dbTest()