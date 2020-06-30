process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// PORT
const PORT = process.env.PORT || 4000;

const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const logger = require('./logger');

const user = require("./routes/user");


const InitiateMongoServer = require("./config");
// Initiate Mongo Server
InitiateMongoServer();


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ['randomString']
  })
);

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
  next();
});

if (process.env.NODE_EN === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


app.get("/", (req, res) => {
  res.json({ message: "API Working now" });
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);


app.listen(PORT, (err) =>  {
  if(err){
    return logger.error(err);
  }
  logger.appStarted(PORT, 'localhost')
});