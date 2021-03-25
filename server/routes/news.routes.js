const express = require('express')
const router = express.Router()
const News = require('../models/news.model')
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