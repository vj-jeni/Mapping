const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  movie_name: {
    type: String,
    required: true
  },
  movie_type: {
    type: String,
    required: true
  },
  Director: {
    type: String,
    required: true
  },
  
  actorsList: [{
    actorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Actor' },
  }]
});

module.exports = mongoose.model('Movie', movieSchema);