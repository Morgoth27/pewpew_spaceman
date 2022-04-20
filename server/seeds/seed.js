const db = require('../config/connection');
const { User, Upgrades } = require('../models');
const userSeeds = require('./userSeeds.json');
const upgradeSeeds = require('./upgradeSeed.js')

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Upgrades.deleteMany({});

    await User.create(userSeeds);
    await Upgrades.create(upgradeSeeds);

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