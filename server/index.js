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
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ['randomString']
  })
);

if (process.env.NODE_EN === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
// PORT
const PORT = process.env.PORT || 4000;

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