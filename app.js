const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 3000;
const queries = require('./db/queries')
const routes = require('./routes/createLogin')
const prompts = require('./prompts')


app.set('view engine', 'hbs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
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




app.listen(port, () => {
  console.log('Listening on port:', port);
})
