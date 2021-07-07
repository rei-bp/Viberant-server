// configure dotenv
require('dotenv').config()

// required for server
const express = require('express')
const cors = require('cors')
const rowdy = require('rowdy-logger')

// configure express app
const app = express()
const PORT = process.env.PORT || 3001
const rowdyResults = rowdy.begin(app)

// middlewares
app.use(cors())
// body parser middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json()) // for the request body

// routes
app.get('/', (req, res) => {
    res.json({ msg: "Hello from our backend!" })
})

// listen on port
app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`Listening on port ${PORT}`)
})