const express = require('express');
const cors = require('cors');
const loginJS = require('login-express');

const app = express();

const dbConfig = {
  mongodbURI: process.env.MONGO_URI, // required
  jwtSecret: process.env.JWT_SECRET, // required
  passwordLength: 10, // default: dev8
  jwtSessionExpiration: 3600 // default: 7200
};

const appConfig = {
  jwtResetSecret: process.env.JWT_RESET_SECRET, // required
  emailFromUser: 'myemail@example.com', // required
  emailFromPass: 'myemailpassword', // required
  emailHost: 'stmp.myemailserver.com', // required
  emailPort: 465, // required
  emailSecure: true, // required
  jwtResetExpiration: 1000, // default: 900
  basePath: '/auth' // default: '/api'
};

loginJS(dbConfig, appConfig, app, express);

const allowedOrigins = [
  'https://siege-swe.vercel.app',  
  'https://siege-swe-vincentlinufs-projects.vercel.app',
  'https://siege-5da5fm800-vincentlinufs-projects.vercel.app', 
  'http://localhost:3000'
];

app.use(cors({
    origin: allowedOrigins
  }));

app.use(express.json());
const apiRoutes = require('./routes');
app.use('/api', apiRoutes);

module.exports = app;