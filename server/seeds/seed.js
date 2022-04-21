const db = require('../config/connection');
const { User, Upgrades, Score, Leaderboard } = require('../models');
const userSeeds = require('./userSeeds.json');
const upgradeSeeds = require('./upgradeSeed.js')
const scoresData = require('./scoresSeed.js')

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Upgrades.deleteMany({});
    await Score.deleteMany({});

    await User.create(userSeeds);
    await Upgrades.create(upgradeSeeds);
    console.log(scoresData)
    await Score.create(scoresData)

    // for (let i = 0; i < upgradeSeeds.length; i++) {
      // const { _id } = await Upgrades.create(upgradeSeeds[i]);
      // const user = await User.findOneAndUpdate(
      //   { username: upgradeUser },
      //   {
      //     $addToSet: {
      //       upgrades: _id,
      //     },
      //   }
      // );
    // }

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Users and Upgrades seeded!');
  process.exit(0);
});