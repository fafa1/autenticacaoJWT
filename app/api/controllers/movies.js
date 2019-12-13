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
    console.log(req.params)

    movieModel.findById(req.params.movieId, (err, movieInfo) => { 
      // search about next function
      err
        ? res.send({error: {status: 404, message: "Not was possible to find for the movie"}})
        : res.json({ status:"success", message: "Filme encontrado", data: movieInfo })        
    })
  },

  getByName: (req, res, next) => {
    console.log(req.params.movieName)
    movieModel.find({ name: {$all:[req.params.movieName] }}, (err, movieInfo) => {
      err
        ? next(err)
        : res.json({ status:"success", message: "Filme encontrado", data: movieInfo })
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
    movieModel.findByIdAndDelete(req.params.movieId, function(err, movieInfo){
     if (err) {
       res.send({error: {message: "Não foi possível remover"}})
       console.log('Não encontrado ' + err)
      next(err)
     }
     else {
      res.json({status:"success", message: "Movie deleted successfully!!!", data:null})
     }
    })
   }
}