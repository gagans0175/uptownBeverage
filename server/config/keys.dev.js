const mongoose = require("mongoose");
const chalk = require('chalk');
//prod:  mongodb+srv://uptownBeverageNY:4bfq4wOX7NgZzLoF@uptownbeverageny-2xbrd.mongodb.net/UptownBeverageNY?retryWrites=true&w=majority
const MONGOURI = "mongodb+srv://nodeauthdbuser:vaDZA2HcNAr1fy2B@nodeauthcluster-4hm3y.mongodb.net/node-auth?retryWrites=true&w=majority";

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(chalk.greenBright('✓   MongoDB Connected...'));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;