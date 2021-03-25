const express = require('express')
const router = express.Router()
const Video = require('../models/video.model')
const User = require('../models/user.model')
const { checkLoggedIn } = require('../middlewares')

router.get('/', (req, res) => {
    Video.find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching Video', err }))
})

router.get('/latest', (req, res) => {
    Video.find()
        .sort('-createdAt')
        .limit(4)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching Video', err }))
})

router.post('/new', (req, res) => {
    const { description, title, videoURL } = req.body,
        author = req.session.user.id
    console.log(req.body)

    Video.create({ description, title, videoURL, author })
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error saving Video', err }))
})

router.put('/edit/:video_id', checkLoggedIn, (req, res) => {
    Video.findByIdAndUpdate(req.params.video_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error editing Video', err }))
})

router.delete('/delete/:video_id', checkLoggedIn, (req, res) => {
    Video.findByIdAndRemove(req.params.video_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error saving Video', err }))
})

module.exports = router
