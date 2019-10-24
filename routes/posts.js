const express = require('express')
const router = express.Router()
const Post = require('../models/posts')

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (e) {
        res.json({messagge: e})
    }
})

router.get('/specific', (req, res) => {
    res.send('We are on specyfic posts')
})

router.get('/user', (req, res) => {
    res.send('We are on user posts')
})

router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        res.json(post)
    } catch (e) {
        res.json({message: e})
    }

})

router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })

    try {
        const savePost = await post.save()
        res.json(savePost)
    } catch (e) {
        res.json({message: e})
    }

    // First version
    // post.save()
    //     .then(data => {
    //         res.json(data)
    //     })
    //     .catch(err => {
    //         res.json({message: err})
    //     })
})

router.patch('/:postId', async (req, res) => {
    try {
        const updatePost = await Post.updateOne({
            _id: req.params.postId
        }, {
            $set: {
                title: req.body.title
            }
        })

       res.json(updatePost)
    } catch (e) {
        res.json({message: e})
    }
})

router.delete('/:postId', async (req, res) => {
    try {
        const post = await Post.remove({_id: req.params.postId})
        res.json(post)
    } catch (e) {
        res.json({message: e})
    }

})

module.exports = router
