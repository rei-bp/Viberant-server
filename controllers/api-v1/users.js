const router = require('express').Router()
const db = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// GET /users -- test api endpoint
router.get('/', (req, res) => {
    res.json({ msg: 'router is working' })
})

// POST /users/register -- CREATE a new user (aka registration)
router.post('/register', async (req, res) => {
    try {
        // check if the user exists already
        const findUser = await db.User.findOne({
            email: req.body.email
        })

        // if the user is found -- don't let them register
        if(findUser) return res.status(400).json({ msg: 'user already exists in the db' })
        console.log(findUser)

        // hash password from req.body
        const password = req.body.password
        const salt = 12
        const hashedPassword = await bcrypt.hash(password, salt)

        // create our new user
        const newUser = db.User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

        await newUser.save()

        // create the jwt payload
        const payload = {
            name: newUser.name,
            email: newUser.email,
            id: newUser.id
        }

        // sign the jwt and send a response
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 })

        res.json({ token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'internal server error' })
    }
})

// POST /users/login -- validate login credentials
router.post('/login', async (req, res) => {
    try {
        // try to find the user in the database from the req.body.email
        const findUser = await db.User.findOne({
            email: req.body.email
        })

        const validationFailedMessage = 'Incorrect username or password'

        // if the user found -- return immediately
        if(!findUser) return res.status(400).json({ msg: validationFailedMessage })

        // check the user's password from the DB against what is in the req.body
        const matchPassword = await bcrypt.compare(req.body.password, findUser.password)

        // if the password doesn't match -- return immediately
        if(!matchPassword) return res.status(400).json({ msg: validationFailedMessage })

        // create the jwt payload
        const payload = {
            name: findUser.name,
            email: findUser.email,
            id: findUser.id
        }

        // sign the jwt and send it back
        const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 })

        res.json({ token })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'internal server error' })
    }
})

// GET /auth-locked -- will redirect if a bad jwt is found

module.exports = router