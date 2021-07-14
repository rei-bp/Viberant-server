const router = require('express').Router()
const db = require('../../models')
const jwt = require('jsonwebtoken')


router.get('/', async (req, res) => {
    try {
        console.log('test post route')
        const posts = await db.Post.find()
        res.json(posts)
        console.log(posts)
    } catch (err) {
        console.log(`failed to find all`, err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const post = await db.Post.findById(req.params.id)
        res.json(post)
        console.log(post)
    } catch (err) {
        console.log(`failed to find one`, err)
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
        console.log(`failed to create new post`, err)
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        const posts = await db.Post.findById(req.params.id)
        posts.title = req.body.title,
        posts.tags = req.body.tags,
        posts.content = req.body.content,
        posts.max_attendees = req.body.max_attendees,
        posts.event_date = req.body.event_date,
        posts.address = req.body.address,
        posts.img_url = req.body.img_url

        posts.save()
    } catch (err) {
        console.log(`failed to update`, err)
    }
})




module.exports = router