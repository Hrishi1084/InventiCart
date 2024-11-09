const express = require('express')
const { loginUser, signupUser } = require('../controllers/userController')
const router = express.Router()

router.post('https://inventi-cart.vercel.app//login', loginUser)
router.post('https://inventi-cart.vercel.app//signup', signupUser)

module.exports = router
