const mongoose = require('mongoose')
const bcrypt  = require('bcrypt')

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

UserSchema.pre('save', async function (next) {
  // Hash the password before saving the user model
  if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})



module.exports = mongoose.model('User', UserSchema)