const { Schema, model } = require('mongoose');

const upgradesSchema = new Schema({
    upgradeName: String,
    upgradeId: String,
    upgradeDescription: String,
    upgradePrice: Number,
    upgradeAcquired: Boolean,
    upgradeIcon: String
  });
  
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
const Upgrades = model('Upgrades', upgradesSchema);

const handleError = (err) => console.error(err);

module.exports = Upgrades;