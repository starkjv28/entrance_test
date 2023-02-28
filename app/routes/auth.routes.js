const express = require('express')
const { check } = require('express-validator')
const { signup, signin, signout } = require("../controllers/auth.controller")
const { verifySignUp } = require('../middleware')

const router = express.Router()

router.post('/signup', [
  check("firstName", "Fistname atleast should be 2 characters").isLength({min: 2}), // firstname && lastname chua it nhat 2 ky tu
  check("lastName", "Lastname atleast should be 2 characters").isLength({min: 2}),
  check("email", "Email should be valid").isEmail(), // kiem tra dinh dang email
  check("password", "Password at least should be 8 characters").isLength({min: 8}), // mat khau chua it nhat 8 ky tu
  verifySignUp.checkDuplicateEmail
], signup)

router.post('/signin', [

], signin)

router.get('/signout', [

], signout)

module.exports = router