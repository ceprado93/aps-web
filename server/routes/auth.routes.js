const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const Comment = require('../models/comment.model')
const { checkRole } = require('./../middlewares')

router.post('/signup', (req, res) => {
	const { username, password } = req.body

	if (!username || !password) {
		res.status(400).json({ message: 'Complete all the fields' })
		return
	}

	if (password.length < 5) {
		res.status(400).json({ message: 'Weak password' })
		return
	}

	User.findOne({ username }).then(foundUser => {
		if (foundUser) {
			res.status(400).json({ message: 'Username is already registered' })
			return
		}

		const salt = bcrypt.genSaltSync(10),
			hashPass = bcrypt.hashSync(password, salt)

		User.create({ username, password: hashPass })
			.then(newUser => req.login(newUser, err => (err ? res.status(500).json({ message: 'Login error' }) : res.json(newUser))))
			.catch(() => res.status(500).json({ message: 'Error saving user to DB' }))
	})
})

router.post('/login', (req, res, next) => {
	const { username, password } = req.body

	User.findOne({ username })
		.then(user => {
			if (!user) {
				res.status(405).json({ message: 'Wrong username' })
			}
			if (!bcrypt.compareSync(password, user.password)) {
				res.status(405).json({ message: 'Wrong password' })
			}
			req.session.user = user
			res.json(user)
		})
		.catch(err => res.status(500).json(err))
})

router.post('/logout', (req, res) => {
	req.session.destroy()
	res.json({ message: 'Log out success!' })
})

router.get('/loggedin', (req, res) => (req.session.user ? res.json(req.session.user) : res.status(403).json({ message: 'Unauthorized' })))

router.get('/admin-profile', checkRole('admin'), (req, res) => {
	const promise2 = Comment.find({ isAccepted: false })

	Promise.all([promise2])
		.then(response => {
			res.json(response)
		})
		.catch(() => res.status(403).json({ message: 'Unauthorized' }))
})

router.put('/favourite/:waveid', (req, res) => {
	User.findByIdAndUpdate(req.session.user._id, { $push: { favourites: req.params.waveid } })
		.then(response => res.json(response))
		.catch(err => {
			console.log(err)
			res.status(500).json({ code: 500, message: 'Error fetching user', err })
		})
})
router.put('/unfavourite/:waveid', (req, res) => {
	User.findByIdAndUpdate(req.session.user._id, { $pull: { favourites: req.params.waveid } })
		.then(response => res.json(response))
		.catch(err => {
			console.log(err)
			res.status(500).json({ code: 500, message: 'Error fetching user', err })
		})
})

router.get('/favourite/:userId', (req, res) => {
	User.findById(req.params.userId)
		.select('favourites')
		.populate('favourites')
		.then(response => res.json(response))
		.catch(err => {
			console.log(err)
			res.status(500).json({ code: 500, message: 'Error fetching Wave', err })
		})
})

module.exports = router
