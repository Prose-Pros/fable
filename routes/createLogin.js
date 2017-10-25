const express = require('express')
const router = express.Router()
const queries = require('../db/queries')


router.post('/:login', (req,res) => {
  queries.createAccount(req.body)
  .then(function(user){
    res.json(user)
  })
})

// router.post('/write/createStory', (req, res) => {
//   queries.newStory(req.body)
//   .then(story => {
//     res.send(story)
//   }).catch(err => {
//     res.sendStatus(500)
//   })
// })



module.exports = router
