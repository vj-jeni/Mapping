const express = require('express')
const router = express.Router()
const Movie = require('./models/movies')
const Actor = require('./models/actors')

//post a movies Data
router.post('/api/movies', async (req, res) => {
  try {
    const { movie_name, movie_type, Director, actors } = req.body;

    const movie = new Movie({
      movie_name,
      movie_type,
      Director,
      actorList: actors
    });

    await movie.save();
    res.status(201).send(movie);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Post a actors Details
router.post('/api/actors', async (req, res) => {
  try {
    const { actor_name, industry, movies } = req.body;

    const actor = new Actor({
      actor_name,
      industry,
      movieList: movies
    });

    await actor.save();
    res.status(201).send(actor);
  } catch (error) {
    res.status(400).send(error);
  }
});
//Map a movies to actors through the update option
router.put('/api/movies/:movieId/map', async (req, res) => {
    try {
      const movieId = req.params.movieId
      const { movie_name, movie_type, Director, actors } = req.body;
      const updatedMovie = await Movie.findByIdAndUpdate(movieId, {
        movie_name,
        movie_type,
        Director,
        actorsList: actors
      }, { new: true})
      
      res.status(201).send(updatedMovie);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // Map a actors to movies through the update options
  router.put('/api/actors/:actorId/map', async (req, res) => {
    try {
      const actorId = req.params.actorId
      const { actor_name, industry, movies } = req.body;
  
      const updatedActor = await Actor.findByIdAndUpdate(actorId, {
        actor_name,
        industry,
        movieList: movies
      }, { new: true})
  
      //await updatedActor.save();
      console.log(updatedActor)
      res.status(201).send({message: "Update Successfully",data: updatedActor});
    } catch (error) {
      console.log(error)
      res.status(400).send(error);
    }
  });
  
//Get all actors data
router.get('/api/actors/all', async (req, res) => {
    try {
      const actor = await Actor.find();
      res.send(actor);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  //Get all movies data
  router.get('/api/movies/all', async (req, res) => {
    try {
      const movie = await Movie.find();
      res.send(movie);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // Get all movies with associated actors
router.get('/api/movies-with-actors', async (req, res) => {
  try {
    const moviesWithActors = await Movie.find().populate('actorsList');
    res.send(moviesWithActors);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all actors with associated movies
router.get('/api/actors-with-movies', async (req, res) => {
  try {
    const actorsWithMovies = await Actor.find().populate('movieList');
    res.send(actorsWithMovies);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/abcd', async (req, res) => {
  try {
    const { actorName,movieList} = req.body;

    const actor = new Actor({
      actor_name: actorName
    });
    let movieIds = []
    
    for(let item of movieList){
      console.log({...item,actorsList:[{actorId: actor._id}]})
      const movie = new Movie({...item,actorsList:[{actorId: actor._id}]})
      console.log(item)
      const a= await movie.save()
      movieIds.push({movieId: a._id})
    }
    console.log(Ids)
    actor.movieList=movieIds
    await actor.save();
    res.status(201).send(actor);
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
});

module.exports = router