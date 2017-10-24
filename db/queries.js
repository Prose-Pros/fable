const db = require('./connections')

function getGenres() {
  return db('genres').select()
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





module.exports = {
  getGenres: getGenres,
  createAccount: createAccount,
  createCode: createCode
}
