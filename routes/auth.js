const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController.js')

router.post('/registrar', authController.registrar)
router.post('/login', authController.login)

module.exports = router