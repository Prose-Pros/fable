const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 3000;
const queries = require('./db/queries')
const routes = require('./routes/createLogin')

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
      res.render('index', {
        title: 'Fable',
        dataGenres: dataGenres,
        loggedIn: loggedIn,
        currentUser: currentUser
      })
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

app.get('/story/:title', (req,res) => {
  const storyId = req.params.title;
  queries.getStoryById(storyId)
  .then(theStory => {
    const title = theStory[0]['title']
    queries.getComment(title)
    .then(commentData => {
      queries.getStoryByTitle(storyId)
      .then(storyData=>{
        // res.send(storyData)
        res.render('story', {
          title: theStory[0].title,
          theStory: theStory[0],
          currentUser: currentUser,
          commentData: commentData,
          storyData: storyData[0]

        })

      })
      // res.send(commentData)
    })
  })
})

app.post('/write/createStory', (req,res) => {
  queries.newStory(req.body)
  .then(function(story){
    res.redirect('/story/' + story[0].title)
    })
})



app.get('/genre/:genre', (req,res)=> {
  const genre = req.params.genre
  queries.getStories(genre)
      .then(writers => {
        res.render('genre', {
          genre: genre,
          writers: writers,
          currentUser: currentUser
        })
      })
})

app.get('/:logout', (req, res) => {
  loggedIn = false
  queries.getGenres()
    .then(dataGenres => {
      res.render('index', {
        title: 'Fable',
        dataGenres: dataGenres,
        loggedIn: loggedIn
      })
    })
})

app.get('/userProfile/:userId', (req,res) => {
  const userId = req.params.userId
  queries.getUserInfo(userId)
  .then(userData => {
    // res.send(userData)
    res.render('profile', {
      userData: userData,
      currentUser: currentUser
    })
  })
})

app.post('/story/:title/comment', (req,res) => {
  const title = req.params.title;
  const theComment = req.body;
  // res.send(theComment)
  queries.postComment(theComment).then(commentData=>{
    res.redirect('/')

  })
})

app.listen(port, () => {
  console.log('Listening on port:', port);
})
