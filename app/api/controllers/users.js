const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  create: (req, res, next) => {
    userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }, (err, resul) => {
      if (err)
        next(err)
      else
        res.json({ status: "success" })
    })
  },

  hello: (req, res, next) => {
    res.json({ "name": "Fagner Bezerra Batista" })
  },

  authenticate: (req, res, next) => {
    userModel.findOne({ email: req.body.email }, (err, userInfo) => {
      if (err) {
        next(err)
      } else {
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign({ id: userInfo._id },
            req.app.get('secretKey'), { exipiresIn: '1h' })

          res.json({ status: "success" })
        } else {
          res.json({ status: "Error, invalid email!" })
        }
      }
    })
  }
}