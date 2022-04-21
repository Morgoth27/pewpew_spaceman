const { Schema, model } = require('mongoose');
const dateFormat = (date) => {
  return date.toLocaleString()
};

const scoreSchema = new Schema({
  // scoreId: {
  //   type: Schema.Types.ObjectId,
  //   default: () => new Types.ObjectId(),
  //   required: true,
  // },
  score: {
    type: Number,
    required: true,
    // ref: 'Score'
  },
  username: { 
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now(),
    get: dateFormat
  },
});

const Score = model('Score', scoreSchema);

const handleError = (err) => console.error(err);

module.exports = Score;