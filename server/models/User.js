const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Upgrades = require('./Upgrades');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: [14, "Username too long."],
    minlength: [4, "Username too short."]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password is too short."],
    maxlength: [14, "Password is too long."]
  },
  // score: [{
  //   type: Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'Score',
  //   minlength: [0]
  // }],
  upgrades: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Upgrades',
  }],
});

// const upgradesSchema = new Schema({
//   upgrade: String,
//   upgradeId: String,
//   upgradeDescription: String,
//   upgradePrice: Number,
//   upgradeAcquired: Boolean,
//   upgradeIcon: String
// })

// const allUpgrades = [
//   {
//     upgrade: 'Shield',
//     upgradeId: 'shield',
//     upgradeDescription: 'XXXXXX',
//     upgradePrice: '8000',
//     upgradeAcquired: false,
//     upgradeIcon: 'shield.png'
//   },
//   {
//     upgrade: 'Health Boost',
//     upgradeId: 'healthboost',
//     upgradeDescription: 'XXXXXX',
//     upgradePrice: '10000',
//     upgradeAcquired: false,
//     upgradeIcon: 'health.png'
//   },
//   {
//     upgrade: 'Speed Boost',
//     upgradeId: 'speedboost',
//     upgradeDescription: 'XXXXXX',
//     upgradePrice: '12000',
//     upgradeAcquired: false,
//     upgradeIcon: 'speed.png'
//   },
// ];

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

const handleError = (err) => console.error(err);

module.exports = User;