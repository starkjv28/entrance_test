require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require('../models/user.model')
const Token = require('../models/token.model')

exports.signup = async (req, res) => {
  // Save User to Database
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 8),
    createdAt: new Date(),
    updatedAt: new Date(),
  })
    .then(user => {
      User.findOne({
        id: user[0]
      })
        .then(result => {
          delete result[0]['password']
          delete result[0]['updatedAt']
          delete result[0]['createdAt']
          let newData = {
            ...result[0],
            displayName: result[0]["firstName"] + " " + result[0]["lastName"]
          }
          res.status(200).send({ ...newData })
        })
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      let passwordIsValid = await bcrypt.compare(
        req.body.password,
        user[0].password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      // eslint-disable-next-line no-undef
      let token = jwt.sign({ id: user[0].id }, process.env.SECRET_KEY, {
        expiresIn: 86400 // 1d
      });

      // eslint-disable-next-line no-undef
      let refreshToken = jwt.sign({ id: user[0].id }, process.env.SECRET_KEY, {
        expiresIn: 86400 * 30 // 30d
      });

      let paramsToken = {
        userId: user[0].id,
        refreshToken,
        expriresIn: 86400 * 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      Token.insertOrUpdate([paramsToken])
      let newUser = {
        ...user[0],
        displayName: user[0]["firstName"] + " " + user[0]["lastName"]
      }

      delete newUser['id']
      delete newUser['password']
      delete newUser['updatedAt']
      delete newUser['createdAt']

      res.status(200).send({
        user: newUser,
        accessToken: token,
        refreshToken
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signout = (req, res) => {
  let params = ({ userId: parseInt(req.query.userId) })
  console.log(params, 'params')
  Token.deleteRow(params).then(result => {
    console.log(result)
  })
  res.status(204).send()
}