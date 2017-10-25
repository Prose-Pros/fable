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


function createAccount(user){
  const code = createCode()
  user.code = code
  return db('users').insert(user).return(code)
}

function createCode(){
  var code = ''
  var char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for(var i=0; i < 7; i++){
    code += char.charAt(Math.floor(Math.random() * char.length))
  }
  return code
}

function login(username) {
  return db('users').select().where('username', username)
}

function logout(loggedIn) {
  return db('users').select().where('loggedIn', loggedIn).update({
    loggedIn: false
  })
}


module.exports = {
  login: login,
  getAuthor: getAuthor,
  getStories: getStories,
  getGenres: getGenres,
  createAccount: createAccount,
  createCode: createCode
}
