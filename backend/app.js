const express = require('express');
const cors = require('cors');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var crypto = require('crypto');
var session = require('express-session')

const pg = require('pg');
const {Client} = pg
const client = new Client({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_URL,
  port: process.env.PG_PORT,
  database: process.env.PG_DB,
  ssl: {rejectUnauthorized: false},
  // connectionString: 'postgres://postgres:Sweproject!1@database-1.cd4e6yw2ifaq.us-east-2.rds.amazonaws.com/prod'
});

const app = express();

app.use(session({
  secret: "pqowetbpgojWPAOEK[Q[TKSF;LM",
  resave: false,
  saveUninitialized: false,
  cookie: {secure: false},
}));


app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    function verify(username, password, cb) {
  client.query('SELECT * FROM users WHERE email = $1::text', [username], (err, res) => {
    if (err) {
      return cb(err);
    }
    const rows = res.rows;
    if (rows.length === 0) return cb(null, false, {message: 'Incorrect username or password.'});
    const user = rows[0];
    crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return cb(err); }
      if (!crypto.timingSafeEqual(Buffer.from(user.password, 'hex'), hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
      return cb(null, user);
    });
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(user, done) {
  client.query('SELECT * FROM users WHERE email = $1::text', [user], (err, res) => {
    if (err) {
      return done(err);
    }
    const rows = res.rows;
    if (rows.length === 0) return done(null, false, {message: 'Incorrect username or password.'});
    done(null, rows[0]);
  });
});



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

app.use((req, res, next) => {
  req.pgClient = client;
  next();
});

app.use(express.json());
const apiRoutes = require('./routes');
app.use('/', apiRoutes(passport));

async function init() {
  await client.connect( (err) => {
    console.log(err);
  });

  app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
  });
}

module.exports = init;