const movieModel = require('../models/movies.js')

module.exports = {

  create: function(req, res, next) {
    movieModel.create({ name: req.body.name, released_on: req.body.released_on }, function (err, result) {
        if (err) 
         next(err)
        else
         res.json({status: "success", message: "Movie added successfully!!!", data: result})
      })
   },

  getById: (req, res, next) => {
    movieModel.findById(req.params.movieId, (err, movieInfo) => {
      // search about next function
      if (err)
      console.log('Filme não encontrado')
        // next(err)
      else
        res.json({ status:"success", message: "Filme encontrado", data: movieInfo })
    })
  },

  gettAll: (req, res, next) => {
    let moviesLIst = []

    movieModel.find({}, (err, movies) => {
      if (err) {
        next(err)
      } else {
        movies.forEach(movie => {
          moviesLIst.push({ id: movie._id, name: movie.name, released_on: movie.released_on })
        })
        res.json({ status: 'success', message: 'Lista de filmes encontradas', data: { movie: moviesLIst } })
      }
    })
  },

  updateById: (req, res, next) => {
    movieModel.findByIdAndUpdate(req.params.movieId, { name: req.body.name },
      (err, movieInfo) => {
        err ? res.json({status: "success", message: "Filme atualizado", data: null}) : next(err)
      }
    )
  },

  deleteById: function(req, res, next) {
    movieModel.findByIdAndRemove(req.params.movieId, function(err, movieInfo){
     if (err) {
       console.log('Não encontrado ' + err)
      next(err)
     }
     else {
      res.json({status:"success", message: "Movie deleted successfully!!!", data:null})
     }
    })
   }
}