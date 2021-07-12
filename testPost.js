require('dotenv').config()
const db = require('./models')

db.connect() 

// const dbTest = async () => {
//     try {
//         const newPost = new db.Post({
//             user_id: "60eca7abf296f90b28265de6",
//             title: 'Pool Party',
//             tags: ['outdoors', 'exercise', 'party'],
//             content: "Cool down during this hot summer at Rei's and friends' pool party!",
//             max_attendees: 10,
//             event_date: "07-17-2021"
//         })

//         await newPost.save()
//         console.log('new Post:', newPost)
    
//     } catch (error) {
//         console.log(error)
//     }
// }
const dbTest = async () => {
    try {
        const posts = await db.Post.find()

        console.log(posts)
    } catch (err) {
        console.log(err)
    }}

    

dbTest()