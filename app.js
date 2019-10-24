const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')
const app = express()

app.use(bodyParser.json())

//middlewares
app.use('/posts', (req,res,next) => {
    console.log('This is a middleware running')
    next()
})

//Route
app.get('/', (req, res) => {
    res.send('We arte on home')
})

const postsRoute = require('./routes/posts')

app.use('/posts', postsRoute)

// connect to db
mongoose.connect(
    process.env.DB_CONNECTION,
    { useUnifiedTopology: true, useNewUrlParser: true } ,  () => {
    console.log('Connected...')
})

// istener
app.listen(3000)

