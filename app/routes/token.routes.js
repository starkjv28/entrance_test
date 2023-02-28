const express = require('express')
const { refreshtoken } = require('../controllers/token.controller')

const router = express.Router()

router.post('/refreshtoken', [

], refreshtoken)

module.exports = router