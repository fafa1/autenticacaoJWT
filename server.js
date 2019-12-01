const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const users = require('./routes/users')
const movies = require('./routes/movies')
const mongoose = require('./config/database')

const app = express()

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: false}))

app.use('/users', users)
app.use('/movies', movies)

app.listen(3000, () => {
  console.log('executando na porta 3000')
})
