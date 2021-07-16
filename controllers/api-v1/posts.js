const router = require('express').Router()
const db = require('../../models')
const jwt = require('jsonwebtoken')
const authLockedRoute = require('./authLockedRoute.js')



router.get('/', async (req, res) => {
    try {
        const posts = await db.Post.find()
        res.json(posts)
    } catch (err) {
        console.log(`failed to find all`, err)
        res.status(500).json({ msg: 'Internal Server Error, failed to find posts' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const post = await db.Post.findById(req.params.id).populate('user_id')
        res.json(post)
        console.log(post)
    } catch (err) {
        console.log(`failed to find one`, err)
        res.status(500).json({ msg: 'Internal Server Error, failed to find one' })
    }
})

router.post('/new', authLockedRoute, async (req, res) => {
    try {
        const newPost = new db.Post({
            user_id: req.body.user_id,
            title: req.body.title,
            tags: req.body.tags,
            content: req.body.content,
            max_attendees: req.body.max_attendees,
            attendees: req.body.attendees,
            event_date: req.body.event_date,
            event_time: req.body.event_time,
            address: req.body.address,
            img_url: req.body.img_url
        })
        await newPost.save()
        console.log('new post:', newPost)
        res.json(newPost)
    } catch (err) {
        console.log(`failed to create new post`, err)
        res.status(500).json({ msg: 'Internal Server Error, failed to create a new post' })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const posts = await db.Post.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, useFindAndModify: false }
            )
        res.json(posts)
    } catch (err) {
        console.log(`failed to update`, err)
        res.status(500).json({ msg: 'Internal Server Error, failed to update post' })
    }
})

router.post('/join/:id', authLockedRoute, async (req, res) => {
    try {
        const join = await db.Post.findById(req.params.id).populate('user_id')
        join.attendees.push(res.locals.user.name)
        join.save()
        res.json({ msg: `User ${res.locals.user.name} has joined ${join.title} event`})
    } catch (err) {
        console.log(`failed to join`, err)
        res.status(500).json({ msg: 'Internal Server Error, failed to join post'})
    }
})

// router.delete('/join/:id', async (req, res) => {
//     try {
//         const unjoin = await db.Post.findByIdAndUpdate(req.params.id).populate('user_id')
//         unjoin.$pull

//         join.save()
//         console.log(posts)
//     } catch (err) {
//         console.log(`failed to join`, err)
//         res.status(500).json({ msg: "Internal Server Error, failed to join post"})
//     }
// })



router.delete('/:id', authLockedRoute, async (req, res) => {
    try {
        const post = await db.Post.findByIdAndDelete(req.params.id)
    } catch (err) {
        console.log(`failed to delete`, err)
        res.status(500).json({msg: 'Internal Server Error, failed to delete post'})
    }
})


module.exports = router
