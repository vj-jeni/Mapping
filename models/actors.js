const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
  actor_name: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  movieList: [{
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}
  }]
});

module.exports = mongoose.model('Actor', actorSchema);