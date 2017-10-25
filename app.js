const express = require('express');
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 3000;
const queries = require('./db/queries')
const routes = require('./routes/createLogin')
const prompts = require('./prompts')

let currentUser = "";


app.set('view engine', 'hbs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))


app.get('/', (req,res) => {
  queries.getGenres()
  .then(dataGenres => {
    // console.log(currentUser.loggedIn);
    if (currentUser.loggedIn === false) {
      res.render('index', {
        title: 'Fable',
        dataGenres: dataGenres,
        // loggedIn: loggedIn,
      })
    } else {
      res.render('index', {
        title: 'Fable',
        dataGenres: dataGenres,
        // loggedIn: loggedIn,
        currentUser: currentUser,
      })
    }
  })
})

app.post('/:login', (req,res) => {
  queries.createAccount(req.body)
  .then(function(code){
    res.render('login', {
      code: code
    })
  })
  .catch(function(err){
    res.status(500).send(err)
  })
})

app.post('/login/user', (req,res)=>{
  console.log(req.body);
  const username = req.body.username;
  const code = req.body.code;
  queries.login(username)
  .then(userInfo => {
    if(userInfo[0].code == code) {
      // userInfo[0].loggedIn = true;
      // console.log(userInfo[0].loggedIn);
      currentUser = userInfo[0]
      res.redirect('/')
    } else {
      res.sendStatus(401);
    }
  })
  .catch(err => {
    res.sendStatus(500)
  })
})

app.get('/login', (req,res)=>{
  res.render('login')
})

app.get('/:genre', (req,res)=> {
  const genre = req.params.genre
  queries.getStories(genre)
  .then(stories => {
    for (var i = 0; i < stories.length; i++) {
      const author = stories[i].user_id;
      queries.getAuthor(author)
      .then(writers => {
        res.render('genre', {
          genre: genre,
          writers: writers
        })
      })
    }
  })
})

app.put('/logout', (req,res) => {
  queries.login(currentUser.username)
  .then(user => {
    user.loggedIn = false

    res.redirect('/')
  })
})

app.listen(port, () => {
  console.log('Listening on port:', port);
})
