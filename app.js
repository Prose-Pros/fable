const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.use(express.static('public'))
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', (req,res) => {
  res.render('index', {
    title: 'Fable'
  })
})

app.listen(port, () => {
  console.log('Listening on port:', port);
})
