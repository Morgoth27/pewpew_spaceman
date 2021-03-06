const { AuthenticationError } = require('apollo-server-express');
const { User, Upgrades, Score } = require('../models');
const { signToken } = require('../utils/auth');
const upgradeSeeds = require('../seeds/upgradeSeed')

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('upgrades')
      // .sort({username: 1}).limit(n);
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('upgrades')
      ;
    },
    // allUpgrades: async (parent, { username }) => {
    //   const params = username ? { username } : {};
    //   return Upgrades.find(params).sort({ createdAt: -1 });
    // },
    allUpgrades: async () => {
      return Upgrades.find().populate('upgrades');
    },
    userUpgrades: async (parent, { upgradeName }) => {
      return Upgrades.findOne({ upgradeName });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('upgrades');
      }
      throw new AuthenticationError('Please log in.');
    },
    leaderboard: async () => {
      return Score.find().sort({score: -1, username: 1}).limit(100);
    },

  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
    
      const grayUpgrades = await (await Upgrades.create(upgradeSeeds)).map((d)=>d._id);
      console.log(grayUpgrades)
 
      const user = await User.create({ username, email, password, upgrades:grayUpgrades });     

  
    for (let i = 0; i < grayUpgrades.length; i++) {
      user.upgrades.push(grayUpgrades[i])
    }
      try {
        const token = signToken(user);
        return { token, user };
      } catch(err) {
        console.log(err)
      }
      //when creating a new user, be sure to wipe acquired upgrades and score, but show list of all upgrades
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('No user found.');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials.');
      }

      try {
        const token = signToken(user);
        return { token, user };
      } catch(err) {
        console.log(err)
      }
    },
    submitScore: async (parent, { username, score }) => {
      const user = await Score.create(
        { username, score }
        // { $addToSet: {
        //   score: score
        // }}
        );
        return "Score submitted."
    },


    // addUpgrade: async (parent, { userId, upgradeId, upgradeName }) => {
      
    //   //   const upgrade = await Upgrades.create({
    //   //     upgradeName,
    //       // upgradeUser: context.user.username,
    //     // });
    //   const userFind = await User.findById(userId);
  

    //   await User.findOneAndUpdate(
    //     { _id: userId },
    //     { $addToSet: { upgrades:  [upgradeName]}},
    //     { new: true }
    //   );
    //   // return upgrade;
      
    // },


    // addScore: async (parent, { newScore }, context) => {
    //   if (context.user) {
    //     return Score.findOneAndUpdate(
    //       { _id: context.user._id },
    //       {
    //         $addToSet: {
    //           score: { newScore, userScore: context.user.username },
    //         },
    //       },
    //       {
    //         new: true,
    //         runValidators: true,
    //       }
    //     );
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
  }
};

module.exports = resolvers;