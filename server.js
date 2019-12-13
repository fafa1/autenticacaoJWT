const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const users = require('./routes/users')
const movies = require('./routes/movies')
const mongoose = require('./config/database')
const jwt = require('jsonwebtoken')

const app = express()

app.set('secretKey', 'nodeRestApi')

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: false}))

app.use('/users', users)
app.use('/movies', validateUser, movies)

function validateUser (req, res, next) {
  // console.log(req)
  jwt.verify(req.headers['x-acess-token'], req.app.get('secretKey'), (err, decoded) => {
    if (err) {
      res.json({ status:"error", message: err.message, data: null })
    } else {
      req.body.userId = decoded.id
      next()
    }
  })
}


app.listen(3000, () => {
  console.log('executando na porta 3000')
})
