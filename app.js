const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 3000;
const queries = require('./db/queries')
const routes = require('./routes/createlogin')
const prompts = require('./prompts')


app.set('view engine', 'hbs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.get('/', (req,res) => {
  queries.getGenres()
  .then(dataGenres => {
    res.render('index', {
      title: 'Fable',
      dataGenres: dataGenres
    })
  })
})

app.post('/:login', (req,res) => {
  queries.createAccount(req.body)
  .then(function(user){
    res.render('login', {
      test: user
    })
  })
  .catch(function(err){
    res.status(500).send(err)
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

app.listen(port, () => {
  console.log('Listening on port:', port);
})
