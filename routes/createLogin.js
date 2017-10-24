const express = require('express')
const router = express.Router()
const queries = require('../db/queries')


router.post('/', (req,res) => {
  queries.createAccount(req.body)
  .then(function(user){
    res.json(user)
  })
})




module.exports = router
