const express = require('express');
const cors = require('cors');

const app = express();

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