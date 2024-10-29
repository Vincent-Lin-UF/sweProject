const express = require('express');
const cors = require('cors');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');

passport.use(new LocalStrategy(function verify(username, password, cb) {
  db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, user) {
    if (err) { return cb(err); }
    if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }

    crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return cb(err); }
      if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
      return cb(null, user);
    });
  });
}));

const app = express();

const allowedOrigins = [
  'https://siege-swe.vercel.app',  
  'https://siege-swe-vincentlinufs-projects.vercel.app',
  'https://siege-5da5fm800-vincentlinufs-projects.vercel.app', 
  'http://localhost:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


app.use(express.json());
const apiRoutes = require('./routes');
app.use('/api', apiRoutes);

module.exports = app;