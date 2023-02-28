const DB = require('../utils/db').DB

const list = (params = {}) => {
  return DB('user')
    .where(params)
    .select('id', 'firstName', 'lastName', 'createdAt', 'updatedAt', 'email')
}

const findOne = (params = {}) => {
  return DB.select('id', 'firstName', 'lastName', 'createdAt', 'updatedAt', 'email', 'password')
    .from('users')
    .where(params)
}

const create = (params = {}) => {
  return DB('users')
    .insert(params)
}

module.exports = {
  list, findOne, create
}