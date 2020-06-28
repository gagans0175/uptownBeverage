const mongoose = require("mongoose");
const chalk = require('chalk');

const mongoURI = process.env.MONGOURI;

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(mongoURI, {
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