const DB = require('../utils/db').DB

const findOne = (params = {}) => {
  return DB.select('id', 'userId', 'refreshToken', 'expriresIn', 'createdAt', 'updatedAt')
    .from('tokens')
    .where(params)
}

const create = (params = {}) => {
  return DB('tokens')
    .insert(params)
}

const insertOrUpdate = (rows) => {
  let tableName = 'tokens'

  return DB.transaction((trx) => {

    const queries = rows.map((tuple) => {

      const insert = trx(tableName).insert(tuple).toString()
      const update = trx(tableName).update(tuple).toString().replace(/^update(.*?)set\s/gi, '')

      return trx.raw(`${insert} ON DUPLICATE KEY UPDATE ${update}`).transacting(trx)
    })

    return Promise.all(queries).then(trx.commit).catch(trx.rollback)
  })
}

const deleteRow = (params = {}) => {
  return DB('tokens').where(params).del()

}

module.exports = {
  findOne, create, insertOrUpdate, deleteRow
}