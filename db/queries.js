const db = require('./connections')

function getGenres() {
  return db('genres').select()
}
function getStories(genre) {
  return db('genres').select().where('genre', genre).innerJoin('stories', 'genres.id', 'genre_id').innerJoin('users', 'users.id', 'user_id')
}

function getStoryById(id) {
  return db('stories').select().where('title', id).innerJoin('users', 'users.id', 'user_id')
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


function newStory(story) {
  return db('stories').insert(story).returning('*')
}


function getUserInfo(id) {
  return db('users').select().where('users.id', id).innerJoin('stories', 'user_id', 'users.id').innerJoin('genres', "genres.id", 'genre_id')
}

function getComment(title) {
  return db('stories').select().where('title', title).innerJoin('comments', 'stories.id', 'story_id')

}


module.exports = {
  login: login,
  getStories: getStories,
  getGenres: getGenres,
  createAccount: createAccount,
  createCode: createCode,
  newStory: newStory,
  getStoryById: getStoryById,
  getUserInfo: getUserInfo,
  getComment: getComment
}
