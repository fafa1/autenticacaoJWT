const mongoose = require('mongoose')
const bcrypt  = require('bcrypt')
const saltRounds = 8

const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,  
    required: true,
   },
   email: {
    type: String,
    trim: true,
    required: true
   },
   password: {
    type: String,
    trim: true,
    required: true
   }
})

UserSchema.pre('save', async next => {
    await bcrypt.hash('testeSenha', saltRounds, (err, hash) => {
      if(err) console.log(err)
       this.password = hash
       console.log(this.password)
    })
})

module.exports = mongoose.model('User', UserSchema)