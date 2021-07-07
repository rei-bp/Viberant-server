const jwt = require('jsonwebtoken')

const jwtTest = () => {
    try {
        // User login process: 

        // create the data payload
        const payload = {
            name: 'weston',
            id: 5
        }

        // signing the jwtoken
        const token = jwt.sign(payload, 'This is my secret', { expiresIn: 60 * 60 })
        console.log(token)

        // Request to server:


        // decode the incoming jwt
        const decoded = jwt.verify(token, 'This is my secret')
        console.log(decoded)

    } catch (error) {
        console.log(error)
    }
}

jwtTest()