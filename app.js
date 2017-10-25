const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 3000;
const queries = require('./db/queries')
const routes = require('./routes/createLogin')
const prompts = require('./prompts')
const methodOverride = require('method-override')

let loggedIn = false;
let currentUser = "";

app.set('view engine', 'hbs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))



app.get('/', (req,res) => {
  queries.getGenres()
  .then(dataGenres => {
    if(loggedIn === false){
      res.render('index', {
        title: 'Fable',
        dataGenres: dataGenres,
        currentUser: currentUser
      })
    } else {
      res.render('index', {
        title: 'Fable',
        dataGenres: dataGenres,
        loggedIn: loggedIn,
        currentUser: currentUser
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
  const username = req.body.username;
  const code = req.body.code;
  queries.login(username)
  .then(userInfo => {
    if(userInfo[0].code == code) {
      loggedIn = true;
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

app.get('/write', (req,res) => {
  queries.getGenres()
  .then(dataGenres => {
    res.render('write', {
      dataGenres: dataGenres,
      currentUser: currentUser
    })

  })
})

app.get('/story/:id', (req,res) => {
  const storyId = req.params.id;
  queries.getStoryById(storyId)
  .then(theStory => {
    // res.send(theStory)
    res.render('story', {
      title: theStory[0].title,
      theStory: theStory[0]
    })

  })
})

app.post('/write/createStory', (req,res) => {
  queries.newStory(req.body)
  .then(function(story){
    res.redirect('/story/' + story[0].id)
    })
  })



app.get('/genre/:genre', (req,res)=> {
  const genre = req.params.genre
  queries.getStories(genre)
      .then(writers => {
        res.render('genre', {
          genre: genre,
          writers: writers
        })
      })
    })

app.listen(port, () => {
  console.log('Listening on port:', port);
})
