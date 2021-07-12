const router = require('express').Router()
const db = require('../../models')


router.get('/', async (req, res) => {
    try {
        console.log('test post route')
        const posts = await db.Post.find()
        res.json(posts)
        console.log(posts)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router