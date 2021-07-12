require('dotenv').config()
const db = require('./models')

db.connect()

const dbTest = async () => {
    try {
    const newUser = new db.User({
        name: 'Rei',
        password: 'test',
        email: 'rei@ga.com'
    })

    await newUser.save()
    console.log('new user:', newUser)

    const foundUser = await db.User.findOne({
        name: 'Rei'
    })

    console.log('found user:', foundUser)
    } catch (error) {
        console.log(error)
    }
}

dbTest()