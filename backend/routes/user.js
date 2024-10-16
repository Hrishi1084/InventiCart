const express = require('express')
const { loginUser, signupUser } = require('../controllers/userController')
const router = express.Router()

router.post('inventi-cart.vercel.app/login', loginUser)
router.post('inventi-cart.vercel.app/signup', signupUser)

module.exports = router
