const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 3000;
const queries = require('./db/queries')

app.set('view engine', 'hbs');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
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

app.listen(port, () => {
  console.log('Listening on port:', port);
})
