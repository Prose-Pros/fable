const db = require('./connections')

function getGenres() {
  return db('genres').select()
}

module.exports = {
  getGenres: getGenres
}
