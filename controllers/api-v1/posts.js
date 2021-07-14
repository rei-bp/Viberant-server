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

router.get('/:id', async (req, res) => {
    try {
        const post = await db.Post.findOne({
            _id: req.params.id
        })
        res.json(post)
        console.log(post)
    } catch (err) {
        console.log(err)
    }
})

router.post('/new', async (req, res) => {
    try {
        const newPost = new db.Post({
            user_id: req.body.user_id,
            title: req.body.title,
            tags: req.body.tags,
            content: req.body.content,
            max_attendees: req.body.max_attendees,
            attendees: req.body.attendees,
            max_attendees: req.body.max_attendees,
            event_date: req.body.event_date,
            address: req.body.address,
            img_url: req.body.img_url
        })
        await newPost.save()
        console.log('new post:', newPost)
        res.json(newPost)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router
