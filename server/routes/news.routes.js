const express = require('express')
const router = express.Router()
const News = require('../models/news.model')
const Video = require('../models/video.model')
const User = require('../models/user.model')
const { checkLoggedIn } = require('./../middlewares')

router.get('/', (req, res) => {
    News.find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching News', err }))
})

router.get('/latest', (req, res) => {
    News.find()
        .sort('-createdAt')
        .limit(4)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching News', err }))
})

router.get('/allLatest', (req, res) => {
    const promise1 = News.find().sort('-createdAt').limit(6)
    const promise2 = Video.find().sort('-createdAt').limit(6)
    let arr


    Promise.all([promise1, promise2])
        .then(response => {
            arr = response.flat().sort().slice(0, 6)
            console.log(arr)
            res.json(arr)
        })
        .catch(() => res.status(403).json({ message: 'Unauthorized' }))
})

router.get('/details/:news_id', (req, res) => {
    News.findById(req.params.news_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching Wave', err }))
})

router.post('/new', (req, res) => {
    const { description, title, image } = req.body,
        author = req.session.user.id

    News.create({ description, title, image, author })
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error saving News', err }))
})

router.put('/edit/:news_id', checkLoggedIn, (req, res) => {
    News.findByIdAndUpdate(req.params.news_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error editing News', err }))
})

router.delete('/delete/:news_id', checkLoggedIn, (req, res) => {
    News.findByIdAndRemove(req.params.news_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error saving News', err }))
})

module.exports = router