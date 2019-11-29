const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')

const users = require('./routes/users')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/users', users)

app.listen(3000, () => {
  console.log('Execuntando na porta 3000')
})