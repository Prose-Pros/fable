const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 3000;
const queries = require('./db/queries')
const prompts = require('./prompts')

app.set('view engine', 'hbs');
app.use(express.static('public'))
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(express.static('public'))


app.get('/', (req,res) => {
  queries.getGenres()
  .then(dataGenres => {
    res.render('index', {
      title: 'Fable',
      dataGenres: dataGenres
    })
  })
})

app.get('/login.hbs', (req,res) => {
  res.render('login', {
    title: 'Create an Account or Log in'
  })
})

app.get('/write.hbs', (req,res) => {
  res.render('write', {
    title: 'Write a Story',
    prompts: prompts
  })
})

app.get('/profile.hbs', (req,res) => {
  res.render('profile', {
    title: 'Profile'
  })
})





app.listen(port, () => {
  console.log('Listening on port:', port);
})
