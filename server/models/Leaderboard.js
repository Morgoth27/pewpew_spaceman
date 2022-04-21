const { Schema, model } = require('mongoose');
const dateFormat = (date) => {
  return date.toLocaleString()
};

const leaderboardSchema = new Schema({
//   scoreId: {
//     type: Schema.Types.ObjectId,
//     default: () => new Types.ObjectId(),
//     required: true,
//   },
  scores: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Score'
  }],
  // usernames:  [{ 
  //   type: String, 
  //   required: true 
  // }],
  // dateUpdated: {
  //   type: Date,
  //   default: Date.now(),
  //   get: dateFormat
  // },
});

const Leaderboard = model('Leaderboard', leaderboardSchema);

const handleError = (err) => console.error(err);

module.exports = Leaderboard;