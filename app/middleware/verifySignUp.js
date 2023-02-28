
const User = require('../models/user.model');

const checkDuplicateEmail = (req, res, next) => {
  // Username
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user.length > 0) {
      res.status(400).send({
        message: "Failed! Email is already in use!"
      });
      return;
    }
    next();
  });
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifySignUp;