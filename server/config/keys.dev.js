const mongoose = require("mongoose");
const chalk = require('chalk');
const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;

const MONGOURI = "mongodb+srv://uptownbeveragedev:1S0ePgJbjXBhiIzF@uptownbeveragedev-ribvc.mongodb.net/uptownbeverage?retryWrites=true&w=majority"
//from my account const MONGOURI = 'mongodb+srv://uptownbeverageny:rQGMltjMhgieH0nl@uptownbeverage.yxb2x.mongodb.net/uptownbeverage?retryWrites=true&w=majority';
// from my account: const MONGOURI = 'mongodb+srv://mystoreuser:mystorepassword@mystorecluster.4ligo.mongodb.net/mystore?retryWrites=true&w=majority'
//from my account: const MONGOURI = "mongodb+srv://nodeauthdbuser:vaDZA2HcNAr1fy2B@nodeauthcluster-4hm3y.mongodb.net/node-auth?retryWrites=true&w=majority";


const InitiateMongoServer = () => {
  try {
     mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(connected('✓   MongoDB Connected...'));
  } catch (e) {
    console.log(error("Mongoose default connection has occured "+ e +" error"));
    throw e;
  }
};

module.exports = InitiateMongoServer;