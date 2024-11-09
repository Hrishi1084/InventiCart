const express = require('express')
const { loginUser, signupUser } = require('../controllers/userController')
const router = express.Router()

router.post('https://inventicart.onrender.com/login', loginUser)
router.post('https://inventicart.onrender.com/signup', signupUser)

module.exports = router
