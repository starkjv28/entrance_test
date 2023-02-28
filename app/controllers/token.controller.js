/* eslint-disable no-unused-vars */
const Token = require('../models/token.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generalAcessToken = (data) => {
  // eslint-disable-next-line no-undef
  const access_token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1h' })
  return access_token
}

const generalRefreshToken = (data) => {
  // eslint-disable-next-line no-undef
  const access_token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '365d' })
  return access_token
}

const refreshTokenService = (token) => {
  return new Promise((resolve, reject) => {
    try {
      // eslint-disable-next-line no-undef
      jwt.verify(token, process.env.SECRET_KEY, function (err, user) {
        if (err) {
          resolve(404).json({
            message: 'The user is not authemtication'
          })
        }
        if (user) {
          const newAcessToken = generalAcessToken({ _id: user._id })
          resolve({
            status: 'OK',
            access_token: newAcessToken
          })
        } else {
          resolve({
            message: 'The user is not authemtication'
          })
        }
      });
    } catch (error) {
      reject(error)
    }
  })
}

exports.refreshtoken = async (req, res) => {
  // try {
  //   const accessToken = req.headers.token.split(' ')[1]
  //   if (accessToken) {
  //     const response = await refreshTokenService(accessToken)
  //     return res.json({ "accessToken": response })
  //   } else {
  //     return res.status(400).send({
  //       message: 'The refreshTolken is not valid'
  //     })
  //   }
  // } catch (err) {
  //   return res.send({
  //     status: 'err',
  //     message: err
  //   })
  // }

  res.status(200).send({ "accessToken": "success" })
}