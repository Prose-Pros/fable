const db = require('./connections')

function getGenres() {
  return db('genres').select()
}

function getStories(genre) {
  return db('genres').select().where('genre', genre).innerJoin('stories', 'genres.id', 'genre_id')
}

function getAuthor(authors) {
  return db('stories').select().where('user_id', authors).innerJoin('users', 'users.id', 'user_id')
}

module.exports = {
  getGenres: getGenres,
  getStories: getStories,
  getAuthor: getAuthor

}
